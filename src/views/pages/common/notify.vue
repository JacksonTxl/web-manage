<template>
  <st-panel :class="bPage()" app initial :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        placeholder="请输入流水号或订单号查找"
        v-model="$searchQuery.search_number"
        @search="onKeywordsSearch('search_number', $event)"
      />
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { NotifyService } from './notify.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'CommonNotify',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-common-notify'
  },
  serviceInject() {
    return {
      service: NotifyService
    }
  },
  rxState() {
    return {
      authTabs: this.service.authTabs$
    }
  }
}
</script>
