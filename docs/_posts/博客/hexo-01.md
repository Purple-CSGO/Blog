---
title: Hexo+yilia主题博客搭建配置(二)：设置Github和SSH与部署Hexo
date: 2019-05-12 11:05:44
tags: 
  - Hexo
  - 博客
published: true
permalink: /pages/e63172/
sidebar: auto
categories: 
  - 博客
---
>上篇讲述了Hexo的配置方法和一些常用指令，这篇继续说明如何把Hexo部署到网络上，设置Github和SSH秘钥。
<!--more-->
## 设置Github

目前使用`hexo cl`、`hexo g`、`hexo s`这三条已经可以在本地测试、查看基础的hexo博客了，下面要做的是把博客部署到远端，这里使用免费的Github，如果有需要也可以自行购买域名。

打开[Github](https://github.com/)，没有账户的赶紧注册一个吧。

接下来新建一个项目，即点击`Start a project`，或在某处点击`New repository`创建仓库。

起名时一定要注意，否则后期会出问题，格式为`用户名.github.io`，以`Purple`为例，则填入

```
Purple.github.io
```

## 设置SSH秘钥

回到Git bash，下面生成SSH。最好可以先cd到blog目录，以防找不到。

```
git config --global user.name "yourname"
git config --global user.email "youremail"
```

"yourname"处替换为用户名，"youremail"处替换为注册Github时所用邮箱。

记得用下面的指令检查：

```
git config user.name
git config user.email
```

确定无误之后输入创建SSH的指令，邮箱地址同理：

```
ssh-keygen -t rsa -C "youremail"
```

无脑回车，最后会告知已经生成了.ssh文件夹。

> ssh是一个密匙，`id_rsa`是这台电脑的私人秘钥，注意保密；`id_rsa.pub`是公共秘钥，需要和Github中的设置匹配，这样就可以通过git上传部署到github上，设置好SSH之后只需用`hexo d`即可提交。

打开`id_rsa.pub`，复制其中的信息。

在Github中找到[Settings](https://github.com/settings/profile)，找到[`SSH and GPG keys`](https://github.com/settings/keys)一项并点击`New SSH key`，粘贴刚才复制的秘钥信息。

记得回到Git bash中检查，输入：

```
ssh -T git@github.com	//然后输入yes
```

## 部署Hexo到Github

至此Hexo已经和Github关联，接下来要做的是简单设置一下Hexo并提交(Git)。

在此之前务必了解一下整个博客目录的**结构**：

- node_modules：依赖包
- public：存放生成的页面，文件由指令`hexo g`生成
- scaffolds：生成文章的一些模板
- source：存放源文件，包括你的文章
- themes：主题，默认landscape主题
- **_config.yml**：博客的配置文件
- **themes/landscape/_config.yml**：默认landscape主题的配置文件，用来存放页面的各种设置，其他主题同理

一定要注意这里的两个`_config.yml`是**不同的**，在博客的配置文件中设置标题、描述、关键词、URL、分类&标签、部署、**主题**等，而在主题的配置文件中设置页面的结构、样式、功能。

修改主题的内容在下一篇说，而部署要用到根目录下的**_config.yml**。打开它，找到deploy，修改repo：

```
deploy:
  type: git
  repo: https://github.com/yourname/yourname.github.io.git
  branch: master
```

同上，yourname替换为Github的用户名。

想要通过`hexo deploy`来提交(git)得用到一个插件，cd到博客目录，命令行输入：

```
npm install hexo-deployer-git --save
```

安装成功之后就可以使用上篇提到的指令了：

```
hexo cl		//清理public文件夹
hexo d -g	//先生成再部署
```

> 第一次部署过程中会弹出一个界面，要输入账号密码。

提示成功之后就可以在浏览器中查看博客啦~ 以`Purple-CSGO`为例，blog的地址即`https://purple-csgo.github.io/`

> 下篇说明更换yilia主题和编写提交博文的方法~
