<template>
  <div class="main">
    <content-Item
      :title="title"
      :list="list"
    ></content-Item>
  </div>
</template>

<script>
import _ from 'lodash'
import contentItem from '@/components/content.vue'
import axiosHttp from '../utils/create-api.js'

export default {
  name: 'artificialRainfall',
  components: {
    contentItem
  },
  data () {
    return {
      title: '人工增雨',
      list: [],
      loading: false
    }
  },
  created () {
    const params = { type: this.title }

    axiosHttp
      .getServiceType(params)
      .then(res => {
        const { code = null, data = [] } = (res && res.data) || {}

        if (code === 200) {
          this.list = this.handleData(data)
        }
      })
      .catch(() => {})
  },
  methods: {
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
