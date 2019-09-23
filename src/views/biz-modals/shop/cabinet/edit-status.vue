<template>
  <st-modal
    title="编辑储物柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.editCabinetStatus"
  >
    <st-form labelWidth="70px">
      <st-form-item label="使用状态">
        <a-radio-group v-model="cabinet_business_type">
          <a-radio
            :key="index"
            :value="+item.value"
            v-for="(item, index) in cabinetBusinessTypes"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { EditStatusService } from './edit-status.service'
// import { ruleOptions } from './open.config'
import { CABINET } from '@/constants/reception/cabinet'

export default {
  serviceInject() {
    return {
      messageService: MessageService,
      editStatusService: EditStatusService
    }
  },
  rxState() {
    return {
      loading: this.editStatusService.loading$,
      cabinetBusinessTypes: this.editStatusService.cabinetBusinessTypes$
    }
  },
  data() {
    // const form = this.$stForm.create()
    // const decorators = form.decorators(ruleOptions)
    return {
      CABINET,
      // form,
      // decorators,
      show: false,
      cabinet_business_type: this.useStatus
    }
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    useStatus: {
      type: [Number],
      default: 1
    }
  },
  mounted() {
    // this.cabinet_business_type = this.useStatus
  },
  methods: {
    onSubmit() {
      this.editStatusService
        .editCabinetStatus(this.id, {
          cabinet_business_type: this.cabinet_business_type
        })
        .subscribe(() => {
          this.messageService.success({
            content: '编辑柜子状态成功'
          })
          this.$emit('success')
          this.show = false
        })
    },
    onCancel() {
      this.show = false
    }
  }
}
</script>
