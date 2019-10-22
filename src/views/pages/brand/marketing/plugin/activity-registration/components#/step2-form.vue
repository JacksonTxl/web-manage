<template>
  <div>
    <st-form-table>
      <thead>
        <tr>
          <th>票种名称</th>
          <th>价格（元）</th>
          <th>票数（张）</th>
          <th>购买用户</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td :colspan="colspanNum" class="st-form-table__add">
            <st-button
              type="dashed"
              icon="add"
              block
              v-modal-link="{
                name: 'marketing-add-ticket',
                props: {
                  formData: defaultForm$
                },
                on: {
                  show: getTableItem,
                  submit: getFormItem
                }
              }"
            >
              添加票种
            </st-button>
          </td>
        </tr>
        <template v-if="dataSource.length">
          <tr v-for="(item, index) in dataSource" :key="index">
            <td>{{ item.ticket_name }}</td>
            <td>{{ item.ticket_price }}</td>
            <td>{{ item.ticket_total_num }}</td>
            <td>{{ item.crowd_name }}</td>
            <td>
              <a @click="delTicketItemRecord(item.ticket_id)">
                删除
              </a>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="colspanNum">
              <st-no-data />
            </td>
          </tr>
        </template>
      </tbody>
    </st-form-table>
    <div v-di-view="{ name: 'step', show }">
      <st-button @click="onClickBack">
        上一步
      </st-button>
      <st-button
        class="mg-l16"
        type="primary"
        @click="onClickAddTicketComplete"
      >
        下一步
      </st-button>
    </div>
  </div>
</template>
<script>
import MarketingAddTicket from '@/views/biz-modals/marketing/add-ticket'
import { CopyService } from '../copy.service'
export default {
  name: 'Step2Form',
  modals: {
    MarketingAddTicket
  },
  serviceInject() {
    return {
      copyService: CopyService
    }
  },
  rxState() {
    const { defaultForm$ } = this.copyService
    return {
      defaultForm$
    }
  },
  props: {
    isCopy: {
      type: Boolean,
      default: false
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean
    }
  },
  created() {
    if (!this.isCopy && !this.isUpdate) return
    this.initForm()
  },
  data() {
    return {
      checkedShopIds: [],
      dataSource: [],
      formDataList: [],
      list: []
    }
  },
  computed: {
    colspanNum() {
      return 5
    }
  },
  methods: {
    initForm() {
      this.$nextTick().then(() => {
        this.dataSource = this.defaultForm$.ticket_list
        this.formDataList = this.defaultForm$.ticket_list
        this.$emit('change', this.dataSource)
      })
    },
    onClickBack() {
      this.$emit('back', 0)
    },
    getTableItem(item) {
      this.dataSource.push(item)
      this.$emit('change', this.dataSource)
    },
    delTicketItemRecord(ticketId) {
      this.dataSource = this.dataSource.filter(
        item => item.ticket_id !== ticketId
      )
      this.formDataList = this.formDataList.filter(
        item => item.ticket_id !== ticketId
      )
      this.$emit('change', this.addDataSource)
    },
    getFormItem(form) {
      this.formDataList.push(form)
    },
    onClickAddTicketComplete() {
      this.$emit('step-submit', this.formDataList)
    }
  }
}
</script>
