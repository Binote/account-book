<template>
  <div>
    <DatePicker v-model="initVal" @on-change="handleChange" format="yyyy-MM-dd" style="width:100%;" type="daterange" :placeholder="placeholder" :clearable="clearable" transfer split-panels
    ></DatePicker>
  </div>
</template>
<script>
export default {
  name: 'Daterange',
  data () {
    return {
      initVal: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: String,
    clearable: {
      type: Boolean,
      default: () => true
    }
  },
  methods: {
    handleChange (date) {
      this.$emit('input', date)
    }
  },
  watch: {
    value () {
      this.initVal = this.value
    }
  },
  created () {
    this.initVal = this.value
  }
}
</script>