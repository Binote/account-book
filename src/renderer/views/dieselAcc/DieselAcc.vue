<template>
  <div class="Repertory">
    <!-- 筛选 start-->
    <!-- <div class="select-wrapper">
      <Row>
        <SelectCol>
          <Input v-model="selectPayload.KEYW" placeholder="请输入关键词" @on-enter="selectBtn"></Input>
        </SelectCol>
        <SelectCol>
          <Button @click="clearSelectParams">清空</Button>
          <Button type="primary" @click.native="selectBtn">查找</Button>
        </SelectCol>
      </Row>
    </div> -->
    <!-- 筛选 end -->
    <!-- table start -->
    <Table
      :columns='tableColumnList'
      :data='params.list'
    ></Table>
    <!-- table end -->
    <Modal
      loading
      v-model="modalObj.off"
      :title="modalObj.title"
    >
      <Form ref="form" :label-width="50" :model="postdata" :rules="ruleInline">
        <AdminRow>
          <FormItem prop="plate_num" slot="one" label="车牌">
            <AutoComplete
              :filter-method="filterMethod"
              v-model="postdata.plate_num"
              :data="plate_num_data"
              placeholder="请输入车牌号"
              >
            </AutoComplete>
          </FormItem>
          <FormItem prop="car_team" slot="two" label="车队">
            <AutoComplete
              :filter-method="filterMethod"
              v-model="postdata.car_team"
              :data="car_team_data"
              placeholder="请输入车牌号"
              >
            </AutoComplete>
          </FormItem>
        </AdminRow>
      </Form>
      <div slot="footer">
        <Button type="primary">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>

export default {
  name: 'DieselAcc',
  data () {
    return {
      modalObj: {
        off: true,
        title: '新增'
      },
      ruleInline: {},
      postdata: {},
      plate_num_data: ['111', '222', '333', '444', '555', '666', '777'],
      car_team_data: ['111', '222'],
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
      params: {
        list: []
      }
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
      this.$send('getAccList', {data: payload}).then((res) => {
        console.log(res, 111)
        if (res.error === 0) {
          this.params = res.data
        } else {
          this.$Message.error('获取子程序管理失败，请稍后重试！')
        }
      }).catch((err) => {
        console.log(err, 222)
        this.$Message.error('获取子程序管理装失败，请稍后重试！')
      })
    },
    filterMethod (value, option) {
      console.log(value, 3223332)
      console.log(typeof option, 21222)
      // if (option) {
      //   // return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
      //   return true
      // } else { return true }
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    }
  },
  activated () {
    this.getProgramList(this.pagePayload)
  },
  created () {
    this.getProgramList(this.pagePayload)
  }
}
</script>
