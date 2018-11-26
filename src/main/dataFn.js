
let fs = require('fs')
let path = require('path')
let {dirExists} = require('./dirExists')

let dataFn = {
  /**
 * [通过Promise写入数据]
 * @param  {String} file [文件名]
 * @param  {Object} obj  [写入的数据（对象）]
 * @return {Object}      [Promise对象]
 */
  writeFileData: (filename, obj) => {
    let promise = new Promise(async (resolve, reject) => {
      await dirExists(path.parse(filename).dir)
      fs.writeFile(filename, obj, function (err) {
        if (err) {
          console.log('++++++++++写入失败++++++++++')
          console.log(err)
          reject(err)
        } else {
          console.log('++++++++++写入成功++++++++++')
          console.log(filename)
          resolve('write success!')
        }
      })
    })
    return promise
  },

  /**
 * [通过Promise读取存储的数据]
 * @param  {String} file [文件名]
 * @return {Object}      [Promise对象]
 */
  readFileData: (filename) => {
    let promise = new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data) => {
        if (err) {
          console.log('++++++++++读取失败++++++++++')
          console.log(err)
          reject(err)
        } else {
          console.log('++++++++++读取成功++++++++++')
          console.log(filename)
          resolve(data)
        }
      })
    })
    return promise
  },
  /**
 * [通过Promise读取存储的数据]
 * @param  {String} file [文件名]
 * @return {Object}      [Promise对象]
 */
  copyFileData (filename, targetFilename) {
    let that = this
    return new Promise((resolve, reject) => {
      that.readFileData(filename).then((res) => {
        that.writeFileData(targetFilename, res).then(res => {
          resolve('success:copy ' + filename + ' to ' + targetFilename)
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default dataFn
