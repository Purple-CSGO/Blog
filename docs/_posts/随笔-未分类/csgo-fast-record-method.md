---
title: '跑的最快的CSGO高帧率素材的录制方式'
date: 2020-05-24 14:02:33
tags: [CSGO,HLAE]
published: true
hideInList: false
feature: 
isTop: false
---
> 一般为了做变速或使用帧混合/重采样得到运动模糊效果，会录制高帧率素材

# 录制CSGO高帧率素材的方式有两种：

- HLAE通道录制

  1. 有一定上手成本。要设置`mirv_streams`和`host_framerate`，传统方式得到tga无损图片序列，再用VirtualDub2或ffmpeg压制，过程繁琐效率低

  2. 现也可以调用ffmpeg直接录制得到MP4文件，效率有提升，基本不受硬盘速度限制，支持多通道录制，无需担心同步不同层的素材

- 录屏

  慢放demo，录制60fps的素材，再进行处理(解释素材等)等效成高帧率素材，一般使用OBS/ShadowPlay/Bandicam/Relive/Capcura等

# 如今的问题

1. HLAE+FFMPEG录制存在瓶颈，大约60FPS左右，无法充分利用中高端硬件的性能，测试时3700x(8C16T 4.1GHz)占用在50%左右，一般ffmpeg压制视频时几乎都在100%
2. 使用录屏画质往往不理想，ShadowPlay设置50M码率仍然有点糊

# 解决办法 - OBS录屏

经过测试，R7 3700x+GTX1660super，可以稳定录制150FPS，每秒录制150帧，相比较之前的方法录制速度提升超过150%，且画质可控，体积较小

1. 下载[OBS Studio](https://obsproject.com/)并安装

2. 因为录制时参数不适用直播推流，建议新建一个专用的配置文件，比如叫`CSGO录制`

   ![配置文件](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200524123150.png)

3. 设置场景，捕获CSGO，避免录制到桌面的内容

   ![场景设置](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200524123826.png)

4. 打开设置-高级设置，修改颜色格式`I444`，色彩空间`709`，色彩范围`全部`

   ![高级设置](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200524124035.png)

5. 打开设置-视频，调整分辨率，`帧率`选项改成**分数FPS值(帧率)**，这样就可突破120FPS的限制（图中150÷1=150FPS），具体设置成多少要看电脑的配置，我的3700x可以录制150FPS不掉帧，具体要测试

   ![视频设置](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200524124441.png)

6. 在音频中可以设置采样率=48kHz

7. 打开设置-输出，`输出模式`改为`高级`，选择`音频`页面，设置**轨道1**的**音频比特流**为**320**

   ![高级-音频](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200524124837.png)

8. 选择`录像`页面，类型改为**标准**，编码器改为**x264**（Nvenc实测掉帧），码率控制使用**CRF**，CPU使用预设使用**ultrafast**，配置（Profile）使用**high**，CRF建议0~12几乎无损，CRF<17时肉眼无损

   > 对x264比较熟悉的话可以在最后一行自定义参数

   ![录像设置](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200524131902.png)

9. 调整测试8中的CRF和5中FPS，找到当前电脑配置稳定录制不掉帧的配置

   > 建议使用剪辑软件帧混合/重采样处理检查是否真的不掉帧，比如300fps素材60fps序列时大约5帧混合成1帧，因为在测试h264_Nvenc编码时出现了这种问题，x264暂时没有遇到

# CSGO中录制

例如，慢放录制150FPS，等效300FPS素材

- 使用`demo_timescale 0.5`此类指令慢放至`50%`的播放速率，也可在demoui中手动设置

- 限制fps，减少CPU&GPU占用，此处`fps_max 150`，≥录制帧率，可适当增加10~20,

- 设置OBS的开始录制与DEMO播放的键位一致，结束录制与DEMO暂停的键位一致，在游戏中使用热键录制

  > bind PgUp "demo_resume"; bind PgDn "demo_pause"
  >
  > engine_no_focus_sleep 0	//后台不掉帧 No FrameDrop when unfocus

  ![快捷键](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200524125951.png)

# 调整测试

> CRF受限于硬盘速度和录制帧率&分辨率，`CRF<6`时低端机械硬盘可能因为速度不够而掉帧

> FPS和CRF受限于CPU&GPU等，需要测试最稳定的值

1. 打开OBS的统计，录制时切出，关注FPS是否会降低，渲染/编码跳帧是否频繁出现，录制1分钟错过的帧<5大致可以认为稳定，最好0跳帧
2. 固定CRF=6，按照**180fps->150fps->120fps->90fps->60fps**的顺序测试

![测试是否掉帧](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200524130837.png)

3. 无跳帧后查看视频的属性，查看码率，测试时

   ```
   1920*1080 150FPS--50%-->300FPS -CRF 6 -preset ultrafast
   ```

   素材码率50Mbps，等效为300FPS 码率100Mbps的素材，即**7.2GB/Min**，假设集锦共5分钟，需要20分钟素材，大约共占144GB

4. 调整CRF，比如CRF=12时码率大约为=6的一半，144GB->72GB，画质仍然较高，直到=16~17以后才会肉眼有损

# 素材裁切和归档

1. 有时视频素材有部分内容无用，可以使用avidemux进行无损裁切，裁切时选择I帧

2. 注意到录制时为了速度preset选择**ultrafast**，但是preset为`slow~slower`时码率会大幅度降低，所以在**项目完成后可以选择统一压制**，把所有素材交给ffmpeg或x264进行例如`-crf 12 -preset slower`进行高压，替换原素材，原素材舍弃或者统一归档到HDD/NAS中

   > 睡觉前丢去压制，一觉醒来......50% XD

3. 压制测试结果

   ```
   //素材 footage
   1920*1080 150FPS--50%-->300FPS -CRF 6 -preset ultrafast
   
   //压制参数 encode parameters
   [x264] --crf 12 --preset slower --output-csp i444
   [ffmpeg] -crf 12 -preset slower -pix_fmt yuv444p
   
   //[150fps]码率&文件大小变化 bitrate&filesize change
   440Mbps -> 76.4Mbps
   2.56GB -> 450MB
   ```

   文件大小为17%，如果项目原素材144GB，压制后约25GB，而且仍然质量很高、肉眼无损，总体非常可观

   [下载链接 | Download Link](https://c-t.work/s/42a0d42326fb4f)

