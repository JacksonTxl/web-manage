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
        card_shop: []
      }

      self.a.map((item, index) => {
        data.card_shop.push({
          card_id: item.id,
          shop_id: item.shop_id
        })
      })
      console.log(data)
      this.$confirm({
        title: '批量下架',
        content: `确定下架所选的${data.card_shop.length}张${
          self.flag ? '储值卡' : '会员卡'
        }吗？`,
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
