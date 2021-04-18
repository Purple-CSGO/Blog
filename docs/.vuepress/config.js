const nav = require('./config/nav.js');

module.exports = {
  title: "Purp1eの知识小栈",
  description: 'B站UP主Purple-CSGO，南七技校下院的小生罢了', // 描述,以 <meta> 标签渲染到页面html中
  base: '/', // '/<github仓库名>/'， 默认'/'
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.jpg' }], //favicons，资源放在public文件夹
    ['meta', { name: 'keywords', content: '视频制作,CSGO,集锦,技术博客,前端,vue,js,css,html,c,c++,go,golang,wails,github,b站,bilibili,视频编码'}],
    ['meta', { name: 'theme-color', content: '#11a8cd'}], // 移动浏览器主题颜色
  ],
  markdown: {
    lineNumbers: true // 代码行号
  },
  theme: 'vdoing', // 使用依赖包主题
  // theme: require.resolve('../../theme-vdoing'), // 使用本地主题
  themeConfig: { // 主题配置
    nav,
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: '/img/unstack.png', // 导航栏logo
    repo: 'Purple-CSGO', // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)
    docsDir: 'docs', // 编辑的文件夹
    editLinks: false, // 编辑链接
    editLinkText: '编辑',

    // 以下配置是Vdoing主题改动的和新增的配置
    // category: false, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。
    // tag: false, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。
    // archive: false, // 是否打开归档功能，默认true。 如打开，会做的事情有：1.自动生成归档页面（在@pages文件夹）。如关闭，则反之。
    // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'
    bodyBgImg: [
      'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
      'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
      'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
    ], // body背景大图，默认无。 单张图片 String || 多张图片 Array, 多张图片时每隔15秒换一张。
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],

    sidebar: 'structuring', // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

    sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
    updateBar: { // 最近更新栏
      showToArticle: false, // 显示到文章页底部，默认true
      moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
    },

    author: { // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
      name: 'Purp1e', // 必需
      href: 'https://github.com/Purple-CSGO' // 可选的
    },
    blogger:{ // 博主信息，显示在首页侧边栏
      avatar: '/img/favicon.jpg',
      name: 'Purp1e',
      slogan: '取法于上，仅得为中'
    },
    social:{ // 社交图标，显示于博主信息栏和页脚栏
      // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
      icons: [
        {
          iconClass: 'icon-github',
          title: 'GitHub',
          link: 'https://github.com/Purple-CSGO'
        },
        {
          iconClass: 'icon-bilibili',
          title: 'B站',
          link: 'https://space.bilibili.com/73115492'
        },
        {
          iconClass: 'icon-youjian',
          title: '发邮件',
          link: 'mailto:438518244@qq.com'
        },
        {
          iconClass: 'icon-erji',
          title: '听音乐',
          link: 'https://music.163.com/#/playlist?id=2987896959'
        }
      ]
    },
    footer:{ // 页脚信息
      createYear: 2021, // 博客创建年份
      copyrightInfo: 'Purp1e', // 博客版权信息，支持a标签
    }
  },
  plugins: [ // 插件

    [require('./plugins/love-me'), { // 鼠标点击爱心特效
      color: '#8552a1', // 爱心颜色，默认随机色
      excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
    }],

    'vuepress-plugin-baidu-autopush', // 百度自动推送

    ['one-click-copy', { // 代码块复制按钮
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false // whether to display on the mobile side, default: false.
    }],

    ['demo-block', { // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false // 是否展示为横向样式
      }
    }],

    [
      'vuepress-plugin-zooming', // 放大图片
      {
        selector:'.theme-vdoing-content img:not(.no-zoom)',
        options: {
          bgColor: 'rgba(0,0,0,0.6)'
        },
      },
    ],

    //流程图
    'flowchart',

    //音乐播放器
    [
      'meting', {
        meting: {
          // 网易
          server: "netease",
          // 读取歌单
          type: "playlist",
          mid: "5210980527",
        },
        // 不配置该项的话不会出现全局播放器
        aplayer: {
          // 吸底模式
          fixed: true,
          mini: true,
          // 自动播放
          autoplay: true,
          // 歌曲栏折叠
          listFolded: true,
          // 颜色
          theme: '#f9bcdd',
          // 播放顺序为随机
          order: 'random',
          // 初始音量
          volume: 0.1,
          // 关闭歌词显示
          lrcType: 0
        },
        mobile: {
          // 手机端去掉cover图
          cover: false,
        }
      }
    ],

    [
      'vuepress-plugin-baidu-tongji', // 百度统计
      {
        hm: 'b8991e20297468dad38a1ab91160c01c' //TODO 修改
      }
    ],

    [
      'vuepress-plugin-comment', // 评论
      {
        choosen: 'valine',
        options: {
          el: '#valine-vuepress-comment',
          AppID: 'AovtdDVf8HgeFKQhD0VYYqiq-gzGzoHsz',
          AppKey: 'kQLsVLUG61h3rQEekyAE1zT4',
          path: '<%- frontmatter.commentid || frontmatter.permalink %>',
          placeholder: '你很懂哦~ 不写点什么？',
        }
      }
    ],

    [
      '@vuepress/last-updated', // "上次更新"时间格式
      {
        transformer: (timestamp, lang) => {
          const moment = require('moment') // https://momentjs.com/
          return moment(timestamp).format('YYYY/MM/DD, H:MM:SS');
        }
      }
    ]
  ]
}
