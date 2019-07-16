import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import { customAxios } from './CustomAxios'
import router from './router/index'

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
        admin: {
            adminToken: null,
            courseUnits: null,
            courseDetails: null,
            mode: null,
            editData: null
        },
        lessonModalOpened: false,
        requestProcessed: false,
        loading: true,
        loadingEnglishFile: true,
        englishFile: null,
        loadingProfile: true,
        colorsets: ['rgb(64, 36, 224)', '#dfb313', 'rgb(73, 223, 19)'],
        colorSetIndex: 0,
        modelInfo: {
            name: 'Model',
            color: "rgb(73, 223, 19)"
        },
        courses: null,
        baseStaticUrl: 'https://ncd-interlingvo.herokuapp.com/static/'
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
        },
        modelInfoSetter (state, data) {
            state.modelInfo = data
        },
        englishFileSetter (state, data) {
            state.englishFile = data
        },
        adminTokenSetter (state, data) {
            state.admin.adminToken = data
        },
        autoLogout (state) {
            state.adminToken = null
            router.push({name: 'administer'})
        },
        coursesSetter (state, data) {
            state.courses = data
        },
        courseUnitsSetter (state, data) {
            state.admin.courseUnits = data
        },
        courseDetailsSetter (state, data) {
            state.admin.courseDetails = data
        },
        editDataSetter (state, data) {
            state.admin.editData = data
        },
        mode (state, data) {
            state.admin.mode = data
        }
    },
    actions: {
        reloginTimer({commit, dispatch}, expirationTime) {
            setInterval(() => {
                this.state.userData = null
                dispatch('relogin')
            }, 3600000 - 10000)
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
        },
        modelInfoDispatcher ({commit}, payload) {
            commit('modelInfoSetter', payload)
        },
        englishFileDispatcher ({commit}, payload) {
            commit('englishFileSetter', payload)
        },
        adminTokenDispatcher ({commit, dispatch}, payload) {
            commit('adminTokenSetter', payload)
            dispatch('autoLogoutAdmin')
        },
        autoLogoutAdmin ({commit}) {
            setTimeout(() => {
                commit('autoLogout')
            }, 3600000 - 10000)
        },
        coursesDispatcher ({commit}, payload) {
            commit('coursesSetter', payload)
        },
        courseUnitsDispatcher ({commit}, payload) {
            commit('courseUnitsSetter', payload)
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
        loadingEnglishFile (state) {
            return state.loadingEnglishFile
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
        },
        getUserId (state) {
            return state.userData.user_id
        },
        colorsetReturner (state) {
            return state.colorsets
        },
        modelInfoGetter (state) {
            return state.modelInfo
        },
        isAdminUser (state) {
            return state.admin.adminToken
        },
        courses (state) {
            return state.courses
        },
        courseUnits (state) {
            return state.admin.courseUnits
        },
        courseDetails (state) {
            return state.admin.courseDetails
        },
        editDataGetter (state) {
            return state.admin.editData
        },
        modeGetter (state) {
            return state.admin.mode
        }
    },
    
})