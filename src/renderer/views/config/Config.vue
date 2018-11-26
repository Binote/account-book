<template>
  <Tabs value="loginConfig">
        <TabPane label="登录设置" name="loginConfig" icon="ios-contact">
          <Button type="primary" @click="loginConfigOn('loginConfig')">修改登录账户密码</Button>
          <Modal
            title="修改登录账户密码"
            v-model="loginConfig.modal"
            >
               <Form ref="loginConfig" :label-width="70" :model="loginConfig.postdata" :rules="loginConfig.ruleInline">
                 <AdminRow>
                  <FormItem prop="userName" slot="one" label="用户名">
                    <Input v-model="loginConfig.postdata.userName" placeholder="请输入用户名">
                      <span slot="prepend">
                        <Icon :size="16" type="ios-person"></Icon>
                      </span>
                    </Input>
                  </FormItem>
                  <FormItem prop="password" slot="two" label="密码">
                    <Input type="password" v-model="loginConfig.postdata.password" placeholder="请输入密码">
                      <span slot="prepend">
                        <Icon :size="14" type="md-lock"></Icon>
                      </span>
                    </Input>
                  </FormItem>
                </AdminRow>
               </Form>
               <div slot="footer">
                  <Button type="primary" @click="handleSubmit('loginConfig')">确认</Button>
                </div>
          </Modal>
        </TabPane>
        <TabPane label="导出设置" name="exportConfig" icon="md-download">
            <Row>
              <Col span="4" style="text-align: right"><h3>导出目录：</h3></Col>
              <Col span="16" style="text-align: left"><span style="color:#c1c1c1">{{exportConfig.exportDir||'暂未设置导出目录，请尽快设置！'}}</span></Col>
              <Col span="4" style="text-align: left">
                <Button type="primary">修改导出目录</Button>
              </Col>
            </Row>
        </TabPane>
        <TabPane label="备份还原" name="bakConfig"  icon="md-albums">
          <Row>
              <Col span="4" style="text-align: right"><h3>备份目录：</h3></Col>
              <Col span="16" style="text-align: left"><span style="color:#c1c1c1">{{bakConfig.bakDir||'暂未设置备份目录，请尽快设置！'}}</span></Col>
              <Col span="4" style="text-align: left">
                <Button type="primary">修改备份目录</Button>
              </Col>
            </Row>
        </TabPane>
    </Tabs>
</template>
<script>
export default {
  name: 'Config',
  data () {
    return {
      loginConfig: {
        modal: false,
        postdata: {},
        ruleInline: {
          userName: [
            {
              required: true,
              message: '请填写管理员账号！',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请填写管理员密码！',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 5,
              message: '密码请至少输入5位',
              trigger: 'blur'
            }
          ]
        }
      },
      exportConfig: {
        exportDir: ''
      },
      bakConfig: {
        bakDir: ''
      }
    }
  },
  methods: {
    loginConfigOn (name) {
      this[name].modal = true
      this[name].postdata = {}
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$send(name, this[name].postdata).then(res => {
            if (res.error === 0) {
              this.$Message.success(res.data.message)
            } else {
              this.$Message.error('修改失败，请联系管理员或到git提交Issues')
            }
          }).catch(err => {
            this.$Message.error(err.message)
          })
        } else {
          this.$Message.error('请按要求填写数据！')
        }
      })
    },
    getConfigData () {
      this.$send('getConfigData').then(res => {
        this.exportConfig.exportDir = res.data.exportDir
        this.exportConfig.bakDir = res.data.bakDir
      }).catch(err => {
        console.log(err)
        this.$Message.error('获取系统设置信息失败，请重启应用或提交到github！')
      })
    }
  },
  activated () {
    this.getConfigData()
  },
  created () {
    this.getConfigData()
  }
}
</script>
<style scoped>

</style>

