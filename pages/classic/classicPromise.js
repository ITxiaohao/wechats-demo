// pages/classic/classic.js
// 导入封转好的 http 类
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel
      .APIFirst()
      .then(res1 => {
        console.log('第一次调用api返回的值', res1)
        // 在 API 1 里调用 API 2
        // TODO Promise 相比回调函数最大的好处是可以 return 回调函数只能传入自身来返回数据
        return classicModel.APISecond() // 调用 APISecond 用 return 将值返回，然后用 then 来接收
      })
      // then 返回第二次 api 调用的结果
      .then(res2 => {
        console.log('第二次调用api返回的值', res2)
        return classicModel.APIThird()
      })
      //  then 返回第三次 api 调用的结果
      .then(res3 => {
        console.log('第三次调用api返回的值', res3)
      })
  },

  onLike(event) {
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(
      behavior,
      this.data.classicData.id,
      this.data.classicData.type
    )
  },

  onNext(event) {
    this._updateClassic('next')
  },

  onPrevious(event) {
    this._updateClassic('previous')
  },

  _updateClassic(nextOrPrevious) {
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, res => {
      console.log(res)
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
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
