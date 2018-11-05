<template>
  <div class="Repertory">
    <!-- 筛选 start-->
    <div class="select-wrapper">
      <Row>
        <SelectCol>
          <Input v-model="selectPayload.KEYW" placeholder="请输入关键词" @on-enter="selectBtn"></Input>
        </SelectCol>
        <SelectCol>
          <Button @click="clearSelectParams">清空</Button>
          <Button type="primary" @click.native="selectBtn">查找</Button>
        </SelectCol>
      </Row>
    </div>
    <!-- 筛选 end -->
    <!-- table start -->
    <Table
      :columns='tableColumnList'
      :data='ProgramParams.list'
    ></Table>
    <!-- table end -->
  </div>
</template>
<script>

export default {
  name: 'Repertory',
  data () {
    return {
      // 筛选 start
      selectPayload: {},
      // 可选择列的 table column
      tableColumnList: [
        {
          title: '子程序名称',
          key: 'repertoryName',
          align: 'center',
          sortable: true
        }
      ],
      ProgramParams: {
        list: [],
        page: {
          currentPage: 1,
          totalResult: 1
        }
      },
      // table change page data
      pagePayload: {}
    }
  },
  methods: {
    /* 筛选 end */
    clearSelectParams () {
      this.selectPayload = {}
    },
    selectBtn () {
      this.getProgramList()
    },
    getProgramList (params) {
      let payload = Object.assign({}, this.selectPayload, params || {})
      this.$send('getAccList', payload).then((res) => {
        if (res.error === 0) {
          this.ProgramParams = res.obj
        } else {
          this.$Message.error('获取子程序管理失败，请稍后重试！')
        }
      }).catch(() => {
        this.$Message.error('获取子程序管理装失败，请稍后重试！')
      })
    }
  },
  activated () {
    this.getProgramList(this.pagePayload)
  }
}
</script>
