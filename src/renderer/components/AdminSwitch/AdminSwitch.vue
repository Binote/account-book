<template>
  <i-Switch @on-change="switchChange" size="large" v-model="switchState">
    <span slot="open">{{openText}}</span>
    <span slot="close">{{closeText}}</span>
  </i-Switch>
</template>
<script>
export default {
  name: 'AdminSwitch',
  props: {
    value: {
      type: null,
      default: null
    },
    openText: {
      type: String,
      default: () => '启用'
    },
    closeText: {
      type: String,
      default: () => '禁用'
    },
    rule: {
      type: Object,
      default: () => {
        return {
          1: true,
          0: false
        }
      }
    }
  },
  data () {
    return {
      valable: null,
      switchState: false
    }
  },
  methods: {
    switchChange (status) {
      for (let key in this.rule) {
        if (this.rule[key] === status) {
          this.$emit('input', key)
          this.$emit('on-change', status)
        }
      }
    }
  },
  watch: {
    value (value) {
      this.valable = value
    },
    valable (val) {
      this.switchState = this.rule[val]
    }
  },
  created () {
    this.valable = this.value
  }
}
</script>
