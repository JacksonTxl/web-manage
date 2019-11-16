module.exports = {
  // 'GET /_api/const/enum'(req, res) {
  //   res.status(400).json({})
  // }
  'GET /_api/v1/plugin/index_marketing'(req, res) {
    res.status(200).json({
      data: {
        info: {
          marketing: [
            {
              icon: 'images/plugin/coupon.svg',
              plugin_name: '优惠券',
              plugin_type: 100001,
              plugin_text: '发放代金券，吸引客户消费。',
              redirect_url: 'brand-marketing-plugin-coupon-list'
            },
            {
              icon: 'images/plugin/invite.svg',
              plugin_name: '邀请有礼',
              plugin_text: '老带新利器，激活老客的同时拉新。',
              plugin_type: 100002,
              redirect_url: 'brand-marketing-plugin-invitation-index-data'
            },
            {
              icon: 'images/plugin/crowd.svg',
              plugin_name: '精细化人群',
              plugin_text: '',
              plugin_type: 100003,
              redirect_url: 'brand-marketing-plugin-crowd-index'
            },
            {
              icon: 'images/plugin/lottery.svg',
              plugin_name: '幸运大转盘',
              plugin_type: 100004,
              icon: 'images/plugin/lottery.svg',
              redirect_url: 'brand-marketing-plugin-lottery-index'
            },
            {
              icon: 'images/plugin/activity.svg',
              plugin_name: '活动报名',
              plugin_type: 100005,
              plugin_text: '自助式在线报名助手',
              icon: 'images/plugin/activity.svg',
              redirect_url: 'brand-marketing-plugin-activity-registration-list'
            },
            {
              icon: 'images/plugin/activity.svg',
              plugin_name: '拼团活动',
              plugin_type: 100006,
              plugin_text: '快来参加三体拼团吧',
              icon: 'images/plugin/activity.svg',
              redirect_url: 'brand-marketing-plugin-group-activities-list'
            }
          ]
        },
        msg: 'success',
        checkAuth: [],
        code: 0
      }
    })
  }
}
