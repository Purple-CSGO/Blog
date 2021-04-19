---
title: Hexo+yilia主题博客搭建配置(一)：简单配置Hexo和常用指令介绍
date: 2019-05-12 10:53:44
tags: 
  - Hexo
  - 博客
published: true
permalink: /pages/bdbdd8/
sidebar: auto
categories: 
  - 博客
---
>花了将近一天半的时间使用同学推荐的Hexo框架搭建了Blog，使用的是yilia主题，下面我会分篇讲述一些细节和我踩过的坑。搭建过程部分参考了b站[Codesheep的视频](https://www.bilibili.com/video/av44544186)。
<!-- more -->
## Hexo简介
Hexo是一款基于Node.js的静态博客框架，依赖少，易于安装使用，可以方便的生成静态网页托管在GitHub和Coding上。有不少人使用Hexo框架，其主题和解决问题的方案也更多，在遇坑时可以参照前人的解决方法。

笔者使用了*Codesheep*推荐的yilia主题，简洁美观，适配各种尺寸比例的终端并且集成了很多组件。在yilia的基础上使用了Gitalk评论系统，添加了归档，修改代码高亮出的背景色等等。**所有的操作均在Windows环境下进行**。

## 安装Hexo及所需组件
- 下载安装[Git](https://gitforwindows.org/)。安装后得到Git Bash的命令行工具。可以在命令行中输入`git --version`来查看版本，检验是否成功安装。

- 下载安装[nodejs](https://nodejs.org/en/download/)。下载LTS版本即可。可在命令行中输入
```
node -v
npm -v
```
来查看版本，检验是否成功安装。


- 安装Hexo组件。在Git Bash中输入：
```
npm install -g hexo-cli
```
记得使用`hexo -v`检验是否成功安装。

- 确定博客安装位置，比如`E:/myblog`，则在Git Bash中输入：
```
cd e:/myblog
```
切换到选定的位置。然后初始化Hexo，输入：
```
npm install
```

## 熟悉Hexo及本地查看博客
至此Hexo已经在`E:/myblog`位置下安装完成，在部署到网络之前先**熟悉一下Hexo的常用指令，在本地服务器查看Hexo页面**。

- 处理源文件，**生成**（generate）的文件放在如`E:/myblog/public`，该位置下的文件最终显示在网页中。
```
hexo generate //简写： hexo g
```
- **打开本地服务器，快速测试hexo**。开启后在浏览器中输入`localhost:4000`查看网页。在命令行中按下`Ctrl+C`关闭本地服务器。
```
hexo server //简写：hexo s
```
- **清理**`public`目录下的文件。有的修改只通过`hexo g`无法完全修改这些文件，会出现bug。清理之后再`hexo g`和`hexo d`即可。
```
hexo clean //简写：hexo cl
```
- **部署**。把文件deploy到服务器上。暂时还不用输入这条指令，等到下篇文章会具体说明。
```
hexo deploy //简写：hexo d
```
-- -
今后会经常输入这些指令，可以使用简写和组合。如：
```
hexo cl & hexo g & hexo s
```
可以快速清理、生成并开启本地服务器，不过偶尔顺序会变成先`generate`再`clean`，需要注意一下。

一般重复部署到远端服务器时可以这样：
```
hexo d -g
```
可以先生成再部署，后期需要`clean`的情况比较少，基本不会出问题。

使用命令行时可以按↑快速切换到历史指令

每次打开Git Bash都要cd到blog安装位置很麻烦，找到其快捷方式，`右键-属性-起始位置`改成blog的路径，每次打开就可以直接操作啦~
