---
title: GO语言并发 信号量 WaitGroup
date: 2021-04-19 14:29:49
permalink: /pages/e54c65/
sidebar: auto
categories: 
  - 随笔
tags: 
  - null
author: 
  name: Purp1e
  link: https://github.com/Purple-CSGO
---
## WaitGroup使用

```go
//新建WaitGroup变量
var wg sync.WaitGroup  

wg.Add(1)  
go func() {  
     defer wg.Done()  
     //任务1...
 
}()  

wg.Add(1)  
go func() {  
     defer wg.Done()  
     //任务2...
  
}()  

//等待wg归0
wg.Wait()
```