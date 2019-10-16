<template>
  <st-panel :class="bPage()" app initial>
    <header :class="bPage('header')">
      <a-input-search
        placeholder="输入票号，用户姓名，手机号进行搜索"
        @search="onSingleSearch('keyword', $event)"
      >
        <a-button type="primary" slot="enterButton">搜索</a-button>
      </a-input-search>
    </header>
    <main :class="bPage('main')">
      <checkin-table />
      <!-- <checkin-guide /> -->
    </main>
    <main :class="bPage('main')">
      <!-- <checkin-table /> -->
      <checkin-guide />
    </main>
  </st-panel>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import CheckinGuide from '@/views/pages/brand/marketing/components#/checkin-guide.vue'
import CheckinTable from '@/views/pages/brand/marketing/components#/checkin-table.vue'
export default {
  name: 'CheckInList',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-activity-checkin'
  },
  components: {
    CheckinGuide,
    CheckinTable
  },
  data() {
    return {}
  }
}
</script>
