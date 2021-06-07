---
title: python mongodb 一次查询获得多个_id匹配的结果
date: 2021-04-19 14:29:49
permalink: /pages/ee82e4/
sidebar: auto
categories:
  - 随笔
tags:
  - 
---
```
result = col.find({'_id': ids})
```