// const {localStorage} = require('./localStorage')
const listen = require('../utils/ipc').listen
const handleListen = require('./handleListen')
// const fs = require('./dataFn').default
// const path = require('path')

listen('login', handleListen.login)
listen('loginConfig', handleListen.loginConfig)
listen('getConfigData', handleListen.getConfigData)
listen('setExportDir', handleListen.setExportDir)
listen('setBakDir', handleListen.setBakDir)
listen('restoreDb', handleListen.restoreDb)

listen('getAccList', handleListen.getAccList)
listen('handleAcc', handleListen.handleAcc)
listen('getDriverList', handleListen.getDriverList)
listen('handleDriver', handleListen.handleDriver)

listen('handleXlsxWork', handleListen.handleExport)
export const bakDb = handleListen.bakDb
