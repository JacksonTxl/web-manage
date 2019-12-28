<template>
  <st-panel app initial>
    <div class="mg-b8">
      上课门店:共{{ groupInfo.coaches.count }}名{{ $c('coach') }}
    </div>
    <st-table
      :columns="basicColumns()"
      rowKey="id"
      :page="page"
      @change="onTableChange"
      :dataSource="groupInfo.coaches && groupInfo.coaches.list"
    ></st-table>
    <div :class="b('column')">
      <div :class="b('item')">
        <span :class="b('item-label')">转让设置：</span>
        <span :class="b('item-value')">
          {{ groupInfo.is_allow_transfer ? '支持转让' : '不支持转让' }}
        </span>
      </div>
      <div :class="b('item')">
        <span :class="b('item-label')">请假设置：</span>
        <span :class="b('item-value')">
          {{ groupInfo.is_leave | enumFilter('small_course.is_allow_leave') }}
        </span>
      </div>
      <div :class="b('item')">
        <span :class="b('item-label')">售卖渠道：</span>
        <span :class="b('item-value')">
          {{ groupInfo.sell_type | enumFilter('setting.sell_type') }}
        </span>
      </div>
    </div>
    <div :class="b('column')">
      <div :class="b('item')">
        <span :class="b('item-label')">报名时间：</span>
        <span :class="b('item-value')">{{ groupInfo.apply_time }}</span>
      </div>
      <div :class="b('item')">
        <span :class="b('item-label')">售价：</span>
        <span :class="b('item-value')">{{ groupInfo.sales_price }}</span>
      </div>
    </div>
    <div class="mg-t24">
      <span :class="b('item-label')">详细介绍：</span>
      <st-container class="mg-t8" v-if="groupInfo.description">
        <div v-html="groupInfo.description">{{ groupInfo.description }}</div>
      </st-container>
    </div>
  </st-panel>
</template>
<script>
import { basicColumns } from '../info#table.config'
import { BasicService } from './basic.service'
export default {
  name: 'SmallCourseBasicInfo',
  serviceInject() {
    return {
      basicService: BasicService
    }
  },
  rxState() {
    return {
      groupInfo: this.basicService.groupInfo$
    }
  },
  bem: {
    b: 'product-course-manage-group-info-basic'
  },
  data() {
    return {
      basicColumns,
      page: {} // 前端分页
    }
  },
  methods: {
    onTableChange(pagination, filters, sorter) {
      this.page = pagination
      this.page.current_page = pagination.current
      this.page.size = pagination.pageSize
    }
  }
}
</script>
