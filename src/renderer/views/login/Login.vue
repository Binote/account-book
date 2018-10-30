<style lang="less">
  @import "./Login.less";
</style>
<template>
  <div class="login">

     <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="formInline" :rules="ruleInline" @keydown.enter.native="handleSubmit('loginForm')">
            <FormItem prop="userName">
              <Input v-model="formInline.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit('loginForm')" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">输入用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
// import * as authServices from '@/services/auth'
// import Canvas from './components/Canvas'
// const send = require('@/../utils/ipc').send
// const { ipcRenderer } = require('electron')
export default {
  name: 'login',
  components: {
    // Canvas
  },
  data () {
    return {
      formInline: {
        userName: '',
        password: ''
      },
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
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.login()
        } else {
          this.$Message.error('请填写账号或者密码！')
        }
      })
    },
    login () {
      this.$send('login', {
        msg: 'login',
        data: this.formInline
      }).then(res => {
        if (res.error === 0) {
          this.$Message.success(res.data.message)
        } else {
          this.$Message.error('登录失败，请联系管理员或到git提交Issues')
        }
      }).catch(err => {
        this.$Message.error(err.message)
      })
    }
  }
}
</script>
<style>
.login {
    background-image: url(./images/login_bg3.gif);
    background-position: 50%;
    background-size: cover;
    height: 100%;
    position: relative;
    width: 100%;
}
</style>
