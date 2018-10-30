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

  return new Promise((resolve, reject) => {
    // 这里使用 once 监听，响应到达后就销毁
    ipcRenderer.once(responseEvent, (event, response) => {
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
      response.code = err.code || 500
      response.data = { message: err.message || 'Main process error.' }
    }
    e.sender.send(`${eventName}_res_${id}`, response)
  })
}
