---
title: CSGO控制台进阶指令
date: 2019-05-23 19:37:28
tags: 
  - CSGO
published: true
hideInList: false
feature: /post-images/csgo-console2.jfif
isTop: false
permalink: /pages/e7afd3/
sidebar: auto
categories: 
  - CSGO
author: 
  name: Purp1e
  link: https://github.com/Purple-CSGO
---
> 上次的文章讲解了控制台的用法和基础的常用指令，这次介绍几个进阶的指令及用法，希望能够有效提升诸位的睡眠质量( ͡° ͜ʖ ͡°)。

<!--more-->

## bind指令

```
bind x "...";
```

该指令的格式如上，x为绑定的按键名，`...`是绑定的指令，可以是一条也可以是多条指令用分号`;`分开，填入引号`" "`，当指令是没有间隔的单独指令时引号`;可以省略，其他情况不可省，如`+speed`可省略，`sensitivity 1`和多个指令不省略。多个指令例子如下：

```
bind shift "+speed;r_cleardecals";
```

`+speed`是静步的指令，`r_cleardecals`是清楚血迹的指令，绑定了shift键。这条指令执行之后，在按下shift键静步的同时清除血迹。

bind指令还有一种用法，用来查看某个按键已经绑定的指令：

```
bind x
```

输入之后控制台会显示已经绑定的指令，可以检查有没有正确的绑定按键。

## unbind指令

清除已绑定的键位，比如已经绑定了x键，想要取消：

```
unbind x
```

```
unbindall	//取消所有按键绑定
```

```
unbindallmousekeyboard//取消所有键鼠的绑定
```

[CSGO指令搜索](https://tools.dathost.net/csgo-commands)

[V社官方指令清单](https://developer.valvesoftware.com/wiki/Console_Command_List)

[默认键位的指令](https://github.com/Purple-CSGO/Cfg-Preset-By-Purp1e/blob/master/bind_default.cfg)

## bindtoggle和toggle指令

有的指令比如`cl_drawhud 1`即打开HUD，修改数字得到`cl_drawhud 0`，即关闭HUD。实际这种指令往往在两个不同的值之间切换，那么使用bindtoggle和toggle就可以写出非常简单的一键切换的指令：

```
bindtoggle x cl_drawhud;
```

```
bind x "toggle cl_drawhud";
```

这两种写法都可以实现x键切换HUD开关。

但是后者`toggle`的应用更广，可以触发切换更多的指令，比如：

```
bind x "toggle volume";
```

可以写成：

```
bind x "toggle volume 0 1";
```

但是实际上音量不仅有0、1两种情况，可以是0/1之间的小数，同样有的指令的值可以大于1，这时候用第二种写法就可以任意地切换。

```
bind x "toggle volume 1 0.5";	//一键切换音量100%/50%
```

## alias指令

bind指令可以给某个键绑定指令，而alias指令则可以自定义指令。有了alias之后，可以实现CSGO中很多特殊的功能，有兴趣可以了解一下[一键高亮击杀](https://purple-csgo.github.io/hlae/hlae-focus.html)的指令解释。

```
alias func "...;...";
```

执行这条指令之后，在**关闭CSGO游戏之前**，使用`func`指令就相当于执行""中所有的指令，可以直接在控制台中使用：

```
func
```

也可以绑定到某个按键上，按键触发：

```
bind x func;
```

一定注意alias指令是临时生效的，重启游戏就要重新输入，解决办法是写成CFG并启用自动加载。

-- --

alias指令强大之处在于，它可以嵌套定义：

```
alias f f_on;
alias f_on "alias f f_off;...";
alias f_off "alias f f_on;...";
bind x f;
```

这样就实现一个开关式的功能：

- 一开始，按键**x**代表执行`f`，即`f_on`。
- 按下按键**x**，实际执行`f_on`，由于也执行了`alias f f_of;`，之后执行`f`相当于执行`f_off`
- 再按下按键**x**，实际执行`f_off`，由于也执行了`alias f f_on;`，之后执行`f`相当于执行`f_on`
- 往复在两个档位间切换

`...`处可以放入各种指令，已经可以实现很多的功能了，下面给出跳投的指令：

```
bind Capslock +jumpthrow;	// "Capslock"键跳投 可修改
alias +jumpthrow "+jump;-attack";
alias -jumpthrow -jump;
```

如果理解了刚才说的内容，这段指令应该可以理解，这里补充的是：`+指令`、`-指令`代表按下/松开按键时触发，按下Capslock键执行`+jump;-attack`，也就是跳投，松开Capslock键执行`-jump`，防止不停地跳。

-- --

下一篇文章介绍Config和相关指令，敬请期待~
