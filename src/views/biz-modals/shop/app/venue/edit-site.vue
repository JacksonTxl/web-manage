<template>
  <st-modal title="编辑场地" @ok="save" v-model="show" width="668px">
    <st-form :form="form" labelWidth="67px" @submit="save">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="场地名称" required>
            <a-input
              placeholder="请输标签名称"
              :max="10"
              v-decorator="decorators.siteName"
            />
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { EditSiteService } from './edit-site.service'
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './edit-site.config'
export default {
  serviceInject() {
    return {
      service: EditSiteService,
      messageService: MessageService,
      pattern: PatternService
    }
  },
  name: 'newLable',
  props: {
    siteId: {
      type: Number,
      default() {
        return ''
      }
    },
    siteName: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
    }
  },
  mounted() {
    this.form.setFieldsValue({
      siteName: this.siteName
    })
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        const data = {
          site_id: this.siteId,
          site_name: values.siteName
        }
        this.service.editSite(data).subscribe(() => {
          this.$emit('success')
          this.messageService.success({ content: '修改成功' })
          this.show = false
        })
      })
    }
  }
}
</script>
