---
title: HLAE+FFMPEG record tutorial
date: 2020-06-06 20:45:32
tags: 
  - CSGO
  - FFMPEG
  - 视频创作
  - HLAE
published: true
hideInList: false
feature: /post-images/hlaeffmpeg-en.png
isTop: false
permalink: /pages/620156/
sidebar: auto
categories: 
  - HLAE
---
> 2019/5/23 HLAE update supports FFMPEG, the official instructions are not very detailed, here will explain in detail how to install FFMPEG and recorded video for HLAE, especially when recording high frame material can save a lot of space.

<!--more-->
> 2020/6/6 some preset names have changed, but most things are still correct.

# Install FFMPEG for HLAE

**Update** HLAE to the latest version so that there is **ffmpeg folder** in the hlae root directory. For those who use CSGO Demoes Manager, the location is as follows (Purp1e is my username)

```
C:\Users\Purp1e\AppData\Local\AkiVer\hlae\ffmpeg
```

**Download** [FFMPEG](https://ffmpeg.zeranoe.com/builds/). Enter the website and click `Download Build`. Then open the .zip file and go to the next level. You can see bin&doc&presets folder and other files. Extract all these files into the **ffmpeg** folder, so that FFMPEG is installed.

{% asset_img 安装ffmpeg.png install-ffmpeg %}

# Recording method

## Basic instructions

For further recording commands, please refer to other tutorials. Here I use the raw stream that I use as an example:

```
Mirv_streams add baseFx raw; 
mirv_streams edit raw record 1; //set raw stream to Record 
host_framerate 300; //record in 300fps
mirv_streams record start;
//...record end
mirv_streams record end;
```

Of course, I definitely don't enter all these commands every time. I have bound hotkeys for these commands. Check my [CFG preset](https://github.com/Purple-CSGO/Cfg-Preset-By-Purp1e/blob/v1.1/hlae.cfg) for details .

**Recording as above**  will get a lossless .tga sequence, which takes 1776MB/s for 1080p300fps, and multiplies if you record multiple streams.

**Use the following commands** after installing FFMPEG:

```
Mirv_streams add baseFx raw; 
mirv_streams edit raw record 1; 
mirv_streams edit raw settings afxFfmpegYuv420p; 
host_framerate 300; 
mirv_streams record start; 
//recording end 
mirv_streams record end;
```

You will get a relatively small video, after testing, a `30s 300fps 1080p`video is about 130MB. Note this command, it records a video of YUV 4:2:0 color space:

```
Mirv_streams edit raw settings afxFfmpegYuv420p;
```

------

If you replace `afxFfmpegYuv420p` with `afxFfmpeg`, you get the YUV 4:4:4 color space video, the quality is higher, but some players goes wrong when playback. Ain't found problems when editing with pr or vegas.

```
Mirv_streams edit raw settings afxFfmpeg;
```

If you record multiple layers at the same time, each layer(stream) needs such an instruction to adjust the recording settings. For me, I prefer to sacrifice a certain amount of space for better video quality.

## Custom FFMPEG recording preset

If the preset `afxFfmpeg` does not satisfy you, please check the demonstration below: 

```
//Define the default 
mirv_streams settings add ffmpeg myFfmpegCrf "-c:v libx264 -preset slow -crf 20 {QUOTE}{AFX_STREAM_PATH}\video.mp4{QUOTE}" 
//Modify the settings of the raw layer 
mirv_streams edit raw settings myFfmpegCrf;
```

What appears between`""` are the recording parameters of x264. It is understood that the x264 can provide better suppression parameters. Generally, you just need to change the value of [CRF](https://zhidao.baidu.com/question/984758498910362019.html). The smaller the value is, the higher file size and slower recording speed you get.

## Replace recording settings of all streams

When setting multiple streams at the same time, multiple commands is needed. The latest version of HLAE supports the following commands to change the recording settings of **all** channels(streams) .

```
Mirv_streams settings edit afxDefault settings afxFfmpeg; //record settings changed to afxFfmpeg
```

# FFMPEG recording CFG and how to share it

## Main explanation

Based on this, I've tested the values of different presets and crf/qp, got a few suitable presets and made [`ffmpeg.cfg`](https://github.com/Purple-CSGO/Cfg-Preset-By-Purp1e/blob/v1.1/ffmpeg.cfg) which is convenient for everyone to use.

`mirv_streams settings...`Custom FFMPEG recording presets, **no modification** , unless you specifically understand the x264 parameters.

[`alias...`](https://purp1e.site/csgo/advancedcommand.html#alias指令)Customize the shortcuts. **no modification** . Use the commands (eg. `qp12`) to change the recording settings of all streams.

`qp12;`(28 line) sets the default recording settings, **automatically use the** qp12 preset after loading ffmpeg.cfg , and **modify as needed** .

`echo...`(>30 line) Output hints in the console. **Modify if you want**.

{% asset_img CFG.png CFG %}

------

Put `ffmpeg.cfg` in your cfg folder and execute your own cfg, then:

```
exec ffmpeg
```

------

{% asset_img 控制台.png hint %}

------

Then follow the prompts, enter the preset command, you can copy directly from the console, if you want to use **qp0** , enter in the console:

```
qp0
```

Then console displays:

```
Record Setting: qp0
```

Do other recording operations (streams, recording framerate) as usual.

## Supplementary explanation

Generally, only `qp12;` appears in 28 line needs to be modified, for example, if you want the default setting is `crf18` , directly change it to `crf18`.

Can be added in the cfg that you use (such as hlae.cfg):

```
exec ffmpeg
```

This will load the settings in ffmpeg.cfg each time you use hlae.cfg. Of course, you can also directly integrate the relevant instructions into your recording cfg.

------

Load your CFG -> load ffmpeg.cfg -> (using preset commands) -> Record setting changed
