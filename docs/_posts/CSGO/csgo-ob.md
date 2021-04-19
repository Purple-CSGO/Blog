---
title: CSGO观察者OB平滑路径指令制作教程
date: 2020-02-15 18:33:49
tags: 
  - CSGO
  - CFG
published: true
hideInList: false
feature: /post-images/csgo-ob.jfif
isTop: false
permalink: /pages/30a89f/
sidebar: auto
categories: 
  - CSGO
---
# 说明

1. 先使用 `spec_pos` 获取开始和结束位置和角度参数，共5个数字，令其为 a1 b1 c1 d1 e1，a2 b2 c2 d2 e2。

2. 再使用 `spec_goto a1 b1 c1 d1 e1` 移动到开始位置。
3. 使用 `spec_lerpto a2 b2 c2 d2 e2 x y` 镜头开始移动`x`，`y`调整速度，一般相同，默认`5` `5`比较合适，数字越小速度越快。

注：必须在观察者时才有效，镜头移动过程中只能通过空格、数字1~0或者指令 `spec_mode 1` 终止。

# 演示

```
] spec_pos
2055.1 2660.9 189.2 0.7 145.4
] spec_pos 
2426.9 2112.4 213.4 9.5 140.7
] spec_goto 2055.1 2660.9 189.2 0.7 145.4
] spec_lerpto 2426.9 2112.4 213.4 9.5 140.7 5 5
] spec_mode 1
```

# 键位绑定

根据演示里的参数，可以写出按键绑定的指令，这样小键盘`1`即使用这条路径。

```
bind kp_end  "spec_goto 2055.1 2660.9 189.2 0.7 145.4;spec_lerpto 2426.9 2112.4 213.4 9.5 140.7 5 5";
```

再绑定小键盘`0`临时取消路径。

```
bind kp_ins "spec_mode 1";
```

# 参考键位

OB往往需要多条路径，一般推荐把按键绑定在小键盘，以下是相应绑定的模板。

```
bind kp_end	""  	//  1
bind kp_downarrow ""  	//  2
bind kp_pgdn	""	//  3
bind kp_leftarrow	""	//  4
bind kp_5		""     	//  5
bind kp_rightarrow	""	//  6
bind kp_home	""	//  7
bind kp_uparrow	""	//  8
bind kp_pgup	""	//  9
bind kp_ins	""	//  0
bind kp_del	""	//  .
bind kp_slash	""	//  /
bind kp_multiply	""	//  *
bind kp_minus	""	//  -
bind kp_plus	""	//  +
bind kp_enter	""	//  Enter
```

# 引申

搜索发现了这个repo：<https://github.com/FlowingSPDG/CS-GO-Observer-Unity-HUD> 发现可以在OB的时候连接HLAE，这样的话就可以使用HLAE的`mirv_camimport`相关指令导入已经用HLAE设置好的路径信息，并且可以比刚才所说的方法得到更复杂的路径。

# 其它

关于`spec_mode`指令，发现：
- `spec_mode 1` 第一人称
- `spec_mode 5` 锁定玩家的第三人称
- `spec_mode 6` 自由视角的第三人称
