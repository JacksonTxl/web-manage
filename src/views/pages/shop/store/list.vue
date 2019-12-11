<template>
  <st-panel-layout>
    <st-panel app initial :class="basic()">
      <div :class="basic('search')">
        <div :class="basic('add')">
          <!--做权限-->
          <st-button icon="add" type="primary" @click="onAddGoods">
            新增商品
          </st-button>
        </div>
        <a-select
          :class="basic('select')"
          v-model="goodsSort"
          placeholder="商品分类"
          style="width: 130px"
        >
          <a-select-option v-for="item in goodsSortStatus" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <a-select
          :class="basic('select')"
          v-model="allUpShelfStatus"
          placeholder="所有上架状态"
          style="width: 130px;margin: 0 12px;"
        >
          <a-select-option v-for="item in ShelfStatus" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <st-input-search
          v-model="goodsName"
          placeholder="请输入商品名称"
          maxlength="50"
        />
      </div>
      <div :class="basic('content')">
        <st-table
          rowKey="id"
          :columns="columns"
          :dataSource="list"
          :isExpand="true"
        ></st-table>
        <template slot="action" slot-scope="text, record">
          <st-table-actions sytle="width: 120px">
            <a @click="onUpShelf(record)">
              上架
            </a>
            <a @click="onEdit(record)">
              编辑
            </a>
            <a @click="onStopShelf(record)">
              下架
            </a>
            <a @click="onDel(record)">
              删除
            </a>
          </st-table-actions>
        </template>
      </div>
    </st-panel>
  </st-panel-layout>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
export default {
  mixins: [tableMixin],
  name: 'PageShopStoredList',
  bem: {
    basic: 'page-shop-stored-list'
  },
  data(vm) {
    return {
      goodsName: '', // 商品名称
      allUpShelfStatus: -1, // 上架状态
      goodsSort: -1, // 商品分类

      activityType: {
        value: { 1: '已上架', 3: '未上架', 4: '待上架' }
      },
      goodsSortType: {
        value: { 1: '上衣', 3: '裙子', 4: '马丁靴' }
      },
      columns: columns(vm),
      list: [
        {
          id: '1',
          activity_name: '父级列表',
          product_type: '娱乐',
          support_sales: '线下',
          activity_time: '以上架',
          activity_state: '10',
          group_total: '90',
          group_success_total: '10',
          children: [
            {
              id: '2',
              activity_name: '子级列表',
              product_type: '娱乐',
              support_sales: '线下',
              activity_time: '以上架',
              activity_state: '10',
              group_total: '90',
              group_success_total: '10'
            },
            {
              id: '5',
              activity_name: '子级列表',
              product_type: '娱乐',
              support_sales: '线下',
              activity_time: '以上架',
              activity_state: '60',
              group_total: '90',
              group_success_total: '30'
            }
          ]
        },
        {
          id: '3',
          activity_name: '父级列表',
          product_type: '娱乐',
          support_sales: '线下',
          activity_time: '以上架',
          activity_state: '10',
          group_total: '90',
          group_success_total: '10',
          children: [
            {
              id: '9',
              activity_name: '子级列表',
              product_type: '娱乐',
              support_sales: '线下',
              activity_time: '以上架',
              activity_state: '10',
              group_total: '90',
              group_success_total: '10'
            },
            {
              id: '6',
              activity_name: '子级列表',
              product_type: '娱乐',
              support_sales: '线下',
              activity_time: '以上架',
              activity_state: '60',
              group_total: '90',
              group_success_total: '30'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ShelfStatus() {
      let list = []
      Object.entries(this.activityType.value).forEach(item => {
        list.push({ value: +item[0], label: item[1] })
      })
      return [{ value: -1, label: '所有上架状态' }, ...list]
    },
    goodsSortStatus() {
      let list = []
      Object.entries(this.goodsSortType.value).forEach(item => {
        list.push({ value: +item[0], label: item[1] })
      })
      return [{ value: -1, label: '商品分类' }, ...list]
    }
  },
  mounted() {
    console.log(this.allUpShelfStatus)
  },
  methods: {
    rowClassName(record, index) {
      let id = record && record.id
      let has = this.showList.includes(id)
      let className = ''
      if (index % 2 !== 0) {
        className = has ? 'evengb shadow' : 'evengb'
      } else {
        className = has ? 'shadow' : ''
      }
      if (record && record.children) {
        Color = className
        return className
      } else {
        let name = Color
        return name.indexOf('shadow') === -1 ? name : name.replace('shadow', '')
      }
    },
    onShow(list) {
      this.showList = list
      this.rowClassName()
    },
    onshow() {
      console.log('时间触发')
    },
    onTableChange() {
      console.log(1)
    },
    // 新建商品
    onAddGoods() {
      console.log(1)
    },
    // 上架
    onUpShelf() {
      console.log('上架')
    },
    // 下架
    onStopShelf() {
      console.log('下架')
    },
    onDel() {
      let that = this
      this.$confirm({
        title: '提示',
        content: '确定停止该活动吗？活动停止后，未成团订单将自动关闭并退款。',
        onOk() {
          that.listService.stopGroup(record.id).subscribe(res => {
            that.$router.reload()
          })
        },
        onCancel() {}
      })
    },
    onEdit() {
      console.log('编辑')
    }
  }
}
</script>
