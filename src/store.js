import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userData: {
            user_id: null,
            token: null,
            username: null
        },
        requestProcessed: false,
        loading: true
    },
    mutations: {
        tokenSetter (state) {
            try {
                state.userData = VueCookies.get('userData')
            } catch (error) {
                alert(error)
            }
        },
        requestProcessedSetter (state, data) {
            state.requestProcessed = data
        },
        logout (state) {
            state.userData.token = null
            state.userData.userId = null
            state.userData.username = null
            VueCookies.remove('userData')
        }
    },
    actions: {
        setLogoutTimer({commit}, payload) {
            setTimeout(() => {
                commit('logout')
            }, payload.expirationTime - 10000)
        },
        tokenSetter({commit}, payload) {
            if (payload.token) {
                VueCookies.set('userData', payload)
                commit('tokenSetter')               
            }
        },
        requestProcessedSetter({commit}, payload) {
            commit('requestProcessedSetter', payload)
        },
        logoutDispatcher({commit}) {
            commit('logout')
        }
    },
    getters: {
        username (state) {
            if (state.userData.username) {
                return state.userData.username
            }
            else {
                return ""
            }
        },
        requestProcessed (state) {
            return state.requestProcessed
        },
        isAuthenticated (state) {
            return state.userData.token !== null
        },
        beingLoaded (state) {
            return state.loading
        }
    },
    
})