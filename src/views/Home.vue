<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button-group>
              <el-button @click="goTo('frontPage')">首页</el-button>
              <el-button @click="goTo('airTour')">空中游览</el-button>
              <el-button @click="goTo('charteredAirplane')">包机飞行</el-button>
              <el-button @click="goTo('artificialRainfall')">人工增雨</el-button>
              <el-button @click="goTo('parachuteFlight')">跳伞飞行</el-button>
              <el-button @click="goTo('helicopterRental')">直升机出租</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="searchParam"
              placeholder="请输入内容"
              class="input-with-select"
              size="small"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="doSearch"
              ></el-button>
            </el-input>
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
        <component
          ref="modal"
          :is="currentComponent"
        ></component>
      </el-main>
    </el-container>
    <modify-email-modal :show.sync="showEmail">
    </modify-email-modal>
    <modify-password-modal :show.sync="showPassword">
    </modify-password-modal>
  </div>
</template>

<script>
import userInfo from '@/components/userInfo.vue'
import frontPage from '@/views/FrontPage.vue'
import searchPage from '@/views/SearchPage.vue'
import airTour from '@/views/AirTour.vue'
import artificialRainfall from '@/views/ArtificialRainfall.vue'
import charteredAirplane from '@/views/CharteredAirplane.vue'
import helicopterRental from '@/views/HelicopterRental.vue'
import parachuteFlight from '@/views/ParachuteFlight.vue'
import modifyEmailModal from '@/components/modifyEmailModal.vue'
import modifyPasswordModal from '@/components/modifyPasswordModal.vue'

export default {
  name: 'home',
  components: {
    userInfo,
    frontPage,
    searchPage,
    airTour,
    artificialRainfall,
    charteredAirplane,
    helicopterRental,
    parachuteFlight,
    modifyEmailModal,
    modifyPasswordModal
  },
  data () {
    return {
      currentComponent: '',
      searchParam: '',
      showEmail: false,
      showPassword: false,
      loading: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    user () {
      return this.$store.state.user
    }
  },
  created () {
    const { type = '' } = this.$route.query || {}
    if (type === '') {
      this.currentComponent = 'frontPage'
      return
    }
    this.currentComponent = type
  },
  methods: {
    goTo (component) {
      const path = this.$route.path
      const { type = '' } = this.$route.query

      if (component === this.currentComponent) {
        return
      }

      this.currentComponent = component

      if (component === 'searchPage' || type === '') {
        return
      }

      if (component === 'frontPage') {
        this.$router.push(path)
      } else {
        this.$router.push({
          path,
          query: { type: component }
        })
      }
    },
    doSearch () {
      const param = this.searchParam
      const path = this.$route.path
      const { type = '' } = this.$route.query

      if (this.currentComponent !== 'searchPage') {
        this.currentComponent = 'searchPage'
      }

      this.$nextTick(() => {
        if (type !== '') {
          this.$router.push(path)
        }
        this.$refs.modal.getService(param)
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
.el-input {
  vertical-align: -9px;
  max-width: 240px;
}
.el-main {
  padding: 40px;
  padding-top: 0px;
}
.user-info {
  float: right;
}
</style>
