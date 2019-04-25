export default {
  course_name: [
    'course_name', {
      rules: [{
        required: true,
        message: '请输入课程名称'
      }, {
        min: 4,
        message: '支持输入4~30个字的课程名称'
      }]
    }
  ],
  category_id: [
    'category_id', {
      rules: [{
        required: true,
        message: '请选择课程类型'
      }]
    }
  ],
  train_aim: [
    'train_aim', {
      rules: [{
        required: true,
        message: '请选择训练目的'
      }]
    }
  ],
  strength_level: ['strength_level', {
    rules: [{
      required: true,
      message: '请选择训练强度'
    }]
  }],
  calories: ['calories'],
  duration: [
    'duration', {
      rules: [{
        required: true,
        message: '请输入课程时长'
      }]
    }
  ],
  image: [
    'image'
  ],
  description: [
    'description', {
      initialValue: ''
    }
  ],
  shop_setting: [
    'shop_setting', {
      initialValue: '1'
    }
  ],
  shop_ids: [
    'shop_ids', {
      rules: [{
        required: true,
        message: '请选择上课门店'
      }]
    }
  ]
}
