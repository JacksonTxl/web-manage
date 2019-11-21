<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading"
    :isEdit="isEdit"
    :info="info"
    :shopIds="shopIds"
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
              :disabled="isEdit && activityState >= ACTIVITY_STATUS.NO_START"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in depositList"
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
                    :disabled="
                      isEdit && activityState >= ACTIVITY_STATUS.NO_START
                    "
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
import { AddMemberService } from './add-member.service'
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
      Add: AddMemberService,
      AddSotred: AddStoredService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.Add.loading$,
      depositList: this.AddSotred.list$
    }
  },
  components: {
    GroupForm
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => {}
    }
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
  watch: {
    info(n, o) {
      console.log('kll')
      this.setFieldsValue()
    }
  },
  methods: {
    changeSelect(id) {
      this.form.setFieldsValue({
        depositId: id
      })
      this.depositList.filter(item => {
        if (item.id == id) {
          this.currentStored = item.product_spec
        }
      })
      this.groupParams.id = this.currentStored[0].id
    },
    onSubmit() {
      let tmpList = [
        {
          sku_id: this.currentStored[0].id,
          group_price: this.currentStored[0].group_price
        }
      ]
      if (!this.isEdit) {
        this.Add.addGroup(params).subscribe(res => {
          console.log(params, res, '这是添加返回的数据')
        })
      } else {
        this.Add.editGroup(params).subscribe(res => {
          console.log(params, res, '这是编辑返回的数据')
        })
      }
    },
    setFieldsValue() {
      console.log(this.info)
      this.activityState = this.info.activity_state[0].id
      this.depositId = this.info.product.id
      this.currentStored = this.info.sku
      this.shopList = this.info.support_shop || []
    }
  }
}
</script>
