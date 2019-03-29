<template>
  <div style="padding: 30px">

    <st-button size="small" type="primary" round="round-small" ghost>你好</st-button>&nbsp;&nbsp;
    <st-button size="large" type="primary" round="round">round-default</st-button>&nbsp;&nbsp;
    <st-button type="primary" round="round-middle" ghost>round-middle</st-button>&nbsp;&nbsp;
    <st-button type="primary" round="round-large">预定 large</st-button>
    <st-button :loading="true" type="primary" round="round-large">预定 large</st-button>
    <mg></mg>
    <st-button type="primary" round="round-full">round-full</st-button>
    <mg></mg>
    <st-steps :nowStep="1" :step-list="stepList">
    </st-steps>
    <st-table
    :dataSource="data" :columns="columns">
    </st-table>
    <mg></mg>
    <a-row :gutter="8" style="border: 1px solid #3ea">
      <a-col span="2" style="text-align: right">
        会员卡名称
      </a-col>
      <a-col span="6" style="text-align: left;padding-left:16px">
        万晋健身房年卡
      </a-col>
    </a-row>
    <a-row>
      <a-col span="4">
        <st-info-item label="会员卡名称">万晋健身房年卡</st-info-item>
      </a-col>
      <a-col  span="4">
        <st-info-item label="所属会员">会员名称</st-info-item>
      </a-col>
      <a-col  span="4">
        <st-info-item label="类型">会员期限卡</st-info-item>
      </a-col>
      <a-col  span="4">
        <st-info-item label="类型">会员期限卡</st-info-item>
      </a-col>
    </a-row>
    <mg></mg>
    <a-row style="border: 1px solid #3ea">
      <st-info-item label="会员卡名称">万晋健身房年卡</st-info-item>
      <st-info-item label="所属会员">会员名称</st-info-item>
      <st-info-item label="类型">会员期限卡</st-info-item>
      <st-info-item label="有效期">2019-03-07 14:33 至 2019-09-06 14:33</st-info-item>
      <st-info-item label="会员卡名称">万晋健身房年卡</st-info-item>
      <st-info-item label="所属会员">会员名称</st-info-item>
      <st-info-item label="类型">会员期限卡</st-info-item>
      <st-info-item label="有效期">2019-03-07 14:33 至 2019-09-06 14:33</st-info-item>
    </a-row>
    <mg></mg>
    <a-row style="border: 1px solid #3ea">
      <st-info-item label="备注">
        <div style="width:300px">
          2019-03饭卡上风口浪尖啊是尽快发哈苏里科夫就好啦上课哦龙卷风撒了克己复礼撒咖啡机阿斯利康减肥啦上课肌肤浪费空间阿斯利康减肥啦上课肌肤-07 14:33 至 2019-09-06 14:33
        </div>
      </st-info-item>
    </a-row>
    <st-route-tabs :options="tabs"></st-route-tabs>
  </div>
</template>

<script>
import mg from './mg20.vue'
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'Joe Black',
  age: 42,
  address: 'London No. 1 Lake Park'
}, {
  key: '3',
  name: 'Jim Green',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park'
}]
export default {
  name: 'ZlxTest',
  data() {
    return {
      info: {
        id: 3333
      },
      data,
      columns: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            }, 0)
          }
        }
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value, record) => record.age.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            })
          }
        }
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value, record) => record.address.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            })
          }
        }
      }],
      stepList: [{
        title: '充值账号'
      }, {
        title: '绑定手机号'
      }, {
        title: '绑定其他手机号'
      }]
    }
  },
  computed: {
    cardId() {
      return this.info.id
    },
    tabs() {
      return [{ label: '会员卡详情', route: { name: 'test-zlx-info', query: { id: 3333 } } }, { label: '操作日志', route: { name: 'test-zlx-log', query: { id: 3333 } } }]
    }
  },
  components: {
    mg
  }
}
</script>

<style scoped>

</style>
