<template>
  <Button type='primary' @click="exportHandel"><Icon type="md-download" />导出到Excel</Button>
</template>
<script>
// import {xlsxDown as handleXlsxWork} from '@/../utils/handleXlsxWork'
export default {
  name: 'ExportXlsx',
  props: {
    headerMap: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    pagename: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    // 导出文件
    exportHandel () {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let milliseconds = date.getMilliseconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let defaultFileName = '' + this.pagename + seperator1 + year + seperator1 + month + seperator1 + strDate + seperator1 + milliseconds
      const fileName = defaultFileName

      const header = Object.keys(this.setHeaderMap)
      // handleXlsxWork(this.list, this.setHeaderMap, header, fileName)
      this.$send('handleXlsxWork', {
        responseList: this.list,
        headerMap: this.setHeaderMap,
        header: header,
        fileName: fileName
      }).then(res => {
        if (res.err === 0) {
          this.$Message.success('导出成功')
        } else {
          this.$Message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('导出失败，请联系开发人员或者到git上提交 Issues！')
      })
    }
  },
  computed: {
    setHeaderMap () {
      let newHeaderMap = {}
      if (this.headerMap instanceof Array) {
        this.headerMap.forEach((item) => {
          if (!!item.title && item.key) {
            newHeaderMap[item.key] = item.title
          }
        })
      }
      return newHeaderMap
    }
  }
}
</script>
