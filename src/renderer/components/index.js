
import AdminRow from './AdminRow'
import SelectCol from './SelectCol'
import AdminInputNumber from './AdminInputNumber'
import DateSelect from './DateSelect'
import Daterange from './Daterange'
import TagsInput from './TagsInput'
import TagsText from './TagsText'

const components = [
  AdminRow,
  SelectCol,
  AdminInputNumber,
  DateSelect,
  Daterange,
  TagsInput,
  TagsText
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