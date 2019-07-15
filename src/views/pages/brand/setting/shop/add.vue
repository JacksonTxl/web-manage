<template>
  <st-panel app class="page-brand-shop-add">
    <st-form :form="form">
      <a-row :gutter="8" class="page-add-shop-name-row">
        <a-col :lg="10" :xs="22" :offset="1">
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
          <st-form-item
          validateStatus="error"
          :help="shopMapValidateText"
          label="门店地址"
          required>
            <st-map-button
            :lat="addMap.lat"
            :lng="addMap.lng"
            :address="addMap.address"
            :province="addMap.province"
            :city="addMap.city"
            :district="addMap.district"
            @select="addMapChange"
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
          <st-form-item label="店招" required validateStatus="error" :help="shopCoverImageValidateText">
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
        <a-col offset="1" :lg="23">
          <st-form-item>
            <template slot="label">
              营业状态<st-help-tooltip id="TBCS001" />
            </template>
            <a-radio-group v-model="shopData.shop_status">
              <a-radio
                v-for="item in Object.entries(shop.shop_status_add.value)"
                :key="+item[0]"
                :value="+item[0]">{{item[1]}}</a-radio>
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
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="到期时间" required>
            <a-select placeholder="请选择到期时间" v-decorator="[
              'buy_shop_id',
              { rules: [{ required: true, message: '请选择到期时间' }]}
            ]">
              <a-select-option
                v-for="(item, index) in unusedShops"
                :key="index"
                :value="item.buy_shop_id"
              >
                {{item.expire_time}}
              </a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label=" ">
            <st-button type="primary" @click="onHandleSubmit" :loading="addLoading.save">提交</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import { RuleConfig } from '@/constants/rule'
import { AddService } from './add.service'
import { cloneDeep } from 'lodash-es'
import { PatternService } from '@/services/pattern.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      pattern: PatternService,
      rules: RuleConfig,
      addService: AddService,
      userService: UserService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      serviceList: this.addService.serviceList$,
      addLoading: this.addService.loading$,
      shop: this.userService.shopEnums$,
      unusedShops: this.addService.unusedShops$
    }
  },
  data() {
    return {
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
        shop_cover_image: '',
        buy_shop_id: -1
      },
      // 电话校验方式 1为点击添加校验，0为点击提交校验
      phoneValidtorType: 1,
      addMap: {
        lat: '',
        lng: '',
        address: '',
        province: {},
        city: {},
        district: {}
      },
      shopMapValidateText: '',
      // 服务
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
      fileList: [],
      shopCoverImageValidateText: '',
      cropperModal: {}
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
    },
    shopMapIsOk() {
      return this.shopMapValidateText === ''
    }
  },
  methods: {
    fileChange(data) {
      if (data.length) {
        this.shopData.shop_cover_image = data[0].image_key
      } else {
        this.shopData.shop_cover_image = ''
      }
      this.shopCoverImageValidator()
    },
    addMapChange(data) {
      this.addMap = cloneDeep(data)
      this.shopData.province_id = data.province.id
      this.shopData.city_id = data.city.id
      this.shopData.district_id = data.district.id
      this.shopData.address = data.address
      this.shopData.lat = data.lat
      this.shopData.lng = data.lng
      this.shopMapValidator()
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
      this.shopMapValidator()
      this.form.validateFieldsAndScroll((err, values) => {
        this.phoneValidtorType = 1
        if (!err && this.shopCoverImageIsOk && this.shopMapIsOk) {
          this.shopData.shop_name = values.shop_name
          this.shopData.email = values.email
          this.shopData.buy_shop_id = values.buy_shop_id
          this.addService.save(this.shopData).subscribe(this.onSubmitSuccess)
        }
      })
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '添加成功'
      })
      this.$router.push({
        name: 'brand-setting-shop-list'
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
    },
    // 校验店招是否已上传
    shopCoverImageValidator() {
      this.shopCoverImageValidateText = this.shopData.shop_cover_image ? '' : '请上传店招'
    },
    // 校验地址
    shopMapValidator() {
      this.shopMapValidateText = this.shopData.lat ? '' : '请选择门店地址'
    }
  }
}
</script>
