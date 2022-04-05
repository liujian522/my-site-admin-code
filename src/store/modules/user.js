import { login, getInfo } from '@/api/user'
import { removeToken, } from '@/utils/auth'

const getDefaultState = () => {
    return {
        user: null,
    }
}

const state = getDefaultState()

const mutations = {
    SET_USER: (state, user) => {
        state.user = user
    },
    RESET_STATE: (state) => {
        state.user = null
    }
}

const getters = {
    user(state) {
        return state.user
    },

}
const actions = {
    // 登录
    login({
        commit
    }, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(response => {
                const { data } = response
                if (data) {
                    resolve(data)
                    commit('SET_USER', data)
                        // console.log(state.user);
                } else {
                    reject(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const { data } = response
                if (!data) {
                    const { msg } = JSON.parse(response)
                    return reject(msg)
                }
                commit('SET_USER', data)
                resolve(data)
            })
        })
    },

    // // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            removeToken() // must remove  token  first
                // resetRouter()
            commit('RESET_STATE')
            resolve()
        })
    },

    // // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}