import {
	mapGetters
} from 'vuex'
export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	onShow() {
		this.setBadge()
	},
	watch: {
		total: {
			handler() {
				this.setBadge()
			},
			immediate: true
		}
	},
	methods: {
		// 设置购物车右上角图标
		setBadge() {
			if (this.total !== 0) {
				uni.setTabBarBadge({
					index: 2,
					// 数字转化为字符串
					text: this.total + ''
				})
			} else {
				uni.hideTabBarRedDot({
					index: 2
				})
			}

		}
	}
}
