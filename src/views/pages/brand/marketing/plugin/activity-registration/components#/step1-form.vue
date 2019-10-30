<template>
  <a-row>
    <a-col :lg="14">
      <st-form :form="form" :class="b()">
        <st-form-item label="活动标题" required>
          <a-input
            placeholder="请输入活动标题"
            v-decorator="decorators.activity_name"
          ></a-input>
        </st-form-item>
        <st-form-item label="活动时间" required>
          <a-range-picker
            v-decorator="decorators.date"
            :disabledDate="disabledDate"
            :class="b('picker')"
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
          />
        </st-form-item>
        <st-form-item label="活动地点" required>
          <map-button
            addText="设置活动地点"
            :lat="address.lat"
            :lng="address.lng"
            :province="address.province"
            :city="address.city"
            :district="address.district"
            :address="address.address"
            @select="onSelectGetAddress"
          ></map-button>
          <div class="color-danger" v-if="isAddress">请选择地址</div>
        </st-form-item>
        <st-form-item label="活动海报" required>
          <st-image-upload
            width="220px"
            height="140px"
            :list="fileShareList"
            @change="onShareChangeGetImage"
            placeholder="上传图片"
          >
            <template v-slot:description>
              <p>请上传jbg、png格式的图片</p>
              <p>大小不超过2M，建议尺寸16:9</p>
            </template>
          </st-image-upload>
          <div class="color-danger" v-if="isPoster">请上传活动海报</div>
        </st-form-item>
        <st-form-item label="活动人数" required>
          <st-input-number
            placeholder="若不限制活动人数，请填写0"
            :min="0"
            :max="9999"
            v-decorator="decorators.member_limit_num"
          ></st-input-number>
        </st-form-item>
        <st-form-item label="活动详情" required>
          <st-editor @input="onChangeEditor" v-model="content"></st-editor>
          <div class="color-danger" v-if="isEditor">请输入活动详情</div>
        </st-form-item>
        <div v-di-view="{ name: 'step', show }">
          <st-button type="primary" @click="onSubmit">
            下一步
          </st-button>
        </div>
      </st-form>
    </a-col>
    <a-col :lg="10"></a-col>
  </a-row>
</template>

<script>
import { ruleOptions } from './form.config'
import { PatternService } from '@/services/pattern.service'
import MapButton from '@/views/biz-components/map-button/map-button'
import StEditor from '@/views/biz-components/editor/editor'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { CopyService } from '../copy.service'
import { EditService } from '../edit.service'
export default {
  name: 'Step1Form',
  bem: {
    b: 'step-form-activity'
  },
  // serviceProviders() {
  //   return [CopyService]
  // },
  serviceInject() {
    return {
      copyService: CopyService,
      editService: EditService,
      pattern: PatternService
    }
  },
  rxState() {
    const { defaultForm$ } = this.copyService
    return {
      defaultForm$
    }
  },
  data() {
    const that = this
    const form = this.$stForm.create({
      onValuesChange(props, values) {
        that.$nextTick().then(() => {
          that.formInfo = { ...that.formInfo, ...that.form.getFieldsValue() }
          that.$emit('change', that.formInfo)
        })
      }
    })
    const decorators = form.decorators(ruleOptions)
    return {
      isEditor: false,
      isPoster: false,
      isAddress: false,
      form,
      formInfo: {},
      decorators,
      fileShareList: [],
      address: {},
      content: ''
    }
  },
  props: {
    isCopy: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if (!this.isCopy && !this.isEdit) return
    this.initForm()
  },
  components: {
    MapButton,
    StEditor
  },
  watch: {
    content(newValue, oldValue) {
      this.$set(this.formInfo, 'content', newValue)
      this.$emit('change', this.formInfo)
    }
  },
  methods: {
    moment,
    onChangeEditor() {
      this.isEditor = this.content.length === 0
      return this.content.length === 0
    },
    onChangePoster() {
      this.isPoster = this.fileShareList.length === 0
      return this.fileShareList.length === 0
    },
    onChangeAddress() {
      this.isAddress = !!!this.address.address
      return !!!this.address.address
    },
    initForm() {
      this.$nextTick().then(() => {
        const date = [
          moment(this.defaultForm$.start_time),
          moment(this.defaultForm$.end_time)
        ]
        this.content = this.defaultForm$.description
        this.fileShareList.push(this.defaultForm$.image)
        this.$set(this.formInfo, 'imageUrl', this.defaultForm$.image.image_url)
        const {
          address,
          lat,
          lng,
          district,
          province,
          city
        } = this.defaultForm$
        this.address = {
          address,
          lat,
          lng,
          district,
          province,
          city
        }
        this.$set(this.formInfo, 'address', address)
        this.$emit('change', this.formInfo)
        this.form.setFieldsValue({
          activity_name: this.defaultForm$.activity_name,
          date,
          member_limit_num: this.defaultForm$.member_limit_num
        })
      })
    },
    onShareChangeGetImage(imageFiles) {
      // 如果是编辑应该把原来image_id传过去
      if (this.defaultForm$.image && this.isEdit) {
        imageFiles[0].image_id = this.defaultForm$.image.image_id
      }
      this.$set(this.formInfo, 'imageUrl', imageFiles[0].image_url)
      this.$emit('change', this.formInfo)
      this.fileShareList = cloneDeep(imageFiles)
      this.onChangePoster()
    },
    onSelectGetAddress(address) {
      this.$set(this.formInfo, 'address', address.address)
      this.$emit('change', this.formInfo)
      this.address = address
      this.onChangeAddress()
    },
    disabledDate(current) {
      return (
        current && current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')
      )
    },
    onSubmit() {
      this.form
        .validate()
        .then(values => {
          if (
            this.onChangeEditor() &&
            this.onChangePoster() &&
            this.onChangeAddress()
          )
            return
          let { activity_name, member_limit_num } = values
          const start_time = values.date[0].format('YYYY-MM-DD HH:mm')
          const end_time = values.date[1].format('YYYY-MM-DD HH:mm')
          const image = this.file
          const { address, province, city, district, lat, lng } = this.address
          const activity_id = this.isEdit
            ? this.defaultForm$.activity_id
            : undefined
          const form = {
            activity_id,
            address,
            province,
            city,
            district,
            lat,
            lng,
            end_time,
            start_time,
            activity_name,
            member_limit_num: +member_limit_num,
            description: this.content,
            image: this.fileShareList[0]
          }
          this.$emit('step-submit', form)
        })
        .catch(() => {
          if (
            this.onChangeEditor() &&
            this.onChangePoster() &&
            this.onChangeAddress()
          )
            return
        })
    }
  }
}
</script>
