const localStorage = require('./localStorage')
const md5 = require('md5')
const listen = require('../utils/ipc').listen
require('./handleListen')
class ResolveMessage {
  constructor (data, error = 0) {
    this.data = data
    this.error = error
  }
}

listen('login', (res) => {
  if (md5(res.userName) === localStorage.getItem(md5('userName')) && md5(res.password) === localStorage.getItem(md5('password'))) {
    return Promise.resolve(new ResolveMessage({message: '登录成功！'}))
  } else {
    return Promise.reject(new Error('用户名或密码错误'))
  }
})
