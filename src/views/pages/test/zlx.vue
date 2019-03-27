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
  components: {
    mg
  }
}
</script>

<style scoped>

</style>
