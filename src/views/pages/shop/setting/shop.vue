<template>
  <st-panel app class="page-shop-setting-shop">
    <st-form
    :form="form"
    @submit="onHandleSubmit">
      <a-row :gutter="8" class="add-shop-name-row">
        <a-col offset="1" :lg="10">
          <st-form-item label="营业中" class="page-shop-setting-shop__address">
            上海旗舰店
          </st-form-item>
        </a-col>
      </a-row>
       <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item  >
            上海市 徐汇区 徐汇中山南二路107号丑奂大厦3楼
            <span class="look-location">查看地位</span>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="门店电话" required>
            <a-input
            v-decorator="[
              'shop_phone',
              { validateTrigger: 'blur',rules: [{validator: shop_phone_validator}]}
            ]"
            placeholder="请输入门店电话">
              <div slot="addonAfter" @click="onValidtorPhone" class="add-shop-mobile-button" :class="{disabled:phoneAddDisabled}">
                添加
              </div>
            </a-input>
            <div class="add-shop-mobile">
              <p v-for="(item,index) in shopData.shop_phones" :key="index">
                <span>{{item}}</span>
                <st-icon type="anticon:close" @click="onRemovePhone(index)" style="cursor:pointer;"></st-icon>
              </p>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="门店地址" required>
            <a-cascader
            v-decorator="[
              'shop_PCD',
              {rules: [{ required: true, message: '请输入门店地址'}]}
            ]"
            :options="options"
            @change="onChange"
            placeholder="请选择省/市/区"/>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="详细地址"  required>
            <a-input
            v-decorator="[
              'shop_address',
              {rules: [{ required: true, message: '请输入详细地址'}]}
            ]"
            placeholder="请输入详细地址"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="邮箱">
            <a-input
            v-decorator="[
              'email',
              {
                rules: [{
                  type: 'email', message: '输入的邮箱格式错误，请重新输入!',
                }]
              }
            ]"
            placeholder="请输入门店邮箱"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col offset="1" :lg="23">
          <st-form-item label="服务设施">
            <st-checkbox-facility-group v-model="service_ids">
              <st-checkbox-facility-item
              style="margin-right:24px"
              v-for="item in service_list"
              :label="item.label"
              :icon="serviceIcon_list[item.value]"
              :key="item.value"
              :value="item.value"></st-checkbox-facility-item>
            </st-checkbox-facility-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col offset="1" :lg="10">
          <st-form-item label="门店图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              :showUploadList="false"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传店招</div>
                  <div class="ant-upload-text">大小不超过5M</div>
              </div>
            </a-upload>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col offset="1" :lg="12">
          <st-form-item label="营业状态">
            <a-radio-group v-model="shopData.shop_status">
              <a-radio
              v-for="item in shop_status_list"
              :key="item.value"
              :value="item.value">{{item.label}}</a-radio>
            </a-radio-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col offset="1" :lg="23">
          <st-form-item label="营业时间">
            <st-checkbox-button-group  v-model="weekData">
              <st-checkbox-button-item value="0">周一</st-checkbox-button-item>
              <st-checkbox-button-item value="1">周二</st-checkbox-button-item>
              <st-checkbox-button-item value="2">周三</st-checkbox-button-item>
              <st-checkbox-button-item value="3">周四</st-checkbox-button-item>
              <st-checkbox-button-item value="4">周五</st-checkbox-button-item>
              <st-checkbox-button-item value="5">周六</st-checkbox-button-item>
              <st-checkbox-button-item value="6">周日</st-checkbox-button-item>
            </st-checkbox-button-group>
            <st-slider class="pages-test-store__slider" :getSlider="getSlider" @setFilterSlider="setFilterSlider"></st-slider>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" type="flex" justify="center" align="middle">
        <a-col>
          <st-button type="primary" html-type="submit">提交</st-button>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
import { RuleConfig } from '@/constants/rule'
export default {
  serviceInject() {
    return {
      rules: RuleConfig
    }
  },
  data() {
    return {
      weekData: [],
      // 电话校验方式 1为点击添加校验，0为点击提交校验
      phoneValidtorType: 1,
      shopData: {
        shop_name: '',
        province_id: '',
        city_id: '',
        district_id: '',
        address: '',
        shop_phones: [],
        shop_status: 1,
        lat: '',
        lng: '',
        shop_cover_image: '',
        email: '',
        service_ids: [],
        business_time: []
      },
      // 服务id
      service_ids: [],
      // 服务列表
      service_list: [
        { value: 0, label: 'WIFI' },
        { value: 1, label: '停车位' },
        { value: 2, label: '淋浴' },
        { value: 3, label: '急救包' },
        { value: 4, label: '暖气' },
        { value: 5, label: '空调' },
        { value: 6, label: '无烟区' },
        { value: 7, label: '充电宝' }
      ],
      serviceIcon_list: ['WIFI', 'shower', 'snow', 'nosmoking', 'heating', 'medical', 'park', 'energy'],
      // 营业状态
      shop_status_list: [
        { value: 0, label: '预售' },
        { value: 1, label: '试运营' },
        { value: 2, label: '正式营业' },
        { value: 3, label: '已关店' }
      ],

      loading: false,
      imageUrl: '',
      mobileArr: ['1356654', '15845644567', '15845644567', '15845644567', '15845644567'],
      getSlider: {
        disabled: false,
        className: 'st-slider-box',
        infoList: []
      },
      options: [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake'
          }]
        }]
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }]
        }]
      }]
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  computed: {
    phoneAddDisabled() {
      return this.shopData.shop_phones.length > 2
    }
  },
  methods: {
    // 获取slider数据
    setFilterSlider(data) {
      console.log(data)
    },
    // 添加电话
    onValidtorPhone() {
      if (this.form.getFieldValue('shop_phone') && !this.phoneAddDisabled) {
        // input框里有值才添加
        this.form.validateFields(['shop_phone'], { force: true }).then(res => {
          let arr = [...this.shopData.shop_phones]
          arr.push(res.shop_phone)
          this.shopData.shop_phones = [...new Set(arr)]
        })
      }
    },
    // 移除电话
    onRemovePhone(index) {
      this.shopData.shop_phones.splice(index, 1)
    },
    // 表单提交
    onHandleSubmit(e) {
      // 确认为提交表单校验
      this.phoneValidtorType = 0
      this.form.resetFields(['shop_phone'])
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        this.phoneValidtorType = 1
        if (!err) {
          console.log('Received values of form: ', values)
        } else {

        }
      })
    },
    // shop_name validatorFn
    shop_name_validator(rule, value, callback) {
      if (value === undefined) {
        callback('请填写门店名称') // eslint-disable-line
      } else if (value && !this.rules.shop_name.test(value)) {
        callback('输入的门店名称格式错误，请重新输入')// eslint-disable-line
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // shop_phone validatorFn
    shop_phone_validator(rule, value, callback) {
      if (this.phoneValidtorType) {
        if (value !== undefined && value !== '' && !this.rules.mobile.test(value)) {
          callback('输入的门店电话格式错误，请重新输入')// eslint-disable-line
        } else {
          callback()// eslint-disable-line
        }
      } else {
        if (!this.shopData.shop_phones.length) {
          callback('请填写门店电话')// eslint-disable-line
        } else {
          callback()// eslint-disable-line
        }
      }
    },
    // shop_address validatorFn
    shop_address_validator(rule, value, callback) {
      callback()// eslint-disable-line
    },
    onChange(value) {
      console.log(value)
    },
    handleChange(info) {

    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  watch: {
    weekData: {
      handler() {
        let filter = []
        this.weekData.forEach(item => {
          if (parseInt(item) === 0) {
            filter.push({
              title: '周一',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: true
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 1) {
            filter.push({
              title: '周二',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: true
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 2) {
            filter.push({
              title: '周三',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: true
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 3) {
            filter.push({
              title: '周四',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: true
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 4) {
            filter.push({
              title: '周五',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: true
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 5) {
            filter.push({
              title: '周六',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: true
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 6) {
            filter.push({
              title: '周日',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: true
                }
              ]
            })
          }
        })
        console.log('weekData', this.weekData, filter)
        this.getSlider.infoList = filter
        this.getSlider = JSON.parse(JSON.stringify(this.getSlider))
      },
      deep: true
    }
  }
}
</script>
