---
title: Config|CFG设置详细解读和启动项推荐
date: 2019-05-23 20:28:56
tags: 
  - CSGO
  - CFG
published: true
hideInList: false
feature: /post-images/csgo-config.jfif
isTop: false
permalink: /pages/b5766c/
sidebar: auto
categories: 
  - CSGO
author: 
  name: Purp1e
  link: https://github.com/Purple-CSGO
---
> 这篇文章会详细的介绍所有与CFG和启动项相关的知识，希望可以加深各位对CSGO设置的理解。
<!--more-->
# 什么是CFG|为什么要用CFG？

CFG是Config【设置】的简写，把各种指令写入`.cfg`文件中可以快速加载、备份游戏设置。此外，了解[控制台进阶指令](https://purple-csgo.github.io/csgo/advancedcommand.html)的alias指令关闭游戏之后失效的特点之后，使用CFG可以避免繁琐的输入指令的过程。当然我也提供了一整套[CFG预设](https://github.com/Purple-CSGO/Cfg-Preset-By-Purp1e)可供参考，适用于各种使用场景。

# CFG文件放在哪？

总共有2种位置可以存放`.cfg`文件，一是CSGO游戏目录下的cfg文件夹，路径：

```
...\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg
```

如果CSGO和Steam不在一个分区，安装在了其它位置，可能路径：

```
...\SteamLibrary\steamapps\commonCounter-Strike Global Offensive\csgo\cfg
```

第二种位置在Steam的安装目录下：

```
...\Steam\userdata\123456789\730\local\cfg
```

这里的`123456789`代表SteamID3，一般是9位数字，复制Steam个人资料的链接到[这个网站](https://steamid.io/)中可以查到9位数字ID。如果这台只登录过一个账号，userdata下只会有一个文件夹，但如果有多个账号登录过，就得查找一下ID。

![查找steamid](https://eeudn8.coding-pages.com/post-images/1581235364767.png)

CSGO游戏目录的cfg文件夹中`.cfg`文件，所有账号共享使用。

userdata目录下的cfg文件夹中`.cfg`文件，仅供该账号使用。

值得注意的是，个人cfg文件夹中存在这两个文件：

- **config.cfg**

+ **video.txt**

config.cfg中存放了这个账号几乎所有的参数设置，而video.txt存放的是账号的视频设置。其实对于跑图([practice](https://github.com/Purple-CSGO/Cfg-Preset-By-Purp1e/blob/master/practice.cfg))这样的cfg，如果可以，放在游戏的cfg文件夹当然更好。放在CSGO目录下使用起来比较方便，但是考虑到要打包个人设置，和不同账号之间可能存在的设置冲突，更倾向于放在个人cfg文件夹中。

# 如何创建一个.CFG文件?

关键在于显示文件的后缀名，Win10系统按照下图操作：
![显示扩展名](https://eeudn8.coding-pages.com/post-images/1581235374512.png)

Win7系统如下：
![文件夹选项](https://eeudn8.coding-pages.com/post-images/1581235379804.png)

![Win7显示扩展名](https://eeudn8.coding-pages.com/post-images/1581235383882.png)

显示隐藏的扩展名之后，右键新建一个文本文档，把后缀名txt改成cfg即可。同时可以选择`.cfg`文件右键，打开方式，设置默认为记事本打开。

这里更推荐使用[Notepad++](https://notepad-plus-plus.org/download)、[Atom](https://atom.io/)或[Vscode](https://code.visualstudio.com/)等编辑CFG，其中Notepad++安装包最小，约4MB。

# 如何加载CFG中的设置?

加载/执行的英文是【execute】，简写：**exec**，打开游戏，控制台中输入：

```
exec xxx.cfg	//xxx是cfg的名称
```

或者：

```
exec xxx	//省略后缀名
```

输入过程中会有提示，如果没有提示并且控制台显示：

```
exec: couldn't exec xxx
```

说明没有把`.cfg`文件放在正确的位置，或者

# 为什么要写autoexec.cfg?

在很多设置有关的教程中都会提到这样autoexec.cfg，即`auto-execute-config`，自动执行的设置文件。为什么要把一些指令放在xxx.cfg中而不是config.cfg里面呢？

首先，每次改变设置游戏都会对config.cfg规格化，即使把指令放在里面，也只能生效一次，这些指令也会被抛弃，包括alias。游戏的设置在不断的变动，同时config.cfg也被修改，就没有办法回到之前的设置（准星、持枪等），除了用5e、b5等config云或者手动备份，不如把常用设置专门放在一个cfg里，方便修改。

![规格化CFG](https://eeudn8.coding-pages.com/post-images/1581235389843.png)
其次，alias指令（实现一键跳投等功能）在关闭游戏后失效，通过其他的cfg，比如auto.cfg，**每次启动游戏自动加载**，保证每次启动游戏设置一致，避免了每次启动游戏手动输入exec指令的麻烦。

# 自动加载CFG方法

![自动加载CFG](https://eeudn8.coding-pages.com/post-images/1581235394917.png)

启动项参考：

```
-worldwide -novid -nojoy -d3d9ex +exec auto.cfg
```

CFG结尾添加：

```
host_writeconfig;
//end
```

# CFG常用指令和语法

echo指令：在控制台显示文字。

```
//""可省，;可省
echo Hello World
echo Hello World;
echo "Hello Wolrd";
//输出空行
echo;
//输出中文""不可省，必须是英文引号
//CFG使用UTF-8/GB2312编码，否则乱码
echo "你好！"
echo "你好！";
```

注释

```
echo Hail Jo~//这是注释
"""这也是注释，不常用
```

加载/执行CFG

```
exec auto.cfg
//.cfg可省略
exec auto
```

分号可省略

```
//分号省略不影响，
sensitivity 1
bind mouse1 +attack;
//单行多指令/输入控制台务必用分号分隔
sensitivity 1;bind mouse1 +attack
```

控制台显示中文提示的方法

```
//输出中文""不可省，必须是英文引号
//CFG使用UTF-8/GB2312编码，否则乱码
echo "你好！"
echo "你好！";
```

-- --

# 设置启动项

打开steam的库：`库→ConterStrike:Global Offensive→右键→属性→设置启动选项...`

## 启动项之间用空格分隔

```
-worldwide -novid -nojoy -d3d9ex +exec auto.cfg
//错误写法
-worldwide-novid-nojoy
```

## 启动项指令和参数之间用空格分隔

```
-tickrate 128
//错误写法
-tickrate128
```

## 启动项指令由 - 开头，游戏控制台指令由+ 开头

```
-w 1920 -h 1080
+fps_max 300
+exec auto.cfg
//无效写法
-exec auto.cfg
```

## 常见启动项

```
-novid  关闭过场动画
-high  提高CSGO程序优先级，有可能负优化
-nojoy 关闭手柄相关，降低内存占用
-d3d9ex  提高帧数和切换桌面速度
-tickrate 128  本地房间128Tick
-perfectworld  直接进入国服
-worldwide  直接进入国际服
-w 1920 -h 1080  设置分辨率1920x1080
+exec auto.cfg  自动加载auto.cfg
+fps_max 300  限制fps最大300
```

## 推荐启动项

```
-novid -nojoy -high -d3d9ex -tickrate 128 +exec auto.cfg
```

