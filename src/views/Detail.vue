<template>
  <el-container>
    <el-header>
      <el-page-header
        @back="goBack"
        content="项目详情"
        title="返回首页"
      >
      </el-page-header>
    </el-header>
    <el-main>
      <component :is="currentComponent"></component>
    </el-main>
  </el-container>
</template>

<script>
import airTourDetail from '@/views/AirTourDetail.vue'
import artificialRainfallDetail from '@/views/ArtificialRainfallDetail.vue'
import charteredAirplaneDetail from '@/views/CharteredAirplaneDetail.vue'
import helicopterRentalDetail from '@/views/HelicopterRentalDetail.vue'
import parachuteFlightDetail from '@/views/ParachuteFlightDetail.vue'

const typeMapped = {
  空中游览: 'airTourDetail',
  包机飞行: 'charteredAirplaneDetail',
  人工增雨: 'artificialRainfallDetail',
  跳伞飞行: 'parachuteFlightDetail',
  直升机出租: 'helicopterRentalDetail'
}

export default {
  name: 'frontPage',
  data () {
    return {
      detailData: {},
      loading: false
    }
  },
  components: {
    airTourDetail,
    artificialRainfallDetail,
    charteredAirplaneDetail,
    helicopterRentalDetail,
    parachuteFlightDetail
  },
  computed: {
    currentComponent () {
      const { serviceType = '' } = this.$route.query || {}
      return typeMapped[serviceType] || 'AirTourDetail'
    }
  },
  methods: {
    goBack () {
      const { type = '' } = this.$route.query || {}

      if (type === '') {
        this.$router.push('/home')
        return
      }
      this.$router.push({
        path: '/home',
        query: { type }
      })
    }
  }
}
</script>

<style scoped>
.el-header {
  margin: 40px;
  padding: 0px;
}
.el-main {
  padding: 40px;
  padding-top: 0px;
}
</style>
