
const HandleDB = require('./db').default
// const { join } = require('path')
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
  remark      VARCHAR (255)
);`
  return db.createTable(sentence)
}).then((result) => {
  console.log(result)
}).catch((err) => {
  console.error(err)
})

const mkSelectSql = (payload, sql) => {
  let times = 0
  let paramsArr = []
  for (let key in payload) {
    times++
    let item = payload[key]
    if (times === 1) {
      sql += ` where ${key} like '%?%'`
    } else {
      sql += ` and ${key} like '%?%'`
    }
    paramsArr.push(item)
  }
  return {
    sql,
    paramsArr
  }
}

class ResolveMessage {
  constructor (data, error = 0) {
    this.data = data
    this.error = error
  }
}

export const getAccList = async (payload) => {
  let sql = 'select * from diesel_acc_book_table'
  let sqlObj = mkSelectSql(payload, sql)
  sql = sqlObj.sql

  let res
  try {
    res = await db.sql(sql, sqlObj.paramsArr, 'all')
    return Promise.resolve(new ResolveMessage({list: res}))
  } catch (error) {
    return Promise.reject(error)
  }

  // db.sql(sql, sqlObj.paramsArr, 'all').then((res) => {
  //   console.log(res)
  //   return Promise.resolve(new ResolveMessage({list: res}))
  // }).catch((err) => {
  //   return Promise.reject(err)
  // })
}
