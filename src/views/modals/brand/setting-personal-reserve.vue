<template>
  <st-modal
    title="私教课预约设置"
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
            <a-select class="mg-l8" style="width: 100px" v-model="info.reserve_start">
              <a-select-option
                v-for="(item, index) in settingEnums.reserve_start.value"
                :key="+index"
                :value="+index"
              >{{item}}
              </a-select-option>
            </a-select>
            <span class="mg-l8" >到</span>
            <a-select class="mg-l8" style="width: 70px" v-model="info.reserve_range">
              <a-select-option
                v-for="(item, index) in settingEnums.reserve_range.value"
                :key="+index"
                :value="+index"
              >{{item}}
              </a-select-option>
            </a-select>
            <span class="mg-l8">以内的私教课程，员工代预约不受此限制</span>
          </div>
        </st-form-item>
        <!-- 取消预约 -->
        <st-form-item label="取消预约">
          <div>
            <span>允许用户在私教课程开始前</span>
            <a-select class="mg-l8" style="width: 100px" v-model="info.cancel_reserve">
              <a-select-option
                v-for="(item, index) in settingEnums.cancel_reserve.value"
                :key="+index"
                :value="+index"
              >{{item}}
              </a-select-option>
            </a-select>
            <span class="mg-l8" >取消预约，员工代取消不受此限制</span>
          </div>
          <div class="st-des">建议取消预约时间 >= 提前预约时间，否则会造成取消课程预约后，其它用户无法再进行预约）</div>
        </st-form-item>
        <!-- 预约提醒 -->
        <st-form-item label="预约提醒">
          <div>
            <span>在课程开始前</span>
            <a-select class="mg-l8" style="width: 100px" v-model="info.reserve_remind">
              <a-select-option
                v-for="(item, index) in settingEnums.reserve_remind.value"
                :key="+index"
                :value="+index"
              >{{item}}
              </a-select-option>
            </a-select>
            <span class="mg-l8" >提醒用户上课</span>
          </div>
        </st-form-item>
        <!-- 签到方式 -->
        <st-form-item label="签到方式">
          <a-checkbox :checked="!!info.is_sign" @change="onCheckboxChange('is_sign')">支持用户自主签到</a-checkbox>
        </st-form-item>
        <!-- 签到时间 -->
        <st-form-item label="签到时间">
          <div>
            <span>开课</span>
            <a-select class="mg-l8" style="width: 120px" v-model="info.sign_time">
              <a-select-option
                v-for="(item, index) in settingEnums.sign_time.value"
                :key="+index"
                :value="+index"
              >{{item}}
              </a-select-option>
            </a-select>
            <span class="mg-l8" >允许签到</span>
          </div>
        </st-form-item>
        <!-- 自动签到 -->
        <st-form-item label="自动签到">
          <div>
            <a-checkbox :checked="!!info.is_auto_sign" @change="onCheckboxChange('is_auto_sign')">支持系统自动签到，在</a-checkbox>
            <a-select class="mg-l8" style="width: 84px" v-model="info.auto_sign_limit">
              <a-select-option
                v-for="(item, index) in settingEnums.auto_sign_limit.value"
                :key="+index"
                :value="+index"
              >{{item}}
              </a-select-option>
            </a-select>
            <span class="mg-l8" >后系统自动将课程进行签到</span>
          </div>
          <div class="st-des">（凌晨03:00进行检查未签到课程，统一进行更新）</div>
        </st-form-item>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { PersonalReserveSettingService } from './setting-personal-reserve.service'
export default {
  serviceInject() {
    return {
      userService: UserService,
      messageService: MessageService,
      settingService: PersonalReserveSettingService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.settingService.loading$,
      settingEnums: user.settingEnums$
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
      this.settingService.update({ ...this.info }).subscribe(
        () => {
          this.messageService.success({
            content: '提交成功'
          })
          this.show = false
        }
      )
    }
  }
}
</script>
