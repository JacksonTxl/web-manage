<template>
  <div>
    <st-form-item label="有效时间" labelGutter="12px">
      <div
        v-if="emitData.open_type === 1"
      >{{moment(systemTime).format('YYYY-MM-DD HH:mm:ss')}} 至 {{moment(filterTime(cardInfo,emitData,systemTime)).format('YYYY-MM-DD HH:mm:ss')}}</div>
      <div
        v-if="emitData.open_type === 2"
      >{{cardInfo.open_type[0].automatic_num}}天内未开卡，则{{cardInfo.open_type[0].automatic_num}}+1天0:00自动开卡</div>
      <div v-if="emitData.open_type === 3" style="display: flex;justify-content: space-between;">
        <a-date-picker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择开始时间"
          @change="onChange"
          @ok="onOk"
        />
        <div v-if="flag">至</div>
        <div
          v-if="flag"
        >{{moment(filterTime(cardInfo,emitData,selectTime)).format('YYYY-MM-DD HH:mm:ss')}}</div>
      </div>
    </st-form-item>
  </div>
</template>

<script>
import { EffectiveTimeService } from './effective-time.service'
import moment from 'moment'
export default {
  serviceInject() {
    return {
      effectiveTimeService: EffectiveTimeService
    }
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value', 'emitData', 'cardInfo'],
  created() {
    this.getTime()
  },
  data() {
    return {
      systemTime: '',
      flag: false,
      selectTime: ''
    }
  },
  methods: {
    // 时间处理
    filterTime(cardInfo, emitData, systemTime) {
      if (cardInfo.card_type === 1 || cardInfo.card_type === 2) {
        return emitData.price.num * 24 * 60 * 60 * 1000 + systemTime
      } else if (cardInfo.card_type === 3) {
        return emitData.price.num * 24 * 60 * 60 * 1000 * 30 + systemTime
      } else if (cardInfo.card_type === 4) {
        return emitData.price.num * 24 * 60 * 60 * 1000 * 365 + systemTime
      }
    },
    moment,
    getTime() {
      this.effectiveTimeService.getTime().subscribe(res => {
        this.systemTime = res.info * 1000
      })
    },
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day')
    },

    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24),
        disabledMinutes: () => this.range(0, 60),
        disabledSeconds: () => [55, 56]
      }
    },
    onChange(value, dateString) {
      this.falg = false
      if (dateString) {
        this.selectTime = new Date(dateString).getTime()
      } else {
        this.flag = false
      }
    },
    onOk(value, dateString) {
      this.flag = true
      console.log(this.selectTime)
      this.$emit('filterChange', {
        effective_time: this.selectTime
      })
    }
  },
  watch: {
    'emitData.open_type': {
      handler() {
        if (this.emitData.open_type !== 3) {
          this.getTime()
          this.flag = false
        }
      }
    }
  }
}
</script>
