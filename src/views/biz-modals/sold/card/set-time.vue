<template>
  <st-modal
    title="有效日期设置"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-card-settime"
  >
    <div :class="settime('content')">
      <a-row :class="settime('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="卡名">{{ info.card_name }}</st-info-item>
            <st-info-item label="当前额度">
              {{ info.remain_amount }}
            </st-info-item>
            <st-info-item label="初始额度">{{ info.init_amount }}</st-info-item>
            <st-info-item label="开卡日期">
              {{ info.start_time | timeFormatFilter }}
            </st-info-item>
            <st-info-item label="到期日期">
              {{ info.end_time | timeFormatFilter }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名">{{ info.member_name }}</st-info-item>
            <st-info-item label="手机号">{{ info.mobile }}</st-info-item>
            <st-info-item label="订单号">{{ info.order_id }}</st-info-item>
            <st-info-item label="订单状态" v-if="info.order_status">
              {{ info.order_status | enumFilter('sold.order_status') }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr marginTop="0" marginBottom="0" />
      <st-form :form="form" labelWidth="68px">
        <div :class="settime('settime')">
          <st-form-item
            v-if="!!info.is_open"
            label="到期日期"
            required
            labelGutter="12px"
          >
            <a-date-picker
              :disabledDate="disabledEndDate"
              v-decorator="decorators.end_time"
              style="width: 100%;"
              format="YYYY-MM-DD HH:mm"
              :showTime="{ format: 'HH:mm' }"
              placeholder="到期日期"
              :allowClear="false"
              :showToday="false"
            />
          </st-form-item>
          <st-form-item
            class="mg-b0"
            v-else
            label="开卡日期"
            required
            labelGutter="12px"
          >
            <div :class="settime('time')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  @change="onStartTimeChange"
                  v-decorator="decorators.start_time"
                  style="width: 188px;"
                  format="YYYY-MM-DD HH:mm"
                  :showTime="{ format: 'HH:mm' }"
                  placeholder="开始时间"
                  :allowClear="false"
                  :showToday="false"
                />
              </a-form-item>
              <span style="width:158px;">
                &nbsp;&nbsp;至&nbsp;&nbsp;{{ endTime }}
              </span>
            </div>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0" labelGutter="12px">
            <a-textarea
              v-model="description"
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button type="primary" @click="onSubmit" :loading="loading.setTime">
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>
<script>
import { SetTimeService } from './set-time.service'
import { cloneDeep } from 'lodash-es'
import { ruleOptions } from './set-time.config'
export default {
  name: 'ModalSoldCardSettime',
  bem: {
    settime: 'modal-sold-card-settime'
  },
  serviceProviders() {
    return [SetTimeService]
  },
  serviceInject() {
    return {
      setTimeService: SetTimeService
    }
  },
  rxState() {
    return {
      info: this.setTimeService.info$,
      loading: this.setTimeService.loading$
    }
  },
  props: ['id'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      endTime: '-',
      description: ''
    }
  },
  filters: {
    timeFormatFilter(data) {
      return data ? moment(data).format('YYYY-MM-DD HH:mm') : '-'
    }
  },
  methods: {
    disabledEndDate(endValue) {
      return (
        endValue.valueOf() < this.info.server_time * 1000 ||
        endValue.valueOf() > moment(this.info.end_time).valueOf()
      )
    },
    disabledStartDate(startValue) {
      return startValue.valueOf() < this.info.server_time * 1000
    },
    onStartTimeChange(data) {
      let start = cloneDeep(data)
      this.endTime = start
        .add(this.info.time_limit_init, 's')
        .format('YYYY-MM-DD HH:mm')
    },
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          let data = values.end_time || values.start_time
          this.setTimeService
            .setTime(
              {
                time: data.format('YYYY-MM-DD HH:mm'),
                description: this.description
              },
              this.id
            )
            .subscribe(res => {
              this.show = false
              this.$emit('success')
            })
        }
      })
    }
  },
  created() {
    this.setTimeService.getInfo(this.id).subscribe()
  }
}
</script>
