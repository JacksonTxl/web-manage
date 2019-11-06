import { forEach } from 'lodash-es'
import { ID } from '@/api/v1/order/transaction/contract'
import moment from 'moment'
import { ACTIVITY_STATUS } from '@/constants/brand/marketing'
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
          message: '请输入1~10个英文，中文字符'
        },
        {
          validator: (field: any, value: any, values: any) => {
            const ticketNames = vm.dataSource.map(
              (item: any) => item.ticket_name
            )
            // 当为设置票种的时候且活动不是已发布时，进行票种名称重复校验
            if (
              vm.formData.activity_status !== ACTIVITY_STATUS.PUBLISHED &&
              !vm.isSetting &&
              ticketNames.includes(value)
            ) {
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
        },
        {
          validator: (field: any, value: any, values: any) => {
            let ticketTotalNum = 0
            if (vm.formData && Array.isArray(vm.formData.ticket_list)) {
              vm.formData.ticket_list.forEach((item: any) => {
                if (vm.ticket && item.ticket_id === vm.ticket.ticket_id) {
                  ticketTotalNum = item.ticket_total_num
                }
              })
            }
            if (
              vm.ticket &&
              vm.ticket.ticket_id &&
              vm.formData.activity_status === 1 &&
              value < ticketTotalNum
            ) {
              return '编辑票种时，票数只能增加不能减少'
            }
          }
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
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请输入最少份数'
        },
        {
          validator: (field: any, value: any, values: any) => {
            // 票种为免费票团购优惠没有
            if (+values.ticket_price > 0 && +value > +values.ticket_total_num) {
              return '单次购买最低张数应小于票的总数'
            }
          }
        }
      ]
    },
    buy_limit_max: {
      initialValue: 1,
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (+value > +values.ticket_total_num) {
              return '单次购买最高张数应小于票的总数'
            }
            if (+values.buy_limit_min > 0 && +value < +values.buy_limit_min) {
              return `最大购买张数应大于最低购买张数${values.buy_limit_min}`
            }
          }
        }
      ]
    },
    is_group_buy: {
      initialValue: 1
    },
    group_buy_min: {
      initialValue: 1,
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (Number.isNaN(value) || Number.isNaN(values.ticket_total_num)) {
              return
            } else {
              if (value > values.ticket_total_num) {
                return '单次购买超过张数应小于票的总数'
              }
            }
            if (
              +value < +values.buy_limit_min ||
              +value > +values.buy_limit_max
            ) {
              return `单次购买区间在${values.buy_limit_min} - ${
                values.buy_limit_max
              }`
            }
          }
        }
      ]
    },
    reduce_price: {
      initialValue: 1,
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (Number.isNaN(value) || Number.isNaN(values.ticket_price)) return
            if (+value > +values.ticket_price) {
              return '每张减的价格应小于票的原价'
            }
          }
        }
      ]
    },
    buy_time_limit: {
      initialValue: 0,
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
            if (vm.formData.activity_status === ACTIVITY_STATUS.PUBLISHED)
              return
            const endTime = moment(vm.stepForm.end_time)
            if (
              value &&
              value.length &&
              value[0].valueOf() > endTime.valueOf()
            ) {
              return `售卖开始时间要早于活动结束时间${endTime.format(
                'YYYY-MM-DD  HH:mm'
              )}`
            }
            if (
              value &&
              value.length &&
              value[1].valueOf() > endTime.valueOf()
            ) {
              return `售卖结束时间要早于活动结束时间${endTime.format(
                'YYYY-MM-DD  HH:mm'
              )}`
            }
          }
        }
      ]
    },
    ticket_remark: {}
  }
}
