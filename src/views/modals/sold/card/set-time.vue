<template>
  <st-modal
  title="有效日期设置"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-card-settime">
    <div :class="settime('content')">
      <a-row :class="settime('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="卡名">{{info.card_name}}</st-info-item>
            <st-info-item label="当前额度">{{info.remain_amount}}</st-info-item>
            <st-info-item label="初始额度">{{info.init_amount}}</st-info-item>
            <st-info-item label="开卡日期">{{!info.is_open?'-':info.start_time}}</st-info-item>
            <st-info-item label="到期日期">{{!info.is_open?'-':info.end_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="会员姓名">{{info.member_name}}</st-info-item>
            <st-info-item label="手机号">{{info.mobile}}</st-info-item>
            <st-info-item label="订单号">{{info.order_id}}</st-info-item>
            <st-info-item label="订单状态">{{info.order_status | enumFilter('sold.order_status')}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr marginTop="0" marginBottom="0" />
      <st-form labelWidth="68px">
        <div :class="settime('settime')">
          <st-form-item v-if="!!info.is_open" label="到期日期" required labelGutter="12px">
            <a-date-picker
              style="width: 100%;"
              disabled
              format="YYYY-MM-DD hh:mm"
              placeholder="开始时间"
              :showToday="false"
            />
          </st-form-item>
          <st-form-item class="mg-b0" v-else label="开卡日期" required labelGutter="12px">
            <div :class="settime('time')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  style="width: 100%;"
                  disabled
                  format="YYYY-MM-DD hh:mm"
                  placeholder="开始时间"
                  :showToday="false"
                />
              </a-form-item>
              <span>&nbsp;&nbsp;至&nbsp;&nbsp;2020-02-21 14:20</span>
            </div>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0" labelGutter="12px">
            <a-textarea v-decorator="['description']" :autosize="{ minRows: 4, maxRows: 6 }" />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button type="primary">确认提交</st-button>
    </template>
  </st-modal>
</template>
<script>
import moment from 'moment'
import { SetTimeService } from './set-time.service'
export default {
  name: 'ModalSoldCardSettime',
  bem: {
    settime: 'modal-sold-card-settime'
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
    return {
      show: false
    }
  },
  created() {
    this.setTimeService.getInfo(this.id).subscribe()
  }
}
</script>
