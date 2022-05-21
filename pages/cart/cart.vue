<template>
	<view class="cart-container" v-if="total!==0">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action-item>
					<my-goods :goods="item" :showradio="true" @radio-change="randiochangeHandler" :shownumberbox="true"
						@num-change="numChangeHandler">
					</my-goods>
					<template v-slot:right>
						<view class="slot-button" @click="bindClick(item)">
							<text>删除</text>
						</view>
					</template>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	<view class="empty-box" v-else>
		<image src="../../static/cart_empty@2x.png" mode="" class="empty-image"></image>
		<text class="tips">空空如也</text>
	</view>
</template>

<script>
	import badgemix from '@/mixins/tabbar-badge.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		mixins: [badgemix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		methods: {
			randiochangeHandler(obj) {
				this.$store.commit('m_cart/updatestate', obj)
			},
			numChangeHandler(obj) {
				this.$store.commit('m_cart/updatecount', obj)
			},
			bindClick(item) {
				this.$store.commit('m_cart/removegoods', item.goods_id)
			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.cart-container {

		padding-bottom: 50px;
	}

	.cart-title {
		display: flex;
		align-items: center;
		height: 40px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
		}
	}

	.slot-button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 150rpx;
		background-color: #c00000;
		color: white;
		font-size: 14px;
	}

	.empty-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-image {
			width: 90px;
			height: 90px;
		}

		.tips {
			font-size: 14px;
			color: grey;
			margin-top: 5px;
		}
	}
</style>
