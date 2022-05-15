<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
		<view class="foot" v-if="isshowfoot">
			已经到底了
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryobj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isloading: false,
				isshowfoot: false
			};
		},
		onLoad(options) {
			this.queryobj.cid = options.cid || ''
			this.queryobj.query = options.query || ''
			this.getGoodList()
		},
		methods: {
			async getGoodList(cb) {
				this.isloading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryobj)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				this.isloading = false
				cb && cb()
			},
			gotoDetail(good) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${good.goods_id}`
				})
			}
		},
		onReachBottom() {
			if (this.isloading === true) return
			if (this.queryobj.pagenum >= this.total / this.pagesize) {
				return this.isshowfoot = true
			}
			this.queryobj.pagenum += 1
			this.getGoodList()
		},
		onPullDownRefresh() {
			this.queryobj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			this.getGoodList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	.goods-list {
		background-color: #fff;
	}

	.foot {
		text-align: center;
		padding: 10px 0;
		font-size: 12px;
	}
</style>
