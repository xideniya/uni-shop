export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null
	}),
	mutations: {
		updateAddress(state, obj) {
			state.address = obj
			this.commit('m_user/saveAddress')
		},
		updateuserinfo(state, obj) {
			state.userinfo = obj
			this.commit('m_user/saveuserinfo')
		},
		updatetoken(state, token) {
			state.token = token
			this.commit('m_user/savetoken')
		},
		updateredirectInfo(state, obj) {
			state.redirectInfo = obj
		},
		saveAddress(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		saveuserinfo(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		savetoken(state) {
			uni.setStorageSync('token', JSON.stringify(state.token))
		}
	},
	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ''
			return `${state.address.provinceName}${state.address.cityName}${state.address.countyName}${state.address.detailInfo}`
		}
	}
}
