import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import { customAxios } from './CustomAxios'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userData: {
            user_id: null,
            token: null,
            username: null
        },
        userDetail: {
            email: null,
            first_name: null,
            last_name: null,
            user_information: {
                gender: null,
                date_of_birth: null,
                country: null,
                city: null,
                bio: null,
                owner: null
            }
        },
        lessonModalOpened: false,
        requestProcessed: false,
        loading: true,
        loadingProfile: true
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
        },
        userInformationSetter (state, data) {
            state.userDetail = data
        },
        lessonCloseOpen (state, data) {
            state.lessonModalOpened = data
        }
    },
    actions: {
        reloginTimer({commit, dispatch}, expirationTime) {
            setInterval(() => {
                dispatch('relogin')
            }, expirationTime - 10000)
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
        },
        relogin({commit, dispatch}) {
            const token = VueCookies.get('userData').token
            customAxios.post('token/refresh/', {"token": token})
                .then(response => {
                    if (response.data.token && response.status === 200) {
                        const user_id = VueCookies.get('userData').user_id
                        const token = response.data.token
                        const username = VueCookies.get('userData').username
                        dispatch('tokenSetter', {user_id: user_id, token: token, username: username})
                        return true
                    }
                })
                .catch (error => {
                    console.log(error)
                })
        },
        userInformationDispatcher ({commit}, payload) {
            commit('userInformationSetter', payload)
        },
        lessonCloseOpenDispatcher ({commit}, payload) {
            commit('lessonCloseOpen', payload)
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
        },
        loadingProfile (state) {
            return state.loadingProfile
        },
        fullName (state) {
            if (state.userDetail.first_name && state.userDetail.last_name) {
                return state.userDetail.first_name + " " + state.userDetail.last_name
            }
            else if (state.userData.first_name) {
                return state.userData.first_name
            }
            else if (state.userData.last_name) {
                return state.userData.last_name
            }
            else {
                return "Mysterious Stranger"
            }
        },
        lessonModalOpened (state) {
            return state.lessonModalOpened
        }
    },
    
})