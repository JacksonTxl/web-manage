export class RuleConfig {
  mobile = /^1[34578]\d{9}$/
  id_card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证
  shop_name = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/ // 门店名称
  img_type = /^(image\/png|image\/jpg|image\/jpeg)$/ // 图片类型
}
