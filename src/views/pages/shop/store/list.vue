<template>
  <st-panel app :class="basic()">
    <div :class="basic('search')">
      <div :class="basic('add')">
        <st-button
          icon="add"
          type="primary"
          @click="onAddGoods"
          v-if="auth.add"
        >
          新增商品
        </st-button>
      </div>
      <a-select
        :class="basic('select')"
        v-model="categoryId"
        placeholder="商品分类"
        @change="onSingleSearch('category_id', $event)"
        style="width: 130px"
      >
        <a-select-option v-for="item in goods_sort" :key="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
      <a-select
        :class="basic('select')"
        v-model="shelvesStatus"
        placeholder="所有上架状态"
        @change="onSingleSearch('shelves_status', $event)"
        style="width: 130px;margin: 0 12px;"
      >
        <a-select-option v-for="item in cloudStore" :key="item.value">
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
        rowKey="product_id"
        :scroll="{ x: 1200 }"
        :page="page"
        :columns="columns"
        :dataSource="list"
        @change="onTableChange"
      >
        <template slot="action" slot-scope="text, record">
          <st-table-actions sytle="width: 120px">
            <a
              @click="onEdit(record)"
              v-if="record.auth['shop:cloud_store:goods|edit']"
            >
              编辑
            </a>
            <a
              @click="onShelf(record)"
              v-if="record.auth['shop:cloud_store:goods|up']"
            >
              上架
            </a>

            <a
              @click="onShelf(record)"
              v-if="record.auth['shop:cloud_store:goods|down']"
            >
              下架
            </a>
            <a
              v-if="record.auth['shop:cloud_store:goods|del']"
              @click="onDel(record)"
            >
              删除
            </a>
          </st-table-actions>
        </template>
      </st-table>
    </div>
  </st-panel>
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
      listService: ListService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      loading: this.listService.loading$,
      goodsList: this.listService.goodsList$,
      cloudStore: this.listService.shelvesStatus$,
      auth: this.listService.auth$
    }
  },
  data(vm) {
    return {
      goodsName: '', // 商品名称
      shelvesStatus: -1, // 上架状态
      categoryId: -1, // 商品分类
      columns: columns(vm)
    }
  },
  computed: {
    goods_sort() {
      let list = []
      this.goodsList.forEach(item => {
        list.push({ value: +item.category_id, label: item.category_name })
      })
      return [{ value: -1, label: '所有商品分类' }, ...list]
    }
  },
  mounted() {
    this.setSearchData()
    console.log(this.auth)
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  methods: {
    // 设置状态&名称
    setSearchData() {
      let { product_name, shelves_status, category_id } = this.$searchQuery
      this.goodsName = product_name
      this.categoryId = category_id || -1
      this.shelvesStatus = shelves_status || -1
    },
    // 新建商品
    onAddGoods() {
      this.$router.push({
        path: './add'
      })
    },
    // 上下架
    onShelf(record) {
      let status = record.product_shelves === 1 ? 2 : 1
      this.$confirm({
        title: '提示',
        content: `确定${status === 1 ? '上架' : '下架'}该活动吗？`,
        onOk: () => {
          this.listService
            .onShelf(record.product_id, { shelves_status: status })
            .subscribe(res => {
              this.$router.reload()
            })
        },
        onCancel() {}
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
