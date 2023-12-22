---
title: Gridea博客免费部署Coding全过程详解(更换主题-Gitalk-SEO)
date: 2020-02-10 10:05:05
tags: 
  - 博客
  - Gridea
published: true
permalink: /pages/a9f3be/
sidebar: auto
categories: 
  - 博客
author: 
  name: Purp1e
  link: https://github.com/Purple-CSGO
---
# 前言

如果你想要有一个自己的博客网站，选择有很多，直接上传CSDN、简书等社区，但是往往有很多东西不能更改，包括笔者在内的许多人想要有个性、有特色的博客样式，则有Wordpress、Typecho此类动态博客，但是想要成功部署，域名、空间购买、数据库等设置往往存在一些坑，且有一定的经济开销；另有Hexo、Hugo、Jekyll此类静态博客，通常搭建在GitHub、Gitee、Coding等网站，利用静态Pages服务，自带SSL且不需要为服务器和域名付费。

对比之后可知，部署GitHub对国内访问不是很友好，想要被百度的SEO收录需要折腾其他的东西（CDN加速等），Gitee的自动部署、自定义域名服务需要收费，部署Coding国内外的访问速度都尚可（香港服务器），缺点是和腾讯开发者平台、Cloud Studio揉在一起，入口逻辑混乱，加上最近服务升级，之前的文章无法对应上了，好在笔者已经调整好所有设置，请继续往下看。

# Gridea简介

[Gridea](https://gridea.dev/)一个静态博客写作客户端，拥有独立的GUI图形界面，支持多平台Mac/Win/Linux，界面优雅，其中包含标签、菜单、主题、同步等功能的设置，基本告别繁琐的命令行指令，自带Markdown编辑器，支持评论和RSS。

![Gridea界面](https://purp1e.site//post-images/1581302333673.png)

当前，Gridea还处于上升期，主题市场和相关文章较少，这需要每个用户的努力。

# Gridea安装

可以前往官网下载，但是因为GitHub，国内下载速度非常慢，这里做一下分流，也可以加入官方QQ群`923131213`询问下载。

链接：<https://pan.baidu.com/s/1IvhaifxZ_y10Dgwa0gigjw> 提取码：5mgj 

当前为0.9.2测试版，针对Coding最近更新做了适配，如果低于这个版本应该只能用Github部署。

之前需要安装[Git](https://git-scm.com/)工具，根据0.9.2更新详情，应该不需要再安装Git工具。

# 设置Coding

登录<https://coding.net/>，右上角选择`个人版登录`并注册，登录进入右上角`个人设置`，绑定手机。

![个人版登录](https://purp1e.site//post-images/1581303244030.png)

同时设置`访问令牌`，新建访问令牌，起一个易于区分的名字，勾选`project:depot`，点击`创建`，务必妥善保存**访问令牌**代码，令牌只会显示一次，如果丢失则要重新生成。

![新建访问令牌](https://purp1e.site//post-images/1581303534168.png)

记录访问令牌页面显示的**令牌用户名**，部署时要用到。

![令牌用户名](https://purp1e.site//post-images/1581303536431.png)

新建项目，记住项目名，即**仓库名**，进入仓库，勾选`启用README.md文件初始化仓库`，同时注意**仓库用户名**（如图）。

![初始化仓库](https://purp1e.site//post-images/1581304099582.png)

然后选择`构建与部署`-`静态网站`，起名并点击`立即发布静态网站`。

![设置静态网站](https://purp1e.site//post-images/1581303928738.png)

这样就得到了**访问地址**，格式为`http://xxxxx.coding-pages.com`，当前访问会显示404，因为仓库中没有html页面，可以手动新建一个index.html，但是并无影响，成功部署同步之后即可正常访问。

![访问地址](https://purp1e.site//post-images/1581304273899.png)

# 设置Gridea

通过上面的步骤，我们已经得到了：访问地址、 仓库名、分支（默认master）、仓库用户名、邮箱（自用邮箱即可）、令牌用户名和令牌，把它们分别填入Gridea客户端`远程`-`基础配置`-`Coding Pages`对应项目中，注意图示中域名是本博客的域名地址，当前填入你的访问地址即可。

![设置Coding部署](https://purp1e.site//post-images/1581304547506.png)

保存-检测远程连接-同步，同步成功后登陆访问地址即可看到博客了。

# 设置自定义域名和SSL

回到Coding`构建与部署`-`静态网站`，右上角`设置`，找到`自定义域名`，输入你购买的域名并绑定，同时记得打开`强制HTTPS`,

![设置自定义域名](https://purp1e.site//post-images/1581305149569.png)

再前往域名的DNS设置那添加一套CNAME类型记录，记录值即`访问地址`，如果在腾讯云中操作，即在`云解析`中添加。

![添加记录](https://purp1e.site//post-images/1581305386332.png)

等待一段时间后，回到Coding刚才的位置，做SSL证书认证，这样就不会因为没有HTTPS总是弹出烦人警告。

**注意：使用自定义域名后，客户端同步设置也要用该域名，否则图标、侧边栏无法正常显示。**

此处如果认证失败，可能是想做同时GitHub和Coding部署，域名DNS那先暂停分流GitHub的项目，认证成功后再开启即可，注意Gridea客户端给GitHub和Coding共用了一部分数据，双部署会麻烦一些，等待后续版本完善吧。

# 下载更换主题

Gridea客户端中大部分设置的修改都很方便（**一切改动记得保存**），如果不满意自带的主题，进入[主题市场](https://gridea.dev/themes/)，选择想要使用的主题并下载。

这时就有了一个问题，下载速度非常慢，笔者试了改Host，发现并没有什么用，最后选择了Gitee转存下载的方式：

![主题GitHub](https://purp1e.site//post-images/1581305877883.png)

先复制GitHub的clone链接，注册并登录[Gitee](https://gitee.com/)，选择`从GitHub/GitLab导入仓库`，粘贴刚才复制的链接，其它随意。

![Gitee导入GitHub仓库](https://purp1e.site//post-images/1581306059618.png)

下载的时候遇到了问题，下载ZIP总是没速度，到`Gridea/themes`位置打开Git Bash，`git clone .....`时输入邮箱和密码也出了问题，一番搜索后发现，可以这样做：

打开`控制面板`-`用户账户`，选择`管理Windows凭据`，在这里修改凭据，尝试几次后，设置成功。

![用户账户](https://purp1e.site//post-images/1581306605150.png)

![管理Windows凭据](https://purp1e.site//post-images/1581306645460.png)

![设置凭据](https://purp1e.site//post-images/1581306698335.png)

重新到`Gridea/themes`位置，使用`git clone ....`，链接为Gitee克隆的仓库的clone链接，速度非常快，此后再遇到GitHub克隆速度慢，就可以直接这么做了，凭据只用配置一次。

如果读者认为以上步骤麻烦，也可以使用其他方法，或者等5KiB/s的Clone速度。

主题下载完成后，Gridea客户端中就可以切换相应的主题了。

# 设置Gitalk

Gitalk是基于GitHub的issue制作的评论系统，登录GitHub账号即可进行评论，相对为个人博客或其他没有听闻过的评论系统单独注册一次账号，直接登录GitHub（类似QQ快捷登录）显然方便很多，为次，应准备好**一个GitHub账号**，和一个用来存放评论的**GitHub仓库**。

![Gitalk设置页面](https://purp1e.site//post-images/1581307079863.png)

 打开Gitalk的设置页面，发现有这几项要填写，这就要进入GitHub寻找了。

![Settings](https://purp1e.site//post-images/1581307383625.png)

打开`Settings`-`Developer settings`-`Oauth Apps`-`New Oauth Apps`新建授权应用

![Oauth Apps](https://purp1e.site//post-images/1581307681508.png)

如下图所示，**Homepage URL**填网站的网址，如果使用自定义域名，如`https://purp1e.site/`，则使用自定义域名。

![新建授权应用](https://purp1e.site//post-images/1581307915758.png)

创建成功之后得到**Client ID**和**Client Secret**。

![创建成功](https://purp1e.site//post-images/1581308222105.png)

回到Gridea的评论配置，打开`是否显示评论`，**Client ID**和**Client Secret**已得到，**仓库**填GItHub的仓库名（之前托管在GitHub上所以图示中带github.io，实际不一定），**Owner**填GitHub的账户名，注意昵称可能不好使。设置好记得保存。

# 百度和谷歌SEO优化

为了加快百度和谷歌搜索引擎收录博客文章，往往需要手动提交sitemap，Gridea会自动生成站点地图，名为`atom.xml`，提交到对应位置即可。

## 百度sitemap提交

登录注册[百度搜索资源平台](https://ziyuan.baidu.com/)，需要下载熊掌号app实名认证等，比较繁琐。

添加站点，在`数据引入`-`链接提交`-`自动提交`-`sitemap`处提交站点地图，例如~~`https://purp1e.site/atom.xml`。

![百度搜索资源平台](https://purp1e.site//post-images/1581309296894.png)

> 2020/2/17补充：默认生成的atom.xml主要为SSR订阅使用，百度无法抓取，需要手动修改、添加一些文件。

### 自动提交

找到Gridea的文件夹（设置里的站点源文件路径），笔者自定义的路径为`E:/Gridea`，然后找到主题的templates文件夹下的`posts.ejs`，我的位置示例（walker主题）：`E:/Gridea/themes/walker/templates/posts.ejs`。把以下代码放在</body>之前的任意位置即可。

```
 <script>
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>
```

### 手动提交sitemap

参照自动提交的文件位置，在`E:/Gridea/themes/walker/templates/`处创建一个sitemap.ejs，复制以下代码并保存，重新启动Gridea并同步即可得到符合百度要求的sitemap。

```
<%- sitemap() %><%  -%>
<%
function sitemap(){
  let links=''
  site.posts.forEach(function(post){
    links+=post.link+'\n'
}) 
  return links
}%>
```

生成的文件是html文件，以本站点为例，提交sitemap的链接为：

```
https://purp1e.site/sitemap/index.html
```

## 谷歌sitemap提交

登录[谷歌搜索控制台](https://search.google.com/search-console)添加站点，输入`atom.xml`并提交，谷歌的抓取速度很快。

![谷歌搜索控制台](https://purp1e.site//post-images/1581309300773.png)

# 总结

希望能为读者部署Gridea提供借鉴，一起为Gridea的发展做出贡献，客户端它不香么？
