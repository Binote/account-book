import { app, remote } from 'electron' // 引入remote模块

const md5 = require('md5')
const { join } = require('path')
const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块

const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录

let localStorage
if (typeof localStorage === 'undefined' || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage(join(STORE_PATH, `scratch`))
  localStorage.getItem(md5('userName')) || localStorage.setItem(md5('userName'), md5('admin'))
  localStorage.getItem(md5('password')) || localStorage.setItem(md5('password'), md5('admin'))
}

// module.exports = {localStorage}
export default localStorage
