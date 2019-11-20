module.exports = {
  'GET /_api/v1/staff/info'(req, res) {
    res.status(200).json({
      checkAuth: [],
      code: 0,
      data: {
        info: {
        brand_id: 1,
        brand_logo: "https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/10000/2019-07-16/eT98dgQYpqcrR1-l.png",
        brand_name: "三体云动[dev]",
        brand_version: "club",
        mobile: "17621345966",
        price_model: 2,
        sale_model: 1,
        shop_id: 1,
        shop_logo: "https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/10000/2019-07-10/F3bdez0zR--wKrqC.png",
        shop_name: "正欢说门店不更新啦",
        staff_avatar: "https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/dev/image/10000/2019-08-30/15671338000386514.jpg",
        staff_id: 1,
        staff_name: "陈陈",
      }},
      msg: "success"
    })
  }
}
