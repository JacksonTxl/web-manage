<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading.addGroup"
    :confirmLoading="loading.addGroup"
    :isEdit="false"
    :groupParams="groupParams"
    @onsubmit="onSubmit"
    ref="group"
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
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in list"
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
          <st-form-item label="优惠设置" required>
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
                    v-model="record.group_price"
                    style="width:100px;"
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
import SelectShop from '@/views/fragments/shop/select-shop'
import { AddStoredService } from './add-stored.service'
import { PatternService } from '@/services/pattern.service'
import { columnsGroupStored, ruleOptions } from './add-stored.config'
import moment, { months } from 'moment'
import GroupForm from './components#/group-form.vue'
import {
  ACTIVITY_STATUS,
  RELEASE_STATUS
} from '@/constants/marketing/group-buy'

export default {
  name: 'PageBrandMarketingGroupAddStored',
  bem: {
    basic: 'brand-marketing-group-stored'
  },
  serviceInject() {
    return {
      addSotred: AddStoredService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addSotred.loading$,
      list: this.addSotred.list$
    }
  },
  components: {
    GroupForm
  },
  mounted() {
    console.log(this.list)
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
      shopList: null
    }
  },
  methods: {
    changeSelect(id) {
      this.form.setFieldsValue({
        depositId: id
      })
      this.list.filter(item => {
        if (item.id == id) {
          this.currentStored = item.product_spec
        }
      })
      this.groupParams.id = this.depositId
      this.$refs.group.updateShop()
    },
    onSubmit(params) {
      let tmpList = [
        {
          sku_id: this.depositId,
          group_price: this.currentStored[0].group_price
        }
      ]
      params.product_type = 2
      params.product_id = this.depositId
      params.sku = tmpList

      this.addSotred.addGroup(params).subscribe(res => {
        console.log(params, res, '这是编辑返回的数据')
      })
    }
  }
}
</script>
