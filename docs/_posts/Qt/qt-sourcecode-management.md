---
title: QtCreator中使用Git(GitHub)做项目源代码管理和up-to-date src refspec等问题踩坑
date: 2020-01-17 23:05:40
tags: 
  - Qt
  - Git
published: true
hideInList: false
feature: /post-images/qt-sourcecode-management.png
isTop: false
permalink: /pages/21c1ea/
sidebar: auto
categories: 
  - Qt
---
> Qt Creator中包含了Git相关工具，为了更好地管理即将编写的项目的源代码，笔者决定配置好Git相关设置，过程中踩了一些坑，比如`git push`时出现`Everything up-to-date`、`error: src refspec master does not match any`问题，`Git GUI Here`右键选项消失的问题。下面会详细说明所有的步骤，参考的文章有：[文章一](https://blog.csdn.net/qq21497936/article/details/80174554) [文章二](https://blog.csdn.net/yanguo110/article/details/80731774) [文章三](https://blog.csdn.net/xl_lx/article/details/80676208) [Git右键菜单](https://blog.csdn.net/weixin_39251617/article/details/79055820)

-- --

## 准备

需要用到[Git]([https://git-scm.com/downloads](https://git-scm.com/downloads)
)，[Qt]([http://download.qt.io/archive/qt/](http://download.qt.io/archive/qt/)
)，笔者的版本是5.14，还有一个GitHub账号且创建好一个项目(repository)，软件安装和GitHub创建的基本操作省略。

## 配置Git Bash秘钥

第一步要设置秘钥，对项目的每一次修改都应该有修改者的相关信息，所以要把秘钥设置好。打开Git Bash，方法有很多，可以`ctrl+s`调出搜索栏并输入git打开，这里的路径是用户的根目录，之后创建的`.ssh`文件夹也在该位置，如：

```
C:\Users\Administrator\
```

实际用户名往往不同，位置都是类似的。

比如邮箱和用户名分别为`jianshu` 和 `123456789@mail.com`，则应分别输入以下两条指令：

```
git config --global user.name "jianshu"
git config --global user.email "123456789@mail.com"
```

检查设置是否正确，分别输入：

```
git config --global user.name
git config --global user.email
```

使用以下指令生成秘钥：

```
ssh-keygen -t rsa -C "123456789@mail.com"
```

打开`C:\Users\Administrator\.ssh`，打开`id_rsa.pub`并复制其中的秘钥内容。

## 添加本机秘钥

如图设置好SSH Keys，注意取名方便区分，比如xxx-PC，xxx-Laptop。

![设置SSH秘钥.png](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329230741.png)

注意可以先到项目里复制好URL，在Qt Creator中要用到，建议做Git Clone时使用SSH的URL。

![复制Repo的URL.png](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329230813.png)

## Qt Creator中的设置

打开QT Creator并创建项目，菜单栏`工具->选项`打开选项窗口，`版本控制->Git`，配置Git的路径。我的Git Bash位置在`C:\Program Files\Git\bin`。

![设置Git路径.png](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329230828.png)

下面要对Git仓库进行初始化，这也是第一个坑，我们在做Qt项目时往往会专门创建一个文件夹放项目文件夹（包括源代码、Debug、Release），但往往这个文件夹和存放源代码的文件夹同名，实际初始化时要在后者中进行，如

```
E:\QtTest\Notepad\Notepad
```

可以手动打开该位置右键`Git Bash Here`、直接打开Git Bash并CD过去，或者在Qt Creator中`工具->Git->创建仓库`，以下是创建时用到的指令，分别输入（注意用到了之前复制的URL）：

```
git init
git remote add origin https://github.com/Notepad/Notepad.git
git pull origin master --allow-unrelated-histories
git push --set-upstream origin master
```

至此会把初始化Repo创建的README.md等文件pull下来，但在push上传时遇到了第二个坑：`Everything is up-to-date`，直接`Git push`并没有效果，在网页上查看也没有任何变化，这是因为git不只是单单push一步完成，push前需要add、commit若干次，最后确认无误后才push。故：

```
git add .
git commit -m "提交信息"
```

或者用一条指令完成，其中提交信息用于标识本次commit做了什么。

```
git commit -am "提交信息"
```

最后push，从GitHub网页端检查是否有变化。

```
git push origin master
```

## Qt Creator中的Git操作

配置好上面一切后，就可以在`工具->Git`处做一些常规的Git操作，不过标签tag等其他命令还是得进入命令行。

![QT Creator中的Git操作.png](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329230855.png)

下载Pull：

```
工具->Git->Remote Repositories->push
```

上传Commit+Push（务必commit否则还会出现up-to-date或src refspec错误）：

```
工具->Git->Local Repositories->commit
工具->Git->Remote Repositories->push
```

-- --

> 待整理其他git相关指令

```
git clone URL

git status -s

//分支管理

//创建分支
git branch branchName

//切换分支
git checkout branchName
//新建分支并切换到该分支 代替上面两条指令
git checkout -b branchName

//合并分支
git merge branchName
//合并常伴冲突 需要手动修改冲突的地方 再次提交(commit) 显示冲突
git diff

//删除分支
git branch -d branchName

//比如想为项目发布一个"1.0"版本。 我们可以用以下命令给最新一次提交打上"v1.0"的标签
git tag -a v1.0

//查看标签
git tag

//删除标签
git tag -d v1.1

//查看标签信息
git show v1.0

//查看提交历史 可以得到commit编号 追加标签
git log --decorate
//追加标签
git tag -a v0.9 85fc7e7

```
