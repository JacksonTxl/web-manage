<template>
  <st-modal
    title="门店放假设置"
    v-model="show"
    :footer="null"
    size="small"
  >
    <div>
      <edit-holiday
        v-if="isHoliday"
        :shopId="shopId"
        :shopName="shopName"
        :holidayTime="holidayTime"
        @success="onSuccess"
      />
      <add-holiday
        v-else
        :shopId="shopId"
        :shopName="shopName"
        @success="onSuccess"
      />
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
    holidayTime: {
      type: Object,
      default() {
        return {}
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
  },
  methods: {
    onSuccess() {
      this.$emit('change')
      this.show = false
    }
  }
}
</script>
