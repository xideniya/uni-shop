<template>
	<!-- 防止页面闪烁 -->
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" mode="" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goodsinfo-box">
			<view class="price">
				￥{{goods_info.goods_price}}
			</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<view class="goods-collect">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递，免运费
			</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		watch: {
			// 监听购物车商品数量变化
			total: {
				handler(newVal) {
					const option = this.options.find(x => x.text === '购物车')
					if (option) {
						option.info = newVal
					}
				},
				immediate: true
			}
		},
		computed: {
			...mapState('m_cart', []),
			...mapGetters('m_cart', ['total'])
		},
		methods: {
			...mapMutations('m_cart', ['addtoCart']),
			async getGoodsInfo(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				// g为全局替换 ios设备对webp兼容性差
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,
					'<img style="display:block;"').replace(/webp/g, 'jpg')
				this.goods_info = res.message
			},
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}
					this.addtoCart(goods)
				}
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsInfo(goods_id)

		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		padding-bottom: 50px;
	}

	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goodsinfo-box {
		padding: 10px 0 10px 10px;
		background-color: #fff;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
			font-weight: 600;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 13px;
			}

			.goods-collect {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 120px;
				font-size: 12px;
				border-left: 1px solid #efefef;
				color: grey;
			}
		}

		.yf {
			font-size: 12px;
			margin: 10px 0;
			color: grey;
		}
	}

	.goods-nav {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>
