---
title: 'HLAE搭配FFMPEG录制教程'
date: 2019-06-11 14:34:24
tags: [CSGO,HLAE,FFMPEG,CFG,视频创作]
published: true
hideInList: false
feature: /post-images/hlae-ffmpeg.png
isTop: false
---
> 2019/5/23 HLAE更新支持了FFMPEG，官方给出的说明并不是很详细，这里会详细地介绍如何为HLAE安装FFMPEG和录制视频，尤其在录制高帧素材时可以省去很多空间。
<!--more-->
# 为HLAE安装FFMPEG

第一步，更新HLAE至最新版本，这样，hlae根目录下会多出一个ffmpeg文件夹。对于使用**CSGO Demoes Manager**下载的hlae，其位置如下（Purp1e是我的用户名）

```
C:\Users\Purp1e\AppData\Local\AkiVer\hlae\ffmpeg
```

第二步，下载[FFMPEG](https://ffmpeg.zeranoe.com/builds/)，进入网站直接点击`Download Build`下载即可。下载之后打开压缩包，进入下一级，可以看到bin/doc/presets等文件，把这些文件全部解压到刚才的ffmpeg文件夹中，这样FFMPEG就安装完成了。

![安装ffmpeg](https://purp1e.top/post-images/1581236382535.png)

# 录制方法

## 基础指令说明

分层录制的方法、指令请参考其它教程，这里只用我经常使用的raw层举例：

```
mirv_streams record name "C:\hlae"		//更改录制路径 [修改]
mirv_streams add baseFx raw;
mirv_streams edit raw record 1;	//开启raw通道的录制
host_framerate 300;	//录制帧率300fps
mirv_streams record start;
//...录制结束
mirv_streams record end;
```

当然我肯定不是每次都输入一遍指令，这些指令我都绑定了按键，详情见我的[CFG预设](https://github.com/Purple-CSGO/Cfg-Preset-By-Purp1e/blob/master/hlae.cfg)。

这样直接录制得到的是无损的tga图片序列，大概一分钟104GB，如果录制多个层还要翻倍。在安装了FFMPEG之后应该这样录制：

```
mirv_streams record name "C:\hlae"
mirv_streams add baseFx raw;
mirv_streams edit raw record 1;
mirv_streams edit raw settings afxFfmpegYuv420p;
host_framerate 300;
mirv_streams record start;
//录制结束
mirv_streams record end;
```

这样录制会得到一个比较小的视频，经过测试，一个`30s 300fps 1080p`的视频大约130MB。注意这个指令，使用它时录制得到的是 YUV 4:2:0 色彩空间的视频：

```
mirv_streams edit raw settings afxFfmpegYuv420p;
```

-- -----

如果把`afxFfmpegYuv420p`替换成`afxFfmpeg`，则得到的是 YUV 4:4:4 色彩空间的视频，质量更高，但是一般的播放器播放时异常，VLC等播放器不会出现异常，剪辑时正常：

```
mirv_streams edit raw settings afxFfmpeg;
```

使用哪一种取决于你个人的喜好，如果同时录制多层，每个层(stream)都要使用这样一条指令调整录制设置。对我来说，我更希望牺牲一定的空间换取更好的视频画质，想要这样做就得调整FFMPEG压制参数。

## 自定义FFMPEG录制预设

如果上面给出的预设`afxFfmpeg`的效果不能让你满意，请参照下面演示自定义CRF=20的预设和使用的过程：

```
//定义预设
mirv_streams settings add ffmpeg myFfmpegCrf "-c:v libx264 -preset slow -crf 20 {QUOTE}{AFX_STREAM_PATH}\video.mp4{QUOTE}"
//修改raw层的设置
mirv_streams edit raw settings myFfmpegCrf;
```

引号`""`里的参数就是x264的录制参数了，懂得x264的大佬可以提供更好的压制参数，一般为了调整画质和码率，只用修改[CRF](https://zhidao.baidu.com/question/984758498910362019.html)的值，即修改`-crf 20`这里的数字，数字越小质量越高，文件体积越大，录制速度越慢。

## 更换录制设置

同时使用多个通道时修改录制设置比较麻烦，最新版本的HLAE支持如下指令，更改所有通道的录制设置。

```
mirv_streams settings edit afxDefault settings afxFfmpeg;	//录制设置改为afxFfmpeg
```

# FFMPEG录制CFG及使用方法分享

## 主要说明

在此基础之上我测试了不同的preset和crf/qp的值，得到了几档合适的预设并做成了[`ffmpeg.cfg`](https://github.com/Purple-CSGO/Cfg-Preset-By-Purp1e/blob/master/ffmpeg.cfg)方便大家使用。

`mirv_streams settings...`自定义FFMPEG录制预设，**不用修改**，除非你特别了解x264的参数。

[`alias...`](https://purp1e.top/csgo-console2/#alias%E6%8C%87%E4%BB%A4)自定义快捷指令，**不用修改**，使用指令（如qp12）可以为所有的通道更换录制设置。

`qp12;`（28行）设定默认录制设置，在加载ffmpeg.cfg之后**自动使用**qp12预设，**根据需要修改**。

`echo...`（30行之后）在控制台中输出提示，**根据需要修改**。

![CFG](https://purp1e.top/post-images/1581236399130.png)
-- ---

把`ffmpeg.cfg`置于cfg文件夹中，游戏中加载自己的cfg之后：

```
exec ffmpeg
```

-- --

![控制台提示](https://purp1e.top/post-images/1581236414257.png)

-- -

再根据提示，输入预设指令，可以直接从控制台复制，如果要使用**qp0**，控制台中输入：

```
qp0
```

控制台显示：

```
Record Setting: qp0
```

其它录制相关的操作（包括通道，录制帧率的设置）不变。

## 补充说明

一般整个cfg文件只有第28行的 `qp12;` 需要修改，比如你想要默认的设置是`crf18`，直接修改成`crf18`即可。

可以在你正录制使用的cfg（如hlae.cfg）中添加：

```
exec ffmpeg
```

这样每次使用hlae.cfg时也会加载这里的设置。当然也可以直接把相关指令整合到你的录制cfg中。

-- --

加载你的CFG -> 加载ffmpeg.cfg -> (使用预设指令) -> 录制方式修改完成