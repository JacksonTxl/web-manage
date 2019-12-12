<template>
  <st-form :form="form" class="page-create-container" labelWidth="130px">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="小班课名称" required>
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
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="适用范围" required>
          <input type="hidden" v-decorator="decorators.scope_application" />
          <a-select @change="onCourseTypeChange" placeholder="请选择适用范围">
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
            :disabledDate="disabledDate"
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            v-decorator="decorators.date"
          ></a-range-picker>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="人数限制" required>
          <a-form-item>
            <st-input-number
              v-decorator="decorators.num_min"
              style="width:50px;display:inline"
            >
              <template slot="addonAfter">
                人
              </template>
            </st-input-number>
          </a-form-item>
          <a-form-item>
            <st-input-number
              v-decorator="decorators.num_max"
              style="width:50px;display:inline"
            >
              <template slot="addonAfter">
                人
              </template>
            </st-input-number>
          </a-form-item>

          ~
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="总课时" required>
          <st-input-number v-decorator="decorators.course_times">
            <template slot="addonAfter">
              节
            </template>
          </st-input-number>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="请假限制" required>
          <a-radio-group v-decorator="decorators.is_leave">
            <a-radio
              v-for="(item, index) in isAllowLeave"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-radio>
          </a-radio-group>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="图片">
          <div class="page-upload-container">
            <st-image-upload
              :list="fileList"
              @change="onImgChange"
            ></st-image-upload>
            <input type="hidden" v-decorator="decorators.image" />
            <div class="page-course-photo-des mg-l16">
              <div class="page-course-item">
                <div class="page-course-item-tip">1.</div>
                <div class="page-course-item-cont">
                  图片格式必须为：png,bmp,
                  jpeg,jpg,gif,建议使用png格式图片，以保存最佳效果
                </div>
              </div>
              <div class="page-course-item">
                <div class="page-course-item-tip">2.</div>
                <div class="page-course-item-cont">
                  建议尺寸为750px * 422px， 不可大于2M
                </div>
              </div>
            </div>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :xxl="10" :lg="14" :xs="22" :offset="1">
        <st-form-item label="课程介绍">
          <st-textarea
            v-decorator="decorators.description"
            :autosize="{ minRows: 10, maxRows: 16 }"
            placeholder="填写点什么吧"
            maxlength="500"
          />
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.addGroup">
            保存，开始设置教练信息
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

export default {
  name: 'create-personal-course',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.addService.loading$,
      rangeList: this.addService.rangeList$,
      isAllowLeave: this.addService.isAllowLeave$,
      personalCourseEnums: user.personalCourseEnums$
    }
  },
  components: {},
  created() {
    this.addService.getCourseGroupRangeList()
  },
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      fileList: []
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        values.course_begin_time = values.date[0].format('YYYY-MM-DD HH:mm')
        values.course_end_time = values.date[1].format('YYYY-MM-DD HH:mm')
        delete values.date
        this.addService.addGroup(values).subscribe(res => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext', res.course_id)
        })
      })
    },
    onImgChange(fileList) {
      this.form.setFieldsValue({
        image: fileList[0]
      })
    },
    onCourseTypeChange(category_id) {
      this.form.setFieldsValue({
        category_id
      })
    },
    onTrainingAimChange(train_aim) {
      this.form.setFieldsValue({
        train_aim
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
