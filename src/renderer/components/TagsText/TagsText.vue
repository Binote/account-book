<template>
  <div class="TagsInput">
    <Tag
      v-for="(item, index) in valueInfo" :key="index" color="primary"
      :name="item"
    >{{item}}</Tag>
  </div>
</template>
<script>
export default {
  name: 'TagsText',
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      valueInfo: [],
      inputVal: ''
    }
  },
  watch: {
    value (val) {
      this.valueInfo = val.split(',')
    },
    valueInfo () {
      if (this.valueInfo[0] === '') {
        this.valueInfo = []
      } else {
        this.$emit('input', this.valueInfo.join(','))
      }
    }
  },
  created () {
    if (this.value) { this.valueInfo = this.value.split(',') }
  }
}
</script>