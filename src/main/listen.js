// const {localStorage} = require('./localStorage')
import localStorage from '../utils/localStorage'
import {xlsxDown as handleXlsxWork} from '../utils/handleXlsxWork'
const md5 = require('md5')
const listen = require('../utils/ipc').listen
const handleListen = require('./handleListen')
const {dialog} = require('electron')
const fs = require('./dataFn').default
const path = require('path')

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

listen('getAccList', handleListen.getAccList)
listen('handleAcc', handleListen.handleAcc)
listen('getDriverList', handleListen.getDriverList)
listen('handleDriver', handleListen.handleDriver)

listen('handleXlsxWork', (payload) => {
  return new Promise((resolve, reject) => {
    handleXlsxWork(payload.responseList, payload.headerMap, payload.header, payload.fileName).then(xlsx => {
      dialog.showSaveDialog({
        title: '导出Excel',
        defaultPath: payload.fileName,
        message: '导出Excel',
        filters: [
          {name: 'Excel', extensions: ['xlsx', 'xls']},
          {name: 'All Files', extensions: ['*']}
        ]
      }, (fileName) => {
        if (fileName) {
          fs.writeFileData(path.join(fileName), xlsx).then(res => {
            resolve(new ResolveMessage(res))
          }).catch(err => {
            reject(err)
          })
        } else {
          reject(new Error('取消导出'))
        }
      })
    }).catch(err => {
      reject(err)
    })
  })
})
