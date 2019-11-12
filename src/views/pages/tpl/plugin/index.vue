<template>
  <st-panel-layout :class="bPage()">
    <marketing-title :type="TYPE.ACTIVITY"></marketing-title>
    <st-panel app>
      <div slot="title">
        <st-button type="primary" icon="add">
          新增活动
        </st-button>
        <st-button class="mg-l8">
          签到验票
        </st-button>
      </div>
      <div slot="actions">
        <!-- 默认需要绑定`全部`选项 在route-map.config.ts中配置queryOptions -->
        <!-- onSingleSearch tableMixin中的方法 -->
        <a-select
          placeholder="选择活动报名状态"
          v-model="$searchQuery.activity_status"
          :options="activityStatusOptions"
          @change="onSingleSearch('activity_status', $event)"
          style="width:160px"
        ></a-select>
        <!-- onKeywordsSearch 查询关键词 tableMixin中的方法  -->
        <st-input-search
          class="mg-l8"
          placeholder="请输入活动报名标题"
          @search="onKeywordsSearch('activity_name', $event)"
        ></st-input-search>
      </div>
      <st-table :dataSource="[]"></st-table>
    </st-panel>
  </st-panel-layout>
</template>

<script>
import MarketingTitle from '@/views/pages/brand/marketing/components#/marketing-title'
import { TYPE } from '@/constants/marketing/plugin'
import tableMixin from '@/mixins/table.mixin'

import { IndexService } from './index.service'
export default {
  bem: {
    // page-页面路由名称
    bPage: 'page-tpl-plugin-index'
  },
  components: {
    MarketingTitle
  },
  mixins: [tableMixin],
  serviceInject() {
    return {
      indexService: Indexervice
    }
  },
  rxState() {
    return {
      activityStatusOptions: this.indexService.activityStatusOptions$
    }
  },
  data() {
    return {
      TYPE
    }
  }
}
</script>
