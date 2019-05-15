<template>
  <st-panel app :class="listClass()">
    <div slot="title">
      <st-input-search
      @search="onSearch"
      v-model="query.course_name"
      placeholder="课程包名称"
      style="width: 290px;"/>
    </div>
    <div :class="listClass('operation')">
      <st-button type="primary" @click="onAddPackage">新增门店课程包</st-button>
      <div :class="listClass('select-group')">
        <a-select v-model="query.package_type" @change="onTypeChange" :class="listClass('select')" style="width: 160px">
          <a-select-option :value="-1">全部分类</a-select-option>
          <a-select-option
          v-for="(item,index) in Object.entries(package_course.package_type.value)"
          :key="index"  :value="+item[0]">{{item[1]}}</a-select-option>
        </a-select>
        <a-select v-model="query.shelf_status" @change="onStatusChange" :class="listClass('select')" style="width: 160px">
          <a-select-option :value="-1">全部状态</a-select-option>
          <a-select-option
          v-for="(item,index) in Object.entries(package_course.shelf_status.value)"
          :key="index"  :value="+item[0]">{{item[1]}}</a-select-option>
        </a-select>
      </div>
    </div>
    <st-table
    :page="query.page"
    :columns="columns"
    @change="onPageChange"
    rowKey="package_course_id"
    :dataSource="list">
      <template slot="package_type" slot-scope="text">
        {{text | enumFilter('package_course.package_type')}}
      </template>
      <template slot="valid_time" slot-scope="text,record">
        {{text}} {{record.valid_time_unit | enumFilter('package_course.valid_time_unit')}}
      </template>
      <template slot="shelf_status" slot-scope="text,record">
        {{text | enumFilter('package_course.shelf_status')}}
        <a-tooltip placement="top" v-if="record.shelf_status===1&&Date.now()<record.start_time*1000">
          <template slot="title">
            <span>暂未开始售卖</span>
          </template>
          <span><st-icon type="help"/></span>
        </a-tooltip>
        <a-tooltip placement="top" v-if="record.shelf_status===1&&Date.now()>record.end_time*1000">
          <template slot="title">
            <span>支持售卖到期</span>
          </template>
          <span><st-icon type="help"/></span>
        </a-tooltip>
      </template>
      <div slot="action" slot-scope="text,record">
        <a @click="onEdit(record.package_course_id,record.package_type)">编辑</a>
        <a-divider type="vertical"></a-divider>
        <a @click="onDetail(record.package_course_id)">详情</a>
        <st-more-dropdown class="mgl-16">
          <a-menu-item @click="onsale">上架</a-menu-item>
          <a-menu-item @click="offsale">下架</a-menu-item>
          <a-menu-item >
            <a-popconfirm title="确认删除该权限么?" @confirm="onDelete(record.package_course_id)">
              <a>删除</a>
            </a-popconfirm>
          </a-menu-item>
        </st-more-dropdown>
      </div>
    </st-table>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'
const columns = [{
  title: '课程包名称',
  dataIndex: 'course_name'
}, {
  title: '课程包分类',
  dataIndex: 'package_type',
  scopedSlots: { customRender: 'package_type' }
}, {
  title: '节数',
  dataIndex: 'total_times',
  scopedSlots: { customRender: 'total_times' }
}, {
  title: '有效期',
  dataIndex: 'valid_time',
  scopedSlots: { customRender: 'valid_time' }
}, {
  title: '支持售卖时间',
  dataIndex: 'sale_time',
  scopedSlots: { customRender: 'sale_time' }
}, {
  title: '售卖价格（元）',
  dataIndex: 'price',
  scopedSlots: { customRender: 'price' }
}, {
  title: '状态',
  dataIndex: 'shelf_status',
  scopedSlots: { customRender: 'shelf_status' }
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  name: 'ShopPackageList',
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      listService: ListService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      package_course: this.userService.packageCourseEnums$,
      query: this.routeService.query$
    }
  },
  bem: {
    listClass: 'page-shop-package-list'
  },
  data() {
    return {
      columns,
      type: ['', 'unlimit', 'range', 'fix']
    }
  },
  methods: {
    onAddPackage() {
      console.log('add')
    },
    onTypeChange(data) {
      this.$router.push({ query: { ...this.query, package_type: data } })
    },
    onStatusChange(data) {
      this.$router.push({ query: { ...this.query, shelf_status: data } })
    },
    onPageChange(data) {
      this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize } })
    },
    onSearch(data) {
      this.$router.push({ query: { ...this.query, course_name: data } })
    },
    onEdit(id, type) {
      this.$router.push({
        path: `/shop/product/course/manage/package/edit-${this.type[type]}-package`,
        query: { id }
      })
    },
    onDetail(id) {
      console.log(id)
    },
    onsale() {

    },
    offsale() {

    },
    onDelete(id) {
      console.log(id)
    }
  }
}
</script>
