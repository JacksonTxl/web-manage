<template>
  <st-modal
    :class="bModal()"
    :confirmLoading="loading.updateConstitution"
    width="60%"
    v-model="show"
    @ok="onSubmit"
    :title="`${type}设置`"
  >
    <a-textarea
      :class="bModal('textarea')"
      v-model="content"
      :autosize="{ minRows: 20 }"
      maxlength="5000"
      placeholder="请输入合同章程，支持换行，空格..."
    ></a-textarea>
    <div :class="['st-des', bModal('tip')]">{{ contentLength }} / 5000</div>
  </st-modal>
</template>

<script>
import { ConstitutionService } from './constitution.service'
import { MessageService } from '@/services/message.service'
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    lawContent: {
      type: String,
      default: ''
    }
  },
  bem: {
    bModal: 'modal-contract-constitution'
  },
  data() {
    return {
      show: true,
      content: ''
    }
  },
  serviceInject() {
    return {
      constitutionService: ConstitutionService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.constitutionService.loading$,
      productType: this.constitutionService.productType$
    }
  },
  created() {
    this.content = this.lawContent
  },
  computed: {
    contentLength() {
      return this.content.length
    }
  },
  methods: {
    onSubmit() {
      this.constitutionService
        .updateConstitution({
          id: this.id,
          brand_law_content: this.content
        })
        .subscribe(() => {
          this.messageService.success({
            content: '更新合同章程成功！'
          })
          this.show = false
          this.$emit('done')
        })
    }
  }
}
</script>
