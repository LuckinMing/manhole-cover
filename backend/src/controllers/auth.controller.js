const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { ApiResponse, ApiError } = require('../utils/ApiResponse');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, phone, address } = req.body;

        // 检查用户是否已存在
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new ApiError('用户名或邮箱已存在', 400);
        }

        // 创建新用户
        const user = new User({ username, email, password, phone, address });
        await user.save();

        // 生成token
        const token = generateToken(user._id);

        res.status(201).json(ApiResponse.success('注册成功', {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address
            },
            token
        }));
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(ApiResponse.error(error.message));
        } else {
            res.status(500).json(ApiResponse.error('注册失败'));
        }
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 查找用户
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError('用户不存在', 401);
        }

        // 验证密码
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError('密码错误', 401);
        }

        // 生成token
        const token = generateToken(user._id);

        res.json(ApiResponse.success('登录成功', {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address
            },
            token
        }));
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(ApiResponse.error(error.message));
        } else {
            res.status(500).json(ApiResponse.error('登录失败'));
        }
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(ApiResponse.success('获取用户信息成功', { user }));
    } catch (error) {
        res.status(500).json(ApiResponse.error('获取用户信息失败'));
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['username', 'email', 'password', 'phone', 'address'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new ApiError('无效的更新字段', 400);
        }

        const user = await User.findById(req.user._id);
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.json(ApiResponse.success('更新成功', {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address
            }
        }));
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(ApiResponse.error(error.message));
        } else {
            res.status(500).json(ApiResponse.error('更新失败'));
        }
    }
};
