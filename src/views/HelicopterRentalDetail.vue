<template>
  <el-row :gutter="60" v-loading="loading">
    <el-col :span="12">
      <img
        :src="require('../../public/img/detail.png')"
        alt=""
        style="width: 100%;"
      >
    </el-col>
    <el-col :span="12">
      <span class="detail-title">{{ detailData.serverTitle }}</span>
      <el-form
        label-position="left"
        label-width="100px"
        :model="detailForm"
      >
        <el-form-item label="机 型：">
          <el-radio-group
            size="small"
            v-model="detailForm.serverAircraft"
          >
            <el-radio-button :label="detailData.serverAircraft">
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="租赁类型：">
          <el-radio-group
            size="small"
            v-model="detailForm.serverRentType"
          >
            <el-radio-button label="干租"></el-radio-button>
            <el-radio-button label="湿租"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="租赁时长：">
          <el-input
            size="small"
            class="count-input"
            v-model="detailForm.serverDate"
          >
            <el-select
              v-model="detailForm.serverUnit"
              slot="append"
              placeholder="请选择"
            >
              <el-option
                label="小时"
                value="hour"
              ></el-option>
              <el-option
                label="天"
                value="day"
              ></el-option>
              <el-option
                label="月"
                value="month"
              ></el-option>
              <el-option
                label="年"
                value="year"
              ></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="">
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="handleAdvice"> 咨询 </el-button>
        </el-form-item>
        <el-form-item label="详情：">
          <span
            style="white-space: pre-line;">{{ detailData.serverDetail }}</span>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import mixin from '@/utils/mixin.js'
import axiosHttp from '../utils/create-api.js'

export default {
  mixins: [mixin],
  data () {
    return {
      detailData: {},
      detailForm: {
        serverAircraft: '',
        serverRentType: '',
        serverDate: '',
        serverUnit: 'day'
      },
      loading: false
    }
  },
  created () {
    this.loading = true
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
            serverUnitServicesImg = '',
            serverUnitServicesPhone = ''
          } = services
          const {
            serverUnitServicesHelicopterRentalAircraftModel = ''
          } = iServerUnitService

          this.detailData = {
            serverPhone: serverUnitServicesPhone,
            serverTitle: serverUnitServicesTitle,
            serverDetail: serverUnitServicesDetail,
            serverImg: serverUnitServicesImg,
            serverAircraft: serverUnitServicesHelicopterRentalAircraftModel
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
.count-input {
  width: 180px;
}
.count-input .el-select {
  width: 80px;
}
.el-form {
  margin-top: 20px;
}
.el-form-item {
  margin-bottom: 12px;
}
</style>
