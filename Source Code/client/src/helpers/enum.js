export const accountDisclosure = (data) => {
    if(data == 0) return 'Disallow'
    if(data == 1) return 'Allow'
}

export const roles= (data) => {
    if(data == 1) return 'Owner'
    if(data == 2) return 'Admin'
    if(data == 3) return 'Member'
}
export const profileRestrictions= (data) => {
    if(data==0) return '' 
    if(data==1) return 'Disallow Profile Editing'
}

export const collaborationRestrictions= (data) => {
    if(data==0) return ''
    if(data==1) return 'Disallow assignment to collaborating companies projects'
}