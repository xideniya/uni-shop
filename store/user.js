export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	mutations: {
		updateAddress(state, obj) {
			state.address = obj
			this.commit('m_user/saveAddress')
		},
		saveAddress(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},
	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ''
			return `${state.address.provinceName}${state.address.cityName}${state.address.countyName}${state.address.detailInfo}`
		}
	}
}
