<template>
  <div style="height: 100%">
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
              :disabled="dataSource.length === 10"
              type="dashed"
              icon="add"
              block
              v-modal-link="{
                name: 'marketing-add-ticket',
                props: {
                  formData: defaultForm$,
                  dataSource: dataSource,
                  stepForm: stepForm
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
              <st-table-actions>
                <a @click="editTicketItemRecord(item)">
                  设置
                </a>
                <a @click="delTicketItemRecord(item.ticket_name)">
                  删除
                </a>
              </st-table-actions>
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
import { clone, cloneDeep } from 'lodash-es'
import { MessageService } from '../../../../../../../services/message.service'
export default {
  name: 'Step2Form',
  modals: {
    MarketingAddTicket
  },
  bem: {
    b: 'step-form-signup'
  },
  serviceInject() {
    return {
      copyService: CopyService,
      msg: MessageService
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
    stepForm: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean
    }
  },
  created() {
    if (!this.isCopy && !this.isEdit) return
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
      const that = this
      this.$nextTick().then(() => {
        this.dataSource = cloneDeep(this.defaultForm$.ticket_list)
        this.formDataList = cloneDeep(this.defaultForm$.ticket_list)
        this.$emit('change', this.dataSource)
      })
    },
    editTicketItemRecord(ticket) {
      console.log(ticket)
    },
    onClickBack() {
      this.$emit('back', 0)
    },
    getTableItem(item) {
      this.dataSource.push(item)
      this.$emit('change', this.dataSource)
    },
    delTicketItemRecord(ticketName) {
      this.$confirm({
        title: '提示',
        content: '是否删除该票种?',
        okText: '是的',
        cancelText: '再想想',
        onOk: () => {
          this.dataSource = this.dataSource.filter(
            item => item.ticket_name !== ticketName
          )
          this.formDataList = this.formDataList.filter(
            item => item.ticket_name !== ticketName
          )
          this.$emit('change', this.dataSource)
        },
        onCancel() {}
      })
    },
    getFormItem(form) {
      this.formDataList.push(form)
    },
    onClickAddTicketComplete() {
      if (this.formDataList.length === 0) {
        this.msg.error({ content: '最少添加一个票种' })
        return
      }
      this.$emit('step-submit', this.formDataList)
    }
  }
}
</script>
