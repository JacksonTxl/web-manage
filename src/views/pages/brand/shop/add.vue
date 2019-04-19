<template>
  <st-panel app class="page-brand-shop-add">
    <st-form :form="form" @submit="onHandleSubmit">
      <a-row :gutter="8" class="page-add-shop-name-row">
        <a-col offset="1" :lg="10">
          <st-form-item label="门店名称" required>
            <a-input
              v-decorator="[
              'shop_name',
              {rules: [{ validator: shop_name_validator}]}
            ]"
              maxlength="20"
              placeholder="支持中英文、数字,不超过20个字"
            ></a-input>
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
              placeholder="请输入门店电话"
            >
              <div
                slot="addonAfter"
                @click="onValidtorPhone"
                class="page-add-shop-mobile-button"
                :class="{disabled:phoneAddDisabled}"
              >添加</div>
            </a-input>
            <div class="page-add-shop-mobile">
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
            <st-region-cascader
            placeholder="请选择省/市/区"
            v-decorator="[
              'shop_PCD',
              {rules: [{ required: true, message: '请输入门店地址'}]}
            ]"></st-region-cascader>
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
              placeholder="请输入详细地址"
            ></a-input>
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
              placeholder="请输入门店邮箱"
            ></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col offset="1" :lg="23">
          <st-form-item label="服务设施">
            <st-checkbox-facility-group v-model="service_ids">
              <st-checkbox-facility-item
                style="margin-right:24px"
                v-for="item in serviceList"
                :label="item.service_name"
                :icon="serviceIcon_icon_list[item.service_id]"
                :key="item.service_id"
                :value="item.service_id"
              ></st-checkbox-facility-item>
            </st-checkbox-facility-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col offset="1" :lg="23">
          <st-form-item label="店招" v-viewer="{ url: 'data-src' }">
            <a-upload
              listType="picture-card"
              :class="{'page-show-image':imageUrl}"
              :showUploadList="false"
              :disabled="imageUrl!==''"
              :customRequest="uploadCrop"
            >
              <div class="page-image" v-if="imageUrl">
                <div class="page-image-button">
                  <span @click="removeImage">删除</span>
                </div>
                <img :dataSrc="imageUrl" width="240" height="135" :src="imageUrl" alt="店招">
              </div>
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'"/>
                <div class="page-upload-text">上传店招</div>
                <div class="page-upload-text">大小不超过5M</div>
              </div>
            </a-upload>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col offset="1" :lg="23">
          <st-form-item label="营业状态">
            <a-radio-group v-model="shopData.shop_status">
              <a-radio
                v-for="item in shop_status_list"
                :key="item.value"
                :value="item.value"
              >{{item.label}}</a-radio>
            </a-radio-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col offset="1" :lg="22">
          <st-form-item label="营业时间">
            <st-shop-hour-picker v-model="shopData.business_time"></st-shop-hour-picker>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" type="flex" justify="center" align="middle">
        <a-col>
          <st-button type="primary" html-type="submit" :loading="addLoading.save">提交</st-button>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
import { RuleConfig } from '@/constants/rule'
import { OssService } from '@/services/oss.service'
import { MessageService } from '@/services/message.service'
import { AddService } from './add.service'
export default {
  serviceInject() {
    return {
      rules: RuleConfig,
      OSS: OssService,
      messageService: MessageService,
      addService: AddService
    }
  },
  rxState() {
    return {
      serviceList: this.addService.serviceList$,
      addLoading: this.addService.loading$
    }
  },
  data() {
    return {
      cropperData: {
        title: '上传会员卡背景',
        aspectRatioW: 16,
        aspectRatioH: 9
      },
      // 电话校验方式 1为点击添加校验，0为点击提交校验
      phoneValidtorType: 1,
      shopData: {
        shop_name: '',
        shop_phones: [],
        province_id: 11,
        city_id: 2,
        district_id: 1,
        address: '',
        email: '',
        service_ids: [],
        shop_cover_image: '',
        shop_status: 1,
        lat: '31.230416',
        lng: '121.473701',
        business_time: []
      },
      // 服务id
      service_ids: [],
      serviceIcon_icon_list: {
        1: 'WIFI',
        2: 'park',
        3: 'shower',
        4: 'medical',
        5: 'heating',
        6: 'snow',
        7: 'nosmoking',
        8: 'energy'
      },
      // 营业状态
      shop_status_list: [
        { value: 3, label: '预售' },
        { value: 1, label: '试运营' },
        { value: 2, label: '正式营业' },
        { value: 4, label: '已关店' }
      ],
      defaultWeekList: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // upload
      loading: false,
      imageUrl: ''
    }
  },
  watch: {
    service_ids: {
      deep: true,
      handler(newVal, oldVal) {
        this.shopData.service_ids = newVal
      }
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
    // 移除店招
    removeImage() {
      this.imageUrl = this.shopData.shop_cover_image = ''
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
      console.log(this.shopData)
      // 确认为提交表单校验
      this.phoneValidtorType = 0
      this.form.resetFields(['shop_phone'])
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        this.phoneValidtorType = 1
        if (!err) {
          this.shopData.shop_name = values.shop_name
          this.shopData.address = values.shop_address
          this.shopData.email = values.email
          this.shopData.province_id = +values.shop_PCD[0]
          this.shopData.city_id = +values.shop_PCD[1]
          this.shopData.district_id = +values.shop_PCD[2]
          this.addService.save(this.shopData).subscribe(() => {

          })
        } else {
        }
      })
    },
    // shop_name validatorFn
    shop_name_validator(rule, value, callback) {
      if (value === undefined) {
        // eslint-disable-next-line
        callback('请填写门店名称')
      } else if (value && !this.rules.shop_name.test(value)) {
        // eslint-disable-next-line
        callback('输入的门店名称格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // shop_phone validatorFn
    shop_phone_validator(rule, value, callback) {
      if (this.phoneValidtorType) {
        if (
          value !== undefined &&
          value !== '' &&
          !this.rules.mobile.test(value)
        ) {
          // eslint-disable-next-line
          callback('输入的门店电话格式错误，请重新输入')
        } else {
          // eslint-disable-next-line
          callback()
        }
      } else {
        if (!this.shopData.shop_phones.length) {
          // eslint-disable-next-line
          callback('请填写门店电话')
        } else {
          // eslint-disable-next-line
          callback()
        }
      }
    },
    uploadCrop(data) {
      let that = this
      let image = URL.createObjectURL(data.file)
      this.$modalRouter.push({
        name: 'image-cropper',
        props: {
          title: this.cropperData.title,
          image,
          aspectRatioH: this.cropperData.aspectRatioH,
          aspectRatioW: this.cropperData.aspectRatioW
        },
        on: {
          cancel() {
            console.log('cancel')
          },
          ok(data) {
            that.upload(data)
          }
        }
      })
    },
    // 店招上传
    upload(data) {
      this.loading = true
      if (this.checkUploadFile(data.file)) {
        this.OSS.put({
          file: data.file
        }).subscribe({
          next: val => {
            this.shopData.shop_cover_image = val.fileKey
            this.imageUrl = URL.createObjectURL(data.file)
            this.loading = false
            this.messageService.success({ content: '上传成功' })
          },
          error: val => {
            this.loading = false
            this.messageService.error({ content: '上传失败' })
          }
        })
      } else {
        this.loading = false
      }
    },
    checkUploadFile(file) {
      const isJPG = this.rules.img_type.test(file.type)
      if (!isJPG) {
        this.messageService.error({
          content: 'You can only upload JPG/PNG file!'
        })
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.messageService.error({ content: 'Image must smaller than 5MB!' })
      }
      return isJPG && isLt5M
    }
  }
}
</script>
