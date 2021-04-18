<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-page-header
            @back="goBack"
            content="项目详情"
            title="返回首页"
          >
          </el-page-header>
        </el-col>
        <el-col :span="6">
          <user-info
            class="user-info"
            @modifyPassword="showPassword = true"
            @modifyEmail="showEmail = true"
          ></user-info>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <component :is="currentComponent"></component>
    </el-main>
    <modify-email-modal :show.sync="showEmail">
    </modify-email-modal>
    <modify-password-modal :show.sync="showPassword">
    </modify-password-modal>
  </el-container>
</template>

<script>
import userInfo from '@/components/userInfo.vue'
import airTourDetail from '@/views/AirTourDetail.vue'
import artificialRainfallDetail from '@/views/ArtificialRainfallDetail.vue'
import charteredAirplaneDetail from '@/views/CharteredAirplaneDetail.vue'
import helicopterRentalDetail from '@/views/HelicopterRentalDetail.vue'
import parachuteFlightDetail from '@/views/ParachuteFlightDetail.vue'
import modifyEmailModal from '@/components/modifyEmailModal.vue'
import modifyPasswordModal from '@/components/modifyPasswordModal.vue'

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
      showEmail: false,
      showPassword: false,
      loading: false
    }
  },
  components: {
    userInfo,
    airTourDetail,
    artificialRainfallDetail,
    charteredAirplaneDetail,
    helicopterRentalDetail,
    parachuteFlightDetail,
    modifyEmailModal,
    modifyPasswordModal
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
  margin: 40px 40px 20px 40px;
  padding: 0px;
}
.el-main {
  padding: 40px;
  padding-top: 0px;
}
.user-info {
  float: right;
}
</style>
