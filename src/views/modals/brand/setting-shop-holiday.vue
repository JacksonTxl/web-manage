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
      />
      <add-holiday
        v-else
        :shopId="shopId"
        :shopName="shopName"
        :startTime="startTime"
        :endTime="endTime"
        :isHoliday="isHoliday"
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
  },
  methods: {
    onSuccess() {
      this.$emit('change')
      this.show = false
    }
  }
}
</script>
