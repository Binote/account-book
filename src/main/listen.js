const listen = require('../utils/ipc').listen
listen('login', (res) => {
  console.log(res)
  return Promise.resolve(res)
})
