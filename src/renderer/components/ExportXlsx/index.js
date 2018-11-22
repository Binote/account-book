import ExportXlsx from './ExportXlsx'

ExportXlsx.install = function install (Vue) {
  Vue.component(ExportXlsx.name, ExportXlsx)
}

export default ExportXlsx
