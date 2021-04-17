<template>
  <div class="main">
    <div class="slider">
      <el-carousel
        trigger="click"
        :interval="interval"
      >
        <el-carousel-item
          v-for="(item, index) in sliderList"
          :key="index"
        >
          <img
            :src="item.url"
            alt=""
          >
        </el-carousel-item>
      </el-carousel>
    </div>
    <content-Item
      :title="'空中游览'"
      :list="airTour"
    ></content-Item>
    <content-Item
      :title="'包机飞行'"
      :list="charteredAirplane"
    ></content-Item>
    <content-Item
      :title="'人工增雨'"
      :list="artificialRainfall"
    ></content-Item>
    <content-Item
      :title="'跳伞飞行'"
      :list="parachuteFlight"
    ></content-Item>
    <content-Item
      :title="'直升机出租'"
      :list="helicopterRental"
    ></content-Item>
  </div>
</template>

<script>
import _ from 'lodash'
import contentItem from '@/components/content.vue'
import axiosHttp from '../utils/create-api.js'

export default {
  name: 'frontPage',
  components: {
    contentItem
  },
  data () {
    return {
      sliderList: [
        { url: require('../../public/img/slider1.png') },
        { url: require('../../public/img/slider2.png') },
        { url: require('../../public/img/slider3.png') },
        { url: require('../../public/img/slider4.png') }
      ],
      airTour: [],
      artificialRainfall: [],
      charteredAirplane: [],
      helicopterRental: [],
      parachuteFlight: [],
      interval: 5000,
      loading: false
    }
  },
  created () {
    const params = { limit: 6 }

    axiosHttp
      .getServiceList(params)
      .then(res => {
        const { code = null, data = {} } = (res && res.data) || {}

        if (code === 200) {
          const {
            airTour,
            artificialRainfall,
            charteredAirplane,
            helicopterRental,
            parachuteFlight
          } = data
          this.airTour = this.handleData(airTour)
          this.artificialRainfall = this.handleData(artificialRainfall)
          this.charteredAirplane = this.handleData(charteredAirplane)
          this.helicopterRental = this.handleData(helicopterRental)
          this.parachuteFlight = this.handleData(parachuteFlight)
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

<style scoped>
.el-carousel img {
  width: 100%;
}
</style>
