<template>
  <st-panel app class="page-brand-shop-add">
    <st-form
    :form="form"
    @submit="onHandleSubmit">
      <a-row :gutter="8" class="add-shop-name-row">
        <a-col offset="1" :lg="10">
          <st-form-item label="门店名称" required>
            <a-input
            v-decorator="[
              'shop_name',
              {rules: [{ validator: shop_name_validator}]}
            ]"
            maxlength="20"
            placeholder="支持中英文、数字,不超过20个字"></a-input>
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
          <st-form-item label="详细地址" required>
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
          <st-form-item label="店招">
            <a-upload
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              :customRequest="upload"
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
        <a-col offset="1" :lg="22">
          <st-form-item label="营业时间">
            <st-checkbox-button-group v-model="weekArr">
              <st-checkbox-button-item
              v-for="item in weekList"
              :key="item.value"
              :value="item.value">{{item.label}}</st-checkbox-button-item>
            </st-checkbox-button-group>
            <st-slider class="page-brand-shop-add__slider" :getSlider="getSlider"></st-slider>
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
import { OssService } from '@/services/oss.service'
export default {
  serviceInject() {
    return {
      rules: RuleConfig,
      OSS: OssService
    }
  },
  data() {
    return {
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
      // week
      weekArr: [],
      weekList: [
        { value: 0, label: '周一' },
        { value: 1, label: '周二' },
        { value: 2, label: '周三' },
        { value: 3, label: '周四' },
        { value: 4, label: '周五' },
        { value: 5, label: '周六' },
        { value: 6, label: '周日' }
      ],
      // upload
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
    // 店招上传
    upload(data) {
      this.loading = true
      if (this.checkUploadFile(data.file)) {
        console.log(data.file)
      } else {

      }
      this.loading = false
      // this.OSS.put({
      //   file: data.file,
      //   uploadProgress(res) {
      //     console.log(`${res.loaded / res.total * 100}%`)
      //   }
      // }).then(res => {
      //   res.subscribe({
      //     next: val => console.log(val),
      //     complete: () => console.log('Complete!'),
      //     error: val => console.log(`Error: ${val}`)
      //   })
      // })
    },
    // shop_address validatorFn
    shop_address_validator(rule, value, callback) {
      callback()// eslint-disable-line
    },
    onChange(value) {
      console.log(value)
    },
    handleChange(info) {
      console.log(info)
    },
    checkUploadFile(file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt5M
    }
  }
}
</script>
