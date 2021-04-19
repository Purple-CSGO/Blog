---
title: Go+Wails学习笔记（三）Go与Js数据交互
date: 2020-07-30 22:12:56
tags: 
  - GO
  - Wails
published: true
hideInList: false
feature: /post-images/Go-Wails-003.jpg
isTop: false
permalink: /pages/75af77/
sidebar: auto
categories: 
  - Go
---
# 前言

下面会介绍Go+Wails最核心的、最重要的部分——前后端数据交互，即后端的Golang和前端的JavaScript如何交换数据。

笔者通过分析前文提到的通过`wails init`生成的默认`hello-world`项目，和官方Github提供的示例项目[todo](https://github.com/wailsapp/todo)，了解到具体的做法。

> todo项目的某些表达方式和新版本可能不同，以新版本wails的模板为准。

# 项目结构

下面是todo项目的大体结构：

```
todo
  |__ build		//最终程序生成的位置
  |__ frontend	//前端目录
    |__ dist		//前端文件生成的位置
    |__ node_modules	//node模块
    |__ src		//前端源代码
      |__ assets		//前端附件
      |__ components	//前端组件
      | App.vue		//前端vue核心文件
      | main.js
  | main.go		//后端Go的核心文件
  | appicon.png		//应用图标
  | todos.go		//todo项目引出的.go文件
```

本文主要讨论`main.go`、`todos.go`和`App.vue`。

# Wails的Go语言项目组织

todo项目中保持`main.go`基本不变，另起`todos.go`，仍然使用**package main**和导入wails的包，结构体和方法写在这个单独的文件里。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200730213423.png)

首先，定义了一个**首字母大写**的结构体，然后按照如下的格式定义方法，注意方法名**首字母大写**才可被前端访问，类似public，**首字母小写**的方法只能内部调用。

```
func (t *Todos) Method(name string, filename string) error {
	...
}
```

注意上图的结构体定义中的`runtime`和`logger`，todo项目中出现过以如下方式调用：

```
t.runtime.Window.SetTitle(t.filename)
t.runtime.Events.Emit("filemodified")
t.logger.Info("I'm here")
```

runtime可以设置标题等，logger用于写log日志。

----

此外，发现`main.go`中还有一段：

```
myTodoList, err := NewTodos()
if err != nil {
	log.Fatal(err)
}
```

`todos.go`中的定义如下：

```
// NewTodos attempts to create a new Todo list
func NewTodos() (*Todos, error) {
	// Create new Todos instance 新建实例
	result := &Todos{}
	// Return it
	return result, nil
}
```

此处判断了一下实例是否能够成功创建

# Go中数据传向JS

`App.vue` 中 **export default { ... methods: {** 处添加方法，下面是两个示例：

```
getMessage: function() {
  var self = this;
  window.backend.basic().then(result => {
    self.message = result;
  });
}
```

```
loadList: function() {
  window.backend.Todos.LoadList()
    .then(list => {
      try {
        let todos = JSON.parse(list);
        this.loading = true;
        this.todos = todos;
      } catch (e) {
        this.setErrorMessage("Unable to load todo list");
      }
    })
    .catch(error => {
      this.setErrorMessage(error.message);
    });
}
```

可以看到，核心是：

```
window.backend.结构体名.方法名().then(list => { 使用list })
```

# JS中数据传给Go

在go中定义的方法增加参数，如：

```
func (t *Todos) SaveList(todos string) error {
	...
}
```

JS中调用：

```
window.backend.Todos.SaveList(JSON.stringify(todos, null, 2));
```

其中`JSON.stringify(todos, null, 2)`会生成json格式的字符串，具体调用时在Go中即为**todos**参数。

至于多返回值...既然是JavaScript，封装在json格式的字符串中应该是比较推荐的方法。

# 其他

在分析todo项目的时候发现它定义了一个`WailsInit`方法但是没有在其他地方引用它，猜测是重写了Wails初始化的函数。下面附上定义，可见该应用把设置保存在`%USERNAME%`位置的一个json文件中，从而实现打开时自动读取程序设置。

```
func (t *Todos) WailsInit(runtime *wails.Runtime) error {
	t.runtime = runtime
	t.logger = t.runtime.Log.New("Todos")
	t.logger.Info("I'm here")

	// Set the default filename to $HOMEDIR/mylist.json
	homedir, err := runtime.FileSystem.HomeDir()
	if err != nil {
		return err
	}
	t.filename = path.Join(homedir, "mylist.json")
	t.runtime.Window.SetTitle(t.filename)
	t.ensureFileExists()
	return t.startWatcher()
}
```

