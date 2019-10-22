<template>
  <a-row>
    <a-col :lg="14">
      <st-form :form="form">
        <st-form-item label="活动标题" required>
          <a-input
            placeholder="请输入活动标题"
            v-decorator="decorators.activity_name"
          ></a-input>
        </st-form-item>
        <st-form-item label="活动时间" required>
          <a-range-picker
            v-decorator="decorators.date"
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            style="width: 100%"
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
        </st-form-item>
        <st-form-item label="活动海报" required>
          <st-image-upload
            width="96px"
            height="96px"
            :list="fileShareList"
            @change="onShareChangeGetImage"
            placeholder="上传图片"
          ></st-image-upload>
          <span>
            请上传jbg、png格式的图片
          </span>
        </st-form-item>
        <st-form-item label="活动人数" required>
          <st-input-number
            placeholder="若不限制活动人数，请填写0"
            v-decorator="decorators.member_limit_num"
          ></st-input-number>
        </st-form-item>
        <st-form-item label="活动详情" required>
          <st-editor v-model="content"></st-editor>
        </st-form-item>
      </st-form>
      <div v-di-view="{ name: 'step', show }">
        <st-button type="primary" @click="onSubmit">
          下一步1
        </st-button>
      </div>
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
    isUpdate: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if (!this.isCopy && !this.isUpdate) return
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
      this.$set(this.formInfo, 'imageUrl', imageFiles[0].image_url)
      this.$emit('change', this.formInfo)
      this.fileShareList = cloneDeep(imageFiles)
    },
    onSelectGetAddress(address) {
      this.$set(this.formInfo, 'address', address.address)
      this.$emit('change', this.formInfo)
      this.address = address
    },
    onSubmit() {
      this.form.validate().then(values => {
        let { activity_name, member_limit_num } = values
        const start_time = values.date[0].format('YYYY-MM-DD HH:mm')
        const end_time = values.date[1].format('YYYY-MM-DD HH:mm')
        const image = this.file
        const { address, province, city, district, lat, lng } = this.address
        const activity_id = this.isUpdate
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
    }
  }
}
</script>
