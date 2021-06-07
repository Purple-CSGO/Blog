---
title: transform scale safari浏览器模糊
date: 2021-04-19 14:29:49
permalink: /pages/115b86/
sidebar: auto
categories:
  - 随笔
tags:
  - 
---
后面加上 `translateZ(0)`
```css
transform: scale(${scale}) translateZ(0);
```

P.S. 好像还是不管用