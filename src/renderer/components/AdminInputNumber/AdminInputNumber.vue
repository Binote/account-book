<template>
  <InputNumber
  :max="max"
  :min="min"
  v-model="val"
  :size="size"
  :disabled="disabled"
  :readonl="readonly"
  :formatter="formatter"
  :parser="parser"
  :placeholder="placeholder"
  :precision="precision"
  @on-change="handlerchange"
  style="width:100%;"
  ></InputNumber>
</template>
<script>
export default {
  name: 'AdminInputNumber',
  data () {
    return {
      val: null
    }
  },
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    formatter: {
      type: Function
    },
    parser: {
      type: Function
    },
    placeholder: {
      type: String,
      default: ''
    },
    precision: {
      type: Number
    }
  },
  methods: {
    handlerchange (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  },
  // computed: {
  //   val () {
  //     return this.value
  //   }
  // },
  watch: {
    value (val) {
      this.val = val && Number(val)
    }
  },
  created () {
    this.val = this.value && Number(this.value)
  }
}
</script>
