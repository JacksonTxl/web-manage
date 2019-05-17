<template>
  <div class="shop-member-crowd-index">
    <index v-model="indexData"></index>
    <st-panel>
      <div slot="title">
        <router-link tag="a" :to=" { name: 'brand-plugin-crowd-add'}">
          <st-button type="primary">新建人群</st-button>
        </router-link>

        <span class="shop-member-crowd-index-new__crowb_num" style>新建人群数量最多10个</span>
      </div>
      <st-table
        rowKey="id"
        :dataSource="table.list"
        :columns="table.columns1"
        @change="onChange"
        :pagination="pagination"
      >
        <div slot="shop_name1" slot-scope="text, record">
          <a-dropdown placement="bottomRight">
            <a class="ant-dropdown-link" href="#">定向运营</a>
            <a-menu slot="overlay">
              <a-menu-item style="width:130px">
                <a href="javascript:;">导出</a>
              </a-menu-item>
              <a-menu-item style="width:130px">
                <a href="javascript:;" @click="groupSMS(record)">群发短信</a>
              </a-menu-item>
              <a-menu-item style="width:130px">
                <a href="javascript:;">群发优惠</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <st-more-dropdown class="tree-opreation">
            <a-menu-item @click="addTreeNode(record)">添加</a-menu-item>
            <a-menu-item @click="editTreeNode(record)">编辑</a-menu-item>
            <a-menu-item @click="deleteTreeNode(record)">删除</a-menu-item>
          </st-more-dropdown>
        </div>
        <div
          slot="city_name"
          slot-scope="text"
          style="width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
        >
          <a-tooltip placement="topLeft" overlayClassName="shop-member-crowd-index-tooltip">
            <template slot="title">
              <span>{{text}}</span>
            </template>
            {{text}}
          </a-tooltip>
        </div>
      </st-table>
    </st-panel>
  </div>
</template>
<script>
import index from './private-components#/index'
export default {
  data() {
    return {
      indexData: { aa: 1 },
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50
      },
      table: {
        columns1: [
          {
            title: '人群名称',
            dataIndex: 'province_name',
            scopedSlots: { customRender: 'province_name' }
          },
          {
            title: '人群定义',
            width: '30%',
            dataIndex: 'city_name',
            scopedSlots: { customRender: 'city_name' }
          },
          {
            title: '人群总数',
            dataIndex: 'district_name'
          },
          {
            title: '更新时间',
            dataIndex: 'shop_name'
          },
          {
            title: '操作',
            width: '10%',
            dataIndex: 'shop_name1',
            scopedSlots: { customRender: 'shop_name1' }
          }
        ],
        list: [
          {
            id: 1,
            province_name: 1,
            city_name:
              '啊实打实大苏打实打实大苏打实打实大苏打士大夫十分三国杀是否啊大大啊实打实大苏打实打实大苏打实打实大苏打士大夫十分三国杀是否啊大大',
            district_name: 1,
            shop_name: 1,
            shop_name1: 1
          }
        ]
      }
    }
  },
  components: {
    index
  },
  methods: {
    onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter, data)
    },
    groupSMS(value) {
      console.log(value)
    },
    addTreeNode(value) {
      console.log(value)
    },
    editTreeNode(value) {
      console.log(value)
    },
    deleteTreeNode(value) {
      console.log(value)
    }
  },
  mounted() {}
}
</script>
