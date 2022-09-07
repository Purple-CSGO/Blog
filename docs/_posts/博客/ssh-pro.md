---
title: 略懂SSH——设备间安全通信
date: 2022-09-7 19:29:44
tags:
  - SSH
published: true
permalink: /pages/ssh-pro/
sidebar: auto
categories:
  - 博客
---

SSH (Secure Shell) 是一种网络协议，可实现两个设备之间的安全通信，通常用于访问远程服务器以及传输文件或执行命令。

## 基础使用

基础指令如下，正确输入该用户的密码后便能连接到该服务器：

```bash
ssh user@ip
```

如果远程机器的用户名为 `root`，IP地址为 `192.168.0.114`，则：

```bash
ssh root@192.168.0.114
```

SSH的默认端口号为 22，如果远程机器的端口号并非 22，则需明确指定：

```bash
ssh root@192.168.0.114 -p 1622
```

## 秘钥登录

有时服务器要求使用私钥登录，下载好 `.pem` 文件用后 `-i 文件名` 使用秘钥：

```bash
ssh -i ~/.ssh/xxx.pem 用户名@ip地址 -p 端口号
```

## 生成和配置公钥

除了使用密码登录，还可以使用公钥登录的方式，提高安全性，也能避免频繁输入密码（VSCode-SSH使用的过程中常出现该问题），每个公钥可以用来标识和区分一个设备。

ssh的相关文件在用户目录 `/.ssh` 下，生成公私钥和授权的过程都要用到。

首先在终端使用如下指令生成公私钥 `id_rsa.pub` 和`id_rsa`：

```bash
ssh-keygen
```

如此公钥文件 `id_rsa.pub` 文件的内容如下：

```ssh-rsa 一串字符= purp1e@DESKTOP-UCS9IFM```

把文件的内容添加到目标机器的 `~/.ssh/authorized_keys` 文件中，比如用 vim 或者 nano

```bash
vim ~/.ssh/authorized_keys

# [A]键 -> 粘贴

# [Esc] [:wq] [Enter] 保存并退出
```

或者上传到目标机器之后：

```python
cat 文件位置 >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

之后 SSH 连接就不需要输密码了。
