---
title: Qt中QuaZip的编译和使用踩坑
date: 2020-01-30 23:20:37
tags: 
  - Qt
published: true
hideInList: false
feature: /post-images/qt-QuaZip-compile.png
isTop: false
permalink: /pages/d08f03/
sidebar: auto
categories: 
  - Qt
author: 
  name: Purp1e
  link: https://github.com/Purple-CSGO
---
> 在使用Qt 5.14.0 + VS2017环境下使用QuaZip时主要参考了这篇文章[https://www.cnblogs.com/qiyawei/p/10695192.html](https://www.cnblogs.com/qiyawei/p/10695192.html)，但还是有一些细节需要补充，同时分享出在此环境下编译出的lib和dll，这样就不用手动编译了（其他环境不保证可以）。

# QuaZip所需文件分享(Qt 5.14.0 + VS2017 + 64bit debug&realease)

百度网盘：链接：[https://pan.baidu.com/s/1CvpGHYoLjV3DsT6ndp_fTw](https://pan.baidu.com/s/1CvpGHYoLjV3DsT6ndp_fTw) 提取码：xhvl
微云：链接：[https://share.weiyun.com/5y8ZkBW](https://share.weiyun.com/5y8ZkBW) 密码：prh6x6

# 注意事项

1. 要对qt中quazip项目编译两次（debug + release），得到quazip.lib/dll和quazipd.lib/dll，调整好32/64位构建设置，最好把路径设置在quazip-..文件夹下的如`debug` `release`的文件夹，以免出现不明问题。

2. 编译操作和通常的不同，要先`构建`子项目，再`qmake`主项目

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329232101.png)

3. 为使用quazip库的项目添加外部库时，要把quazip.lib&quazipd.lib放在项目文件夹合适位置，选择库文件quazip.lib，一定勾选`为debug版本添加'd'作为后缀`，这样在release的时候不会出现问题，如：`debug_heap.cpp line 904` 报错。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329232118.png)

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329232127.png)

正确添加quazip库后项目.pro文件里应该下面这一段，注意添加`INCLUDEPATH += $$[QT_INSTALL_HEADERS]/QtZlib`否则可能会报错。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200329232135.png)

4. 要把quazip的所有`.h` `.cpp`文件放到项目文件夹中，比如`./lib/`，所以在include头文件时需添加：

```
#include "lib/JlCompress.h"
```

5. 调用方法

```
  //压缩
  JlCompress::compressDir(zipPath + zipName, Path);
  //解压缩
  JlCompress::extractDir(zipFilePath, TargetPath);
```

6. 待补充：静态编译Qt项目时会不会出现问题？
