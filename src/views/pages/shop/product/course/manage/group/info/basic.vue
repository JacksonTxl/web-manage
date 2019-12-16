<template>
  <st-panel app initial>
    <div class="mg-b8">上课门店:共{{}}名教练</div>
    <st-table
      :columns="basicColumns()"
      rowKey="id"
      :pagination="null"
      :dataSource="groupInfo.coaches"
    ></st-table>
    <div :class="b('column')">
      <div :class="b('item')">
        <span :class="b('item-label')">转让设置：</span>
        <span :class="b('item-value')"></span>
      </div>
      <div :class="b('item')">
        <span :class="b('item-label')">请假设置：</span>
        <span :class="b('item-value')"></span>
      </div>
      <div :class="b('item')">
        <span :class="b('item-label')">售卖渠道：</span>
        <span :class="b('item-value')">{{}}</span>
      </div>
    </div>
    <div :class="b('column')">
      <div :class="b('item')">
        <span :class="b('item-label')">报名时间：</span>
        <span :class="b('item-value')">{{ groupInfo.course_time }}</span>
      </div>
      <div :class="b('item')">
        <span :class="b('item-label')">售价：</span>
        <span :class="b('item-value')">{{ groupInfo.sales_price }}</span>
      </div>
    </div>
    <div class="mg-t24">
      <span :class="b('item-label')">详细介绍：</span>
      <st-container class="mg-t8">
        {{ groupInfo.description }}
      </st-container>
    </div>
  </st-panel>
</template>
<script>
import { basicColumns } from '../info#table.config'
import { BasicService } from './basic.service'
export default {
  name: 'GroupCourseInfo',
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
      basicColumns
    }
  }
}
</script>
