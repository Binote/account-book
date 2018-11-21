export const getObjectData = function (array, Id) {
  let ObjectData = {}
  array.forEach(item => {
    ObjectData[item[Id]] = {...item}
  })
  return ObjectData
}
export const getArrVal = function (array, key) {
  let ARRID = []
  array.forEach((item) => {
    ARRID.push(item[key])
  })
  return ARRID
}
