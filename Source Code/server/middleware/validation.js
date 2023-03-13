const joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
const codeRegex = /^([^-]|[^-].*[^-][a-zA-Z0-9])*([^-]|[^-].*[^-])$/i
const nameRegex = /^[a-zA-Z]+$/

function emailValidation(data) {
  const schema = joi.object({
    email: joi.string().min(4).email().required().messages({
      'string.empty' : '1009 | Email required',
      'any.required' : '1009 | Email required',
      'string.email' : '2001 | Invalid email id format'
    }),
  });
  return schema.validate(data);
}

function registerValidation(data) {
  const schema = joi.object({
    name: joi.string().min(4).required().max(50).messages({
      'string.min' : '1001 | Invalid company name',
      'string.empty' : '1010 | Company name required',
      'string.max' : '1001 | Invalid company name',
      'any.required' : '1010 | Company name required'
    }),

    code: joi.string().min(1).required().max(20).regex(codeRegex).messages({
      'string.min' : '1002 | Invalid comapny code',
      'string.empty' : '1011 | Company code required',
      'string.max' : '1002 | Invalid comapny code',
      'any.required' : '1011 | Company code required',
      'string.pattern.base' : '1002 | Invalid comapny code'
    }),

    phone: joi.string().min(10).required().max(13).messages({
      'string.min' : '1003 | Invalid phone number format',
      'string.empty' : '1003 | Invalid phone number format',
      'string.max' : '1003 | Invalid phone number format',
      'any.required' : '1003 | Invalid phone number format'
    }),

    firstName: joi.string().min(4).required().max(10).regex(nameRegex).messages({
      'string.min' : '1006 | Invalid first name format',
      'string.empty' : '1014 | First name required',
      'string.max' : '1006 | Invalid first name format',
      'any.required' : '1014 | First name required',
      'string.pattern.base' : '1006 | Invalid first name format'
    }),

    lastName: joi.string().min(4).required().max(10).regex(nameRegex).messages({
      'string.min' : '1004 | Invalid last name format',
      'string.empty' : '1013 | Last name required',
      'string.max' : '1004  | Invalid last name format',
      'any.required' : '1013 | Last name required',
      'string.pattern.base' : '1004 | Invalid last name format'
    }),

    accountId: joi.string().min(4).required().max(50).messages({
      'string.min' : '1007 | Invalid account id format',
      'string.empty' : '1015 | Account Id required',
      'string.max' : '1007 | Invalid account id format',
      'any.required' : '1015 | Account Id required'
    }),

    email: joi.string().min(4).email().messages({
      'string.min' : '2001 | Invalid email id format',
      'string.empty' : '1009 | Email required',
      'string.max' : '2001 | Invalid email id format',
      'any.required' : '1009 | Email required'
    }),
    
    password: joiPassword.string().min(8).required().minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).messages({
      'string.min' : '1008 | Invalid password format',
      'string.empty' : '1016 | Password required',
      'string.max' : '1008 | Invalid password format',
      'any.required' : '1016 | Password required',
      'password.minOfUppercase' : ' | Password should contain at least {#min} uppercase letter',
      'password.minOfSpecialCharacters' : ' | Password should contain at least {#min} special letter',
      'password.minOfLowercase' : ' | Password should contain at least {#min} lowercase letter',
      'password.minOfNumeric' : ' | Password should contain at least {#min} numeric letter'
    }),
  });
  return schema.validate(data);
}

function loginValidation(data) {
  const schema = joi.object({
    email: joi.string().min(3).required().messages({    //this email is email or account id
      'string.min' : '2006 | Invalid email or accountId format',
      'string.empty' : '1034 | Email or accountId required',
      'string.max' : '2006 | Invalid email or accountId format',
      'any.required' : '1034 | Email or accountId required'
    }),

    password: joiPassword.string().min(8).required().minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).messages({
      'string.min' : '1008 | Invalid password format',
      'string.empty' : '1016 | Password required',
      'string.max' : '1008 | Invalid password format',
      'any.required' : '1016 | Password required',
      'password.minOfUppercase' : ' | Password should contain at least {#min} uppercase letter',
      'password.minOfSpecialCharacters' : ' | Password should contain at least {#min} special letter',
      'password.minOfLowercase' : ' | Password should contain at least {#min} lowercase letter',
      'password.minOfNumeric' : ' | Password should contain at least {#min} numeric letter'
    }),
  });
  return schema.validate(data);
}

function forgotPasswordValidation(data){
  const schema=joi.object({
    email: joi.string().min(4).email().messages({
      'string.min' : '2001 | Invalid email id format',
      'string.empty' : '1009 | Email required',
      'string.max' : '2001 | Invalid email id format',
      'any.required' : '1009 | Email required'
    })
  })
  return schema.validate(data)
}

function resetPasswordValidation(data) {
  const schema = joi.object({
    accountId: joi.string().messages({
      'string.min' : '1007 | Invalid account id format',
      'string.empty' : '1015 | Account id required',
      'string.max' : '1007 | Invalid account id format',
      'any.required' : '1015 | Account id required'
    }),

    newPassword: joi.string().min(8).required().messages({
      'string.min' : '1008 | Invalid password format',
      'string.empty' : '1016 | Password required',
      'string.max' : '1008 | Invalid password format',
      'any.required' : '1016 | Password required'
    }),
    
    confirmPassword: joi.string().messages({
      'string.min' : '1008 | Invalid password format',
      'string.empty' : '1016 | Password required',
      'string.max' : '1008 | Invalid password format',
      'any.required' : '1016 | Password required'
    }),

  });
  return schema.validate(data);
}

//for account
function accountValidation(data){
  const schema=joi.object({
    nickName: joi.string().min(1).max(20).required().messages({
      'string.min' : '3001 | Invalid nickname',
      'string.empty' : '1017 | Nickname required',
      'string.max' : '3001 | Invalid nickname',
      'any.required' : '1017 | Nickname required'
    }),

    accountId: joi.string().min(4).max(50).required().messages({
      'string.min' : '1007 | Invalid account id',
      'string.empty' : '1015 | Account Id required',
      'string.max' : '1007 | Invalid account id',
      'any.required' : '1015 | Account Id required'
    }),

    departmentName: joi.string().max(50).allow('').messages({
      'string.max' : '3004 | Invalid department name',
    }),

    jobTitle: joi.string().max(50).allow('').messages({
      'string.max' : '3005 | Invalid Job title',
    }),

    email: joi.string().email().required().messages({
      'string.min' : '2001 | Invalid email id format',
      'string.empty' : '1009 | Email required',
      'string.max' : '2001 | Invalid email id format',
      'any.required' : '1009 | Email required'
    }),

    role: joi.number().integer().required(),
    disallowCollaboration: joi.number().integer(),
    profileEditing: joi.number().integer()
  })
  return schema.validate(data)
}

function profileUpdateVaildation(data){
  const schema=joi.object({
    image: joi.any(),
    nickName: joi.string().min(1).max(20).required().messages({
      'string.min' : '3001 | Invalid nickname',
      'string.empty' : '1017 | Nickname required',
      'string.max' : '3001 | Invalid nickname',
      'any.required' : '1017 | Nickname required'
    }),

    email: joi.string().email().required().messages({
      'string.min' : '2001 | Invalid email id format',
      'string.empty' : '1009 | Email required',
      'string.max' : '2001 | Invalid email id format',
      'any.required' : '1009 | Email required'
    }),

    departmentName: joi.string().max(50).allow('').messages({
      'string.max' : '3004 | Invalid department name',
    }),

    jobTitle: joi.string().max(50).allow('').messages({
      'string.max' : '3005 | Invalid Job title',
    }),
  })
  return schema.validate(data)
}

function changePasswordValidation(data) {
  const schema = joi.object({
    newPassword: joiPassword.string().min(8).required().minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).messages({
      'string.min' : '1008 | Invalid password format',
      'string.empty' : '1016 | Password required',
      'string.max' : '1008 | Invalid password format',
      'any.required' : '1016 | Password required',
      'password.minOfUppercase' : ' | Password should contain at least {#min} uppercase letter',
      'password.minOfSpecialCharacters' : ' | Password should contain at least {#min} special letter',
      'password.minOfLowercase' : ' | Password should contain at least {#min} lowercase letter',
      'password.minOfNumeric' : ' | Password should contain at least {#min} numeric letter'
    }),
    
    currentPassword: joiPassword.string().messages({
      'string.min' : '1008 | Invalid password format',
      'string.empty' : '1016 | Password required',
      'string.max' : '1008 | Invalid password format',
      'any.required' : '1016 | Password required'
    }),

  });
  return schema.validate(data);
}

function itemValidation(data) {
  const schema = joi.object({
    file: joi.any(),
    itemName: joi.string().max(50).required().messages({
      'string.empty' : '1029 | item name required',
      'string.max' : '8000 | Invalid item name',
      'any.required' : '1029 | item name required'
    }),
    projectId: joi.number().integer().required().messages({
      'number.base': '8008 | Invalid projectId',
    })
  });
  return schema.validate(data);
}

function editItemValidation(data) {
  const schema = joi.object({
    itemName: joi.string().max(50).required().messages({
      'string.empty' : '1029 | item name required',
      'string.max' : '8000 | Invalid item name',
      'any.required' : '1029 | item name required'
    }),
    projectId: joi.number().integer().required().messages({
      'number.base': '8008 | Invalid projectId',
    }),
    lock:joi.number().integer()
  });
  return schema.validate(data);
}

module.exports = {
  emailValidation,
  registerValidation, 
  loginValidation, 
  forgotPasswordValidation,
  resetPasswordValidation,
  accountValidation,
  profileUpdateVaildation,
  changePasswordValidation,
  itemValidation,
  editItemValidation
};
