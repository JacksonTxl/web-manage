<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading.addGroup"
    :confirmLoading="loading.addGroup"
    :isEdit="true"
    :info="info"
    :shopIds="shopList"
    :groupParams="groupParams"
    @onsubmit="onSubmit"
  >
    <template slot="choose-product">
      <a-row :gutter="8">
        <a-col :span="10">
          <st-form-item label="选择储值卡" required>
            <a-input type="hidden" v-decorator="decorators.depositId"></a-input>
            <a-select
              showSearch
              @change="changeSelect"
              placeholder="请选择储值卡"
              v-model="depositId"
              :disabled="activityState >= ACTIVITY_STATUS.NO_START"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in list.list"
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
            :help="tableText"
            :validateStatus="tableErr ? 'error' : ''"
            required
          >
            <div :class="basic('table')">
              <st-table
                rowKey="id"
                :dataSource="currentStored"
                :columns="columnsGroupStored"
                :pagination="false"
              >
                <template slot="discount" slot-scope="customRender, record">
                  <st-input-number
                    :float="true"
                    @input="setPriceChange"
                    v-model="record.group_price"
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
import GroupForm from './components#/group-form.vue'
import { EditDepositService } from './edit-deposit.service'
import { columnsGroupStored, ruleOptions } from './add-deposit.config'
import SelectShop from '@/views/fragments/shop/select-shop'
import { PatternService } from '@/services/pattern.service'
import moment, { months } from 'moment'
import {
  ACTIVITY_STATUS,
  RELEASE_STATUS
} from '@/constants/marketing/group-buy'
export default {
  name: 'PageBrandMarketingGroupEditDeposit',
  bem: {
    basic: 'brand-marketing-group-deposit'
  },
  serviceInject() {
    return {
      edit: EditDepositService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.edit.loading$,
      info: this.edit.info$,
      list: this.edit.list$
    }
  },
  components: {
    GroupForm
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      columnsGroupStored,
      groupParams: {
        type: 2,
        id: null
      },
      activityState: Number, // 当前活动活动状态
      depositId: '', // 回显下拉选中product
      currentStored: [], // 当前下拉选中详细
      shopIds: [],
      ACTIVITY_STATUS,
      RELEASE_STATUS,
      shopList: null,
      tableText: '',
      tableErr: ''
    }
  },
  mounted() {
    this.setFieldsValue()
  },
  methods: {
    setPriceChange() {
      if (!this.currentStored[0].group_price) {
        this.tableText = '请输入拼团价格'
        this.tableErr = true
      } else {
        this.tableText = ''
        this.tableErr = false
      }
    },
    changeSelect(id) {
      this.form.setFieldsValue({
        depositId: id
      })
      this.list.list.filter(item => {
        if (item.id == id) {
          this.currentStored = item.product_spec
        }
      })
      this.groupParams.id = this.depositId
    },
    onSubmit(params) {
      let tmpList = [
        {
          sku_id: this.currentStored[0].sku_id,
          group_price: this.currentStored[0].group_price
        }
      ]
      params.id = this.$searchQuery.id
      params.product_type = 2
      params.product_id = this.depositId
      params.sku = tmpList
      this.edit.editGroup(params).subscribe(res => {
        this.$router.push({
          path: `/brand/marketing/plugin/group/list`
        })
      })
    },
    setFieldsValue() {
      this.activityState = this.info.activity_state.id
      this.depositId = this.info.product.id
      this.currentStored = this.info.sku
      this.shopList = this.info.support_shop || []
      this.form.setFieldsValue({
        depositId: this.info.product.id
      })
    }
  }
}
</script>
