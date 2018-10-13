// components/search/index.js
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: ''
  },

  // 组件的初始化生命周期
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(event) {
      this.setData({
        searching: true
      })
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        console.log(res)
        this.setData({
          dataArray: res.books,
          q
        })
        keywordModel.addToHistory(q)
      })
    },
    onDelete(event) {
      this.setData({
        searching: false,
        dataArray: [],
        q: ''
      })
    }
  }
})
