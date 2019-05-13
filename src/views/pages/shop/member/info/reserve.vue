<template>
  <div>
    <st-t4>卡项</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table :columns="cardItem" :dataSource="data" :scroll="{ x: 1750}"></a-table>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>课程</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table :columns="course" :dataSource="data"></a-table>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>租赁柜</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table :columns="leaseArk" :dataSource="data"></a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const cardItem = [
  {
    title: '合同编号',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '卡类型',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '卡名称',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '购卡场馆',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '支持入场场馆',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '购买额度',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '剩余额度',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '卡状态',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '开卡日期',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '到期日期',
    dataIndex: 'address',
    key: 'address'
  }
]
const course = [
  {
    title: '合同编号',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '课程类型',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '课程名',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '上课教练',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '教练等级',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '购买课时',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '剩余课时',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '状态',
    dataIndex: 'age',
    key: 'age'
  }
]
const leaseArk = [
  {
    title: '合同编号',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '类型',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '租赁柜号',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '租赁天数',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '剩余天数',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '状态',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '起租日期',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '到期日期',
    dataIndex: 'age',
    key: 'age'
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
export default {
  data() {
    return {
      data,
      cardItem,
      course,
      leaseArk
    }
  }
}
</script>
