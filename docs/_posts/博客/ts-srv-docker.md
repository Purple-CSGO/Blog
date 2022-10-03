---
title: TeamSpeak服务器搭建——基于Docker-Compose
date: 2022-10-3 16:01:44
tags: 
  - docker
  - teamspeak
published: true
permalink: /pages/ts-srv-docker/
sidebar: auto
categories: 
  - 博客
---

## 服务器选择

- 腾讯云/阿里云等轻量云服务器
- 优先选择学生优惠和香港服务器
- 系统镜像优先选择 CentOS+Docker 已经配置好的镜像

## 环境配置

确认服务器已经安装 Docker 和 Docker-Compose

```bash
docker -v
docker-compose -v
```

如能正常显示版本号，下面这一步**直接跳过**，否则要手动安装，这里以 `CentOS 7` 为例安装：

> 搜索 `系统名 安装 docker compose` 有很多现成文档

```bash
# 安装yum-utils
yum install -y yum-utils

# 配置yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装docker-ce
yum install -y docker-ce

# 设置开机启动服务
systemctl enable docker

# 启动服务
systemctl start docker

# 2.安装docker-compose

# 安装epel源
yum install -y epel-release

# 安装docker-compose，如果没有python3会安装python3
yum install -y docker-compose
```

## 配置 TeamSpeak

找到合适的目录新建目录 `ts` 并切换

> 个人习惯所有 docker 配置统一放在根目录 `/data` 下，具体位置没有强制要求，但是每组配置都应放在一个单独的文件夹下

```bash
mkdir /data/ts  # 创建目录
cd /data/ts     # 切换当前目录
```

新建 `docker-compose.yml` 文件，粘贴以下内容并保存，文件内容如下（[官方镜像](https://hub.docker.com/_/teamspeak)）：

```yml
# docker-compose.yml

version: '3.1'
services:
  teamspeak:
    image: teamspeak
    restart: always
    ports:
      - 9987:9987/udp # 语音服务
      - 30033:30033   # 文件传输
      - 41144:41144   # DNS域名解析（可选）
      - 10011:10011   # 服务器查询 raw（可选）
      # - 10022:10022   # 服务器查询 SSH（可选）
      # - 10080:10080   # 网络请求 http（可选）
      # - 10443:10443   # 网络请求 https（可选）
    volumes:
      - ./data:/var/ts3server
    environment:
      TS3SERVER_DB_PLUGIN: ts3db_mariadb
      TS3SERVER_DB_SQLCREATEPATH: create_mariadb
      TS3SERVER_DB_HOST: db
      TS3SERVER_DB_USER: root
      TS3SERVER_DB_PASSWORD: password # 数据库密码
      TS3SERVER_DB_NAME: teamspeak
      TS3SERVER_DB_WAITUNTILREADY: 30
      TS3SERVER_LICENSE: accept
  db:
    image: mariadb
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password  # 数据库密码
      MYSQL_DATABASE: teamspeak
    volumes:
      - ./data/mysql:/var/lib/mysql  # 必需，否则重启镜像后数据丢失
```

服务器上要使用 `vi/vim/nano` 编辑文件，如果没有，CentOS 系统使用 `yum install nano` 类似的指令安装

```bash
# [新建文件]
vi docker-compose.yml
# 或
vim docker-compose.yml
# 或
nano docker-compose.yml

# [粘贴] ctrl+v 或 ctrl+shift+v 或 shift+insert

# [保存] vi/vim: ESC :wq Enter

# [保存] nano: ctrl+x
```

## 开放规则

云服务器的防火墙设置页添加如下入站规则：

- 9987  UDP
- 30033 TCP
- 41144 TCP
- 10011 TCP

[ts官方的端口说明](https://support.teamspeak.com/hc/en-us/articles/360002712257-Which-ports-does-the-TeamSpeak-3-server-use)

## 域名解析

1. 添加一条A类型的规则，指向服务器ip地址。此处 `ts -> xxx.xxx.xxx.xxx` 即解析域名 `ts.upup.cool`。

2. 添加一条SRV类型的规则，如图所示：

![域名解析](https://fastly.jsdelivr.net/gh/Purple-CSGO/img-bed/img/teamspeak-dns-域名解析.png)
