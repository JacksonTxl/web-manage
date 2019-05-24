<template>
  <st-modal title="编辑排期" @ok="save" v-model="show"></st-modal>
</template>

<script>
import { editService } from './edit.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      service: editService,
      messageService: MessageService
    }
  },
  data() {
    return {
      show: false
    }
  },
  props: {
    id: {
      type: Number,
      default: 108
    }
  },
  methods: {
    save() {
      let date = {
        schedule_info: [
          {
            id: 1878109257794,
            schedule_time: '2019-05-08 00:00:00',
            timing: [
              {
                start_time: '10:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '13:00:00',
                end_time: '14:00:00'
              }
            ]
          }
        ]
      }
      this.service.editSchedule(this.id, date).subscribe(res => {
        console.log('ok', res)
        this.messageService.success({ content: '编辑成功' })
        this.show = false
      })
    },
    getInfo() {
      let date = {
        start_time: '2019-05-01',
        end_time: '2019-05-23'
      }

      this.service.editScheduleInfo(this.id, date).subscribe(res => {
        console.log('ok', res)
      })
    }
  },
  created() {
    console.log('sha')
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
</style>
