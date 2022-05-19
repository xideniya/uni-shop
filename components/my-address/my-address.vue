<template>
	<view>
		<!-- 选择地址按钮 -->
		<view class="address-chose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="address-chose-button" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 地址信息 -->
		<view class="address-info-box" @click="chooseAddress" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话:{{address.telNumber}}
					</view>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
		<image src="../../static/cart_border@2x.png" class="address-border" mode=""></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {

			};
		},
		methods: {
			chooseAddress() {
				uni.chooseAddress({
					success: (res) => {
						this.$store.commit('m_user/updateAddress', res)
					},
					fail: () => {

					}
				})
			}
		},
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addstr'])
		}
	}
</script>

<style lang="scss">
	.address-chose-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90px;
	}

	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	.address-info-box {
		display: flex;
		height: 90px;
		flex-direction: column;
		justify-content: center;
		font-size: 12px;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-left {}

			.row1-right {
				display: flex;
			}
		}

		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}

			.row2-right {}
		}
	}
</style>
