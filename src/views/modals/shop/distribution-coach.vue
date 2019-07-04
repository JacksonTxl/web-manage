<template>
  <st-modal title="分配教练" @ok="save" v-model="show" size="small">
    <a-row :gutter="8">
      <a-col :lg="24" style="padding: 0;">
        <a-input-search
          size="large"
          placeholder="搜索教练姓名，手机号，昵称"
          style="width: 100%;"
          @search="onSearch"
        />
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24" class="distribution-container" style="padding-left:12px;padding-right:12px;">
        <st-table
          :rowSelection="{ fixed: true, columnTitle:'分配',type: 'radio',selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :dataSource="list"
          @change="handleTableChange"
          :pagination="false"
        >
          <template slot="custom_title">
            私教消课数（近30天）<st-help-tooltip id="TSYHFP002" />
          </template>
        </st-table>
      </a-col>
    </a-row>
  </st-modal>
</template>
<script>
import { DistributionCoachService } from './distribution-coach.service'
import { MessageService } from '@/services/message.service'
const columns = [
  {
    title: '私教教练姓名',
    dataIndex: 'coach_name',
    key: 'coach_name'
  },
  {
    dataIndex: 'personal_sales',
    key: 'personal_sales',
    slots: { title: 'custom_title' },
    scopedSlots: { customRender: 'personal_sales' }
  }
]
export default {
  name: 'distributionCoach',
  serviceInject() {
    return {
      service: DistributionCoachService,
      messageService: MessageService
    }
  },
  props: {
    memberIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      show: false,
      columns,
      selectedRowKeys: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
      list: [],
      coach_id: ''
    }
  },
  mounted() {
    this.service.getSaleList().subscribe(res => {
      console.log(res)
      this.list = res.list
    })
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
    },
    onSelectChange(e, item) {
      this.selectedRowKeys = e
      this.coach_id = item[0].id
    },
    onSearch(e) {
      this.service
        .getSaleList({
          retrieve: e
        })
        .subscribe(res => {
          console.log(res)
          this.list = res.list
        })
    },
    save(e) {
      this.service
        .addSale({
          member_ids: this.memberIds,
          coach_id: this.coach_id
        })
        .subscribe(res => {
          this.show = false
          this.messageService.success({ content: '分配成功' })
        })
    }
  },
  watch: {}
}
</script>
