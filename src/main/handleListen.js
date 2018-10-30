const HandleDB = require('./db')
let db = new HandleDB({
  databaseFile: './data/accountbase.db'
})
db.connectDataBase().then((result) => {
  console.log(result)
  // 创建表(如果不存在的话,则创建,存在的话, 不会创建的,但是还是会执行回调)
  let sentence = `
     create table if not exists ${db.tableName}(
          begin_time varchar(255),
          create_time varchar(255),
          end_time varchar(255),
          play_id varchar(255),
          postion_id int(50),
          status int(50),
          task_id int(50),
          same_day int(50)
      );`
  return db.createTable(sentence)
}).then((result) => {
  console.log(result)
}).catch((err) => {
  console.error(err)
})
