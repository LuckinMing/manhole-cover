const Product = require('../models/product.model');
const fs = require('fs').promises;
const path = require('path');
const { ApiResponse, ApiError } = require('../utils/ApiResponse');

// 创建新产品
exports.createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            createdBy: req.user._id
        };

        if (req.files) {
            productData.images = req.files.map(file => file.path.replace(/\\/g, '/'));
        }

        const product = new Product(productData);
        await product.save();

        res.status(201).json(ApiResponse.success('产品创建成功', { product }));
    } catch (error) {
        res.status(500).json(ApiResponse.error('创建产品失败', error.message));
    }
};

// 获取所有产品
exports.getAllProducts = async (req, res) => {
    try {
        const { category, status, sort = '-createdAt', page = 1, limit = 10 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;

        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            Product.find(query)
                .sort(sort)
                .skip(skip)
                .limit(Number(limit))
                .populate('createdBy', 'username'),
            Product.countDocuments(query)
        ]);

        res.json(ApiResponse.success('获取产品列表成功', {
            products,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / limit)
            }
        }));
    } catch (error) {
        res.status(500).json(ApiResponse.error('获取产品列表失败'));
    }
};

// 获取单个产品详情
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('createdBy', 'username');

        if (!product) {
            throw new ApiError('产品不存在', 404);
        }

        res.json(ApiResponse.success('获取产品详情成功', { product }));
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(ApiResponse.error(error.message));
        } else {
            res.status(500).json(ApiResponse.error('获取产品详情失败'));
        }
    }
};

// 更新产品
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new ApiError('产品不存在', 404);
        }

        if (product.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            throw new ApiError('没有权限修改此产品', 403);
        }

        const updates = { ...req.body };
        
        if (req.files && req.files.length > 0) {
            // 删除旧图片
            if (product.images && product.images.length > 0) {
                await Promise.all(product.images.map(imagePath => 
                    fs.unlink(path.join(__dirname, '..', '..', imagePath))
                        .catch(() => {}) // 忽略删除失败的错误
                ));
            }
            updates.images = req.files.map(file => file.path.replace(/\\/g, '/'));
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        ).populate('createdBy', 'username');

        res.json(ApiResponse.success('产品更新成功', { product: updatedProduct }));
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(ApiResponse.error(error.message));
        } else {
            res.status(500).json(ApiResponse.error('更新产品失败'));
        }
    }
};

// 删除产品
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new ApiError('产品不存在', 404);
        }

        if (product.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            throw new ApiError('没有权限删除此产品', 403);
        }

        // 删除相关图片
        if (product.images && product.images.length > 0) {
            await Promise.all(product.images.map(imagePath => 
                fs.unlink(path.join(__dirname, '..', '..', imagePath))
                    .catch(() => {}) // 忽略删除失败的错误
            ));
        }

        await product.deleteOne();

        res.json(ApiResponse.success('产品删除成功'));
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(ApiResponse.error(error.message));
        } else {
            res.status(500).json(ApiResponse.error('删除产品失败'));
        }
    }
};
