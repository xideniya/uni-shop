<template>
	<view>
		<view class="goods-item">
			<view class="left">
				<radio :checked="goods.goods_state" color="#c00000" v-if="showradio" @click="radiohandller">
				</radio>
				<image :src="goods.goods_small_logo||defaultPic" mode="" class="goodslogo"></image>
			</view>
			<view class="right">
				<view class="goodsname">
					{{goods.goods_name}}
				</view>
				<view class="goods-info-box">
					<view class="price">
						￥{{goods.goods_price|tofixed}}
					</view>
					<uni-number-box @change="numberChange" :min="1" :value="goods.goods_count" v-if="shownumberbox">
					</uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		props: {
			goods: {
				type: Object,
				default: () => {
					return {}
				}
			},
			showradio: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			shownumberbox: {
				type: Boolean,
				default: () => {
					return false
				}

			}
		},
		methods: {
			radiohandller() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: this.goods.goods_state
				})
			},
			numberChange(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		},
		// 过滤器 价格加两位小数
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		width: 750rpx;
		box-sizing: border-box;
		padding: 10px 5px;
		border-bottom: 1px solid #BDBDBD;

		.left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 5px;

			.goodslogo {
				display: block;
				width: 100px;
				height: 100px;

			}
		}

		.right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goodsname {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.price {
					color: #c00000;
					font-size: 16px;
				}
			}

		}
	}
</style>
