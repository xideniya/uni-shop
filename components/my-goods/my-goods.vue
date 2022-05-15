<template>
	<view>
		<view class="goods-item">
			<view class="left">
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
		padding: 10px 5px;
		border-bottom: 1px solid #BDBDBD;

		.left {
			margin-right: 5px;

			.goodslogo {
				display: block;
				width: 100px;
				height: 100px;

			}
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goodsname {
				font-size: 13px;
			}

			.goods-info-box {
				.price {
					color: #c00000;
					font-size: 16px;
				}
			}

		}
	}
</style>
