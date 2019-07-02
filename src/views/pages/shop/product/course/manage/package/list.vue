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
      <router-link to="./add-select">
        <st-button type="primary" v-if="auth.add" @click="onAddPackage" icon="add">新增门店课程包</st-button>
      </router-link>
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
    :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
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
        <a v-if="record.auth['shop:product:package_course|edit']" @click="onEdit(record.package_course_id,record.package_type)">编辑</a>
        <a-divider type="vertical"></a-divider>
        <a v-if="record.auth['shop:product:package_course|get']" @click="onDetail(record.package_course_id,record.package_type)">详情</a>
        <st-more-dropdown class="mgl-16">
          <a-menu-item v-if="record.auth['shop:product:package_course|up']" @click="onsalePackage(record.package_course_id,record.course_name,record.start_time,record.end_time)">上架</a-menu-item>
          <a-menu-item v-if="record.auth['shop:product:package_course|down']" @click="offsalePackage(record.package_course_id,record.course_name)">下架</a-menu-item>
          <a-menu-item v-if="record.auth['shop:product:package_course|del']" @click="deletePackage(record.package_course_id,record.course_name)">删除</a-menu-item>
        </st-more-dropdown>
      </div>
    </st-table>
    <st-modal
      title="上架课程包"
      okText="确认上架"
      @ok="onOnsale"
      :confirmLoading="loading.onsalePackage"
      wrapClassName="modal-shop-product-course-package"
      v-model='onsaleIsShow'>
        <st-form :form="form" labelWidth="96px">
          <st-form-item label="课程包名称">{{`aaaa`}}</st-form-item>
          <st-form-item label="支持售卖时间" class="mg-b0" required>
            <div :class="listClass('saletime')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  style="width: 100%;"
                  :disabledDate="disabledStartDate"
                  v-decorator="['start_time',{rules:[{validator:start_time_validator}]}]"
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  :showToday="false"
                  @openChange="handleStartOpenChange"
                  @change="start_time_change"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledEndDate"
                  v-decorator="['end_time',{rules:[{validator:end_time_validator}]}]"
                  format="YYYY-MM-DD"
                  placeholder="结束时间"
                  :showToday="false"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
                  @change="end_time_change"
                />
              </a-form-item>
            </div>
          </st-form-item>
        </st-form>
    </st-modal>
    <st-modal
      title="下架课程包"
      size="small"
      okText="确认下架"
      @ok="onOffsale"
      wrapClassName="modal-shop-product-course-package"
      :confirmLoading="loading.offsalePackage"
      v-model='offsaleIsShow'>
      确认下架{{packageName}}？
    </st-modal>
    <st-modal
      title="删除课程包"
      size="small"
      okText="确认删除"
      wrapClassName="modal-shop-product-course-package"
      @ok="onDelete"
      :confirmLoading="loading.deletePackage"
      v-model='deleteIsShow'>
      删除后不影响已购买的用户，一旦删除则无法恢复，确认删除{{packageName}}？
    </st-modal>
  </st-panel>
</template>
<script>
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
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
      loading: this.listService.loading$,
      package_course: this.userService.packageCourseEnums$,
      query: this.routeService.query$,
      auth: this.listService.auth$
    }
  },
  bem: {
    listClass: 'page-shop-package-list'
  },
  data() {
    return {
      columns,
      offsaleIsShow: false,
      deleteIsShow: false,
      onsaleIsShow: false,
      packageId: '',
      packageName: '',
      start_time: null,
      end_time: null,
      form: this.$form.createForm(this),
      endOpen: false,
      type: ['', 'unlimit', 'range', 'fix']
    }
  },
  methods: {
    // start_time validatorFn
    start_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择开始售卖时间')
      } else if (value.valueOf() < moment(moment().format().replace(/\d{2}:\d{2}:\d{2}/, '00:00:00')).valueOf()) {
        // eslint-disable-next-line
        callback('支持售卖时间已过，请重新设置')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // end_time validatorFn
    end_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择结束售卖时间')
      } else if (value.valueOf() < moment(moment().format().replace(/\d{2}:\d{2}:\d{2}/, '23:59:59')).valueOf()) {
        // eslint-disable-next-line
        callback('支持售卖时间已过，请重新设置')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 售卖时间-start
    start_time_change(data) {
      this.start_time = cloneDeep(data)
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    disabledStartDate(startValue) {
      const endValue = this.end_time
      if (!endValue) {
        // 结束时间未选择
        return (
          startValue.valueOf() <
          moment()
            .subtract(1, 'd')
            .valueOf()
        )
      }
      let start =
        endValue.valueOf() >
        moment()
          .add(30, 'y')
          .valueOf()
          ? moment(endValue)
            .subtract(30, 'y')
            .valueOf()
          : moment()
            .subtract(1, 'd')
            .add(1, 'ms')
            .valueOf()
      return (
        startValue.valueOf() < start ||
        startValue.valueOf() >
          moment(endValue)
            .subtract(1, 'd')
            .valueOf()
      )
    },
    // 售卖时间-end
    end_time_change(data) {
      this.end_time = cloneDeep(data)
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    disabledEndDate(endValue) {
      const startValue = this.start_time
      if (!startValue) {
        // 开始时间未选择
        return (
          endValue.valueOf() >=
            moment()
              .add(30, 'y')
              .valueOf() || endValue.valueOf() <= moment().valueOf()
        )
      }
      return (
        endValue.valueOf() >=
          moment(startValue)
            .add(30, 'y')
            .valueOf() ||
        endValue.valueOf() <
          moment(startValue)
            .add(1, 'd')
            .valueOf()
      )
    },
    // moment
    moment,
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
    onDetail(id, type) {
      this.$router.push({
        path: `/shop/product/course/manage/package/info-${this.type[type]}-package`,
        query: { id }
      })
    },
    onsalePackage(id, name, start, end) {
      if (end * 1000 >= moment(moment().format().replace(/\d{2}:\d{2}:\d{2}/, '23:59:59')).valueOf()) {
        this.listService.onsalePackage({
          id,
          start_time: `${this.moment(start * 1000).format('YYYY-MM-DD')} 00:00:00`,
          end_time: `${this.moment(end * 1000).format('YYYY-MM-DD')} 23:59:59`
        }).subscribe(res => {
          console.log(res)
        })
      } else {
        this.onsaleIsShow = true
        this.packageId = id
        this.packageName = name
        this.$nextTick().then(res => {
          this.form.setFieldsValue({
            'start_time': moment(start * 1000),
            'end_time': moment(end * 1000)
          })
          this.form.validateFields(['start_time', 'end_time'])
        })
      }
    },
    onOnsale() {
      this.form.validateFields(['start_time', 'end_time']).then(res => {
        this.listService.onsalePackage({
          id: this.packageId,
          start_time: `${res.start_time.format('YYYY-MM-DD')} 00:00:00`,
          end_time: `${res.end_time.format('YYYY-MM-DD')} 23:59:59`
        }).subscribe(res => {
          this.onsaleIsShow = false
          this.packageId = ''
          this.packageName = ''
          this.$router.push({ query: this.query, force: true })
        })
      }).catch(error => {
        console.log(error)
      })
    },
    offsalePackage(id, name) {
      this.offsaleIsShow = true
      this.packageId = id
      this.packageName = name
    },
    onOffsale() {
      this.listService.offsalePackage(`${this.packageId}`).subscribe(() => {
        this.offsaleIsShow = false
        this.packageId = ''
        this.packageName = ''
        this.$router.push({ force: true, query: this.query })
      })
    },
    deletePackage(id, name) {
      this.deleteIsShow = true
      this.packageId = id
      this.packageName = name
    },
    onDelete() {
      this.listService.deletePackage(`${this.packageId}`).subscribe(() => {
        this.deleteIsShow = false
        this.packageId = ''
        this.packageName = ''
        this.$router.push({ force: true, query: this.query })
      })
    }
  }
}
</script>
