module.exports = {
  'GET /_api/v1/plugin/introduction'(req, res) {
    res.status(200).json({
      data: {
        info: {
          case_link: '',
          icon: 'images/plugin/activity.svg',
          introduction: '拼团报名助手'
        },
        plugin_image: [
          'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-activity-preview-4.png',
          'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-activity-preview-3.png',
          'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-activity-preview-2.png',
          'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-activity-preview-1.png'
        ],
        plugin_name: '活动报名',
        regulation:
          '1.活动由品牌统一创建、全门店展示，用户可在小程序内的各个门店参与↵2.参加前用户需要先登录，登录后才可进行报名↵3.已有用户成功报名的活动，无法取消↵4.单用户单个票种只可买一次，一次可支持购买N份↵5.不支持退款、不支持部分支付↵6.不支持商家取消某用户报名资格的功能↵7.用户报名成功后，所获得的票券会自动发放到用户的“我的-我的票券”',
        usage_link: '',
        is_open: 1
      }
    })
  }
}
