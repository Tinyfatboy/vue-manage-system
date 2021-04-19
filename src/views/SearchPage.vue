<template>
  <div
    class="main"
    v-loading="loading"
  >
    <content-Item
      title="搜索内容"
      :list="list"
    ></content-Item>
  </div>
</template>

<script>
import _ from 'lodash'
import contentItem from '@/components/content.vue'
import axiosHttp from '../utils/create-api.js'

export default {
  name: 'airTour',
  components: {
    contentItem
  },
  data () {
    return {
      title: '空中游览',
      list: [],
      loading: false
    }
  },
  created () {},
  methods: {
    getService (param) {
      this.loading = true
      const params = {
        param: param || '空'
      }

      axiosHttp
        .searchService(params)
        .then(res => {
          this.loading = false
          const { code = null, data = [] } = (res && res.data) || {}

          if (code === 200) {
            this.list = this.handleData(data)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleData (list) {
      return _.map(list, item => {
        const { company = {}, services = {} } = item
        const {
          serverUnitServicesId = '',
          serverUnitServicesTitle = '',
          serverUnitServicesImg = '',
          serverUnitServicesType = ''
        } = services
        const { serverUnitCompanyName = '' } = company
        return {
          serverUnitServicesId,
          serverUnitServicesTitle,
          serverUnitServicesImg,
          serverUnitServicesType,
          serverUnitCompanyName
        }
      })
    }
  }
}
</script>

<style scoped>
.el-carousel img {
  width: 100%;
}
</style>
