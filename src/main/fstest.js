const fs = require('./dataFn').default
const path = require('path')

fs.writeFileData(path.join(__dirname, './test/test'), 'test')
