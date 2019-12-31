<template>
  <st-modal
    title="场地预约设置"
    class="modal-personal-order-setting"
    v-model="show"
    @ok="save"
    @cancel="cancel"
    :confirmLoading="loading.update"
  >
    <div>
      <st-form :form="form" labelWidth="56px">
        <!-- 预约范围 -->
        <st-form-item label="预约范围">
          <div>
            <span>用户可预约</span>
            <a-select
              class="mg-l8"
              style="width: 100px"
              v-model="info.venues_reserve_start"
            >
              <a-select-option
                v-for="(item, index) in reserveStarts"
                :key="+index"
                :value="+item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <span class="mg-l8">到</span>
            <a-select
              class="mg-l8"
              style="width: 70px"
              v-model="info.venues_reserve_end"
            >
              <a-select-option
                v-for="(item, index) in reserveRanges"
                :key="+index"
                :value="+item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <span class="mg-l8">以内的场地，员工代预约不受此限制</span>
          </div>
        </st-form-item>
        <!-- 取消预约 -->
        <st-form-item label="取消预约">
          <div>
            <span>允许用户在场地预约开始前</span>
            <a-select
              class="mg-l8"
              style="width: 100px"
              v-model="info.venues_cancel_limit"
            >
              <a-select-option
                v-for="(item, index) in cancelReserves"
                :key="+index"
                :value="+item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <span class="mg-l8">取消预约，员工代取消不受此限制</span>
          </div>
        </st-form-item>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { BasicSettingService } from './basic-setting.service'
import { APP_TYPE } from '@/constants/venue'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      settingService: BasicSettingService
    }
  },
  rxState() {
    return {
      loading: this.settingService.loading$,
      reserveStarts: this.settingService.reserveStarts$,
      reserveRanges: this.settingService.reserveRanges$,
      cancelReserves: this.settingService.cancelReserves$,
      signTimes: this.settingService.signTimes$,
      autoSignLimits: this.settingService.autoSignLimits$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      info: {}
    }
  },
  created() {
    this.settingService
      .getInfo({ application_type: APP_TYPE.VENUES })
      .subscribe(res => {
        this.info = res.info
      })
  },
  methods: {
    onCheckboxChange(index) {
      this.info[index] = +!this.info[index]
    },
    cancel() {
      this.show = false
    },
    save() {
      this.settingService
        .update({ ...this.info, application_type: APP_TYPE.VENUES })
        .subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
          this.show = false
          this.$emit('change')
        })
    }
  }
}
</script>
