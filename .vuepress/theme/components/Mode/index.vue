<template>
	<div v-click-outside="hideMenu" class="color-picker" v-if="$themeConfig.modePicker !== false" >
		<a class="color-button" @click.prevent="showMenu = !showMenu">
      <reco-icon icon="reco-color" />
		</a>
		<ModuleTransition :transform=" ['translate(-50%, 0)', 'translate(-50%, -10px)']">
			<div v-show="showMenu" class="color-picker-menu">
				<ModePicker />
			</div>
		</ModuleTransition>
	</div>
</template>

<script>
import { RecoIcon, ModuleTransition } from '@vuepress-reco/core/lib/components'
import ClickOutside from 'vue-click-outside'
import ModePicker from './ModePicker'
import applyMode from './applyMode'

export default {
  name: 'UserSettings',

  directives: {
    'click-outside': ClickOutside
  },

  components: {
    ModePicker,
    RecoIcon,
    ModuleTransition
  },

  data () {
    return {
      showMenu: false
    }
  },

  // 为了在保证 modePicker 在 SSR 中正确开关，并实现管理，Mode 组件将负责 modePicker 关闭的情况
  mounted () {
    // modePicker 关闭时默认使用主题设置的模式
    const themeMode = this.$themeConfig.mode || 'auto'
    const { modePicker } = this.$themeConfig
    if (modePicker === false) {
      // 为 'auto' 模式设置监听器
      if (themeMode === 'auto') {
        window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
          applyMode(themeMode)
        })
        window.matchMedia('(prefers-color-scheme: light)').addListener(() => {
          applyMode(themeMode)
        })
      }
      applyMode(themeMode)
    }

    // TODO: 引导箭头js
    const ifJanchor = document.getElementById("JanchorDown");
    ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);
    let a = document.createElement('a');
    a.id = 'JanchorDown';
    a.className = 'anchor-down';
    document.getElementsByClassName('hero')[0].append(a);
    let targetA = document.getElementById("JanchorDown");
    targetA.addEventListener('click', e => { // 添加点击事件
      const windowH = document.getElementsByClassName('hero')[0].clientHeight; // 获取窗口高度
      document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置
    })
  },

  methods: {
    hideMenu () {
      this.showMenu = false
    }
  }
}
</script>

<style lang="stylus">
.color-picker {
	position: relative;
	margin-right: 1em;
  cursor pointer;
	.color-button {
		align-items: center;
		height: 100%;
		.iconfont {
			font-size 1.4rem
			color: $accentColor
		}
	}

	.color-picker-menu {
		position: absolute;
		top: 40px;
		left: 50%;
		z-index: 150;

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}
	}
}

@media (max-width: $MQMobile) {
	.color-picker {
		margin-right: 1rem;
		.color-picker-menu {
			left: calc(50% - 35px);
			&::before {
				left: calc(50% + 35px);
			}
		}
	}
}
</style>

<style>
/*TODO: 引导箭头css*/
.anchor-down {
  display: block;
  width: 20px;
  height: 20px;
  font-size: 34px;
  text-align: center;
  animation: bounce-in 5s 3s infinite;
  position: absolute;
  left: 50%;
  bottom: 10%;
  margin: 12rem auto 0 -10px;
  cursor: pointer;
}
@-webkit-keyframes bounce-in{
  0%{transform:translateY(0)}
  20%{transform:translateY(0)}
  50%{transform:translateY(-20px)}
  80%{transform:translateY(0)}
  to{transform:translateY(0)}
}
.anchor-down::before {
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-right: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(135deg);
  position: absolute;
  bottom: 10px;
}
.anchor-down::after {
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-right: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(135deg);
}
</style>
