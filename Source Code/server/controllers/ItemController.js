const { itemValidation ,editItemValidation } = require('../middleware/validation')
const db =require('../models')
const Workspace=db.workspace_master
const Project=db.project_master
const Item=db.item_master

const {actionLog}=require('./ActionLogController')

const { createError, throwErrorCode } = require('../error/error')

const { Op, where } = require('sequelize');
const logger = require('../logger')

// for adding new item
exports.addItem = async(req,res)=>{

    const { error } = itemValidation(req.body)                                  //validating request
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message));
    let project= await Project.findOne({where:{id : req.body.projectId}})
    if(!project) 
        return res.status(500).json(throwErrorCode("1910 | An unexpected error occured (Project not found)"))
    
    let item=await Item.create({
        name:req.body.itemName,
        file:`http://annotation.innovaturelabs-images.infra/${req.file.filename}`,
        projectId:project.id
    })
    actionLog(req.user.userId, `Add Account`, `Create`)
    return res.status(200).json(item)
}

// for viewing a single item
exports.getItem = async(req,res)=>{

    let item= await Item.findOne({where:{id:req.params.id , status:{ [Op.ne]: 99 }}})
    if(item){
    let project= await Project.findOne({where:{id:item.projectId}})
    let workspace= await Workspace.findOne({where:{id:project.workspaceId}})
    if(workspace.companyId === req.user.companyId)
        return res.json(item)
    return res.status(500).json(throwErrorCode("1912 | An unexpected error occured (Access Denied)"))
    }
    return res.status(500).json(throwErrorCode("1911 | An unexpected error occured (Item not found)"))
}

// for editing item
exports.editItem = async(req,res)=>{
    
    const { error } = editItemValidation(req.body)                                  //validating request
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message));
    let item= await Item.findOne({where:{id:req.params.id, status:{ [Op.ne]: 99 }}})
    if(item){
        let project= await Project.findOne({where:{id : req.body.projectId}})
        if(!project) 
            return res.status(500).json(throwErrorCode("1910 | An unexpected error occured (Project not found)"))
        let workspace= await Workspace.findOne({where:{id:project.workspaceId}})
        if(workspace.companyId === req.user.companyId){
            await item.update({name:req.body.itemName ,status:req.body.lock})
            return res.status(200).json(item)
        }
        return res.status(500).json(throwErrorCode("1912 | An unexpected error occured (Access Denied)"))
    }        return res.status(500).json(throwErrorCode("1911 | An unexpected error occured (Item not found)"))
}

// for deleting item
exports.deleteItem = async(req,res)=>{
    let item= await Item.findOne({where:{id:req.params.id, status:{ [Op.ne]: 99 }}})
    if(item){
    let project= await Project.findOne({where:{id:item.projectId}})
    let workspace= await Workspace.findOne({where:{id:project.workspaceId}})
    if(workspace.companyId === req.user.companyId){
        await item.update({status:99})    
        return res.status(200).json("Successfully Deleted")
    }
    return res.status(500).json(throwErrorCode("1912 | An unexpected error occured (Access Denied)"))
    }
    return res.status(500).json(throwErrorCode("1911 | An unexpected error occured (Item not found)"))
}

// for listing items present in project
exports.listItem = async(req,res)=>{

    let workspace=await Workspace.findOne({where:{companyId : req.user.companyId}})
    if(!workspace){
        const t= await db.sequelize.transaction()
        try{
            workspace= await Workspace.create({
                name:"sample",
                code:"sample",
                companyId:req.user.companyId
            },{
                transaction:t
            })
            await Project.create({
                name:"sample",
                assigneeFlag:0,
                dueDateFlag:0,
                priorityFlag:0,
                stepFlag:0,
                tagsFlag:0,
                memoFlag:0,
                workspaceId:workspace.id
            },{
                transaction:t
            })
            await t.commit()
        } catch(err){
            logger.warn(`${err}`,{module:`list item`})
            await t.rollback();
            return res.status(500).json(throwErrorCode("1909 | An unexpected error occurred (Transaction failed)"))
        }
    }
    let project= await Project.findOne({where:{workspaceId: workspace.id}})
    let item= await Item.findAll({where:{projectId :project.id , status:{ [Op.ne]: 99 }}})
    actionLog(req.user.userId, `List Account`, `List`)
    return res.status(200).json({item,project})
}

// for searching item 
exports.searchItem = async(req,res)=>{
    let item=await Item.findAll({ where: {
        [Op.and]: [
            { status: { [Op.ne]: 99 }},
            
            {
                [Op.or]: [
                    { name: { [Op.like]: `%${req.body.search}%`} },
                ]
            }
        ]
    }})
    if(item){
        return res.json(item)
    }   
    return res.status(500).json(throwErrorCode("1911 | An unexpected error occured (Item not found)"))
}