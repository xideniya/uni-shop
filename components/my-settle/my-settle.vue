<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="#c00000" :checked="allChecked" @click="radiohandler" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{totalprice}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'allChecked', 'totalprice'])
		},
		methods: {
			radiohandler() {
				this.$store.commit('m_cart/updateallGoodsState', !this.allChecked)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		box-sizing: border-box;
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		height: 50px;
		width: 100%;
		background-color: white;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
			}
		}

		.btn-settle {
			background-color: #c00000;
			color: #fff;
			min-width: 100px;
			height: 100%;
			line-height: 50px;
			text-align: center;

		}
	}
</style>
