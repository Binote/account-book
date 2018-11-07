<template>
  <DatePicker v-model="initVal" @on-change="handleChange" format="yyyy-MM-dd" style="width:100%;" type="date" :placeholder="placeholder" ></DatePicker>
</template>
<script>
export default {
  name: 'DateSelect',
  data () {
    return {
      initVal: ''
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    placeholder: String
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