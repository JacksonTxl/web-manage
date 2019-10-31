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
            <td>{{ getCrowdName(item.crowd_id) }}</td>
            <td>
              <st-table-actions>
                <a @click="editTicketItemRecord({ ticket: item, index })">
                  设置
                </a>
                <a
                  @click="delTicketItemRecord(item.ticket_name)"
                  v-if="!isTicketName(item)"
                >
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
import { ACTIVITY_STATUS } from '@/constants/brand/marketing'
export default {
  name: 'Step2Form',
  modals: {
    MarketingAddTicket
  },
  bem: {
    b: 'step-form-signup'
  },
  // serviceProviders() {
  //   return [CopyService]
  // },
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
      ACTIVITY_STATUS,
      checkedShopIds: [],
      dataSource: [],
      formDataList: [],
      list: [],
      // TODO: 用户人群暂未开启，前端静态填写 为全部用户 id 为 0
      crowdIdOptions: [{ label: '全部用户', value: 0 }]
    }
  },
  computed: {
    colspanNum() {
      return 5
    },
    ticketList() {
      return cloneDeep(this.defaultForm$.ticket_list) || []
    }
  },
  methods: {
    getCrowdName(crowdId) {
      let crowdName = ''
      this.crowdIdOptions.forEach(item => {
        crowdName = item.value === crowdId ? item.label : ''
      })
      return crowdName
    },
    initForm() {
      const that = this
      this.$nextTick().then(() => {
        this.dataSource = cloneDeep(this.defaultForm$.ticket_list)
        this.formDataList = cloneDeep(this.defaultForm$.ticket_list)
        this.$emit('change', this.dataSource)
      })
    },
    isTicketName(ticket) {
      // 草稿状态都可以编辑 不是草稿状态的活动，只有新增过后的 可以编辑和删除
      if (this.defaultForm$.activity_status === ACTIVITY_STATUS.DRAFT) {
        return false
      } else {
        return this.ticketList
          .map(item => item.ticket_name)
          .includes(ticket.ticket_name)
      }
    },
    editTicketItemRecord({ ticket, index }) {
      this.$modalRouter.push({
        name: 'marketing-add-ticket',
        props: {
          formData: this.defaultForm$,
          dataSource: this.dataSource,
          ticket: ticket,
          index: index,
          isSetting: true,
          stepForm: this.stepForm
        },
        on: {
          show: this.getTableItem,
          submit: this.getFormItem
        }
      })
    },
    onClickBack() {
      this.$emit('back', 0)
    },
    getTableItem({ ticket, index }) {
      if (index > -1) {
        this.dataSource = this.dataSource.map((ele, idx) => {
          if (idx === index) {
            ele = ticket
          }
          return ele
        })
      } else {
        this.dataSource.push(ticket)
      }
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
    getFormItem({ ticket, index }) {
      // 如果索引在则不是添加 则是对票种的设置
      if (index > -1) {
        this.formDataList = this.formDataList.map((ele, idx) => {
          if (idx === index) {
            ele = ticket
          }
          return ele
        })
      } else {
        this.formDataList.push(ticket)
      }
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
