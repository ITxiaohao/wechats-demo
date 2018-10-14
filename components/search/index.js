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
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false
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
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        // 相当于把锁给锁住
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(
          res => {
            this.setMoreData(res.books)
            // 解锁
            this.unLocked()
          },
          () => {
            this.unLocked() // then 方法请求失败调用，避免死锁
          }
        )
      }
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
      this.initialize()
    },

    onDelete(event) {
      this._closeResult()
      this.initialize()
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
