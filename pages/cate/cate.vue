<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{height: wh+'px'}" class="scroll-left">
				<view v-for="(item,index) in cateList" :key="index">
					<view :class="['scroll-left-item',index===active?'active':'']" @click="activechange(index)">
						{{item.cat_name}}
					</view>
				</view>

			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{height: wh+'px'}" class="scroll-right" :scroll-top="scrollTop">
				<view class="level2" v-for="(item2,index) in cateLevel2" :key="index">
					<view class="title">
						/{{item2.cat_name}}/
					</view>
					<view class="content">
						<view class="img" v-for="(item3,index) in item2.children" :key="index"
							@click="goGoodsList(item3)">
							<image :src="item3.cat_icon" mode=""></image>
							<text class="">
								{{item3.cat_name}}
							</text>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用高度
				wh: 0,
				cateList: [],
				active: 0,
				cateLevel2: [],
				scrollTop: 0

			};
		},
		methods: {
			async getcateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			activechange(index) {
				this.active = index
				this.cateLevel2 = this.cateList[index].children
				// 
				// 属性值变化时滚动条才会重置，在0和1之间切换
				this.scrollTop = this.scrollTop === 0 ? 0.1 : 0
			},
			goGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			this.getcateList()
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.scroll-left {
			width: 300rpx;

			.scroll-left-item {
				background-color: #f7f7f7;
				line-height: 60px;
				font-size: 12px;
				text-align: center;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						content: '';
						width: 3px;
						height: 30px;
						background-color: #c00000;
						display: block;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.scroll-right {
			background-color: #fff;

			.level2 {
				.title {
					text-align: center;
					font-weight: 700;
					font-size: 24rpx;
					padding: 30rpx 0;
				}

				.content {
					display: flex;
					flex-wrap: wrap;
					text-align: center;
					font-size: 24rpx;

					.img {
						display: flex;
						flex-direction: column;
						justify-content: center;
						width: 33.33%;
						height: 200rpx;
						align-items: center;
						margin-bottom: 20rpx;

						image {
							width: 120rpx;
							height: 120rpx;
						}
					}
				}
			}
		}
	}
</style>
