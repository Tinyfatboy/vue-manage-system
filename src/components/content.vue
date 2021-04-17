<template>
  <div class="section">
    <h2>{{ title }}</h2>
    <section class="item-display">
      <el-row
        :gutter="20"
        v-for="(element, key) in formattedList"
        :key="key"
      >
        <el-col
          :span="6"
          v-for="(item, index) in element"
          :key="index"
        >
          <el-card
            shadow="hover"
            @click.native="goToDetail(item)"
          >
            <img
              :src="require('../../public/img/item.png')"
              class="image"
            >
            <div class="card-desc">
              <span>{{ item.serverUnitServicesTitle }}</span><br>
              <span>{{ item.serverUnitServicesType }}</span><br>
              <span>{{ item.serverUnitCompanyName }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  name: 'contentItem',
  computed: {
    formattedList () {
      return _.chunk(this.list, 4)
    }
  },
  methods: {
    goToDetail (item) {
      const { serverUnitServicesId = '', serverUnitServicesType = '' } = item
      const { type = '' } = this.$route.query || {}

      if (type === '') {
        this.$router.push({
          path: '/detail',
          query: {
            serverId: serverUnitServicesId,
            serviceType: serverUnitServicesType
          }
        })
        return
      }
      this.$router.push({
        path: '/detail',
        query: {
          type,
          serverId: serverUnitServicesId,
          serviceType: serverUnitServicesType
        }
      })
    }
  }
}
</script>

<style scoped>
.el-card {
  cursor: pointer;
}
.el-card img {
  width: 100%;
  object-fit: cover;
}
.card-desc {
  padding: 10px;
  font-size: 14px;
}
</style>
