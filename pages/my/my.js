// pages/my/my.js
import { ClassicModel } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'

import { promisic } from '../../utils/common.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  onShow(options) {
    this.userAuthorized1()
    this.getMyBookCount()
    this.getMyFavor()
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              console.log(data)
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          console.log('err')
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({ url: '/pages/about/about' })
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course'
    })
  },

  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    console.log(cid)
    console.log(type)
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
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
