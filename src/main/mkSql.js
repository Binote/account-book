export const mkSelectSql = (payload, sql, outPayload) => {
  let times = 0
  let paramsArr = []
  for (let key in payload) {
    times++
    let item = payload[key]
    if (item) {
      if (key === 'startTime') {
        if (times === 1) {
          sql += ` where date >= ?`
        } else {
          sql += `and date >= ?`
        }
        paramsArr.push(item)
      } else if (key === 'endTime') {
        if (times === 1) {
          sql += ` where date <= ?`
        } else {
          sql += `and date <= ?`
        }
        paramsArr.push(item)
      } else {
        if (times === 1) {
          sql += ` where ${key} like ?`
        } else {
          sql += ` and ${key} like ?`
        }
        paramsArr.push('%' + item + '%')
      }
    }
  }
  for (let key in outPayload) {
    times++
    let item = outPayload[key]
    if (item) {
      if (times === 1) {
        sql += ` where ${key} != ?`
      } else {
        sql += ` and ${key} != ?`
      }
      paramsArr.push(item)
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
