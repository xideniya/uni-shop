export default {
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations: {
		addtoCart(state, goods) {
			const findresult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (!findresult) {
				state.cart.push(goods)
			} else {
				// 这里就反应出 find() 方法返回的结果内存指向依然是 cart 所指向的内存地址
				// 所有这里返回的是浅拷贝的数据
				findresult.goods_count++
			}
			// 调用mutations函数
			this.commit('m_cart/savetoStorge')
		},
		//修改商品选中状态
		updatestate(state, obj) {
			const findresult = state.cart.find(x => x.goods_id === obj.goods_id)
			if (findresult) {
				findresult.goods_state = !obj.goods_state
				this.commit('m_cart/savetoStorge')
			}

		},
		// 修改商品数量
		updatecount(state, obj) {
			const findresult = state.cart.find(x => x.goods_id === obj.goods_id)
			if (findresult) {
				findresult.goods_count = obj.goods_count
				this.commit('m_cart/savetoStorge')
			}
		},
		// 删除商品
		removegoods(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/savetoStorge')
		},
		// 全选或全不选商品
		updateallGoodsState(state, val) {
			state.cart.forEach(item => item.goods_state = val)
			this.commit('m_cart/savetoStorge')
		},
		savetoStorge(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},
	getters: {
		// 购物车商品总数
		total(state) {
			let sum = 0
			state.cart.forEach(x => sum = x.goods_count + sum)
			return sum
		},
		// 被选中的商品数量
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state === true).reduce((total, item) =>
				total += item.goods_count, 0)
		},
		// 购物车商品是否被全选
		allChecked(state) {
			return state.cart.every(x => x.goods_state === true)
		},
		// 购物车总价
		totalprice(state) {
			const num = state.cart.filter(x => x.goods_state === true).reduce((total, item) =>
				total = total + item.goods_count * item.goods_price, 0)
			return num.toFixed(2)
		}
	}
}
