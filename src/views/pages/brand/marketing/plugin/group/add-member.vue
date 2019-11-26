<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :confirmLoading="loading.addGroup"
    @onsubmit="onSubmit"
    :groupParams="groupParams"
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
            <st-container>
              <st-table
                :columns="cardColumns"
                :dataSource="tableData"
                :pagination="false"
                :scroll="{ y: 230 }"
                :rowSelection="
                  tableData.length > 1
                    ? {
                        onChange: onChange,
                        selectedRowKeys: selectedRowKeys
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
                  >
                    <template slot="addonAfter">
                      元
                    </template>
                  </st-input-number>
                </template>
              </st-table>
            </st-container>
          </st-form-item>
        </a-col>
      </a-row>
    </template>
  </group-form>
</template>
<script>
import GroupForm from './components#/group-form'
import { ruleOptions, cardColumns } from './add-member.config'
import { AddMemberService } from './add-member.service'
import { values } from 'lodash-es'
import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      addMemberService: AddMemberService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addMemberService.loading$,
      memberList: this.addMemberService.memberList$
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
      groupParams: {
        type: 1,
        id: null
      }
    }
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
          this.tableData.forEach(card => {
            card.is_select = false
          })
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
    // 新建拼团活动
    onSubmit(data) {
      let isReturn = false
      if (this.tableErr) return
      if (this.tableData.length > 1 && !this.selectedRowKeys.length) {
        this.tableText = '请选择至少一个会籍卡规格'
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
      data.sku = list
      data.product_id = this.cardId
      this.addMemberService.addGroup(data).subscribe(res => {
        this.$router.push({
          path: `./list`
        })
      })
    }
  },
  components: {
    GroupForm
  }
}
</script>
