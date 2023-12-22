---
title: Qt调用控制台CMD命令总结(C++)
date: 2020-01-18 22:52:46
tags: 
  - Qt
published: true
hideInList: false
feature: /post-images/qt-cmd.png
isTop: false
permalink: /pages/eeb7bc/
sidebar: auto
categories: 
  - Qt
author: 
  name: Purp1e
  link: https://github.com/Purple-CSGO
---
# 头文件包含

```
#include <QProcess>
```
# 示例代码

```
QProcess p;
QString command = "git --help";
p.start(command);
p.waitForStarted();
p.closeWriteChannel();  //关闭写通道 ，解决未响应问题
p.waitForFinished();
QString OutMsg = QString::fromLocal8Bit(p.readAllStandardOutput());
QString ErrMsg = QString::fromLocal8Bit(p.readAllStandardError());
```

-- --

假如调用ui中的outArea和errArea显示两个流的字符串（如果有setText方法）

```
ui->outArea->setText(OutMsg);
ui->errArea->setText(ErrMsg);
```
