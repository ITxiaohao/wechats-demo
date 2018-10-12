// pages/book/book.js
import { BookModel } from '../../models/book.js'

const bookModel = new BookModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    bookModel.getHotList().then(res => {
      console.log(res)
    })

    // const promise = new Promise((reslove, reject) => {
    //   // promise 的三种状态，pending fulfilled rejected 进行中，已成功，已失败，一旦我们 new promise 就在 pending 状态
    //   // 如何把一个进行中的 promise 修改为一个已成功或者已失败的状态呢？通过 reslove 和 reject
    //   // 一旦修改了已成功或者已失败，promise 的状态就凝固了，不能再改变
    //   wx.getSystemInfo({
    //     success: res => reslove(res),
    //     fail: error => reject(error)
    //   })
    // })

    // // 用 promise 的变量来获取异步回调的结果, then 方法接收两个回调函数，第一个是已成功的结果，第二个是已失败
    // promise.then(
    //   res => {
    //     console.log(res)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
