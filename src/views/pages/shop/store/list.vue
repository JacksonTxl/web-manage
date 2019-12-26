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
          <a-select-option v-for="item in shelfStatus" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <st-input-search
          v-model="goodsName"
          placeholder="请输入商品名称"
          maxlength="50"
          @search="onSingleSearch('product_name', $event)"
        />
      </div>
      <div :class="basic('content')">
        <st-table
          :page="page"
          :columns="columns"
          :dataSource="list"
          @change="onTableChange"
          isExpand
        >
          <template slot="action" slot-scope="text, record">
            <st-table-actions sytle="width: 120px">
              <a @click="onShelf(record)">
                上架
              </a>
              <a @click="onEdit(record)">
                编辑
              </a>
              <a @click="onShelf(record)">
                下架
              </a>
              <a @click="onDel(record)">
                删除
              </a>
            </st-table-actions>
          </template>
        </st-table>
      </div>
    </st-panel>
  </st-panel-layout>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
import { ListService } from './list.service'
import { UserService } from '@/services/user.service'

export default {
  mixins: [tableMixin],
  name: 'PageShopStoreList',
  bem: {
    basic: 'page-shop-store-list'
  },
  serviceInject() {
    return {
      listService: ListService,
      userService: UserService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      loading: this.listService.loading$,
      goodsList: this.listService.goodsList$,
      cloudStore: this.userService.cloudStore$
    }
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
      columns: columns(vm)
    }
  },
  computed: {
    shelfStatus() {
      let list = []
      Object.entries(this.activityType.value).forEach(item => {
        list.push({ value: +item[0], label: item[1] })
      })
      return [{ value: -1, label: '所有上架状态' }, ...list]
    },

    goodsSortStatus() {
      let list = []
      this.goodsList.forEach(item => {
        console.log(item)
        list.push({ value: +item.category_id, label: item.category_name })
      })
      return [{ value: -1, label: '商品分类' }, ...list]
    }
  },
  mounted() {
    console.log(this.cloudStore)
  },
  methods: {
    // 设置状态&名称
    setSearchData() {
      let { product_name, shelves_status } = this.$searchQuery
      this.goodsName = product_name
      this.allUpShelfStatus = shelves_status || -1
    },
    // 新建商品
    onAddGoods() {
      this.$router.push({
        path: './add'
      })
    },
    // 上下架
    onShelf(record) {
      console.log(record)
      let status = record.product_shelves === 1 ? 2 : 1
      console.log(status)
      this.listService
        .onShelf(record.product_id, { shelves_status: status })
        .subscribe(res => {
          this.$router.reload()
        })
    },
    onDel(record) {
      this.$confirm({
        title: '提示',
        content: '确定停止该活动吗？活动停止后，未成团订单将自动关闭并退款。',
        onOk: () => {
          this.listService.delproduct(record.product_id).subscribe(res => {
            this.$router.reload()
          })
        },
        onCancel() {}
      })
    },
    onEdit(record) {
      this.$router.push({
        path: './edit',
        query: { id: record.product_id }
      })
    }
  }
}
</script>
