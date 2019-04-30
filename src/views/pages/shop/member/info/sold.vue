<template>
  <div>
    <st-t4>预约上课记录</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table :columns="classrecord" :pagination="false"></a-table>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>入场记录</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table :columns="admission" :pagination="false"></a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
const classrecord = [{
  title: '课程类型',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '课程名称',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '上课时间',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '上课教练',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '预约人数',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '预约状态',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '预约时间',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '操作',
  dataIndex: 'age',
  key: 'age'
}]

const admission = [{
  title: '入场门店',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '会员卡',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '入场时间',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '扣除次数',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '离场时间',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '临时储物柜',
  dataIndex: 'age',
  key: 'age'
}]
export default {
  data() {
    return {
      classrecord,
      admission
    }
  }
}
</script>
