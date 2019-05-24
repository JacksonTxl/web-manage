<template>
  <st-modal title="添加排期" @ok="save" v-model="show"></st-modal>
</template>

<script>
import { addService } from './add.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      service: addService,
      messageService: MessageService
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    save() {
      let reqdata = {
        coach_id: 108,
        schedule_info: [
          {
            schedule_time: '2019-05-07 00:00:00',
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
      this.service.addSchedule(reqdata).subscribe(() => {
        console.log('ok')
        this.messageService.success({ content: '添加成功' })
        this.show = false
        // this.$router.push({ query: {
        //   size: 51,
        //   page: 1
        // },
        // force: true })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
