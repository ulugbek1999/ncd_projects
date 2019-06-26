import axios from 'axios'

export const customAxios = axios.create({
    baseURL: 'https://ncd-interlingvo.herokuapp.com/api/'
})

// 'https://ncd-interlingvo.herokuapp.com/api/'