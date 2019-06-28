<template>
  <div :class="inviation()">
      {{settingInfo}}
    <st-form :form="form">
      <st-form-item label="功能开关" required>
        <a-switch defaultChecked/>
        <span>已开启</span>
        <span>（一旦开启，将会在用户端展示，如需关闭，请谨慎操作。）</span>
      </st-form-item>
      <st-form-item label="成功规则">每邀请1人成功购买卡项或课程（成功支付）</st-form-item>
      <st-form-item label="邀请人奖励" required>
        <div :class="inviation('coupon')">
          <span class="mg-r8">可获得</span>
          <st-input-number
            v-decorator="['aaa',{rules:[{required:true,message:'aaa要输入'}]}]"
            style="width:142px"
          >
            <span slot="addonAfter">张</span>
          </st-input-number>
          <span class="mg-l24">选择券</span>
          <st-coupon class="mg-l8 mg-r8" name="新人券"/>
          <st-button icon="anticon:plus">重新选择</st-button>
        </div>
      </st-form-item>
      <st-form-item label="被邀请人奖励" required>
        <div :class="inviation('coupon')">
          <span class="mg-r8">可获得</span>
          <st-input-number style="width:142px">
            <span slot="addonAfter">张</span>
          </st-input-number>
          <span class="mg-l24">选择券</span>
          <st-coupon class="mg-l8 mg-r8" name="新人券"/>
          <st-button icon="anticon:plus">重新选择</st-button>
        </div>
      </st-form-item>
      <st-form-item label="邀请海报">
        <st-card-bg-radio v-model="banner"/>
      </st-form-item>
      <st-form-item label=" ">
        <st-button type="primary" @click="onSubmit">保存</st-button>
      </st-form-item>
    </st-form>
  </div>
</template>
<script>
import { SettingService } from './setting.service'
export default {
  name: 'PageBrandMarketingInviationSetting',
  bem: {
    inviation: 'page-brand-marketing-inviation-setting'
  },
  serviceInject() {
    return {
      settingService: SettingService
    }
  },
  rxState() {
    return {
      settingInfo: this.settingService.settingInfo$
    }
  },
  data() {
    return {
      // 邀请海报
      banner: {
        image_id: 0,
        image_key: 'image/VZ0RGBwTX7FA1yKb.png',
        image_url: '',
        index: 1
      },
      form: this.$form.createForm(this),
      aaa: 111
    }
  },
  methods: {
    onSubmit() {
      this.indexService.setOpenStatus(false)
    }
  },
  created() {
    console.log(this.$route.params.from === 'data')
  },
  mounted() {

  }
}
</script>
