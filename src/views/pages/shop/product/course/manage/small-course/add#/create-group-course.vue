<template>
  <st-form :form="form" class="page-create-container" labelWidth="130px">
    <a-row :gutter="8">
      <a-col :lg="11" :xs="22">
        <st-form-item required>
          <template slot="label">
            {{ $c('small_course') }}名称
          </template>
          <a-input
            placeholder="支持输入1~30个字的课程名称"
            maxlength="30"
            v-decorator="decorators.course_name"
            @change="onCourseNameChange"
          />
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="11" :xs="22">
        <st-form-item label="适用范围" required>
          <a-select
            @change="onCourseTypeChange"
            mode="multiple"
            :maxTagCount="3"
            v-decorator="decorators.scope_application"
            placeholder="请选择适用范围"
          >
            <a-select-option :value="-1" v-if="rangeList.length === 0">
              <span class="color-text-light">尚未设置,</span>
              <router-link to="/brand/setting/app/course/small-course-range">
                去设置
              </router-link>
            </a-select-option>
            <a-select-option
              v-else
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
      <a-col :lg="11" :xs="22">
        <st-form-item label="开班时间" required>
          <a-range-picker
            style="width:100%"
            :disabledDate="disabledDate"
            format="YYYY-MM-DD"
            v-decorator="decorators.date"
          ></a-range-picker>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8" style="height:56px;overflow:hidden">
      <a-col :lg="11" :xs="22">
        <st-form-item required>
          <template slot="label">
            人数限制
            <st-help-tooltip id="TSXBK001" />
          </template>
          <div :class="b('num-limit')">
            <a-form-item class="page-a-form">
              <st-input-number
                placeholder="请输入人数下限"
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
                placeholder="请输入人数上限"
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
      <a-col :lg="11" :xs="22">
        <st-form-item label="总课时" required>
          <st-input-number
            placeholder="请输入总课时"
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
    <a-row :gutter="8" v-show="$route.query.type === '1'">
      <a-col :lg="11" :xs="22">
        <st-form-item label="请假限制" required>
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
              <span class="mg-r8">允许请假时间,上课前</span>
              <st-input-number
                :min="1"
                :max="72"
                v-decorator="decorators.leave_hours"
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
    <a-row :gutter="8" v-show="$route.query.type === '2'">
      <a-col :lg="11" :xs="22">
        <st-form-item label="约课规则" required>
          每周最大约课节数
          <st-input-number
            style="width:100px"
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
      <a-col :lg="22" :xs="22">
        <st-form-item label="背景图" required>
          <card-bg-radio isSmallCourse v-model="bg_image" />
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :xxl="10" :lg="18" :xs="22">
        <st-form-item label="课程介绍">
          <st-editor v-decorator="decorators.description"></st-editor>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="11" :xs="22">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.addGroup">
            保存，开始设置{{ $c('coach') }}信息
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
import { AddService } from '../add.service'
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
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      rangeList: this.addService.rangeList$,
      isAllowLeave: this.addService.isAllowLeave$
    }
  },
  bem: {
    b: 'create-group-course'
  },
  components: {
    CardBgRadio,
    StEditor
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
      isShowLeaveContent: false
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        values.course_begin_time = values.date[0].format('YYYY-MM-DD HH:mm')
        values.course_end_time = values.date[1].format('YYYY-MM-DD HH:mm')
        values.small_course_type = this.$route.query.type
        values.image = this.bg_image
        values.img_type = this.bg_image.index
        if (!this.isShowLeaveContent) {
          delete values.leave_hours
          delete values.leave_limit
        }
        if (this.bg_image.index === 0) {
          values.img_type = 3
          if (!this.bg_image.image_url) {
            this.messageService.error({
              content: '请上传图片'
            })
            return
          }
        }
        delete values.date
        this.addService.addGroup(values).subscribe(res => {
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
