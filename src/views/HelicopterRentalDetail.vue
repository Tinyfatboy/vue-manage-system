<template>
  <el-row :gutter="54">
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
          label="机 型："
          prop="usersAccountAccount"
        >
          <el-radio-group
            size="small"
            v-model="detailData.serverUnitServicesHelicopterRentalAircraftModel"
          >
            <el-radio-button
              :label="detailData.serverUnitServicesHelicopterRentalAircraftModel"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="租赁类型："
          prop="usersAccountPasswordRepeat"
        >
          <el-radio-group
            size="small"
            v-model="detailData"
          >
            <el-radio-button label="干租"></el-radio-button>
            <el-radio-button label="湿租"></el-radio-button>
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
          <span
            style="white-space: pre-line;">{{ detailData.serverUnitServicesDetail }}</span>
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
            serverUnitServicesHelicopterRentalAircraftModel = ''
          } = iServerUnitService

          this.detailData = {
            serverUnitServicesTitle,
            serverUnitServicesDetail,
            serverUnitServicesImg,
            serverUnitServicesHelicopterRentalAircraftModel
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
.el-form {
  font-size: 14px;
}
.detail-title {
  font-size: 24px;
  font-weight: bold;
}
</style>
