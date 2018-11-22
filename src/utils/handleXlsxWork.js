const {handalXlsx} = require('./handleXlsx')
const _ = require('lodash')

/**
 * excel导出
 * @param {any} responseList 请求list数据
 * @param {any} headerMap 表格头部 map
 * @param {any} header 表格头部 字段
 */
export const xlsxDown = async function (responseList, headerMap, header, fileName) {
  /* 挑选出信息 */
  const XlsxData = responseList.map(item => {
    return _.pick(item, header)
  })

  if (XlsxData.length <= 0) {
    return
  }

  // console.log(Object.keys(XlsxData[0]))
  // console.log(header)

  /* 获取xlsx头 */
  const XlsxHeader = header.map(item => {
    return headerMap[item]
  })
  /* 重新组合Data */
  const newXlsxData = XlsxData.map(item => {
    return _.mapKeys(item, (value, key) => {
      return headerMap[key]
    })
  })

  /* 生成表格 */
  const xlsx = await handalXlsx(XlsxHeader, newXlsxData, fileName)
  return xlsx
}
