<template>
  <st-form :form="form" class="page-create-container" labelWidth="130px">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item required>
          <template slot="label">
            {{ $c('small_course') }}名称
          </template>
          <a-input
            placeholder="支持输入1~30个字的课程名称"
            maxlength="30"
            disabled
            v-decorator="decorators.course_name"
            @change="onCourseNameChange"
          />
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="适用范围" required>
          <a-select
            @change="onCourseTypeChange"
            mode="multiple"
            v-decorator="decorators.scope_application"
            placeholder="请选择适用范围"
          >
            <a-select-option
              v-for="item in rangeList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.setting_name }}
            </a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="开班时间" required>
          <a-range-picker
            style="width:100%"
            :disabledDate="disabledDate"
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            v-decorator="decorators.date"
          ></a-range-picker>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8" style="height:56px;overflow:hidden">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item required>
          <template slot="label">
            人数限制
            <st-help-tooltip id="TSXBK001" />
          </template>
          <div :class="b('num-limit')">
            <a-form-item class="page-a-form">
              <st-input-number
                v-decorator="decorators.num_min"
                :min="1"
                :max="49"
              >
                <template slot="addonAfter">
                  人
                </template>
              </st-input-number>
            </a-form-item>
            <span>~</span>
            <a-form-item class="page-a-form">
              <st-input-number
                v-decorator="decorators.num_max"
                :min="1"
                :max="50"
              >
                <template slot="addonAfter">
                  人
                </template>
              </st-input-number>
            </a-form-item>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="总课时" required>
          <st-input-number
            v-decorator="decorators.course_times"
            :min="1"
            :max="99999"
          >
            <template slot="addonAfter">
              节
            </template>
          </st-input-number>
        </st-form-item>
      </a-col>
    </a-row>
    <!-- 固定约课有的表单 -->
    <a-row :gutter="8" v-show="isShowLimitContent">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item required>
          <template slot="label">
            请假限制
            <st-help-tooltip id="TSXBK002" />
          </template>
          <a-radio-group
            v-decorator="decorators.is_leave"
            @change="onLimitChange"
          >
            <a-radio
              v-for="(item, index) in isAllowLeave"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-radio>
          </a-radio-group>
          <st-pop-container
            offset="122px"
            class="mg-t8"
            v-show="isShowLeaveContent"
          >
            <div class="mg-b8">
              <span class="mg-r8">允许请假时间,请假前</span>
              <st-input-number
                v-decorator="decorators.leave_hours"
                :min="1"
                :max="72"
                style="width:128px"
              >
                <template slot="addonAfter">
                  h
                </template>
              </st-input-number>
            </div>
            <div>
              <span class="mg-r8">请假上限节数</span>
              <st-input-number
                :min="1"
                v-decorator="decorators.leave_limit"
                style="width:178px"
              >
                <template slot="addonAfter">
                  节
                </template>
              </st-input-number>
            </div>
          </st-pop-container>
        </st-form-item>
      </a-col>
    </a-row>
    <!-- 自主约课有的表单内容 -->
    <a-row :gutter="8" v-show="!isShowLimitContent">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="约课规则" required>
          每周最大约课节数
          <st-input-number
            style="width:100px"
            :min="1"
            v-decorator="decorators.appointment_rights"
          >
            <template slot="addonAfter">
              节
            </template>
          </st-input-number>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="背景图" required>
          <card-bg-radio isSmallCourse v-model="bg_image" />
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :xxl="10" :lg="14" :xs="22" :offset="1">
        <st-form-item label="课程介绍">
          <st-editor
            v-decorator="decorators.description"
            @ready="onInitEditor"
          ></st-editor>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.editGroup">
            保存，开始设置{{ $c('coach') }}信息
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
import { EditService } from '../edit.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { ruleOptions } from '../form.config'
import { PatternService } from '@/services/pattern.service'
import CardBgRadio from '@/views/biz-components/card-bg-radio/card-bg-radio'
import StEditor from '@/views/biz-components/editor/editor'

export default {
  name: 'create-group-course',
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.editService.loading$,
      rangeList: this.editService.rangeList$,
      isAllowLeave: this.editService.isAllowLeave$
    }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  bem: {
    b: 'create-group-course'
  },
  components: { CardBgRadio, StEditor },
  mounted() {
    this.isShowLimitContent = this.$route.query.type === '1'
    this.$emit('onCourseNameChange', this.info.info.course_name)
    this.$emit('onCourseIdChange', this.info.info.course_id)
  },
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      bg_image: {
        image_id: 0,
        image_key: '',
        image_url: '',
        index: 1
      },
      isShowLeaveContent: false,
      isShowLimitContent: false
    }
  },
  methods: {
    onInitEditor() {
      this.$nextTick(this.setFieldsValue())
    },
    setFieldsValue() {
      const info = this.info.info
      this.form.setFieldsValue({
        course_name: info.course_name,
        scope_application: info.scope_application,
        date: info.course_begin_time
          ? [moment(info.course_begin_time), moment(info.course_end_time)]
          : [],
        num_min: info.num_min,
        num_max: info.num_max,
        course_times: info.course_times,
        is_leave: this.isShowLimitContent ? info.is_leave : undefined,
        leave_hours: this.isShowLimitContent ? info.leave_hours : undefined,
        leave_limit: this.isShowLimitContent ? info.leave_limit : undefined,
        appointment_rights: !this.isShowLimitContent
          ? info.appointment_rights
          : undefined,
        image: info.image
      })
      this.bg_image.index = info.img_type
      if (info.img_type === 3) {
        this.bg_image = info.image
        this.bg_image.index = 0
      }
      this.isShowLeaveContent = this.isShowLimitContent && info.is_leave === 1
    },
    save(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        values.id = this.info.info.course_id
        values.course_begin_time = values.date[0].format('YYYY-MM-DD HH:mm')
        values.course_end_time = values.date[1].format('YYYY-MM-DD HH:mm')
        values.small_course_type = this.$route.query.type
        values.image = this.bg_image
        values.img_type = this.bg_image.index
        if (this.bg_image.index === 0) {
          values.img_type = 3
        }
        delete values.date
        this.editService.editGroup(values).subscribe(res => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext', res.course_id)
        })
      })
    },
    onLimitChange(e) {
      this.isShowLeaveContent = e.target.value === 1
    },
    onCourseTypeChange(category_id) {
      this.form.setFieldsValue({
        category_id
      })
    },
    onCourseNameChange(e) {
      this.$emit('onCourseNameChange', e.target.value)
    },
    disabledDate(current) {
      return (
        current && current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')
      )
    }
  }
}
</script>
