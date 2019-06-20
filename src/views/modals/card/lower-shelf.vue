<template>
  <div></div>
</template>
<script>
import { LowerShelfService } from './lower-shelf.service'
export default {
  serviceInject() {
    return {
      aService: LowerShelfService
    }
  },
  name: 'lowerShelf',
  props: {
    a: {
      type: Object
    },
    flag: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  created() {
    this.showDeleteConfirm()
  },
  methods: {
    showDeleteConfirm() {
      let self = this
      let data = {
        id: self.a.card_id
      }
      this.$confirm({
        title: '单个下架',
        content: `确定下架《${self.a.card_name}》会员卡吗？`,
        onOk() {
          if (self.flag) {
            self.aService.setCardsDepositBrandOffLine(data).subscribe(state => {
              self.$emit('done', true)
            })
          } else {
            self.aService.getListInfo(data).subscribe(state => {
              self.$emit('done', true)
            })
          }
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>
