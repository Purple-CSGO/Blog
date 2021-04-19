---
title: PicGo+Typora+码云Gitee图床联动
date: 2020-03-08 12:21:59
tags: 
  - 博客
  - Typora
  - Gitee
published: true
hideInList: false
feature: /post-images/picgo-typora-gitee.jpg
isTop: false
permalink: /pages/216c79/
sidebar: auto
categories: 
  - 随笔
---
# 前言

MarkDown编辑器Typora的新版本支持了PicGo，可以更方便地上传图片到sm.ms、github、gitee等图床，降低博客、服务器存储上的压力，同时把图片存放在gitee码云上国内的访问速度较快。这里对Typora-PicGo-Gitee的配置作详细说明。

# 必备环境

- 安装[Typora](https://www.typora.io/)最新版

- 安装[PicGo](https://github.com/Molunerfinn/PicGo/releases)最新版

- 安装[nodejs](https://nodejs.org/en/)

> 分流下载https://c-t.work/s/1a30c91c07ba4c

# 配置过程

## 码云Gitee

### 注册账号

登录[码云](https://gitee.com/)，注册账号并登录。

### 新建仓库

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/新建gitee仓库.png)

点击右上角的加号，新建仓库，设置`是否开源`为`公开`，勾选`使用Readme文件初始化这个仓库`，自定义仓库名称，仓库介绍选填，其它默认。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/gitee仓库配置.png)

创建成功后保存好仓库的网址，如`https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting`。

### 配置Token

点击右上角头像-`设置`，进入`安全设置`中的`私人令牌`。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/token-1.png)![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/token-2-cut.png)

点击`生成新令牌`。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/token-3.png)



填入私人令牌描述如`个人图床`，仅勾选`projects`，提交。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/token-4.png)

生成私人令牌后务必保存好`Token`，Token只会明文出现一次，之后不可见，丢失后只能重置。

## PicGo

### 安装Nodejs

这一步一定要做，安装后才能为PicGo添加插件

### 添加Gitee插件

插件设置里搜索`github`，安装`github plus`，安装后在图床设置里可以找到githubplus。

![picgo插件](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/picgo插件-1583640438928.png)

### 配置githubPlus

根据之前保存好的仓库链接`https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting`，保留后半部分填入`repo`，`token`填入之前保存好的`Token`，`origin`处选择`gitee`。

点击`设为默认图床`并确定。

![githubPlus配置](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/插件设置.png)

### 配置PicGo快捷键

如果想要通过PicGO快速上传图片，需要简单设置一下上传的快捷键：`PicGo设置` - `修改快捷键`。

![PicGo快捷键](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/快捷键-1.png)

我的设置是`Ctrl+Q`，设置成功后用`Ctrl+alt+A`QQ截图后，再按下`Ctrl+Q`自动上传到图床并得到Markdown格式链接，`Ctrl+V`粘贴到Typora中即可。同样，本地的图片使用`Ctrl+C`复制到剪贴板，再按下`Ctrl+Q`也可以上传，可以说是非常方便了。

## Typora联动PicGo

打开偏好设置-图像，找到上传服务器设定，选择`PicGo(app)`，选择程序路径，并验证。

![Typora联动PicGo](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200308120403-1583641973119.png)

验证成功后如下图所示。

![验证PicGo](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/image-20200308120506304.png)

之后点击Typora中插入的图片，上传图片即可替换URL。

## 联动问题解决

后来发现，如果PicGo在`C:\Program Files\`下安装，Typora上传时出现如下报错。

```
failed to launch PicGo app: Command failed: C:\Program Files\PicGo\PicGo.exe
'C:\Program' �����ڲ����ⲿ���Ҳ���ǿ����еĳ���
���������ļ���
```

解决办法是，手动在路径两边加上英文的引号`"C:\Program Files\PicGo\PicGo.exe"`，应该是当前版本Typora开发者调用命令的时候忘记加了。

![路径问题解决](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/image-20200308121353320.png)

# 后记

经过笔者一番体验后发现，Typora想要使用PicGo自动上传，要保证PicGo在后台，和直接使用PicGo相比效率并没有提升，建议直接使用PicGo加快捷键。

如此，在Typora中编辑文档后可以直接复制给[Gridea](https://eeudn8.coding-pages.com/Gridea-Deploy-Coding/)了~~简单设置一下URL、标签和头图即可发布，降低了服务器的容量压力。