<template>
  <st-modal
    title="小班课预约设置"
    class="modal-personal-order-setting"
    v-model="show"
    @ok="save"
    @cancel="cancel"
    :confirmLoading="loading.editInfo"
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
              v-model="info.reserve_start"
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
              v-model="info.reserve_range"
            >
              <a-select-option
                v-for="(item, index) in reserveRanges"
                :key="+index"
                :value="+item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <span class="mg-l8">以内的私教课程，员工代预约不受此限制</span>
          </div>
        </st-form-item>
        <!-- 取消预约 -->
        <st-form-item label="取消预约">
          <div>
            <span>允许用户在私教课程开始前</span>
            <a-select
              class="mg-l8"
              style="width: 100px"
              v-model="info.cancel_reserve"
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
          <div class="st-des">
            （建议取消预约时间 >=
            提前预约时间，否则会造成取消课程预约后，其它用户无法再进行预约）
          </div>
        </st-form-item>
        <st-form-item label="签到方式">
          <a-checkbox
            :checked="!!info.is_sign"
            @change="onCheckboxChange('is_sign')"
          >
            支持用户自主签到
          </a-checkbox>
        </st-form-item>
        <st-form-item label="签到条件">
          <a-checkbox
            :checked="!!info.is_sign_entrance"
            @change="onCheckboxChange('is_sign_entrance')"
          >
            当天必须有入场记录(员工代签到不受此条件限制)
          </a-checkbox>
        </st-form-item>
        <st-form-item label="签到时间">
          <div>
            <span>开课</span>
            <a-select
              class="mg-l8"
              style="width: 120px"
              v-model="info.sign_time"
            >
              <a-select-option
                v-for="(item, index) in signTimes"
                :key="+index"
                :value="+item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <span class="mg-l8">允许签到，员工代签到不受此限制</span>
          </div>
        </st-form-item>
        <st-form-item label="旷课条件">
          <div>
            <span>课程结束后</span>
            <a-select
              class="mg-l8"
              style="width: 120px"
              v-model="info.absenteeism_limit"
            >
              <a-select-option
                v-for="(item, index) in absenteeismLimit"
                :key="+index"
                :value="+item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <span class="mg-l8">内,未签到</span>
          </div>
        </st-form-item>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { GroupReserveSettingService } from './reserve.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      settingService: GroupReserveSettingService
    }
  },
  rxState() {
    return {
      loading: this.settingService.loading$,
      reserveStarts: this.settingService.reserveStarts$,
      reserveRanges: this.settingService.reserveRanges$,
      cancelReserves: this.settingService.cancelReserves$,
      signTimes: this.settingService.signTimes$,
      absenteeismLimit: this.settingService.absenteeismLimit$,
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
    this.settingService.getInfo().subscribe(res => {
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
      this.settingService.editInfo({ ...this.info }).subscribe(() => {
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
