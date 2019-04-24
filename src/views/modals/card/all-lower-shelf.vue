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
  name: 'allLowerShelf',
  props: {
    a: {
      type: Array
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
        card_shop: []
      }
      self.a.map((item, index) => {
        data.card_shop.push({
          card_id: item.id,
          shelf_shop_id: item.shop_id
        })
      })
      console.log(data)
      this.$confirm({
        title: '批量下架',
        content: `确定下架会员卡吗？`,
        onOk() {
          self.aService.getListInfo(data).subscribe(state => {
            self.$emit('done', true)
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
