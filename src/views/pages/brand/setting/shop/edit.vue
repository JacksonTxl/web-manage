<template>
  <st-panel app class="page-brand-shop-edit">
    <st-form :form="form">
      <a-row :gutter="8" class="page-edit-shop-name-row">
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
            <st-map-button
            :lat="editMap.lat"
            :lng="editMap.lng"
            :address="editMap.address"
            :province="editMap.province"
            :city="editMap.city"
            :district="editMap.district"
            @select="editMapChange"
            ></st-map-button>
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
            <st-checkbox-facility-group v-model="shopData.service_ids">
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
          <st-form-item label="店招" v-viewer="{ url: 'data-src' }" required validateStatus="error" :help="shopCoverImageValidateText">
            <st-image-upload
            :cropperModal="cropperModal"
            :sizeLimit="5"
            :list="fileList"
            @change="fileChange"
            width="240px"
            height="135px">
              <a-icon type="plus"/>
              <div class="page-upload-text">上传店招</div>
              <div class="page-upload-text">大小不超过5M，建议尺寸16:9</div>
            </st-image-upload>
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
      <a-row :gutter="8">
        <a-col offset="1" :lg="22">
          <st-form-item label=" ">
            <st-button type="primary" @click="onHandleSubmit" :loading="editLoading.edit">提交</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import { RuleConfig } from '@/constants/rule'
import { EditService } from './edit.service'
import { PatternService } from '@/services/pattern.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'EditShopSetting',
  serviceInject() {
    return {
      pattern: PatternService,
      rules: RuleConfig,
      editService: EditService,
      userService: UserService
    }
  },
  rxState() {
    return {
      serviceList: this.editService.serviceList$,
      shopInfo: this.editService.shopInfo$,
      editLoading: this.editService.loading$,
      shop: this.userService.shopEnums$
    }
  },
  mounted() {
    this.init(this.shopInfo)
  },
  data() {
    return {
      editMap: {
        lat: '',
        lng: '',
        address: '',
        province: {},
        city: {},
        district: {}
      },
      fileList: [],
      fileListHostiry: [],
      cropperModal: {},
      // 电话校验方式 1为点击添加校验，0为点击提交校验
      phoneValidtorType: 1,
      shopData: {
        shop_name: '',
        province_id: null,
        city_id: null,
        district_id: null,
        address: '',
        shop_phones: [],
        shop_status: 1,
        lat: '',
        lng: '',
        service_ids: [],
        business_time: [],
        email: '',
        shop_images: []
      },
      shopCoverImageValidateText: '',
      serviceIcon_icon_list: {
        1: 'WIFI',
        2: 'park',
        3: 'shower',
        4: 'medical',
        5: 'heating',
        6: 'snow',
        7: 'nosmoking',
        8: 'energy'
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  computed: {
    phoneAddDisabled() {
      return this.shopData.shop_phones.length > 2
    },
    shopCoverImageIsOk() {
      return this.shopCoverImageValidateText === ''
    }
  },
  methods: {
    // 获取门店信息
    init(data) {
      this.form.setFieldsValue({
        shop_name: data.shop_name,
        email: data.email
      })
      // 门店电话
      this.shopData.shop_phones = cloneDeep(data.shop_phones)
      // 门店地址
      this.editMap.lat = data.lat
      this.editMap.lng = data.lng
      this.editMap.address = data.shop_position.address
      this.editMap.province.id = data.shop_position.province_id
      this.editMap.province.name = data.shop_position.province_name
      this.editMap.city.id = data.shop_position.city_id
      this.editMap.city.name = data.shop_position.city_name
      this.editMap.district.id = data.shop_position.district_id
      this.editMap.district.name = data.shop_position.district_name
      // 服务设施
      data.shop_services.forEach(i => {
        this.shopData.service_ids.push(i.service_id)
      })
      // 店招
      this.fileListHostiry = cloneDeep(data.shop_images)
      this.fileList = cloneDeep(data.shop_images.filter(i => i.is_cover))
      this.shopData.shop_images = cloneDeep(data.shop_images.filter(i => i.is_cover))
      // 营业状态
      this.shopData.shop_status = data.shop_status
      // 营业时间
      this.shopData.business_time = data.business_time
    },
    // 校验店招是否已上传
    shopCoverImageValidator() {
      this.shopCoverImageValidateText = this.shopData.shop_images.length ? '' : '请上传店招'
    },
    fileChange(data) {
      if (data.length) {
        this.shopData.shop_images = cloneDeep(data)
        this.shopData.shop_images[0].is_cover = 1
      } else {
        this.shopData.shop_images = []
      }
      this.shopCoverImageValidator()
    },
    editMapChange(data) {
      this.editMap = cloneDeep(data)
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
      this.shopCoverImageValidator()
      this.form.validateFieldsAndScroll((err, values) => {
        this.phoneValidtorType = 1
        if (!err && this.shopCoverImageIsOk) {
          this.shopData.shop_name = values.shop_name
          this.shopData.province_id = this.editMap.province.id
          this.shopData.city_id = this.editMap.city.id
          this.shopData.district_id = this.editMap.district.id
          this.shopData.address = this.editMap.address
          this.shopData.lat = this.editMap.lat
          this.shopData.lng = this.editMap.lng
          this.shopData.email = values.email
          // 替换店招
          let i = 0
          this.fileListHostiry.some((item, index) => {
            if (item.is_cover) {
              i = index
            }
          })
          this.fileListHostiry.splice(i, 1)
          this.fileListHostiry.unshift(...this.shopData.shop_images)
          this.shopData.shop_images = cloneDeep(this.fileListHostiry)
          this.editService
            .edit(this.$route.meta.query.id, this.shopData)
            .subscribe(() => {
              this.$router.push({
                name: 'brand-setting-shop-list'
              })
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
          !this.pattern.TEL.test(value)
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
    }
  }
}
</script>
