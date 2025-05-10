<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // 简单的用户名和密码验证
    if ($username == 'admin' && $password == 'admin') {
        $_SESSION['loggedin'] = true;
        header('Location: dashboard.php');
        exit();
    } else {
        $error = '用户名或密码错误';
    }
}
?>
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录 - 河南省井盖回收处理有限公司</title>
    <style>
        @font-face {
            font-family: 'PingFang-SC';
            src: url('../fonts/PingFang.ttf') format('truetype');
        }/*孩子们内置苹方来了*/
        body {
            font-family: 'PingFang-SC', sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
        }

        .login-container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 300px;
        }

        h2 {
            margin-bottom: 20px;
        }

        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }

        button:hover {
            background-color: #45a049;
        }

        .error {
            color: red;
            display: <?php echo isset($error) ? 'block' : 'none'; ?>;
        }
    </style>
</head>

<body>
    <div class="login-container">
        <h2>登录</h2>
        <form method="post" action="login.php">
            <input type="text" name="username" placeholder="用户名" required>
            <input type="password" name="password" placeholder="密码" required>
            <button type="submit">登录</button>
        </form>
        <p class="error"><?php echo isset($error) ? $error : ''; ?></p>
    </div>
</body>

</html>