<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import badgemix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgemix],
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['token'])
		}
	}
</script>

<style lang="scss">
	.my-container {

		page,
		.my-container {
			height: 100%;
		}
	}
</style>
