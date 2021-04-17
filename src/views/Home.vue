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
          <el-col :span="8">
            <div class="search-area">
              <el-input
                placeholder="请输入内容"
                class="input-with-select"
                size="small"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <component :is="currentComponent"></component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import frontPage from '@/views/FrontPage.vue'
import airTour from '@/views/AirTour.vue'
import artificialRainfall from '@/views/ArtificialRainfall.vue'
import charteredAirplane from '@/views/CharteredAirplane.vue'
import helicopterRental from '@/views/HelicopterRental.vue'
import parachuteFlight from '@/views/ParachuteFlight.vue'

export default {
  name: 'home',
  components: {
    frontPage,
    airTour,
    artificialRainfall,
    charteredAirplane,
    helicopterRental,
    parachuteFlight
  },
  data () {
    return {
      currentComponent: '',
      loading: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
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

      if ((component === 'frontPage' && type === '') || component === type) {
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
      this.currentComponent = component
    }
  }
}
</script>

<style scoped>
.el-header {
  margin: 40px;
  padding: 0px;
}
.search-area {
  height: 40px;
  max-width: 350px;
  position: relative;
  top: 4px;
}
.el-main {
  padding: 40px;
  padding-top: 0px;
}
.el-carousel img {
  width: 100%;
}
.el-card > img {
  width: 100%;
}
</style>
