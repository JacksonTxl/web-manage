<template>
  <div :class="basic()">
    <a-row :class="basic('action')">
      <a-col :span="12">
        <st-t2>预约基础设置</st-t2>
      </a-col>
      <a-col :span="12" class="ta-r">
        <st-info-action
          icon="edit"
          text="编辑"
          v-if="auth.edit"
          v-modal-link="{
            name: 'brand-app-venue-basic-setting',
            on: {
              change: onChange
            }
          }"
        />
      </a-col>
    </a-row>
    <st-t4 class="mg-t24">预约范围</st-t4>
    <div class="st-des">
      用户可预约{{
        info.venues_reserve_start | enumFilter('setting.reserve_start')
      }}
      到{{
        info.venues_reserve_end | enumFilter('setting.reserve_range')
      }}以内的场地，员工代预约不受此限制
    </div>
    <st-hr></st-hr>
    <st-t4>取消预约</st-t4>
    <div class="st-des">
      允许用户在场地预约开始前{{
        info.venues_cancel_limit | enumFilter('setting.cancel_reserve')
      }}取消预约，员工代取消不受此限制
    </div>
    <st-hr></st-hr>
  </div>
</template>
<script>
import { BasicSettingService } from './basic-setting.service'
import BrandAppVenueBasicSetting from '@/views/biz-modals/brand/app/venue/basic-setting'
export default {
  bem: {
    basic: 'brand-app-venue-basic-setting'
  },
  serviceInject() {
    return {
      basicSettingService: BasicSettingService
    }
  },
  rxState() {
    return {
      info: this.basicSettingService.info$,
      loading: this.basicSettingService.loading$,
      auth: this.basicSettingService.auth$
    }
  },
  modals: {
    BrandAppVenueBasicSetting
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    onChange() {
      this.$router.push({})
    }
  }
}
</script>
