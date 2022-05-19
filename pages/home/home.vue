<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			class="swiper-box">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src" mode="" class="swiper-image"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="navlist">
			<view v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" mode="" class="navitem"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
				<view class="floor-image-box">
					<navigator class="left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width:item.product_list[0].image_width+'rpx'}"></image>
					</navigator>
					<view class="right">
						<navigator class="right-item" v-for="(item2,i) in item.product_list" :key="i" v-if="i!==0"
							:url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+'rpx'}">
							</image>
						</navigator>

					</view>

				</view>

			</view>

		</view>

	</view>
</template>

<script>
	import badgemix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgemix],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getfloorList()
		},
		methods: {
			//跳转到搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			// 获取轮播图数据
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = res.message
			},
			// 获取导航列表
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navList = res.message
			},
			// 点击分类导航
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			//获取楼层数据
			async getfloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				res.message.forEach((floor) => {
					floor.product_list.forEach((item) => {
						item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0%;
		z-index: 999;
	}

	.swiper-box {
		height: 330rpx;

		.swiper-item,
		.swiper-image {
			width: 100%;
			height: 100%;
		}
	}

	.navlist {
		display: flex;
		justify-content: space-around;
		padding: 30rpx 0;

		.navitem {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-list {
		.floor-title {
			width: 100%;
			height: 60rpx;
		}

		.floor-image-box {
			display: flex;
			padding-left: 10rpx;

			.right {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
		}

	}
</style>
