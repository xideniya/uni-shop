<template>
	<view>
		<view class="search-box">
			<uni-search-bar :radius="100" @input="input" cancelButton="none" :focus="true">
			</uni-search-bar>
		</view>
		<!-- 搜索建议 -->
		<view class="sugg-box" v-if="searchResult.length!==0">
			<view class="sugg-item" v-for="(item,index) in searchResult" :key="index"
				@click="gotoGoodsDetail(item.goods_id)">
				<view class="content">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrow-right" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			</view>
			<view class="list">
				<view class="tag-box" v-for="(item,index) in historys" :key="index" @click="gotoGoodList(item)">
					<uni-tag :text="item"></uni-tag>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keyword: '',
				searchResult: [],
				history: []

			};
		},
		computed: {
			historys() {
				// 数组翻转
				return [...this.history].reverse()
			}
		},
		onLoad() {
			// 获取本地存储的搜索关键词
			this.history = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			// 输入防抖处理
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyword = e
					if (this.keyword.trim() === '') return this.searchResult = []
					this.getSearchResult()
				}, 500);
			},
			// 获取搜索结果
			async getSearchResult() {
				const {
					data: res
				} =
				await uni.$http.get(`/api/public/v1/goods/qsearch?query=${this.keyword}`)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
				this.saveSearchHistory()
			},
			// 跳转到商品详情
			gotoGoodsDetail(id) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${id}`
				})
			},
			// 保存搜索记录
			saveSearchHistory() {
				//利用set避免重复，把新的关键词放末尾
				const set = new Set(this.history)
				set.delete(this.keyword)
				set.add(this.keyword)
				this.history = Array.from(set)
				// 持久化存储
				uni.setStorageSync('kw', JSON.stringify(this.history))
			},
			// 清空搜索记录
			clearHistory() {
				this.history = []
				uni.setStorageSync('kw', '[]')
			},
			// 去商品列表页
			gotoGoodList(kw) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?query=${kw}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;

	}

	.sugg-box {
		padding: 0 5px;
		background-color: #fff;

		.sugg-item {
			display: flex;
			font-size: 12px;
			justify-content: space-between;
			margin-bottom: 4px;
			padding: 10px 0;
			border-bottom: 1px solid #ccc;

			.content {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;
		background-color: #fff;

		.title {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			height: 40px;
			align-items: center;
			border-bottom: 1px solid #efefef;
		}

		.list {
			display: flex;

			.tag-box {
				margin: 10px 5px;
			}
		}

	}
</style>
