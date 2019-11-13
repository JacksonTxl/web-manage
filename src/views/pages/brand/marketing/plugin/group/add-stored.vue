<template>
  <st-mina-panel :class="basic()">
    <div>
      <st-form :form="form" labelWidth="118px">
        <!-- <st-form labelWidth="118px"> -->
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="活动名称" required>
              <a-input
                placeholder="请输入活动名称"
                v-decorator="decorators.group_name"
                maxlength="30"
                @change="changeName"
              ></a-input>
              <span slot="suffix">
                {{ groupName.length }}
                /30
              </span>
            </st-form-item>
            <st-form-item label="选择储值卡" required>
              <!-- <a-select :placeholder="`请输入${$c('member_card')}类型`"> -->
              <a-select placeholder="请输入">
                <a-select-option value="1">1</a-select-option>
                <a-select-option value="2">2</a-select-option>
                <a-select-option value="3">3</a-select-option>
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
                  :dataSource="tableData"
                  :columns="columnsGroupStored"
                  :pagination="false"
                >
                  {{ tableData.city_name }}
                  <template slot="discount" slot-scope="customRender, record">
                    <st-input-number
                      :float="true"
                      v-model="record.discount"
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
        <a-row :gutter="8">
          <a-col :span="11">
            <st-form-item label="活动时间" required>
              <a-range-picker
                @change="changeTime"
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
              />
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item required>
              <template slot="label">
                参团人数
                <st-help-tooltip id="TBPTXJ001" />
              </template>
              <st-input-number v-decorator="decorators.num">
                <template slot="addonAfter">
                  人
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <template slot="label">
                拼团有效期
                <st-help-tooltip id="TBPTXJ002" />
              </template>
              <st-input-number v-decorator="decorators.time">
                <template slot="addonAfter">
                  小时
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <template slot="label">
                活动库存
                <st-help-tooltip id="TBPTXJ003" />
              </template>
              <a-checkbox-group>
                <a-checkbox>
                  限制库存
                </a-checkbox>
                <st-input-number
                  v-decorator="decorators.stock"
                  style="width: 200px;"
                ></st-input-number>
              </a-checkbox-group>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="16">
            <st-form-item label="选择门店" :class="basic('shop')" required>
              <div :class="basic('shop--container')">
                <st-t4 :class="basic('shop--set')">
                  设置支持会员卡售卖场馆范围
                </st-t4>
                <select-shop @change="getShopId"></select-shop>
              </div>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="发布状态" required>
              <a-radio-group :defaultValue="0" v-model="releaseRadio">
                <a-radio :value="0">立即发布</a-radio>
                <a-radio :value="1">暂不发布</a-radio>
                <a-radio :value="2">定时发布</a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label="发布时间" required v-if="releaseRadio === 2">
              <a-date-picker
                @change="changeTime"
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
              />
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
      <div slot="actions">
        <st-button type="primary">
          确 定
        </st-button>
      </div>
    </div>
  </st-mina-panel>
</template>

<script>
import { columnsGroupStored, ruleOptions } from './add-stored.config'
import addService from './add-stored.service'
import SelectShop from '@/views/fragments/shop/select-shop'
// import moment from 'monment'

export default {
  // name: PageBrandMarketingGroupAddStored,
  bem: {
    basic: 'brand-marketing-group-stored'
  },
  serviceInject() {
    return {
      Add: addService
    }
  },
  components: {
    SelectShop
  },
  props: {
    isEdit: {
      type: Number,
      default: 0
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      columnsGroupStored,
      groupName: '',
      shopRadio: 0, // @parmas=0 所有门店； @parmas=1 指定门店
      releaseRadio: 0, // @parmas=0 立即发布；@parmas=1 暂不发布； @parmas=3 定时发布
      tableData: [
        {
          price: '22',
          discount: '44',
          card_id: 1
        }
      ]
    }
  },
  mounted() {
    console.log(this.isEdit)
  },
  methods: {
    changeTime(val) {
      console.log(val)
    },
    getShopId(shopId) {
      console.log(shopId)
    },
    changeName(e) {}
  }
}
</script>
