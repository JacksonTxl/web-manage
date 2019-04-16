<template>
  <a-modal
    :class="bModal()"
    :confirmLoading="loading.updateConstitution"
    width="60%"
    v-model="show"
    @ok="onSubmit"
    title="会员卡合同章程设置"
  >
    <a-textarea
      :class="bModal('textarea')"
      v-model="content"
      :autosize="{ minRows: 20, maxRows: 100 }"
      placeholder="请输入合同章程，支持换行，空格..."
    ></a-textarea>
    <div :class="bModal('count')">{{contentLength}} / 5000</div>
  </a-modal>
</template>

<script>
import { ConstitutionService } from './constitution.service'
import { MessageService } from '@/services/message.service'
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  bem: {
    bModal: 'modal-contract-constitution'
  },
  data() {
    return {
      show: true
    }
  },
  serviceInject() {
    return {
      constitutionService: ConstitutionService,
      messageService: MessageService
    }
  },
  subscriptions() {
    return {
      content: this.constitutionService.content$,
      loading: this.constitutionService.loading$
    }
  },
  created() {
    this.constitutionService.getConstitutionInfo(this.id).subscribe()
  },
  computed: {
    contentLength() {
      return this.content.length
    }
  },
  methods: {
    onSubmit() {
      const htmlContent = this.content
        .replace(/\r\n/g, '<br>')
        .replace(/\n/g, '<br>')
        .replace(/\s/g, '&nbsp;')
      this.constitutionService
        .updateConstitution({
          id: this.id,
          brand_law_content: htmlContent
        })
        .subscribe(() => {
          this.messageService.success({
            content: '更新合同章程成功！'
          })
          this.show = false
        })
    }
  }
}
</script>
