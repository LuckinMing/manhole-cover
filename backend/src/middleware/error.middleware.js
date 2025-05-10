const { ApiResponse, ErrorTypes } = require('../utils/ApiResponse');

const errorHandler = (err, req, res, next) => {
    // 默认错误
    let statusCode = err.statusCode || 500;
    let message = err.message || '服务器内部错误';
    let errorCode = err.errorCode || 'SERVER_ERROR';

    // MongoDB重复键错误
    if (err.code === 11000) {
        statusCode = 409;
        message = '资源已存在';
        errorCode = 'DUPLICATE_ERROR';
    }

    // MongoDB验证错误
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
        errorCode = 'VALIDATION_ERROR';
    }

    // JWT错误
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = '无效的token';
        errorCode = 'INVALID_TOKEN';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'token已过期';
        errorCode = 'TOKEN_EXPIRED';
    }

    // 文件上传错误
    if (err.code === 'LIMIT_FILE_SIZE') {
        statusCode = 400;
        message = '文件大小超出限制';
        errorCode = 'FILE_TOO_LARGE';
    }

    res.status(statusCode).json(
        ApiResponse.error(message, {
            code: errorCode,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        })
    );
};

module.exports = errorHandler;
