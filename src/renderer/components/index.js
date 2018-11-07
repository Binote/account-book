
import AdminRow from './AdminRow'
import SelectCol from './SelectCol'

const components = [
  AdminRow,
  SelectCol
]

const install = function install (Vue) {
  if (install.installed) return

  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
