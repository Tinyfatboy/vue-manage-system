export default {
  methods: {
    handleAdvice () {
      this.$confirm(
        `咨询可拨打电话<br><br>电话：${this.detailData.serverPhone}`,
        '信息',
        {
          confirmButtonText: '确定',
          showCancelButton: false,
          dangerouslyUseHTMLString: true,
          center: true,
          type: 'info',
          beforClose: (action, instance, done) => {
            done()
          }
        }
      )
    }
  }
}
