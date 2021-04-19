---
title: Deepin电源管理和开机自动执行指令进入省电模式（CPUPOWER）
date: 2019-07-20 23:09:32
tags: 
  - Deepin
  - Linux
published: true
hideInList: false
feature: /post-images/deepin-power-config.png
isTop: false
permalink: /pages/65b846/
sidebar: auto
categories: 
  - 随笔
---
> 默认情况下使用deepin系统时cpu会以较高主频运行，一般不进行游戏的情况下设置成省电模式更加节能，也能降低散热的压力。deepin没有自带电源管理的按钮/小工具，所以需要动手设置一下。

## 安装cpupower和常用指令

安装cpupower，终端中输入：

```
sudo apt install linux-cpupower
```

cpu设置为节能模式：

```
sudo cpupower frequency-set -g powersave
```

cpu设置为性能模式：

```
sudo cpupower frequency-set -g performance
```

查看当前cpu信息
```
cpupower frequency-info
```

## 设置开机自动执行指令进入省电模式

在/etc目录下以管理员身份打开，创建一个名为`rc.local`的文件：
![管理员身份打开.png](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329230945.png)
注意不是`rc.local.txt`，想要重命名时不隐藏后缀名，需要在设置里调整。

![设置.png](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329230955.png)

![显示扩展名.png](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329231026.png)

确定文件名无误之后，复制以下内容并保存：
```
#!/bin/bash
# rc.local config file created by use

sudo cpupower frequency-set -g powersave

exit 0
```

保存后，还需要赋予该文件可执行权限，在终端里输入：

```
sudo chmod +x /etc/rc.local
```

下次重启时，systemd就会自动执行rc.local里面的命令了。

Tips: 可以在键盘快捷键里设置指令用以调节电源模式

