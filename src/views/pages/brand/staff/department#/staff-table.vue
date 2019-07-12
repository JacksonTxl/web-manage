<template>
  <st-table
    class="page-staff-table"
    :loading="loading"
    :alertSelection="{onReset: onSelectionReset}"
    :rowSelection="{selectedRowKeys, onChange: onSelectChange}"
    :page="page"
    :columns="columns"
    :dataSource="staffList"
    :scroll="{ x: 1500}"
    rowKey="id"
    @change="onTableChange"
    >
    <div slot="action" slot-scope="text, record">
      <st-table-actions>
        <a href="#" v-if="record.auth['brand_shop:staff:staff|get']" @click="staffInfo(record)">详情</a>
        <a href="#" v-if="record.auth['brand_shop:staff:staff|edit']" @click="editStaff(record.id)">编辑</a>
        <a href="#" v-if="record.auth['brand_shop:staff:staff|bind_card']" v-modal-link="{ name: 'staff-bind-entity-card', props: {staff: record} }">绑定实体卡</a>
        <a href="#" v-if="record.auth['brand_shop:staff:staff|rebind_card']" v-modal-link="{ name: 'staff-bind-entity-card', props: {staff: record} }">重绑定实体卡</a>
        <a href="#" v-if="record.auth['brand_shop:staff:staff|position']" @click="staffPositionChange(record)">职位变更</a>
        <a href="#" v-if="record.auth['brand_shop:staff:staff|leave']" @click="staffLeave(record)">离职</a>
        <a href="#" v-if="record.auth['brand_shop:staff:staff|reinstate']" v-modal-link="{ name: 'staff-reinstatement', props: {staff: record} }">复职</a>
        <a href="#" v-if="record.auth['brand_shop:staff:account|save']" v-modal-link="{ name: 'staff-re-password', props: {staff: record} }">管理登录账号</a>
        <a href="#" v-if="record.auth['brand_shop:staff:staff|salary']" v-modal-link="{ name: 'staff-salary-account-setting', props: {staff: record} }">设置薪资账户</a>
        <a href="#" v-if="record.auth['brand_shop:staff:staff|del']" v-modal-link="{ name: 'staff-delete', props: {staff: record} }">删除</a>
      </st-table-actions>
    </div>
    <div slot="work_status" slot-scope="work_status">
      <a-badge :status="work_status.id == 1 ? 'success' : 'error'" />{{work_status.name}}
    </div>
    <div slot="shop" slot-scope="shop">
      <a v-modal-link="{ name: 'staff-shop-with-staff', props: {shopList: shop} }" v-if="shop.length">{{shop|shopFilter}}</a>
      <span v-else>{{shop|shopFilter}}</span>
    </div>
    <div slot="identity" slot-scope="identity">
      {{identity | identityNames}}
    </div>
    <div class="page-staff-table-name" slot="staff_name"  slot-scope="text">
      <!-- <img class="page-staff-table-name__img mg-r8" :src="record.avatar" > -->
      <span class="name">{{text}}</span>
    </div>
  </st-table>
</template>
<script>
import { columns } from './staff-table.config'
import tableMixin from '@/mixins/table.mixin'
import { RouteService } from '@/services/route.service'

export default {
  mixins: [ tableMixin ],
  serviceInject() {
    return {
      routerService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routerService.query$
    }
  },
  data() {
    return {
      selectedRowKeys: []
    }
  },
  props: {
    staffList: {
      type: Array,
      default: () => {
        return []
      }
    },
    page: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columns
  },
  filters: {
    shopFilter(val) {
      return val.length === 0 ? '--' : `共${val.length}家门店`
    },
    identityNames(val) {
      if (val.length === 0) return '--'
      return val.map(item => {
        return item.name
      }).join(',')
    }
  },
  methods: {
    staffLeave(record) {
      this.$modalRouter.push({
        name: 'staff-turnover',
        props: {
          staff: record
        }
      })
    },
    staffPositionChange(record) {
      this.$modalRouter.push({
        name: 'staff-update-staff-position',
        props: {
          staff: record
        }
      })
    },
    staffInfo(staff) {
      this.$router.push({
        name: 'brand-staff-info',
        query: {
          id: staff.id
        }
      })
    },
    editStaff(staffId) {
      this.$emit('edit-staff', staffId)
    },
    onClickSettingSalary(id) {
      console.log('onClickSettingSalary')
    },
    onClickUpdateStaffPosition() {
      console.log('onClickUpdateStaffPosition')
    },
    onClickTurnover() {
      console.log('onClickTurnover')
    },
    onChange(val) {
      this.$router.push({ query: { page: val.current, size: val.pageSize || 20, ...this.$router.query } })
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('selectedRow', this.selectedRowKeys)
    },
    onCLickReinstatement() {
      console.log('onCLickReinstatement')
    }
  }
}
</script>
