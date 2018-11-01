const md5 = require('md5')
const { join } = require('path')
let localStorage
if (typeof localStorage === 'undefined' || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage(join(__dirname, `scratch`))
  localStorage.getItem(md5('userName')) || localStorage.setItem(md5('userName'), md5('admin'))
  localStorage.getItem(md5('password')) || localStorage.setItem(md5('password'), md5('admin'))
}

// module.exports = {localStorage}
export default localStorage
