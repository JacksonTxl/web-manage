<template>
  <st-modal
    title="远程开柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.openCabinet"
  >
    <st-form :form="form" labelWidth="70px">
      <st-form-item label="柜子使用人">
        {{ userName }}({{ userMobile }})
      </st-form-item>
      <st-form-item label="开柜原因">
        <a-select
          placeholder="请选择开柜原因"
          v-decorator="decorators.reason_type"
          @change="changeReasons"
        >
          <a-select-option
            v-for="(item, index) in unlockReasons"
            :key="index"
            :value="+item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item labelFix v-if="isShowReason === CABINET_REASONS.OTHERS">
        <st-textarea
          v-decorator="decorators.description"
          placeholder="请输入开柜原因"
          maxlength="30"
          :autosize="{ minRows: 3 }"
        />
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { OpenService } from './open.service'
import { ruleOptions } from './open.config'
import { CABINET_REASONS } from '@/constants/reception/cabinet'

export default {
  serviceInject() {
    return {
      messageService: MessageService,
      openService: OpenService
    }
  },
  rxState() {
    return {
      loading: this.openService.loading$,
      unlockReasons: this.openService.unlockReasons$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      CABINET_REASONS,
      form,
      decorators,
      show: false,
      isShowReason: false
    }
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    userName: {
      type: String,
      default: ''
    },
    userMobile: {
      type: [Number, String]
    }
  },
  methods: {
    changeReasons(event) {
      this.isShowReason = event
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        this.openService.openCabinet(this.id, values).subscribe(() => {
          this.messageService.success({
            content: '开柜成功！'
          })
          this.show = false
          this.$emit('success')
        })
      })
    },
    onCancel() {
      this.show = false
    }
  }
}
</script>
