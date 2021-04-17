<template>
  <el-row :gutter="40">
    <el-col :span="12">
      <img
        :src="require('../../public/img/detail.png')"
        alt=""
      >
    </el-col>
    <el-col :span="12">
      <span class="detail-title">{{ detailData.serverUnitServicesTitle }}</span>
      <el-form
        label-position="left"
        label-width="100px"
      >
        <el-form-item
          label="游览地点："
          prop="usersAccountAccount"
        >
          <el-radio-group
            size="small"
            v-model="detailData.serverUnitServicesAirTourSightseeingPlaces"
          >
            <el-radio-button
              :label="detailData.serverUnitServicesAirTourSightseeingPlaces"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="游览时长："
          prop="usersAccountPassword"
        >
          <el-radio-group
            size="small"
            v-model="detailData.serverUnitServicesAirTourDuration"
          >
            <el-radio-button
              :label="detailData.serverUnitServicesAirTourDuration"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="机 型："
          prop="usersAccountPasswordRepeat"
        >
          <el-radio-group
            size="small"
            v-model="detailData.serverUnitServicesAirTourAircraftModel"
          >
            <el-radio-button
              :label="detailData.serverUnitServicesAirTourAircraftModel"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="人 数："
          prop="usersAccountEmail"
        >
          <el-input
            size="small"
            v-model="detailData"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="预定时间："
          prop="usersEssentialInformationName"
        >
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label=""
          prop="usersEssentialInformationIdNumber"
        >
        </el-form-item>
        <el-form-item>
          <el-button> 咨询 </el-button>
        </el-form-item>
        <el-form-item
          label="详情："
          prop="usersEssentialInformationCompany"
        >
          <span style="white-space: pre-line;">{{ detailData.serverUnitServicesDetail }}</span>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axiosHttp from '../utils/create-api.js'

export default {
  name: 'airTourDetail',
  data () {
    return {
      detailData: {},
      loading: false
    }
  },
  created () {
    const { serverId = '' } = this.$route.query || {}
    if (serverId === '') {
      return
    }

    const params = { serverId }

    axiosHttp
      .getServiceDetail(params)
      .then(res => {
        this.loading = false

        const { code = null, data = {} } = (res && res.data) || {}
        if (code === 200) {
          const { iServerUnitService = {}, services = {} } = data
          const {
            serverUnitServicesTitle = '',
            serverUnitServicesDetail = '',
            serverUnitServicesImg = ''
          } = services
          const {
            serverUnitServicesAirTourSightseeingPlaces = '',
            serverUnitServicesAirTourDuration = '',
            serverUnitServicesAirTourAircraftModel = ''
          } = iServerUnitService

          this.detailData = {
            serverUnitServicesTitle,
            serverUnitServicesDetail,
            serverUnitServicesImg,
            serverUnitServicesAirTourSightseeingPlaces,
            serverUnitServicesAirTourDuration,
            serverUnitServicesAirTourAircraftModel
          }
        }
      })
      .catch(() => {
        this.loading = false
      })
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
.detail-title {
  font-size: 24px;
  font-weight: bold;
}
</style>
