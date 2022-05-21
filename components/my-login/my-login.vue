<template>
	<view class="my-login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="login-button" @click="getUserProfile">一键登录</button>
		<text class="login-tips">登录后尽享更多权益</text>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			// 获取微信用户个人信息
			getUserProfile() {
				uni.getUserProfile({
					desc: '用户登录',
					success: (e) => {
						this.$store.commit('m_user/updateuserinfo', e)
						this.geToken(e)
					},
					fail: () => {}
				})
			},
			geToken(info) {
				// 获取code对应的值
				uni.login({
					success: async (res) => {
						if (res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
						const query = {
							code: res.code,
							encryptedData: info.encryptedData,
							iv: info.iv,
							rawData: info.rawData,
							signature: info.signature
						}
						const {
							data: loginresult
						} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
						// if (loginresult.meta.code !== 200) return uni.$showMsg('登录失败')
						this.$store.commit('m_user/updatetoken',
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o'
							)
						this.redirectHandler()
					},
					fail: () => {
						uni.$showMsg('登录失败')
					}
				})

			},
			// 登录后跳转到购物车
			redirectHandler() {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from
					})
					this.$store.commit('m_user/updateredirectInfo', null)
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-login-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 750rpx;
	}

	.login-button {
		width: 80%;
		border-radius: 100px;
		margin: 10px 0;
		background-color: #c00000 !important;
	}

	.login-tips {
		font-size: 12px;
		color: grey;
	}
</style>
