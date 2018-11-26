
import localStorage from '../utils/localStorage'
import {xlsxDown as handleXlsxWork} from '../utils/handleXlsxWork'
const HandleDB = require('./db').default
// const { join } = require('path')
const {uuid} = require('../utils/uuid')
// const _ = require('lodash')
const md5 = require('md5')
const {dialog} = require('electron')
const {mkSelectSql, mkInsertSql, mkUpdateSql} = require('./mkSql')

let db = new HandleDB({
  databaseFile: `data/accountbase.db`
})
db.connectDataBase().then((result) => {
  console.log(result)
  // 创建表(如果不存在的话,则创建,存在的话, 不会创建的,但是还是会执行回调)
  /*
      表名     diesel_acc_book_table  加油记账表
      diesel_acc_id     主键  ID
      plate_num         车牌,
      car_team          车队,
      driver_name       司机名字,
      diesel_unit_price 柴油单价,
      diesel_unit       柴油升数,
      diesel_tot_price  柴油总价,
      date              加油日期,
      remark            备注
  */
  /*
      表名     driver_table 司机人员表
      driver_id        主键  ID
      plate_num         车牌,
      car_team          车队,
      driver_name       司机名字,
      status                 状态
      remark            备注
  */
  let sentence = `
  CREATE TABLE  if not exists diesel_acc_book_table (
    diesel_acc_id     VARCHAR (40)  PRIMARY KEY
                                    NOT NULL,
    plate_num         VARCHAR (20)  NOT NULL,
    car_team          VARCHAR (10)  NOT NULL,
    driver_name       VARCHAR (10)  NOT NULL,
    diesel_unit_price DOUBLE (13)   NOT NULL,
    diesel_unit       DOUBLE (13)   NOT NULL,
    diesel_tot_price  DOUBLE (13)   NOT NULL,
    date              VARCHAR (20)  NOT NULL,
    remark            VARCHAR (255)
);
CREATE TABLE if not exists driver_table (
  driver_id   VARCHAR (40)  PRIMARY KEY
                            NOT NULL,
  driver_name VARCHAR (10)  NOT NULL,
  plate_num   VARCHAR (20)  NOT NULL,
  car_team    VARCHAR (10)  NOT NULL,
  status    VARCHAR (10) ,
  remark      VARCHAR (255)
);`
  return db.createTable(sentence)
}).then((result) => {
  console.log(result, 555)
}).catch((err) => {
  console.error(err, 444)
})

class ResolveMessage {
  constructor (data, error = 0) {
    this.data = data
    this.error = error
  }
}
/**
 * 登录
 * @param {*} res
 */
export const login = (res) => {
  if (md5(res.userName) === localStorage.getItem(md5('userName')) && md5(res.password) === localStorage.getItem(md5('password'))) {
    return Promise.resolve(new ResolveMessage({message: '登录成功！'}))
  } else {
    return Promise.reject(new Error('用户名或密码错误'))
  }
}

/**
 * 修改账户密码
 * @param {*} res
 */
export const loginConfig = (payload) => {
  try {
    localStorage.setItem(md5('userName'), md5(payload.userName))
    localStorage.setItem(md5('password'), md5(payload.password))
    return Promise.resolve(new ResolveMessage({message: '账户密码修改成功！'}))
  } catch (err) {
    return Promise.reject(err)
  }
}
/**
 * 获取系统设置信息
 * @param {*} payload
 */
export const getConfigData = payload => {
  try {
    let exportDir = localStorage.getItem(md5('exportDir'))
    let bakDir = localStorage.getItem(md5('bakDir'))
    return Promise.resolve(new ResolveMessage({
      exportDir: exportDir,
      bakDir: bakDir
    }))
  } catch (err) {
    return Promise.reject(err)
  }
}

export const setExportDir = payload => {
  return new Promise((resolve, reject) => {

  })
}

/**
 *  获取加油记账table数据
 * @param {*} payload
 */
export const getAccList = async (payload) => {
  let sql = 'select * from diesel_acc_book_table'
  let sqlObj = mkSelectSql(payload, sql)
  sql = sqlObj.sql
  console.log(sqlObj)
  let res
  try {
    res = await db.sql(sql, sqlObj.paramsArr, 'all')
    // let DriverRes = await getDriverList({status: '1'})
    return Promise.resolve(new ResolveMessage({
      list: res
      // driverList: DriverRes.data.list
    }))
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 新增或编辑加油记账
 * @param {*} payload
 */
export const handleAcc = async (payload) => {
  console.log(111)
  let sql = ''
  if (payload.diesel_acc_id) {
    sql += 'update diesel_acc_book_table set '
    let sqlObj = mkUpdateSql(payload, sql)
    sql = sqlObj.sql + ' where diesel_acc_id = ?'
    console.log(sql)
    sqlObj.paramsArr.push(payload.diesel_acc_id)
    let res
    try {
      res = await db.sql(sql, sqlObj.paramsArr)
      return Promise.resolve(new ResolveMessage({msg: res}))
    } catch (error) {
      return Promise.reject(error)
    }
  } else {
    sql += 'insert into diesel_acc_book_table ('
    let sqlObj = mkInsertSql(payload, sql)
    sql = sqlObj.sql + ',diesel_acc_id)' + sqlObj.vals + ',?)'
    console.log(sql)
    sqlObj.paramsArr.push(uuid())
    let res
    try {
      res = await db.sql(sql, sqlObj.paramsArr)
      // let param = _.pick(payload, ['driver_id', 'driver_name', 'plate_num', 'car_team', 'remark', 'status'])
      // param.status = param.status || '1'
      // let driversRes = await handleDriver(param)
      return Promise.resolve(new ResolveMessage({
        msg: res
        // driversRes: driversRes
      }))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

/**
 *  获取司机table数据
 * @param {*} payload
 * @param {*} outPayload
 */
export const getDriverList = async (payload, outPayload) => {
  let sql = 'select * from driver_table '
  let sqlObj = mkSelectSql(payload, sql, outPayload)
  sql = sqlObj.sql
  console.log(sql)
  let res
  try {
    res = await db.sql(sql, sqlObj.paramsArr, 'all')
    return Promise.resolve(new ResolveMessage({list: res}))
  } catch (error) {
    return Promise.reject(error)
  }
}
/**
 * 新增或编辑司机
 * @param {*} payload
 */
export const handleDriver = async (payload) => {
  let sql = ''
  if (payload.driver_id) {
    let driRes = await getDriverList({plate_num: payload.plate_num}, {driver_id: payload.driver_id})
    if (driRes.data.list.length > 0) {
      return Promise.resolve(new ResolveMessage({msg: 'repeat'}, 1005))
    } else {
      sql += 'update driver_table set '
      let sqlObj = mkUpdateSql(payload, sql)
      sql = sqlObj.sql + ' where driver_id = ?'
      console.log(sql)
      sqlObj.paramsArr.push(payload.driver_id)
      let res
      try {
        res = await db.sql(sql, sqlObj.paramsArr)
        return Promise.resolve(new ResolveMessage({msg: res}))
      } catch (error) {
        return Promise.reject(error)
      }
    }
  } else {
    let driRes = await getDriverList({plate_num: payload.plate_num})
    console.log('+++++++++++++++driRes length log+++++++++++++++++')
    console.log(driRes.data.list.length)
    if (driRes.data.list.length > 0) {
      return Promise.resolve(new ResolveMessage({msg: 'repeat'}, 1005))
    } else {
      sql += 'insert into driver_table ('
      let sqlObj = mkInsertSql(payload, sql)
      sql = sqlObj.sql + ',driver_id)' + sqlObj.vals + ',?)'
      console.log(sql)
      sqlObj.paramsArr.push(uuid())
      let res
      try {
        res = await db.sql(sql, sqlObj.paramsArr)
        return Promise.resolve(new ResolveMessage({msg: res}))
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}
export const handleExport = (payload) => {
  return new Promise((resolve, reject) => {
    dialog.showSaveDialog({
      title: '导出Excel',
      defaultPath: payload.fileName,
      message: '导出Excel',
      filters: [
        {name: 'Excel', extensions: ['xlsx', 'xls']},
        {name: 'All Files', extensions: ['*']}
      ]
    }, async (fileName) => {
      if (fileName) {
        await handleXlsxWork(payload.responseList, payload.headerMap, payload.header, fileName)
        resolve(new ResolveMessage({msg: 'success'}))
        // fs.writeFileData(path.join(fileName), xlsx).then(res => {
        //   resolve(new ResolveMessage(res))
        // }).catch(err => {
        //   reject(err)
        // })
      } else {
        reject(new Error('取消导出'))
      }
    })
  })
}
