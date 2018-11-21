export const mkSelectSql = (payload, sql) => {
  let times = 0
  let paramsArr = []
  for (let key in payload) {
    times++
    let item = payload[key]
    if (key === 'date') {
      if (payload.date.length > 0) {
        if (times === 1) {
          sql += ` where date >= ? and date <= ?`
        } else {
          sql += ` and date >= ? and date <= ?`
        }
        paramsArr.push(...item)
      } else {
        times--
      }
    } else {
      if (times === 1) {
        sql += ` where ${key} like ?`
      } else {
        sql += ` and ${key} like ?`
      }
      paramsArr.push('%' + item + '%')
    }
  }
  return {
    sql,
    paramsArr
  }
}
export const mkInsertSql = (payload, sql) => {
  let times = 0
  let paramsArr = []
  let vals = ' values ('
  for (let key in payload) {
    times++
    let item = payload[key]
    if (times === 1) {
      sql += key
      vals += '?'
    } else {
      sql += ',' + key
      vals += ',?'
    }
    paramsArr.push(item)
  }
  return {
    sql,
    paramsArr,
    vals
  }
}
export const mkUpdateSql = (payload, sql) => {
  let times = 0
  let paramsArr = []
  for (let key in payload) {
    times++
    let item = payload[key]
    if (times === 1) {
      sql += key + ' = ?'
    } else {
      sql += ', ' + key + ' = ?'
    }
    paramsArr.push(item)
  }
  return {
    sql,
    paramsArr
  }
}
