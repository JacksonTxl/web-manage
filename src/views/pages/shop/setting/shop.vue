<template>
  <st-panel app class="page-brand-shop-edit">
    <st-form :form="form" @submit="onHandleSubmit">
      <a-row :gutter="8" class="page-add-shop-name-row">
        <a-col offset="1" :lg="10">
          <st-form-item class="page-shop-setting-shop__address">
            <st-tag type="shop-opening"/>
            <st-t3 style="display:inline-block;margin-left:24px">{{shopData.shop_name}}</st-t3>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item>
            <!-- {{shop_info.shop_position.address_detail}} -->
            {{shopInfo.shop_info.shop_position.address_detail}}
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
              placeholder="请输入门店电话"
            >
              <div
                slot="addonAfter"
                @click="onValidtorPhone"
                class="page-edit-shop-mobile-button"
                :class="{disabled:phoneAddDisabled}"
              >添加</div>
            </a-input>
            <div class="page-edit-shop-mobile">
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
          <!-- <st-form-item label="门店地址" required>
            <a-cascader
              v-decorator="[
              'shop_PCD',
              {rules: [{ required: true, message: '请输入门店地址'}]}
            ]"
              :options="options"
              @change="onChange"
              placeholder="请选择省/市/区"
            />
          </st-form-item>-->
          <st-form-item label="城市选择" required>
            <st-region-cascader
              v-decorator="['shop_PCD',{ rules: [{ type: 'array', required: true, message: '请填写地址' }] }]"
              :values="[shopData.city_id,shopData.province_id,shopData.district_id]"
            ></st-region-cascader>
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
                v-for="item in service_list"
                :label="item.label"
                :icon="serviceIcon_list[item.value]"
                :key="item.value"
                :value="item.value"
              ></st-checkbox-facility-item>
            </st-checkbox-facility-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col offset="1" :lg="23">
          <st-form-item label="门店图片">
            <div class="shop-setting-shop-img">
              <!-- <pre>{{shopInfo.shop_info.service_options}}</pre> -->
              <div
                class="shop-setting-shop-img-box"
                v-for="(item,index) in shopInfo.shop_info.service_options"
                :key="index"
              >
                <st-tag type="shop-sign" style="position: absolute;" v-if="item.is_choose"/>
                <img
                  width="240"
                  height="auto"
                  src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1986179278,1118313821&fm=27&gp=0.jpg"
                  alt="avatar"
                >
                <div class="shop-setting-shop-img-sign" v-if="!item.is_choose">
                  <p class="shop-setting-shop-img-set" @click="settingSign(item)">设为店招</p>
                  <p class="shop-setting-shop-img-del" @click="settingDel(item)">删除</p>
                </div>
              </div>
              <!-- <div class="shop-setting-shop-img-box">
                <img
                  width="240"
                  height="auto"
                  src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1986179278,1118313821&fm=27&gp=0.jpg"
                  alt="avatar"
                >
                <div class="shop-setting-shop-img-sign">
                  <p class="shop-setting-shop-img-set">设为店招</p>
                  <p class="shop-setting-shop-img-del">删除</p>
                </div>
              </div>-->
              <a-upload
                listType="picture-card"
                :class="{'page-show-image':imageUrl}"
                :showUploadList="false"
                :customRequest="upload"
              >
                <div>
                  <a-icon :type="loading ? 'loading' : 'plus'"/>
                  <div class="page-upload-text">上传门店图片</div>
                  <div class="page-upload-text">大小不超过5M，建议尺寸16：9</div>
                  <div class="page-upload-num-text">可添加20张门店图片</div>
                </div>
              </a-upload>
            </div>
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
            <shop-hour-picker
              v-model="shopInfo.shop_info.business_time"
              type="shop-hour-picker"
              @change="sliderCange"
            ></shop-hour-picker>
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
import { MessageService } from '@/services/message.service'
import { ShopService } from '@/views/pages/shop/setting/shop.service'
import shopHourPicker from '@/views/components/shop-hour-picker/shop-hour-picker.vue'
export default {
  serviceInject() {
    return {
      rules: RuleConfig,
      OSS: OssService,
      MessageService: MessageService,
      infoService: ShopService
    }
  },
  subscriptions() {
    return {
      shopInfo: this.infoService.shopInfo$
    }
  },
  mounted() {
    this.getShopInfo(this.shopInfo.shop_info)
  },
  components: {
    'shop-hour-picker': shopHourPicker
  },
  data() {
    return {
      // 电话校验方式 1为点击添加校验，0为点击提交校验
      phoneValidtorType: 1,
      shopData: {
        shop_name: '',
        shop_phones: [],
        province_id: '40',
        city_id: '2',
        district_id: '400',
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
      serviceIcon_list: [
        'WIFI',
        'shower',
        'snow',
        'nosmoking',
        'heating',
        'medical',
        'park',
        'energy'
      ],
      // 营业状态
      shop_status_list: [
        { value: 3, label: '预售' },
        { value: 1, label: '试运营' },
        { value: 2, label: '正式营业' },
        { value: 4, label: '已关店' }
      ],

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
    // 删除店招
    settingDel(item) {
      this.infoService.save(item).subscribe(res => {
        this.infoService.getShopSettingStopInfo().subscribe(res1 => {})
      })
    },
    // 设置为店招
    settingSign(item) {
      this.infoService.save(item).subscribe(res => {
        this.infoService.getShopSettingStopInfo().subscribe(res1 => {})
      })
    },
    // 获取信息
    sliderCange(data) {
      console.log(data)
    },
    // 获取门店信息
    getShopInfo(data) {
      if (data.shop_phones && data.shop_phones.length > 3) {
        data.shop_phones.splice(3, data.shop_phones.length)
      }

      this.form.setFieldsValue({
        shop_address: data.shop_position.address,
        email: data.email,
        shop_PCD: [
          data.shop_position.city_id,
          data.shop_position.province_id,
          data.shop_position.district_id
        ]
      })
      this.shopData.shop_name = data.shop_name
      this.shopData.shop_phones = data.shop_phones
      // 省市区
      this.shopData.province_id = data.shop_position.province_id
      this.shopData.city_id = data.shop_position.city_id
      this.shopData.district_id = data.shop_position.district_id

      // 经纬度
      this.shopData.lat = data.lat
      this.shopData.lng = data.lng

      data.shop_services.forEach(i => {
        this.service_ids.push(i.service_id)
      })
      this.shopData.shop_cover_image = ''
      this.shopData.shop_status = data.shop_status
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
          this.shopData.address = values.shop_address
          this.shopData.email = values.email
          this.shopData.province_id = values.shop_PCD[1]
          this.shopData.city_id = values.shop_PCD[0]
          this.shopData.district_id = values.shop_PCD[2]
          console.log(this.shopData, values)
          this.infoService.save(this.shopData).subscribe(res => {
            console.log(res)
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
    // 店招上传
    upload(data) {
      this.loading = true
      if (this.checkUploadFile(data.file)) {
        this.OSS.put({
          file: data.file
        }).subscribe({
          next: async val => {
            this.shopData.shop_cover_image = val.fileKey
            this.imageUrl = await this.fileReader(data.file)
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
    sliderChange(data) {
      this.shopData.business_time = data.infoList
    },
    fileReader(img) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          resolve(reader.result)
        })
        reader.readAsDataURL(img)
      })
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
    },

    onChange(value) {
      console.log(value)
    }
  }
}
</script>
