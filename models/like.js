import { HTTP } from '../utils/http.js'

class LikeModel extends HTTP {
  like(behavior, artID, category) {
    // 动态路由，根据 behavior 的值来决定
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'post',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getCalssicLikeStatus(artID, category, sCallback) {
    this.request({
      url: `classic/${category}/${artID}/favor`,
      success: sCallback
    })
  }
}

export { LikeModel }
