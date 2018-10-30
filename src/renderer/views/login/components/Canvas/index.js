import Canvas from './Canvas'

Canvas.install = function install (Vue) {
  Vue.component(Canvas.name, Canvas)
}

export default Canvas
