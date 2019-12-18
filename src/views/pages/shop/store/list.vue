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
export default {
  mixins: [tableMixin],
  name: 'PageShopStoreList',
  bem: {
    basic: 'page-shop-store-list'
  },
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      loading: this.listService.loading$
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
    // 新建商品
    onAddGoods() {
      this.$router.push({
        path: './add'
      })
    },
    // 上下架
    onShelf(record) {
      this.listService.onShelf(record.id).subscribe(res => {
        this.$router.record()
      })
    },
    onDel(record) {
      this.$confirm({
        title: '提示',
        content: '确定停止该活动吗？活动停止后，未成团订单将自动关闭并退款。',
        onOk: () => {
          this.listService.delproduct(record.id).subscribe(res => {
            this.$router.reload()
          })
        },
        onCancel() {}
      })
    },
    onEdit(record) {
      this.$router.push({
        path: './add',
        query: { id: record.id }
      })
    }
  }
}
</script>
