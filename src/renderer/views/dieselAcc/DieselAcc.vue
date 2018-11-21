<template>
  <div class="DieselAcc">
    <div class="clearfix">
      <Button @click="add" class="add-btn" type="primary"><Icon type="md-add"></Icon>&nbsp;新增条目</Button>
    </div>
    <!-- 筛选 start-->
    <div class="select-wrapper">
      <Row>
        <SelectCol>
          <Input v-model="selectPayload.plate_num" placeholder="请输入车牌" @on-enter="selectBtn"></Input>
        </SelectCol>
         <SelectCol>
          <Input v-model="selectPayload.car_team" placeholder="请输入车队" @on-enter="selectBtn"></Input>
        </SelectCol>
         <SelectCol>
          <Input v-model="selectPayload.driver_name" placeholder="请输入司机名字" @on-enter="selectBtn"></Input>
        </SelectCol>
        <SelectCol>
          <Daterange v-model="selectPayload.date" placeholder="请选择时间段"></Daterange>
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
      :data='params.list'
      border
      size="small"
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
               @on-change="handle_diesel_unit_price_change"
              ></AdminInputNumber>
          </FormItem>
        </AdminRow>
        <AdminRow>
          <FormItem prop="diesel_unit" slot="one" label="柴油升数">
            <AdminInputNumber
              v-model="postdata.diesel_unit"
              placeholder="请输入柴油升数"
              @on-change="handle_diesel_unit_change"
              >
            </AdminInputNumber>
          </FormItem>
          <FormItem prop="diesel_tot_price" slot="two" label="柴油总价">
            <AdminInputNumber
              v-model="postdata.diesel_tot_price"
               placeholder="请输入柴油总价"
               @on-change="handle_diesel_tot_price_change"
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
        <Button type="primary" @click="handleAcc('form')">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getObjectData, getArrVal } from '@/../utils/mkdata'
export default {
  name: 'DieselAcc',
  data () {
    let that = this
    return {
      modalObj: {
        off: false,
        title: '新增'
      },
      ruleInline: {},
      postdata: {
        diesel_unit_price: Number(this.$localStorage.getItem('diesel_unit_price')) || null
      },
      plate_num_data: [],
      car_team_data: [],
      driver_name_data: [],
      // 筛选 start
      selectPayload: {},
      // 可选择列的 table column
      tableColumnList: [
        {
          title: '序号',
          type: 'index',
          align: 'center',
          width: 60
        },
        {
          title: '车牌',
          key: 'plate_num',
          align: 'center',
          sortable: true
        },
        {
          title: '车队',
          key: 'car_team',
          align: 'center',
          sortable: true
        },
        {
          title: '司机',
          key: 'driver_name',
          align: 'center',
          sortable: true
        },
        {
          title: '柴油单价',
          key: 'diesel_unit_price',
          align: 'center',
          sortable: true
        },
        {
          title: '柴油升数',
          key: 'diesel_unit',
          align: 'center',
          sortable: true
        },
        {
          title: '总价',
          key: 'diesel_tot_price',
          align: 'center',
          sortable: true
        },
        {
          title: '加油日期',
          key: 'date',
          align: 'center',
          sortable: true
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
          render (h, {row}) {
            return h('TagsText', {
              props: {
                value: row.remark
              }
            })
          }
        },
        {
          title: '操作',
          align: 'center',
          width: 80,
          render (h, {row}) {
            return <i-button type='primary' size='small' onClick={() => {
              that.edit(row)
            }}>编辑</i-button>
          }
        }
      ],
      params: {
        list: [],
        driverList: []
      },
      driverObj: {}
    }
  },
  methods: {
    add () {
      this.modalObj = {
        off: true,
        title: '新增'
      }
      this.postdata = {
        diesel_unit_price: Number(this.$localStorage.getItem('diesel_unit_price')) || null
      }
    },
    edit (row) {
      this.modalObj = {
        off: true,
        title: '编辑'
      }
      let {_index, _rowKey, ...rowData} = row
      this.postdata = rowData
    },
    /* 筛选 end */
    clearSelectParams () {
      this.selectPayload = {}
    },
    selectBtn () {
      this.getAccList()
    },
    getAccList (params) {
      let payload = Object.assign({}, this.selectPayload, params || {})
      this.$send('getAccList', {data: payload}).then((res) => {
        if (res.error === 0) {
          this.params = res.data
        } else {
          this.$Message.error('获取加油记账数据失败，请联系开发人员或者到git上提交 Issues！')
        }
      }).catch(() => {
        this.$Message.error('获取加油记账数据失败，请联系开发人员或者到git上提交 Issues！')
      })
    },
    getDriverList () {
      this.$send('getDriverList', {data: {status: '1'}}).then((res) => {
        if (res.error === 0) {
          this.params.driverList = {...res.data.list}
          this.driverObj = getObjectData(res.data.list, 'plate_num')
          this.plate_num_data = getArrVal(res.data.list, 'plate_num')
          this.car_team_data = getArrVal(res.data.list, 'car_team')
          this.driver_name_data = getArrVal(res.data.list, 'driver_name')
        } else {
          this.$Message.error('获取司机列表失败，请联系开发人员或者到git上提交 Issues！')
        }
      }).catch(() => {
        this.$Message.error('获取司机列表装失败，请联系开发人员或者到git上提交 Issues！')
      })
    },
    handleAcc (ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.$send('handleAcc', {data: this.postdata}).then((res) => {
            if (res.error === 0) {
              console.log(res)
              this.$Message.success('保存成功！')
              this.postdata.driver_name = ''
              this.postdata.plate_num = ''
              this.driver_id = ''
              this.getDriverList()
            } else {
              this.$Message.error('保存失败，请联系开发人员或者到git上提交 Issues！')
            }
          }).catch((err) => {
            console.log(err)
            this.$Message.error('保存失败，请联系开发人员或者到git上提交 Issues！')
          })
        } else {
          this.$Message.error('请根据提示填写数据！')
        }
      })
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    },
    plate_num_sel (val) {
      let obj = this.driverObj[val]
      this.postdata.car_team = obj.car_team
      this.postdata.driver_name = obj.driver_name
    },
    handle_diesel_unit_price_change (val) {
      this.$localStorage.setItem('diesel_unit_price', val || '')
    },
    handle_diesel_unit_change (val) {
      this.postdata.diesel_tot_price = val * this.postdata.diesel_unit_price
    },
    handle_diesel_tot_price_change (val) {
      this.postdata.diesel_unit = this.percentNum(val, this.postdata.diesel_unit_price)
    },
    percentNum (num, num2) {
      return (Math.round(num / num2 * 100) / 100)
    }
  },
  activated () {
    this.getAccList(this.pagePayload)
    this.getDriverList()
  },
  created () {
    this.getAccList(this.pagePayload)
    this.getDriverList()
  }
}
</script>
