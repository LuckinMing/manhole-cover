const Joi = require('joi');
const { ApiError } = require('../utils/ApiResponse');

const validate = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: true
        });

        if (validationResult.error) {
            const errorMessage = validationResult.error.details
                .map(detail => detail.message)
                .join(', ');
            throw new ApiError(errorMessage, 400, 'VALIDATION_ERROR');
        }

        req.validatedData = validationResult.value;
        next();
    };
};

// 用户相关验证schema
const userSchemas = {
    register: Joi.object({
        username: Joi.string().min(2).max(30).required()
            .messages({
                'string.min': '用户名至少需要2个字符',
                'string.max': '用户名不能超过30个字符',
                'any.required': '用户名是必填项'
            }),
        email: Joi.string().email().required()
            .messages({
                'string.email': '请输入有效的邮箱地址',
                'any.required': '邮箱是必填项'
            }),
        password: Joi.string().min(6).required()
            .messages({
                'string.min': '密码至少需要6个字符',
                'any.required': '密码是必填项'
            }),
        phone: Joi.string().pattern(/^1[3-9]\d{9}$/).optional()
            .messages({
                'string.pattern.base': '请输入有效的手机号码'
            }),
        address: Joi.object({
            province: Joi.string().optional(),
            city: Joi.string().optional(),
            street: Joi.string().optional()
        }).optional()
    }),

    login: Joi.object({
        email: Joi.string().email().required()
            .messages({
                'string.email': '请输入有效的邮箱地址',
                'any.required': '邮箱是必填项'
            }),
        password: Joi.string().required()
            .messages({
                'any.required': '密码是必填项'
            })
    })
};

// 产品相关验证schema
const productSchemas = {
    create: Joi.object({
        name: Joi.string().required()
            .messages({
                'any.required': '产品名称是必填项'
            }),
        description: Joi.string().required()
            .messages({
                'any.required': '产品描述是必填项'
            }),
        price: Joi.number().min(0).required()
            .messages({
                'number.min': '价格不能为负数',
                'any.required': '价格是必填项'
            }),
        category: Joi.string().valid('新品', '二手', '回收').required()
            .messages({
                'any.only': '类别必须是新品、二手或回收之一',
                'any.required': '类别是必填项'
            }),
        specifications: Joi.object({
            material: Joi.string().optional(),
            size: Joi.string().optional(),
            weight: Joi.number().min(0).optional(),
            condition: Joi.string().optional()
        }).optional()
    }),

    update: Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        price: Joi.number().min(0).optional(),
        category: Joi.string().valid('新品', '二手', '回收').optional(),
        status: Joi.string().valid('available', 'sold', 'processing').optional(),
        specifications: Joi.object({
            material: Joi.string().optional(),
            size: Joi.string().optional(),
            weight: Joi.number().min(0).optional(),
            condition: Joi.string().optional()
        }).optional()
    })
};

module.exports = {
    validate,
    userSchemas,
    productSchemas
};
