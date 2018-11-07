<template>
  <div class="DieselAcc">
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
      <Form ref="form" :label-width="70" :model="postdata" :rules="ruleInline">
        <AdminRow>
          <FormItem prop="plate_num" slot="one" label="车牌">
            <AutoComplete
              :filter-method="filterMethod"
              v-model="postdata.plate_num"
              :data="plate_num_data"
              placeholder="请输入车牌号"
              @on-select="plate_num_sel"
              >
            </AutoComplete>
          </FormItem>
          <FormItem prop="car_team" slot="two" label="车队">
            <AutoComplete
              :filter-method="filterMethod"
              v-model="postdata.car_team"
              :data="car_team_data"
              placeholder="请输入车队名称"
              >
            </AutoComplete>
          </FormItem>
        </AdminRow>
        <AdminRow>
          <FormItem prop="driver_name" slot="one" label="司机">
            <AutoComplete
              :filter-method="filterMethod"
              v-model="postdata.driver_name"
              :data="driver_name_data"
              placeholder="请输入司机姓名"
              >
            </AutoComplete>
          </FormItem>
          <FormItem prop="diesel_unit_price" slot="two" label="柴油单价">
            <AdminInputNumber
              v-model="postdata.diesel_unit_price"
               placeholder="请输入柴油单价"
               @on-change="handle_diesel_unit_price_hange"
              ></AdminInputNumber>
          </FormItem>
        </AdminRow>
        <AdminRow>
          <FormItem prop="diesel_unit" slot="one" label="柴油升数">
            <AdminInputNumber
              v-model="postdata.diesel_unit"
              placeholder="请输入柴油升数"
              @on-change="handle_diesel_unit_hange"
              >
            </AdminInputNumber>
          </FormItem>
          <FormItem prop="diesel_tot_price" slot="two" label="柴油总价">
            <AdminInputNumber
              v-model="postdata.diesel_tot_price"
               placeholder="请输入柴油总价"
               @on-change="handle_diesel_tot_price_hange"
              ></AdminInputNumber>
          </FormItem>
        </AdminRow>
        <AdminRow>
          <FormItem prop="date" slot="one" label="加油日期">
            <DateSelect
              v-model="postdata.date"
              placeholder="请输入加油日期"
              >
            </DateSelect>
          </FormItem>
          <FormItem prop="remark" slot="two" label="备注">
            <TagsInput
              v-model="postdata.remark"
               placeholder="请输入备注"
              ></TagsInput>
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
      postdata: {
        diesel_unit_price: Number(this.$localStorage.getItem('diesel_unit_price'))
      },
      plate_num_data: ['111', '222', '333', '444', '555', '666', '777'],
      car_team_data: ['111', '222'],
      driver_name_data: [],
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
        if (res.error === 0) {
          this.params = res.data
        } else {
          this.$Message.error('获取子程序管理失败，请稍后重试！')
        }
      }).catch(() => {
        this.$Message.error('获取子程序管理装失败，请稍后重试！')
      })
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    },
    plate_num_sel (val) {
      console.log(val)
    },
    handle_diesel_unit_price_hange (val) {
      this.$localStorage.setItem('diesel_unit_price', val)
    },
    handle_diesel_unit_hange (val) {
      this.postdata.diesel_tot_price = val * this.postdata.diesel_unit_price
    },
    handle_diesel_tot_price_hange (val) {
      this.postdata.diesel_unit = this.percentNum(val, this.postdata.diesel_unit_price)
    },
    percentNum (num, num2) {
      return (Math.round(num / num2 * 100) / 100)
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
