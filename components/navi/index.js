// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 绑定事件
    onLeft(event) {
      // 监听自定义事件  left
      if (!this.properties.latest) {
        this.triggerEvent('left', {}, {})
      }
    },

    onRight(event) {
      // 监听自定义事件  right
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
