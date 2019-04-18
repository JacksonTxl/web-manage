<template>
  <div></div>
</template>
<script>
import { ConfimDelService } from './confirm-del.service'
export default {
  serviceInject() {
    return {
      aService: ConfimDelService
    }
  },
  name: 'confirmDel',
  props: {
    title: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
      // entityCardIdRule: ['entityCardId', { rules: [ { message: '请输入实体卡号' }] }],
      // physicalIdRule: ['physicalID', { rules: [{ message: '请录入物理ID' }] }]
    }
  },
  created() {
    console.log(this.aService)
    this.showDeleteConfirm()
  },
  methods: {
    showDeleteConfirm() {
      console.log('{{title}}', this.title)
      let self = this
      this.$confirm({
        title: '确认要删除?',
        content: `确认删除此${self.title.title}会员卡吗`,
        onOk() {
          self.aService
            .getListInfo(self.title.id)
            .subscribe(state => {
              console.log(123123, state)
            })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>
