<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="#c00000" :checked="allChecked" @click="radiohandler" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{totalprice}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				seconds: 3,
				timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'allChecked', 'totalprice']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			...mapState('m_cart', ['cart'])
		},
		methods: {
			// 点击全选
			radiohandler() {
				this.$store.commit('m_cart/updateallGoodsState', !this.allChecked)
			},
			// 点击结算按钮
			settlement() {
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				if (!this.addstr) return uni.$showMsg('请选择收货地址')
				if (!this.token) {
					this.delaynavgate()
				}
				this.payOrder()
			},
			// 展示倒计时的提示消息
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: `请登录后再结算，${n}秒之后自动跳转到登录页`,
					mask: true,
					duration: 1500
				})
			},
			// 支付订单
			async payOrder() {
				// 创建订单
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter((x) => {
						x.goods_state
					}).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200) return uni.$showMsg('创建订单失败')
				const ordernumber = res.message.order_number
				// 订单预支付
				const {
					data: res2
				} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: ordernumber
				})
				if (res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败')
				const payInfo = res2.message.pay
				// 微信支付
				const [err, succ] = await uni.requestPayment(payInfo)
				if (err) return uni.$showMsg('订单未支付')
				// 检查订单支付状态
				const {
					data: res3
				} = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
					order_number: ordernumber
				})
				if (res3.meta.status !== 200) return uni.$showMsg('订单未支付')
				uni.showToast({
					icon: 'success',
					title: '支付成功'
				})

			},
			// 延时导航到my页面
			delaynavgate() {
				this.showTips(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.$store.commit('m_user/updateredirectInfo', {
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						this.seconds = 3
						// 不执行后面展示0秒语句
						return
					}
					this.showTips(this.seconds)
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		box-sizing: border-box;
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		height: 50px;
		width: 100%;
		background-color: white;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
			}
		}

		.btn-settle {
			background-color: #c00000;
			color: #fff;
			min-width: 100px;
			height: 100%;
			line-height: 50px;
			text-align: center;

		}
	}
</style>
