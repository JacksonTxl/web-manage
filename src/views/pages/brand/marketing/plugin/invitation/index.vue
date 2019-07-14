<template>
  <div :class="inviation()">
    <MarkteingPluginTitle :type="2"/>
    <st-panel
      :tabs="[
            { label: '数据', route: { name: 'brand-marketing-plugin-invitation-index-data' } },
            { label: '设置', route: { name: 'brand-marketing-plugin-invitation-index-setting' } }
            ]"
    >
      <router-view></router-view>
    </st-panel>
  </div>
</template>
<script>
import MarkteingPluginTitle from '../../components#/marketing-title'
import { IndexService } from './index.service'
export default {
  name: 'PageBrandMarketingInviation',
  bem: {
    inviation: 'page-brand-marketing-inviation'
  },
  serviceInject() {
    return {
      indexService: IndexService
    }
  },
  rxState() {
    return {
      authTabs: this.indexService.authTabs$
    }
  },
  components: {
    MarkteingPluginTitle
  }
}
</script>
