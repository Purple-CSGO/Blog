---
title: AMD主板设置解决间歇性爆音
date: 2021-04-19 14:29:49
permalink: /pages/07c2da/
sidebar: auto
categories: 
  - 随笔
tags: 
  - null
author: 
  name: Purp1e
  link: https://github.com/Purple-CSGO
---
> 引用评论 from https://www.chiphell.com/forum.php?mod=viewthread&tid=2278263&mobile=no

SOC电压降下来，降到1.125v以内  
调节IO VDDG，和CDD VDDG两个电压. , 尝试0.97V 或者1.04V这两个电压.  
看看能不能开机，会不会爆音. VDDG这个电压很重要，慢慢微调下。  
  
都不行，就是FCLK稳不了，只能降FCLK.
