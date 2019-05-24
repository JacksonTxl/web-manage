<template>
  <st-modal title="批量排期" @ok="save" v-model="show"></st-modal>
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
        id: 108,
        schedule_start_time: '2019-05-05',
        schedule_end_time: '2019-05-15',
        schedule_info: [
          {
            time_type: 0,
            timing: [
              {
                start_time: '09:00:00',
                end_time: '10:00:00'
              },
              {
                start_time: '20:00:00',
                end_time: '22:00:00'
              }
            ]
          },
          {
            time_type: 1,
            timing: [
              {
                start_time: '11:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '14:00:00',
                end_time: '15:00:00'
              }
            ]
          },
          {
            time_type: 2,
            timing: [
              {
                start_time: '15:00:00',
                end_time: '16:00:00'
              },
              {
                start_time: '20:00:00',
                end_time: '21:00:00'
              }
            ]
          },
          {
            time_type: 3,
            timing: [
              {
                start_time: '08:00:00',
                end_time: '09:00:00'
              },
              {
                start_time: '11:00:00',
                end_time: '13:00:00'
              }
            ]
          },
          {
            time_type: 4,
            timing: [
              {
                start_time: '09:00:00',
                end_time: '10:00:00'
              },
              {
                start_time: '19:00:00',
                end_time: '20:00:00'
              }
            ]
          },
          {
            time_type: 5,
            timing: [
              {
                start_time: '09:00:00',
                end_time: '10:00:00'
              },
              {
                start_time: '15:00:00',
                end_time: '16:00:00'
              }
            ]
          },
          {
            time_type: 6,
            timing: [
              {
                start_time: '09:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '20:00:00',
                end_time: '21:00:00'
              }
            ]
          }
        ]
      }
      this.service.inBacthSchedule(reqdata).subscribe(() => {
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
