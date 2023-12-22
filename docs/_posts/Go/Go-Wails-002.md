---
title: Go+Wails学习笔记（二）一键编译运行脚本
date: 2020-07-12 18:59:22
tags: 
  - GO
  - Wails
published: true
hideInList: false
feature: /post-images/Go-Wails-002.png
isTop: false
permalink: /pages/6b702e/
sidebar: auto
categories: 
  - Go
author: 
  name: Purp1e
  link: https://github.com/Purple-CSGO
---
# 前言

上篇说到Go+wails的Hello-World程序的环境配置、编译和运行的结果，但是懒人总是会想办法减少自己的工作量，经过研究，可以编写cmd批处理脚本来快速完成编译+运行的过程。

# 纯Go语言项目

- 可以使用Goland自带的Go Build模板，按照类似图中的方式配置，生成的可执行文件在`./build`中。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200712185154.png)

- 也可以自己编写CMD，比如`build.cmd`

```
@echo off
chcp 65001

:: 编译可执行文件
go build -o ./build/test.exe main.go

echo ---------------------- Start ----------------------

:: 运行可执行文件 文件名务必更改
cd build

test.exe

echo ----------------------- End -----------------------
```

放在项目根目录，再编辑**运行/调试设置**，如下图所示。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200712185543.png)

如此便可直接点击右上角的图标一键编译+运行了。

# Wails+Go项目

脚本如下，**运行/调试设置**同理：

```
@echo off

chcp 65001

:: 编译可执行文件
wails build

:: 运行可执行文件 文件名务必更改
cd build

hello-world.exe
```

----

接下来应该是Golang或者前端语言的学习内容了，可能与wails相关性不大，但前后端交互一定会单独出来介绍。
