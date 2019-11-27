<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading.init"
    :confirmLoading="loading.editGroup"
    :isEdit="true"
    :info="info"
    :shopIds="shopIds"
    @onsubmit="onSubmit"
    :groupParams="groupParams"
    :isEditMode="activityState >= ACTIVITY_STATUS.NO_START"
  >
    <template slot="choose-product">
      <a-row :gutter="8">
        <a-col :span="10">
          <st-form-item :label="`选择${$c('member_card')}`" required>
            <a-input type="hidden" v-decorator="decorators.cardId" />
            <a-select
              showSearch
              v-model="cardId"
              placeholder="请输入"
              @change="chooseMember"
              :disabled="activityState >= ACTIVITY_STATUS.NO_START"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in memberList"
                :key="index"
              >
                {{ item.product_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="16">
          <st-form-item
            label="优惠设置"
            required
            :help="tableText"
            :validateStatus="tableErr ? 'error' : ''"
          >
            <div :class="basic('table')">
              <st-table
                :columns="cardColumns"
                :dataSource="tableData"
                :pagination="false"
                :scroll="{ y: 230 }"
                :rowSelection="
                  tableData.length > 1
                    ? {
                        onChange: onChange,
                        selectedRowKeys: selectedRowKeys,
                        getCheckboxProps: getCheckboxProps
                      }
                    : null
                "
                rowKey="id"
              >
                <template slot="group_price" slot-scope="customRender, record">
                  <st-input-number
                    v-model="record.group_price"
                    :float="true"
                    @input="setPriceChange"
                    style="width:110px;"
                    :disabled="activityState >= ACTIVITY_STATUS.NO_START"
                  >
                    <template slot="addonAfter">
                      元
                    </template>
                  </st-input-number>
                </template>
              </st-table>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
    </template>
  </group-form>
</template>
<script>
import GroupForm from './components#/group-form'
import { ruleOptions, cardColumns } from './add-member.config'
import { EditMemberService } from './edit-member.service'
import { values } from 'lodash-es'
import { PatternService } from '@/services/pattern.service'
import {
  ACTIVITY_STATUS,
  RELEASE_STATUS
} from '@/constants/marketing/group-buy'
export default {
  serviceInject() {
    return {
      editMemberService: EditMemberService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.editMemberService.loading$,
      memberList: this.editMemberService.memberList$,
      info: this.editMemberService.info$
    }
  },
  bem: {
    basic: 'brand-marketing-group-member'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      cardId: '',
      selectedRowKeys: [], // 优惠设置选中项
      cardColumns,
      tableText: '',
      tableErr: false,
      tableData: [],
      shopIds: [],
      groupParams: {
        type: 1,
        id: null
      },
      ACTIVITY_STATUS,
      RELEASE_STATUS,
      activityState: Number, // 当前活动活动状态
      oldStock: Number,
      oldTime: '',
      // 禁用优惠设置的选择
      getCheckboxProps: () => ({
        props: {
          disabled: true
        }
      })
    }
  },
  mounted() {
    this.setFieldsValue()
    this.chooseMember(this.cardId)
  },
  methods: {
    chooseMember(value) {
      this.form.setFieldsValue({
        cardId: value
      })
      this.groupParams.id = value
      this.memberList.filter(item => {
        if (item.id === value) {
          this.tableData = item.product_spec
          this.tableData.forEach(item => {
            item.is_select = false
          })
          if (this.selectedRowKeys) {
            this.info.sku.forEach(item => {
              this.tableData.forEach(card => {
                if (item.sku_id === card.id) {
                  card.group_price = item.group_price
                  card.is_select = true
                }
              })
            })
          }
        }
      })
      if (this.tableData.length === 1) {
        this.tableData[0].is_select = true
      }
    },
    // 优惠设置选择变化
    onChange(value) {
      this.selectedRowKeys = value
      this.tableData.forEach(card => {
        card.is_select = this.selectedRowKeys.indexOf(card.id) !== -1
      })
      // this.setPriceChange()
    },
    // 处理输入拼团价格的逻辑
    setPriceChange() {
      let selectedCard = this.tableData.filter(item => item.is_select)
      let hasEmpty = selectedCard.filter(item => !item.group_price)
      if (hasEmpty.length > 0) {
        this.tableText = '请输入拼团价格'
        this.tableErr = true
      } else {
        this.tableText = ''
        this.tableErr = false
      }
    },
    // 编辑拼团活动
    onSubmit(data) {
      let isReturn = false
      if (!this.selectedRowKeys.length) {
        this.tableText = '请选择会籍卡规格'
        this.tableErr = true
        isReturn = true
      }
      const list = this.tableData
        .filter(item => item.is_select)
        .map(item => {
          return {
            sku_id: item.id,
            group_price: item.group_price
          }
        })
      if (isReturn) {
        return
      }
      data.product_type = 1
      data.product_id = this.cardId
      data.sku = list
      data.id = this.$route.query.id
      this.editMemberService.editGroup(data).subscribe(res => {
        this.$router.push({
          path: `./list`
        })
      })
    },
    // 详情回显
    setFieldsValue() {
      this.activityState = this.info.activity_state.id
      this.cardId = this.info.product.id
      this.oldStock = this.info.stock_total
      this.oldTime = new Date(this.info.end_time)
      this.info.sku.forEach(item => {
        this.selectedRowKeys.push(item.sku_id)
      })
      this.getCheckboxProps = () => ({
        props: {
          disabled: this.info.activity_state.id >= ACTIVITY_STATUS.NO_START
        }
      })
    }
  },
  components: {
    GroupForm
  }
}
</script>
