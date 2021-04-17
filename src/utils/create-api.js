import axios from 'axios'

export default {
  register (data) {
    return axios.post(
      '/user/register',
      {},
      {
        params: data
      }
    )
  },

  login (data) {
    return axios.post(
      '/user/login',
      {},
      {
        params: data
      }
    )
  },

  getServiceList (params) {
    return axios.get('/user/get/server/home', {
      params
    })
  },

  getServiceType (params) {
    return axios.get('/user/get/server/type', {
      params
    })
  },

  getServiceDetail (params) {
    return axios.get('/user/server/detail', {
      params
    })
  }
}