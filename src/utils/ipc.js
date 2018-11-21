const {ipcRenderer, ipcMain} = require('electron')
// const ipcMain = require('electron').ipcMain
const {uuid} = require('./uuid')
// 渲染进程
/**
 *
 * @param {String} eventName 事件名称
 * @param {Object} options 参数
 */
export let send = (eventName, options = {}) => {
  const { data } = options
  const id = uuid()
  const responseEvent = `${eventName}_res_${id}`
  console.log('send data start')
  console.log(data)
  console.log('send data end')
  return new Promise((resolve, reject) => {
    // 这里使用 once 监听，响应到达后就销毁
    ipcRenderer.once(responseEvent, (event, response) => {
      console.log(response.data)
      if (response.code === 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    })

    // 监听建立之后再发送事件，稳一点
    ipcRenderer.send(eventName, { id, data })
  })
}
// 主进程
/**
 *
 * @param {String} eventName 事件名称
 * @param {Object} handler 处理函数
 */
export const listen = (eventName, handler) => {
  ipcMain.on(eventName, async (e, request) => {
    const { id, data } = request
    const response = { code: 200 }
    try {
      response.data = await handler(data)
    } catch (err) {
      console.log(err)
      response.code = err.code || 500
      response.data = { message: err.message || '主进程错误。' }
    }
    console.log(response)
    e.sender.send(`${eventName}_res_${id}`, response)
  })
}
