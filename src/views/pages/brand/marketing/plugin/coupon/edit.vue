<template>
  <coupon-add :isEditMode="true" :info="info"></coupon-add>
</template>
<script>
import CouponAdd from './add'
import { EditService } from './edit.service'
export default {
  rxState() {
    return {
      info: this.editService.info$
    }
  },
  serviceInject() {
    return {
      editService: EditService
    }
  },
  components: {
    CouponAdd
  }
}
</script>
