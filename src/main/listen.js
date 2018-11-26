// const {localStorage} = require('./localStorage')
const listen = require('../utils/ipc').listen
const handleListen = require('./handleListen')
// const fs = require('./dataFn').default
// const path = require('path')

listen('login', handleListen.login)
listen('loginConfig', handleListen.loginConfig)
listen('getConfigData', handleListen.getConfigData)

listen('getAccList', handleListen.getAccList)
listen('handleAcc', handleListen.handleAcc)
listen('getDriverList', handleListen.getDriverList)
listen('handleDriver', handleListen.handleDriver)

listen('handleXlsxWork', handleListen.handleExport)
