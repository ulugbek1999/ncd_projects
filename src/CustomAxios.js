import axios from 'axios'

export const customAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

// 'https://ncd-interlingvo.herokuapp.com/api/'