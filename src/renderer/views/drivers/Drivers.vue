<template>
  <div class="Drivers">
    <div class="clearfix">
      <Button @click="add" class="add-btn" type="primary"><Icon type="md-add"></Icon>&nbsp;新增司机</Button>
      <ExportXlsx
        :headerMap='tableColumnList'
        :list='params.list'
        pagename='司机名单'
      ></ExportXlsx>
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
            <Input
              v-model="postdata.plate_num"
              placeholder="请输入车牌号"
              >
            </Input>
          </FormItem>
          <FormItem prop="car_team" slot="two" label="车队">
            <Input
              v-model="postdata.car_team"
              placeholder="请输入车队名称"
              >
            </Input>
          </FormItem>
        </AdminRow>
        <AdminRow>
          <FormItem prop="driver_name" slot="one" label="司机">
            <Input
              v-model="postdata.driver_name"
              placeholder="请输入司机姓名"
              >
            </Input>
          </FormItem>
          <FormItem prop="status" slot="two" label="状态">
            <AdminSwitch
              v-model="postdata.status"
              >
            </AdminSwitch>
          </FormItem>
          </AdminRow>
          <AdminRow>
          <FormItem prop="remark" slot="two" label="备注">
            <TagsInput
              v-model="postdata.remark"
               placeholder="请输入备注"
              ></TagsInput>
          </FormItem>
        </AdminRow>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleDriver('form')">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>

export default {
  name: 'Drivers',
  data () {
    let that = this
    // const that = this
    return {
      modalObj: {
        off: false,
        title: '新增'
      },
      ruleInline: {
        driver_name: {required: true, type: 'string', message: '请填写司机姓名', trigger: 'change'},
        plate_num: { required: true, message: '请填写车牌号', trigger: 'change' },
        car_team: { required: true, message: '请填写车队名称', trigger: 'change' }
      },
      postdata: {},
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
          title: '状态',
          key: 'status',
          align: 'center',
          sortable: true,
          render (h, {row}) {
            if (row.status === '1') {
              return <i-button type='success' size='small'>启用</i-button>
            } else {
              return <i-button type='error' size='small'>禁用</i-button>
            }
          }
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
        list: []
      }
    }
  },
  methods: {
    add () {
      this.modalObj = {
        off: true,
        title: '新增'
      }
      this.postdata = {
        status: '1'
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
      this.getDriverList()
    },
    getDriverList (params) {
      let payload = Object.assign({}, this.selectPayload, params || {})
      console.log(payload)
      this.$send('getDriverList', {data: payload}).then((res) => {
        console.log(res.error === 0)
        if (res.error === 0) {
          this.params = {...res.data}
          console.log(res.data)
        } else {
          this.$Message.error('获取司机列表失败，请联系开发人员或者到git上提交 Issues！')
        }
      }).catch((err) => {
        console.log(err)
        this.$Message.error('获取司机列表装失败，请联系开发人员或者到git上提交 Issues！')
      })
    },
    handleDriver (ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.$send('handleDriver', {data: this.postdata}).then((res) => {
            if (res.error === 0) {
              console.log(res)
              this.$Message.success('保存成功！')
              this.postdata.driver_name = ''
              this.postdata.plate_num = ''
              this.driver_id = ''
              this.getDriverList()
            } else {
              if (res.error === 1005) {
                this.$Message.error('车牌号重复，请检查后再提交！')
              } else { this.$Message.error('保存失败，请联系开发人员或者到git上提交 Issues！') }
            }
          }).catch((err) => {
            console.log(err)
            this.$Message.error('保存失败，请联系开发人员或者到git上提交 Issues！')
          })
        } else {
          this.$Message.error('请根据提示填写数据！')
        }
      })
    }
  },
  activated () {
    this.getDriverList()
  },
  created () {
    this.getDriverList()
  }
}
</script>
