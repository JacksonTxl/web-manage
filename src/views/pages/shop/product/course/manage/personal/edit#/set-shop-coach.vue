<template>
  <st-form :form="form" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="课程名称">
          <a-input
            placeholder="课程名称"
            disabled
            v-decorator="ruleConfig.courseName"
          />
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item>
          <template slot="label">
            上课{{ $c('coach') }}
            <st-help-tooltip id="TSCPC001" />
          </template>
          <div class="page-shop-coach-container-coach">
            <input type="hidden" v-decorator="ruleConfig.coachIds" />
            <select-coach
              :shopIds="info.shop_ids"
              :coachIds="info.coach_ids"
              @change="onSelectCoachChange"
            />
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setShop">
            保存，继续设置售卖价格
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { EditService } from '../edit.service'
import { MessageService } from '@/services/message.service'
import SelectCoach from '@/views/fragments/coach/select-coach'
import { RuleConfig } from '@/constants/course/rule'

export default {
  name: 'SetShopCoach',
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService,
      ruleConfig: RuleConfig
    }
  },
  rxState() {
    return {
      loading: this.editService.loading$
    }
  },
  components: {
    SelectCoach
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: this.$stForm.create()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setFieldsValue()
    })
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validate().then(() => {
        const data = this.getData()
        this.editService.setShop(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext')
        })
      })
    },
    onSelectCoachChange(coachIds) {
      this.form.setFieldsValue({
        coach_ids: coachIds
      })
    },
    setFieldsValue() {
      const info = this.info
      this.form.setFieldsValue({
        course_name: info.course_name,
        coach_ids: info.coach_ids
      })
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.$searchQuery.id
      return data
    }
  }
}
</script>
