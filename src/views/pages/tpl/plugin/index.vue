<template>
  <st-panel-layout :class="bPage()">
    <marketing-title :type="TYPE.ACTIVITY"></marketing-title>
    <st-panel app>
      <div slot="title">
        <st-button @click="onAdd" type="primary" icon="add">
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
          :options="activityStatusOptions$"
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
      <!-- scroll x 根据表格的实际内容宽度而定，列比较少的可以小些或者不要，列多的设的大些 -->
      <!-- onTableChange为  tableMixin方法 -->
      <!-- 使用loading态 -->
      <st-table
        :scroll="{ x: 1200 }"
        rowKey="id"
        :dataSource="list$"
        :columns="columns"
        :page="page$"
        :loading="loading$.getList"
        @change="onTableChange"
      >
        <st-text
          slot="activity_status"
          slot-scope="text, record"
          :status="{
            error: record.activity_status.id === ACTIVITY_STATUS.END,
            success:
              record.activity_status.id === ACTIVITY_STATUS.PUBLISHED ||
              record.activity_status.id === ACTIVITY_STATUS.STARTED,
            default:
              record.activity_status.id === ACTIVITY_STATUS.DRAFT ||
              record.activity_status.id === ACTIVITY_STATUS.CANCEL
          }"
        >
          {{ text.name }}
        </st-text>
        <st-table-actions slot="actions" slot-scope="text, record">
          <a
            v-if="record.auth['brand:activity:sign_up|edit']"
            @click="onEdit(record)"
          >
            编辑
          </a>
          <a
            v-if="record.auth['brand:activity:sign_up|promotion']"
            @click="onGeneralize(record)"
          >
            推广
          </a>
          <a
            v-if="record.auth['brand:activity:sign_up|end']"
            @click="onStop(record)"
          >
            取消
          </a>
        </st-table-actions>
      </st-table>
    </st-panel>
  </st-panel-layout>
</template>

<script>
import MarketingTitle from '@/views/pages/brand/marketing/components#/marketing-title'
import { TYPE } from '@/constants/marketing/plugin'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './index.config'
import { IndexService } from './index.service'
/**
 * 使用枚举值 引入常量
 */
import { ACTIVITY_STATUS } from '@/constants/marketing/activity'

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
      indexService: IndexService
    }
  },
  rxState() {
    /**
     * @type {IndexService}
     */
    const { activityStatusOptions$, list$, loading$, page$ } = this.indexService
    return {
      activityStatusOptions$,
      list$,
      loading$,
      page$
    }
  },
  data() {
    return {
      TYPE,
      ACTIVITY_STATUS
    }
  },
  computed: {
    columns
  },
  methods: {
    onAdd() {
      this.$router.push({
        path: './add'
      })
    },
    onEdit(record) {
      this.$router.push({
        path: './edit',
        query: { id: record.id }
      })
    }
  }
}
</script>
