---
title: CSGO控制台与常用指令
date: 2019-05-22 20:48:38
tags: 
  - CSGO
published: true
hideInList: false
feature: /post-images/csgo-console.jfif
isTop: false
permalink: /pages/1a09c8/
sidebar: auto
categories: 
  - CSGO
---
> 这篇文章我会详细的介绍CSGO控制台、指令系统、设置方面的知识，有点晦涩，希望各位能在阅读的过程中时不时昏睡过去( ͡° ͜ʖ ͡°)。
<!--more-->
### 控制台

V社(Valve)的Source起源引擎制作的游戏都可以开发者控制台，简称控制台`console`，使用控制台可以实现很多游戏的设置面板无法提供的功能，比如跳投、切换准星参数、颜色等等特殊功能都是利用了控制台的指令实现的，这也是CS游戏的一大特色了。

### 开启控制台

在游戏的设置菜单里，`游戏设置-游戏-启用开发者控制台`选**是**即可启用控制台，之后按下`~ `即可开关控制台并使用各种指令。开启控制台的指令是`con_enable 1`，看起来是个悖论，等到说CFG时就知道它的用处了。

![开启控制台](https://eeudn8.coding-pages.com//post-images/1581234291585.png)

### 多个控制台指令

当同时需要在控制台使用多个指令时，务必使用分号`;`分隔各个指令。

### 控制台提示

指令输入的过程中控制台会给出提示，大多数情况都会有下拉菜单提示各种指令，可以使用↑↓在下拉菜单中切换，使用Tab键也可以自动填入下拉菜单的第一个指令，比如：

- 显示各种网络参数的指令`net_graph 1`，输入至`net_`时下方第一条指令就是`net_graph`，直接按下`Tab`和`1`即可快速输入这条完整的指令。
- 退出游戏的指令`quit`，原理同上，输入`q`→`Tab`→`回车`，即可实现光速quit（真实）。

不要小看提示，他可以很大程度上纠正拼写问题，有时使用指令/CFG的时候可以试着手动输一遍，过程中提示消失很可能是拼写有误；同样，如果使用hlae录制集锦，输入`mirv`发现没有提示极可能没有正确的使用hlae启动csgo。（不是hale！！）

### 常用控制台指令

#### 账号登录相关

- quit 快速退出游戏，使用心态爆炸，光速quit
- exit 同上，不过没有那么有名
- disconnect 退出服务器到主界面
- retry 重连最近一次加入的房间，比如从休闲、死斗退出之后还想回到刚才的房间可以使用，前提是中途没有重开游戏；5e、b5等平台也可以使用快速重连服务器（小退），重启游戏是大退。

#### 常用指令

- net_graph 1  显示网络参数：ping/var/choke等，0为关闭。
- net_graphpos 1  网络参数的水平位置：1=右  2=中  3=左。
- fps_max 300  设置最大帧数为300，一般会根据当前的帧数表现动态调整，尽可能让FPS波动不超过60以获得较好的观感体验。
- volume 1  主音量大小，0为静音
- sensitivity 0.9  鼠标灵敏度
- map dust2  进入本地离线服务器并加载dust2地图，地图名不必完全一致，如荒漠迷城可以用`map mir`。
- mat_monitorgamma 2.2  亮度，越小越亮[1.6~2.6]
- mat_monitorgamma_tv_enabled "0"  显示模式[1.电视  0.电脑屏幕]
- buy awp  购买武器指令，即购买awp
- give weapon_ak47  获得ak47，常用于跑图
- +right  视角右移，输入-right取消
- +moveright  相当于按下D键，-moveright取消，和+right组成挂机防踢指令

#### cl_相关参数

cl_开头的指令往往和HUD有关，比如雷达、血条、菜单等用于提示玩家的信息。

- cl_autowepswitch 0  关闭自动换上捡起的武器：珍爱生命，远离自动换枪
- cl_autohelp 0  禁用游戏提示（格洛克/法玛斯连发提示）
- cl_showhelp 0  禁用游戏提示
- cl_dm_buyrandomweapons 0  关闭死斗随机买枪，功能同F3键
- cl_draw_hud 0  关闭HUD，得到相对干净的画面，方便截图或者录制视频
- cl_draw_only_deathnotices 0  关闭大部分HUD，保留准星和击杀信息，常用于录制视频和集锦
- cl_drawhud_force_radar -1  强制关闭雷达，但是雷达下方的金钱数无法关闭，1开启雷达

HUD颜色透明度、雷达参数省略，直接在设置中调整即可。

#### 准星参数

- cl_crosshairalpha 255  透明度（0~255）
- cl_crosshairdot 1  准星中间的点，0关闭
- cl_crosshairgap 1  十字准星间距，可以<0
- cl_crosshair_t 0  T型准星，1开启
- cl_crosshairsize 3 准星长度
- cl_crosshairthickness 1 准星厚度
- cl_crosshairstyle 4  准星类型[1.  2.  3.  4.经典静态  5.跑动静止开枪动态]
- cl_crosshair_drawoutline 0 准星黑色外轮廓粗细，0关闭
- cl_crosshaircolor_b "250"
- cl_crosshaircolor_r "0"
- cl_crosshaircolor_g "255"  准星的颜色RGB值

主要是这些参数，小改动使用控制台方便，更全面的调整请在创意工坊**Crashz crosshair generator**中调整。

#### 持枪视角参数

- viewmodel_presetpos 2  持枪视角预设[1.默认  2.写实  3.经典]
- viewmodel_recoil 0  取消开枪枪口向上跳动，1开启时跳动幅度很大
- viewmodel_offset_x "1.1"
- viewmodel_offset_y "-1.8"
- viewmodel_offset_z "0.2"  XYZ轴的参数
- viewmodel_fov "54"  视角的FOV（视野大小）
- cl_bobcycle "0.98"  手臂摆动幅度

主要浏览一下这些参数，可以在创意工坊**Crashz viewmodel generator**中调整。

#### sv_相关参数

sv是server的简写，一般在主机创建房间的时候使用，跑图常用。

- sv_cheats 1  开启作弊模式，有的指令官匹会影响平衡，跑图时记得开启
- sv_infinite_ammo 1  无限子弹 [1.无限子弹  2.无限弹夹数  0.关闭]
- sv_showimpacts  1  显示弹着点，0关闭
- sv_showimpacts_time 15  弹着点时间，单位秒
- sv_grenade_trajectory 1  显示投掷物轨迹，0关闭
- sv_grenade_trajectory_time 15  投掷物轨迹显示时间
- sv_grenade_trajectory_thickness 0.5  轨迹线厚度

#### bot相关指令

- bot_kick  踢掉BOT
- bot_stop 1  BOT静止
- bot_crouch 1  BOT蹲下
- bot_add  添加BOT
- bot_kill  杀死BOT
- bot_place  放置BOT

#### mp_相关指令

- mp_warmup_end  热身结束
- mp_restartgame 1  重新开始游戏 
- mp_freezetime 1  回合开始静止1s
- mp_round_restart_delay 2  回合结束后等待时间2s
- god  无敌，gods是所有人无敌

篇幅限制只挑了较为常用的指令，更多指令可以[登录这个网站](https://tools.dathost.net/csgo-commands)，或[V社官方指令清单](https://developer.valvesoftware.com/wiki/Console_Command_List)搜索查找。

-- -

下面的文章会讲述进阶指令、启动项和Config|CFG相关内容。
