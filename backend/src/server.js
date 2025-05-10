const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { requestLogger, errorLogger } = require('./middleware/logger.middleware');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
// CORS 配置
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://your-production-domain.com' 
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Manhole Cover Management System API" });
});

// API路由
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// 错误处理
app.use(errorLogger);
const errorHandler = require('./middleware/error.middleware');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
