// components/search/index.js
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'

import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: '_load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [],
    searching: false,
    q: '',
    loading: false
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
    _load_more() {
      console.log('加载更多')
      if (!this.data.q) {
        return
      }
      if (this.data.loading) {
        return
      }
      if (this.hasMore()) {
        // 相当于把锁给锁住
        this.data.loading = true
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.data.loading = false
        })
      }
    },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(event) {
      this.setData({
        searching: true
      })
      this.initialize()
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q
        })
        keywordModel.addToHistory(q)
      })
    },
    onDelete(event) {
      this.setData({
        searching: false,
        // dataArray: [],
        q: ''
      })
    }
  }
})
