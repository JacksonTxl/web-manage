import { ID } from '@/api/v1/order/transaction/contract'
import moment from 'moment'
export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    ticket_name: {
      rules: [
        {
          required: true,
          message: '请输入票种名称'
        },
        {
          pattern: pattern.CN_EN_NUM('1-10'),
          message: '请输入1~10个字符'
        },
        {
          validator: (field: any, value: any, values: any) => {
            const ticketNames = vm.dataSource.map(
              (item: any) => item.ticket_name
            )
            if (ticketNames.includes(value)) {
              return '票种名称重复请重新输入'
            }
          }
        }
      ]
    },
    ticket_price: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请输入价格'
        }
      ]
    },
    ticket_total_num: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请输入票数'
        }
      ]
    },
    crowd_id: {
      rules: [
        {
          required: true,
          message: '请选择购买用户'
        }
      ]
    },
    buy_limit_min: {
      initialValue: 0,
      rules: [
        {
          required: true,
          message: '请输入最少份数'
        }
      ]
    },
    buy_limit_max: {
      initialValue: 0,
      rules: [
        {
          required: true,
          message: '请输入最大份数'
        }
      ]
    },
    group_buy_min: {},
    reduce_price: {},
    buy_time_limit: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择时间'
        }
      ]
    },
    buy_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            const startTime = moment(vm.stepForm.start_time)
            const endTime = moment(vm.stepForm.end_time)
            if (value[0].valueOf() < startTime.valueOf()) {
              return '售卖开始时间要大于活动开始时间'
            }
            if (value[1].valueOf() > endTime.valueOf()) {
              return '售卖结束时间要小于活动开始时间'
            }
          }
        }
      ]
    },
    ticket_remark: {}
  }
}
