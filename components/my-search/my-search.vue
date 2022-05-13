<template>
	<view class="my-search-container" :style="{backgroundColor: bgcolor}">
		<view class="my-search-box" :style="{borderRadius:radius+'px'}" @click.native="gotoSearch">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		},
		props: {
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 10px;

		.my-search-box {
			display: flex;
			width: 100%;
			height: 36px;
			background-color: #fff;
			justify-content: center;
			align-items: center;
			font-size: 15px;

		}
	}
</style>
