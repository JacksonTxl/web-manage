<template>
  <st-modal
    title="门店放假设置"
    v-model="show"
    :footer="null"
    size="small"
  >
    <div>
      <edit-holiday v-if="isHoliday"></edit-holiday>
      <add-holiday v-else></add-holiday>
    </div>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import AddHoliday from './setting#/add-holiday'
import EditHoliday from './setting#/edit-holiday'
export default {
  props: {
    shopId: {
      type: [Number, String],
      default: 0
    },
    shopName: {
      type: String,
      default: ''
    },
    startTime: {
      type: Object,
      default: () => {
        return moment()
      }
    },
    endTime: {
      type: Object,
      default: () => {
        return moment()
      }
    },
    isHoliday: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: true
    }
  },
  components: {
    AddHoliday,
    EditHoliday
  }
}
</script>
