---
title: Markdown基本语法教程和编辑器选择
date: 2019-05-12 11:13:32
tags: 
  - Markdown
published: true
hideInList: false
feature: /post-images/markdown.jfif
isTop: false
permalink: /pages/936d2e/
sidebar: auto
categories: 
  - 随笔
author: 
  name: Purp1e
  link: https://github.com/Purple-CSGO
---
>初学Markdown，简单总结一下语法和编辑器的选择。
<!--more-->
## Markdown是什么？

[Markdown](http://www.markdown.cn/) 是一种是一种**轻量级**的标记语言，它以纯文本形式编写文档，并最终以HTML格式发布。它易读、易写、易更改，兼容HTML，跨平台，常在Blog中使用，现在很多电子邮件中也使用了Markdown。

## Markdown编辑器如何选？

这取决于用什么系统，用何种方式编辑，比较推荐能够分屏实时预览的编辑器，“所见即所得”没有代码感，一般会不习惯：

**多平台**

- [Typora](https://typora.io/) 简洁强大，不支持分屏实时预览，但可以通过`Ctrl+/`切换视图，并且在预览模式下**有很多小惊喜**。不论是快捷键还是交互体验都做的非常好，**强力推荐**。不过有个小缺点：在源代码视图中没法打开文件视图窗口。

- [Atom ](https://atom.io/) 较为美观方便 ~~（除了图标）~~ ，按下Ctrl+Shift+M可以**分屏实时预览**显示效果。Atom可以用于各种代码，交互尚可，可以扩展中文菜单等（竟然可以找到V社起源游戏`.cfg`文件的高亮扩展包）。
  &nbsp;
  **Windows**

- [Markdownpad](http://markdownpad.com/) 笔者同学正在使用的编辑器，支持**分屏实时预览**，交互尚可。
  &nbsp;
  **Mac**

- [Mou](http://25.io/mou/) 界面简洁美观，支持**分屏实时预览**。其他的编辑器也不少。
  &nbsp;
  **Linux**

- [Remarkable](https://remarkableapp.github.io) 它是一个卓越且功能齐全的 Markdown 编辑器，为用户提供了一些令人激动的特性
  &nbsp;
  **在线编辑**

- [dillinger](https://dillinger.io/) 漂亮强大，分屏实时预览，支持md, html, pdf 文件导出。支持dropbox, onedrive, github. 来自国外，可能不够稳定。


## Markdown基本语法教程

### 一、标题

1) 使用1~6个`#`，空格分隔。√

```
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```

2) 使用2个以上连续`=`或`-`

```
一级标题
===
二级标题
--
```

### 二、段落

- 使用1个以上`>`，可嵌套

```
> 区块引用
>> 嵌套引用
>>> 三嵌套引用
>>>> 四嵌套引用
```

### 三、分割线

- 3个以上 `*`、`-`、`_` ，可以不连续，建议使用不连续减号`-- -` ，**避免被识别成标题**。

```
---
- - -
***
* * *
___
_ _ _
```

- 显示效果：

-- -

### 四、斜体、粗体和删除线

1) 斜体：使用一对`*`括起来

```
*斜体*
```

- 显示效果：

>    *斜体*

2) 粗体：使用一对`**`或`__`括起来

```
**粗体**  __粗体__
```

- 显示效果：

>    **粗体**  __粗体__

3) 删除线：使用一对`~~`括起来，注意用空格分隔，否则编辑器中后面的内容无法高亮。

```
~~WDNMD~~
```

- 显示效果：

>~~WDNMD~~

### 五、列表

1) 无序列表：行首或段落首使用`+`或`-`，空格分隔。建议使用`-`。

```
+ 第一行
- 第二行
```

- 显示效果：

>+ 第一行
>
>- 第二行

2) 有序列表：数字+`.` 空格分隔正文。

```
1. Line 1
2. Line 2
```

- 显示效果：

>1. Line 1
>2. Line 2


### 六、代码框

1) 小代码块：一对` ``

```
`Code`
```

2) 单行代码框: 4个以上`空格`或2次以上`Tab`

```
        Code
```

3) 多行代码框：在2)基础上衍生，或使用一对3~个以上` ``。使用`空格`生成的框可能为矩形（非圆角矩形）

`````

```

Code Line 1
Code Line 2

```

`````

- 显示效果：

```
Code Line 1
Code Line 2
```

### 七、链接

- 参考代码：

```
[GitHub](http://github.com)
自动生成连接 <http://www.github.com/>
```

- 显示效果：

>[GitHub](http://github.com)

>自动生成连接 <http://www.github.com/>

### 八、图片

- 参考链接代码，之前加上`!`。Blog分享图片需要使用一些工具比如图床，Github也可以但是加载较慢，这里分享一个免费的图床 [链接](https://www.hualigs.cn/) :

```
![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif)
```

- 显示效果：

  ![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif)

### 九、表格

- 若干`-`表示分割线，左侧`:`表示左对齐，右侧表示右对齐，两侧均有表示居中。行与列用`|`分隔。参考代码：

```
| Header One     | Header Two     |
| :------------- | :------------- |
| Item One       | Item Two       |
```

- 显示效果：

| Header One | Header Two |
| :--------- | :--------- |
| Item One   | Item Two   |

-- -

## 心得

- 很多编译器会设置快键键或者关联词，比如在Atom中输入`c`会弹出`code`，此时按下`Tab`或者`Enter`即可快速得到相应符号。

- 可以收集整理一遍Markdown的语法，过程中就可以熟悉并较为熟练掌握这些语法、符号等。

- 很多格式之间需要多空一行否则会被前者的格式覆盖。