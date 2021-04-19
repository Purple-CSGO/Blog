# 前言

Go，又称[Golang](https://golang.org/)，是谷歌在21世纪开发的一种新的编程语言，它静态强类型、从语言层面支持并发（Goroutine）、支持垃圾回收GC。

Go语言有一些笔者很喜欢的特点，譬如跨平台、交叉编译（在某个环境中编译其他平台的程序）、支持并发、语言上做“减法”精简关键字、直接静态编译成单个二进制可执行文件（告别缺少vcruntime.dll的痛苦）。

Go语言像是C++和python的融合，存在着Go语言开发者的一些“固执”，比如花括号`{}`的换行，也有一些缺陷。Go适合写服务器的后端应用，但是用来写带有GUI的应用程序还不是那么成熟，官方原生不支持，故有许多相关GUI库，如：Qt、ui、walk、gio、go-flutter-desktp。经过若干比较之后笔者认为使用Go+wails的方式是大势所趋。

[Wails](https://wails.app/)的思路是使用Web端的技术（html/css/js）作为前端，可以使用js框架如vue和react，后端使用Go语言，前后端交互通过go与js绑定某种方法实现，如此前端便可使用各种成熟的框架，似乎学习web端的技术、Go语言、另一个网页后端的Go语言框架（如Gin）即可打通全栈，想法是好，但是还得一步步学习。

Wails 和 electron 不同，electron是把chromium浏览器内核打包，包括ffmpeg.dll等，体积上非常臃肿，首次启动慢，所占存储空间和内存都偏大，和笔者`体积较小、功能齐全`的理念相悖。wails则是直接调用系统自带浏览器内核，至于内存...有待验证。

经过测试，wails的`hello-world.exe`体积10.2MB、zip压缩包4.3MB、7z压缩3.5MB、UPX压缩后3.93MB，内存占用43.7MB。

接下来笔者会把整个学习的过程记录下来，目前只有[wails的官网](https://wails.app/)可以提供较好的文档，其中也会涉及纯Golang的知识点，因为笔者也在Go语言学习初期。

# 环境搭建

官方文档：https://wails.app/gettingstarted/

>  折腾了很久，最后决定在虚拟机中使用Win10企业版LTS搭建Go+wails的环境，装MacOS出现了兼容问题，linux中也有一些难处、需要大量的时间深入了解linux，故当下选择win10。
>
> 有钱了也组台黑苹果吧，windows最大的问题是它不够优雅。

## 安装Go

 下载对应安装包并安装。[下载地址](https://golang.org/dl/)

## 安装Node

下载安装，如此便有了npm。[下载地址](https://nodejs.org/en/ )

再用如下命令安装cnpm，国内使用的速度提升很大。

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

如有其它web端的依赖请自行安装。

## 安装GCC库

Windows下需要安装GCC库用来编译。[下载地址](https://jmeubank.github.io/tdm-gcc/ )

## 安装Git Bash

可能会用到Git操作Push/Clone，建议安装。[下载地址](https://gitforwindows.org/)

## 安装Docker

官方文档似乎提到Docker在wails交叉编译时会用到。[下载地址](https://www.docker.com/)

## 安装IDE

这里推荐两个IDE/编辑器：微软的VSCode 和 jetbrains的Goland。

各有优劣，这里笔者用的是Goland，学生使用教育邮箱可白嫖，开源项目也可申请。

VSCode：https://code.visualstudio.com/

Goland：https://www.jetbrains.com/go/

IDE的配置略过，注意VSCode可以安装sync插件，把所有配置同步到github gist上，之后到任意机器上安装sync插件粘贴一串代码、登录github即可同步所有插件设置。

## 设置Goproxy

按照[Goproxy](https://goproxy.cn/)官网的说明设置代理：

```
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

## 其他（非必须）

笔者做了一些美化工作，包括安装 `Mactype`、安装Sarasa字体和Firacode字体、使用`NoMeiryoUI`更改全局字体为10pt Sarasa SC，使用百分浏览器并关闭DW，这样字体终于能看了。

## Go语言项目文件结构

GOPATH下共有三个文件夹：bin、pkg、src

- bin存放编译好的程序
- pkg存放编译后生成的各种文件和各种包（代码中import的外部包）
- src存放源代码

一般需要配置GOROOT、GOPATH、GOBIN的环境变量，不过用Goland似乎可以懒一点，因为是虚拟机所以全默认很方便，src文件夹直接发送到桌面快捷方式。

## 测试纯Go语言

可以用Goland创建一个项目，比如命名为`test`，即新建`src/test/main.go`，输入以下内容：

```
package main

import(
	"fmt"
)

func main() {
	fmt.Println("Hello World!")
}
```

在终端，位置`src/test/`处使用命令`go run main.go`，编译和运行第一个Go程序。

使用命令`go build main.go`编译得到可执行程序，运行`main.exe`，结果如下：

```
C:\Users\Purp1e\go\src\test>main.exe
That's Good!
```

## 运行第一个Wails程序

在终端中输入wails，配置一下名字和邮箱。

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200712182308.png)

然后cd到src文件夹，使用`wails init`，有的选项可直接使用ENTER大法xd。

```
C:\Users\Purp1e\go\src>wails init
Wails v1.7.1 - Initialising project

The name of the project (My Project): tutorial
Project Name: tutorial
The output binary name (tutorial):
Output binary Name: tutorial
Project directory name (tutorial): tutorial
Project Directory: tutorial
Please select a template:
  1: Angular - Angular 8 template (Requires node 10.8+)
  2: React JS - Create React App v3 template
  3: Vanilla - A Vanilla HTML/JS template
  4: Vue2/Webpack Basic - A basic Vue2/WebPack4 template
  5: Vuetify1.5/Webpack Basic - A basic Vuetify1.5/Webpack4 template
  6: Vuetify2/Webpack Basic - A basic Vuetify2/Webpack4 template
Please choose an option [1]: 4
Template: Vue2/Webpack Basic
> Generating project...
> Building project (this may take a while)...
Project 'tutorial' built in directory 'tutorial'!
```

项目结构如下图：

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200712182920.png)

其中**frontend**是前端的文件夹，**main.go**中做了前后端的绑定，**appicon.png**是程序的图标。

```
C:\Users\Purp1e\go\src\tutorial>wails -help
 _       __      _ __    
| |     / /___ _(_) /____
| | /| / / __ `/ / / ___/
| |/ |/ / /_/ / / (__  )  v1.7.1
|__/|__/\__,_/_/_/____/   https://wails.app
The lightweight framework for web-like apps

Available commands:

   setup     Setup the Wails environment [default]
   migrate   Migrate projects to latest Wails release
   init      Initialises a new Wails project
   build     Builds your Wails project
   serve     Run your Wails project in bridge mode
   update    Update to newer [pre]releases or specific versions
   issue     Generates an issue in Github

Flags:

  -help
        Get help on the 'wails' command.

```

其中`wails build`是构建项目并生成到`build`文件夹里，`wails serve`则是把项目运行在localhost中，可以热调试。

```
C:\Users\Purp1e\go\src\tutorial>wails build
Wails v1.7.1 - Building Application

> Skipped frontend dependencies (-f to force rebuild)
> Building frontend...
> Ensuring Dependencies are up to date...
> Packing + Compiling project...
Awesome! Project 'tutorial' built!

C:\Users\Purp1e\go\src\tutorial>cd build

C:\Users\Purp1e\go\src\tutorial\build>tutorial.exe
```

运行结果如图：

![](https://gitee.com/Purple-CSGO/Purp1e-Image-Hosting/raw/master/20200712183427.png)

前端热调试方法：

```
wails serve
// 再开另一终端
cd frontend
npm run serve
```

