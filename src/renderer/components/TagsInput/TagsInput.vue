<template>
  <div class="TagsInput">
    <div class="ivu-select ivu-select-single">
      <div class="ivu-select-selection wrapper">
        <div class="tags" transition="tags">
          <Tag
            v-for="(item, index) in valueInfo" :key="index" closable color="primary"
            :name="item"
            @on-close="closeTag"
          >{{item}}</Tag>
        </div>
        <input
        v-model="inputVal"
        @keydown.enter="add(inputVal)"
        @keydown.delete="deleteFun(inputVal)"
        @keydown.188="add(inputVal)"
        @blur.prevent="add(inputVal)"
        class="tag-input" type="text" :placeholder="placeholder">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TagsInput',
  props: {
    value: {
      type: String,
      default: () => ''
    },
    placeholder: {
      type: String,
      default: () => '请添加'
    }
  },
  data () {
    return {
      valueInfo: [],
      inputVal: ''
    }
  },
  methods: {
    add (val) {
      if (val === '') {
        return
      }

      if (val.indexOf(',') >= 0) {
        return
      }
      if (val.replace(/(^\s*)|(\s*$)/g, '') !== '') {
        this.valueInfo.push(val.replace(/(^\s*)|(\s*$)/g, ''))
      }
      this.inputVal = ''
    },
    deleteFun (val) {
      if (val === '') {
        this.valueInfo.pop()
      }
    },
    closeTag (event, name) {
      if (this.valueInfo.indexOf(name) >= 0) {
        const index = this.valueInfo.indexOf(name)
        this.valueInfo.splice(index, 1)
      }
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
    this.valueInfo = this.value.split(',')
  }
}
</script>
<style lang="less" scoped>
.TagsInput .ivu-select .ivu-select-selection {
  min-height: 32px;
}
.tag-input {
  border: none;
  outline:none;
  height: 100%;
  font-size: 12px;
  color: #495060;
}
.wrapper {
  padding: 2px 7px;
}
.TagsInput .ivu-select-single .ivu-select-selection {
  height: auto;
  line-height: 28px;
}
.tags {
  display: inline-block;
}
</style>