# 井盖回收管理系统 API 文档

## 基础信息

- 基础URL: `http://localhost:5000/api`
- 所有请求和响应均使用 JSON 格式
- 认证请求需要在 Header 中包含 `Authorization: Bearer <token>`

## 认证相关接口

### 用户注册

```
POST /auth/register
```

请求体：
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "phone": "string (optional)",
    "address": {
        "province": "string (optional)",
        "city": "string (optional)",
        "street": "string (optional)"
    }
}
```

响应：
```json
{
    "message": "注册成功",
    "user": {
        "id": "string",
        "username": "string",
        "email": "string",
        "role": "string"
    },
    "token": "string"
}
```

### 用户登录

```
POST /auth/login
```

请求体：
```json
{
    "email": "string",
    "password": "string"
}
```

响应：
```json
{
    "message": "登录成功",
    "user": {
        "id": "string",
        "username": "string",
        "email": "string",
        "role": "string"
    },
    "token": "string"
}
```

### 获取用户信息

```
GET /auth/profile
```

Header:
```
Authorization: Bearer <token>
```

响应：
```json
{
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "phone": "string",
    "address": {
        "province": "string",
        "city": "string",
        "street": "string"
    },
    "avatar": "string"
}
```

### 更新用户信息

```
PATCH /auth/profile
```

Header:
```
Authorization: Bearer <token>
```

请求体：
```json
{
    "username": "string (optional)",
    "email": "string (optional)",
    "password": "string (optional)",
    "phone": "string (optional)",
    "address": {
        "province": "string (optional)",
        "city": "string (optional)",
        "street": "string (optional)"
    }
}
```

响应：
```json
{
    "message": "更新成功",
    "user": {
        "id": "string",
        "username": "string",
        "email": "string",
        "role": "string"
    }
}
```

## 产品相关接口

### 获取产品列表

```
GET /products
```

查询参数：
- `category`: string (optional) - 产品类别（新品/二手/回收）
- `status`: string (optional) - 产品状态（available/sold/processing）
- `sort`: string (optional) - 排序方式（默认"-createdAt"）

响应：
```json
[
    {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "category": "string",
        "images": ["string"],
        "specifications": {
            "material": "string",
            "size": "string",
            "weight": "number",
            "condition": "string"
        },
        "status": "string",
        "createdBy": {
            "id": "string",
            "username": "string"
        },
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

### 获取单个产品

```
GET /products/:id
```

响应：
```json
{
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "images": ["string"],
    "specifications": {
        "material": "string",
        "size": "string",
        "weight": "number",
        "condition": "string"
    },
    "status": "string",
    "createdBy": {
        "id": "string",
        "username": "string"
    },
    "createdAt": "date",
    "updatedAt": "date"
}
```

### 创建产品

```
POST /products
```

Header:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

请求体：
```
name: string
description: string
price: number
category: string
images: file[] (最多5张)
specifications[material]: string
specifications[size]: string
specifications[weight]: number
specifications[condition]: string
status: string (optional)
```

响应：
```json
{
    "message": "产品创建成功",
    "product": {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "category": "string",
        "images": ["string"],
        "specifications": {
            "material": "string",
            "size": "string",
            "weight": "number",
            "condition": "string"
        },
        "status": "string",
        "createdBy": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### 更新产品

```
PATCH /products/:id
```

Header:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

请求体：
```
name: string (optional)
description: string (optional)
price: number (optional)
category: string (optional)
images: file[] (optional, 最多5张)
specifications[material]: string (optional)
specifications[size]: string (optional)
specifications[weight]: number (optional)
specifications[condition]: string (optional)
status: string (optional)
```

响应：
```json
{
    "message": "产品更新成功",
    "product": {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "category": "string",
        "images": ["string"],
        "specifications": {
            "material": "string",
            "size": "string",
            "weight": "number",
            "condition": "string"
        },
        "status": "string",
        "createdBy": "string",
        "updatedAt": "date"
    }
}
```

### 删除产品

```
DELETE /products/:id
```

Header:
```
Authorization: Bearer <token>
```

响应：
```json
{
    "message": "产品删除成功"
}
```

## 错误响应

所有接口在发生错误时会返回以下格式：

```json
{
    "message": "错误描述信息",
    "error": {} // 仅在开发环境下显示详细错误信息
}
```

常见错误状态码：
- 400: 请求参数错误
- 401: 未认证或认证失败
- 403: 无权限访问
- 404: 资源不存在
- 500: 服务器内部错误

## 文件上传说明

- 支持的文件类型：jpg、jpeg、png、gif
- 单个文件大小限制：5MB
- 产品图片最多上传5张
- 上传的文件可通过 `/uploads/{filename}` 访问
