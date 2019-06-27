<template>
    <div :class="inviation()">
        <MarkteingPluginTitle />
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
export default {
  name: 'PageBrandMarketingInviation',
  bem: {
    inviation: 'page-brand-marketing-inviation'
  },
  components: {
    MarkteingPluginTitle
  }
}
</script>
