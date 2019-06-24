<template>
  <div class="shop-member-crowd-index">
    <index v-model="crowdIndexInfo.info.important_crowd"></index>
    <st-panel>
      <div slot="title">
        <router-link
          tag="a"
          :to=" { name: 'brand-markting-plugin-crowd-add'}"
          v-if="crowdIndexInfo.info.list.length <= 10"
        >
          <st-button type="primary" v-if="auth.add">
            <a-icon type="plus"/>新建人群
          </st-button>
        </router-link>
        <st-button v-else type="primary" @click="newCrowd('人群数量已达到上限！')">新建人群</st-button>

        <span class="shop-member-crowd-index-new__crowb_num" style>新建人群数量最多10个</span>
      </div>
      <st-table
        rowKey="id"
        :dataSource="crowdIndexInfo.info.list"
        :columns="table.columns"
        @change="onChange"
        :pagination="false"
      >
        <div slot="shop_name1" slot-scope="text, record">
          <a-dropdown placement="bottomRight">
            <a class="ant-dropdown-link" href="#">定向运营</a>
            <a-menu slot="overlay">
              <a-menu-item style="width:130px">
                <a href="javascript:;">导出</a>
              </a-menu-item>
              <a-menu-item style="width:130px">
                <a href="javascript:;" @click="newCrowd('功能正在开发中，敬请期待')">群发短信</a>
              </a-menu-item>
              <a-menu-item style="width:130px">
                <a href="javascript:;" @click="newCrowd('功能正在开发中，敬请期待')">群发优惠</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <st-more-dropdown class="tree-opreation">
            <a-menu-item v-if="record.auth['shop:member:crowd|export']" @click="addTreeNode(record)">导出</a-menu-item>
            <a-menu-item>
              <router-link v-if="record.auth['shop:member:crowd|edit']" tag="a" :to=" { name: 'brand-markting-plugin-crowd-add',query:{id:record.id}}">编辑</router-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['shop:member:crowd|del']" @click="deleteTreeNode(record)">删除</a-menu-item>
          </st-more-dropdown>
        </div>
        <div
          slot="description"
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
import { IndexService } from './index.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      aService: IndexService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      crowdIndexInfo: this.aService.crowdIndexInfo$,
      auth: this.aService.auth$
    }
  },
  data() {
    return {
      table: {
        columns: [
          {
            title: '人群名称',
            dataIndex: 'crowd_name',
            scopedSlots: { customRender: 'crowd_name' }
          },
          {
            title: '人群定义',
            width: '30%',
            dataIndex: 'description',
            scopedSlots: { customRender: 'description' }
          },
          {
            title: '人群总数',
            dataIndex: 'num'
          },
          {
            title: '更新时间',
            dataIndex: 'updated_time'
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
    newCrowd(data) {
      this.messageService.warning({ content: data })
    },
    onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter, data)
    },
    groupSMS(value) {
      console.log(value)
    },
    addTreeNode(value) {
      console.log(value)
    },
    refresh() {
      this.$router.push({ query: {}, force: true })
    },
    deleteTreeNode(value) {
      console.log(value)
      let self = this
      this.aService.delCrowdBrandCrowd(value.id).subscribe(res => {
        self.refresh()
      })
    }
  },
  mounted() {}
}
</script>
