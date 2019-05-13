<template>
  <div>
    <st-t4>卡项</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="9">
          <a-date-picker style="width: 224px;" placeholder="开卡日期"/>
          <a-select style="width: 160px;margin-left:12px" placeholder="请选择">
            <a-select-option :value="1">期限卡</a-select-option>
            <a-select-option :value="2">次卡</a-select-option>
            <a-select-option :value="3">储值卡</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="6"></a-col>
        <a-col :lg="9">
          <st-input-search placeholder="请输入会员卡名称" @change="searchMemberCard"/>
        </a-col>
      </a-col>
      <a-col :lg="24">
        <a-table :columns="cardItem" :dataSource="data" :scroll="{ x: 1750}">
          <span slot="cardstatus" slot-scope="text,record">
             <span
                v-if="record.cardstatus ==='有效'"
                class="effective"
              ></span>
              <span
                v-if="record.cardstatus ==='失效'"
                class="invalid"
              ></span>
              <span v-if="record.cardstatus === '已冻结'" class="frozen"></span>{{ text }}
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
   <!--
    <st-t4>课程</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="9">
          <a-date-picker style="width: 224px;" placeholder="购买日期"/>
          <a-select style="width: 160px;margin-left:12px" placeholder="请选择">
            <a-select-option :value="1">团课</a-select-option>
            <a-select-option :value="2">私教课</a-select-option>
            <a-select-option :value="3">私教小班课</a-select-option>
            <a-select-option :value="4">课程宝</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="6"></a-col>
        <a-col :lg="9">
          <st-input-search placeholder="请输入课程名称" @change="searchCourseName"/>
        </a-col>
      </a-col>
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
    </a-row>-->
  </div>
</template>

<script>
const cardItem = [
  {
    title: '合同编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '卡类型',
    dataIndex: 'cardType',
    key: 'cardType'
  },
  {
    title: '卡名称',
    dataIndex: 'cardName',
    key: 'cardName'
  },
  {
    title: '购卡场馆',
    dataIndex: 'cardAdress',
    key: 'cardAdress'
  },
  {
    title: '支持入场场馆',
    dataIndex: 'cg',
    key: 'cg'
  },
  {
    title: '购买额度',
    dataIndex: 'ed',
    key: 'ed'
  },
  {
    title: '剩余额度',
    dataIndex: 'syed',
    key: 'syed'
  },
  {
    title: '卡状态',
    dataIndex: 'cardstatus',
    key: 'cardstatus',
    scopedSlots: { customRender: 'cardstatus' }
  },
  {
    title: '开卡日期',
    dataIndex: 'kkdate',
    key: 'kkdate'
  },
  {
    title: '到期日期',
    dataIndex: 'dqdate',
    key: 'dqdate'
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
    id: 1,
    cardType: '类型1',
    cardName: '卡名1',
    cardAdress: 'New York No. 1 Lake Park',
    cg: '支持场馆1',
    ed: 10000,
    syed: 3000,
    cardstatus: '已冻结',
    kkdate: '2018-01-01',
    dqdate: '2019-02-02'
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
  },
  methods: {
    searchCourseName(e) {},
    searchMemberCard(e) {}
  }
}
</script>
