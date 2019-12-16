<template>
  <st-panel app initial>
    <div>上课门店:共{{}}名教练</div>
    <st-table
      :columns="basicColumns()"
      rowKey="id"
      :dataSource="groupInfo.coaches"
    ></st-table>
    <div>
      <span>转让设置：</span>
      <span></span>
      <span>请假设置：</span>
      <span></span>
      <span>售卖渠道：</span>
      <span>{{}}</span>
    </div>
    <div>
      <span>报名时间：</span>
      <span>{{ groupInfo.course_time }}</span>
      <span>售价：</span>
      <span>{{ groupInfo.sales_price }}</span>
    </div>
    <div>
      <span>详细介绍：</span>
      <div>{{ groupInfo.description }}</div>
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
  data() {
    return {
      basicColumns
    }
  }
}
</script>
