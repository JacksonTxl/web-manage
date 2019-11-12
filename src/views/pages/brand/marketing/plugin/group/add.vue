<template>
  <st-mina-panel app>
    <div slot="actions">
      <!-- <st-button
        :loading="loading.addMarketingCoupon || loading.editMarketingCoupon"
        type="primary"
        @click="onSubmit"
      >
        保 存
      </st-button> -->
      <st-button type="primary">
        保存
      </st-button>
    </div>
    <div>
      <st-form :form="form" labelWidth="118px">
        <a-row :gutter="8">
          <a-col :lg="10">
            <st-form-item label="活动名称" required>
              <a-input
                v-decorator="decorators.group_name"
                maxlength="10"
                placeholder="请输入活动名称"
              ></a-input>
            </st-form-item>
            <st-form-item label="选择会籍卡" required>
              <a-select @change="chooseCard">
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :lg="16">
            <st-form-item label="优惠设置" required>
              <div>
                <st-table
                  rowKey="card_id"
                  :columns="cardColumns"
                  :dataSource="tableData"
                  :pagination="false"
                  :scroll="{ y: 230 }"
                  :class="basic('add_border')"
                  :rowSelection="{
                    onChange: onChange,
                    rowSelection: rowSelection
                  }"
                >
                  <template
                    slot="group_price"
                    slot-scope="customRender, record"
                  >
                    <a-input v-model="record.group_price"></a-input>
                  </template>
                </st-table>
              </div>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :lg="10">
            <st-form-item label="活动时间" required>
              <!-- <st-range-picker
                v-model="decorators.activityTime"
              ></st-range-picker> -->
              <a-range-picker @change="changeTime" />
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :lg="10">
            <st-form-item required>
              <span slot="label">
                成团人数&nbsp;
                <a-tooltip title="该拼团活动的成团人数">
                  <a-icon type="question-circle-o" />
                </a-tooltip>
              </span>
              <a-input v-model="decorators.num" addonAfter="人"></a-input>
            </st-form-item>
            <st-form-item required>
              <span slot="label">
                成团有效期&nbsp;
                <a-tooltip title="该拼团活动的成团人数">
                  <a-icon type="question-circle-o" />
                </a-tooltip>
              </span>
              <a-input v-model="decorators.num" addonAfter="小时"></a-input>
            </st-form-item>
            <st-form-item label="活动库存" required>
              <a-checkbox @change="limitStock">限制库存&nbsp;&nbsp;</a-checkbox>
              <a-input
                v-model="decorators.num"
                :class="basic('stock')"
              ></a-input>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :lg="16">
            <st-form-item label="选择门店" required>
              <a-radio-group v-model="showShopRange">
                <a-radio :value="1" :key="1">
                  所有门店
                </a-radio>
                <a-radio :value="2" :key="2">
                  指定门店
                </a-radio>
              </a-radio-group>
              <select-shop
                :class="basic('add_border')"
                v-if="showShopRange == '2'"
                @change="onSelectShop"
                :shopIds="shopIds"
              ></select-shop>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :lg="10">
            <st-form-item label="发布状态" required>
              <a-radio-group v-model="releaseStatus">
                <a-radio :value="1" :key="1">
                  立即发布
                </a-radio>
                <a-radio :value="2" :key="2">
                  暂不发布
                </a-radio>
                <a-radio :value="3" :key="3">
                  定时发布
                </a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label="发布时间" required v-if="releaseStatus === 3">
              <a-date-picker
                @change="changeReleaseTime"
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
              />
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-mina-panel>
</template>
<script>
import { ruleOptions, cardColumns } from './add.config'
import SelectShop from '@/views/fragments/shop/select-shop'
export default {
  bem: {
    basic: 'brand-marketing-group-add'
  },
  data() {
    const form = this.$stForm.create()
    // const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators: {},
      cardColumns,
      tableData: [
        {
          city_name: '22',
          district_name: '33',
          group_price: '44',
          card_id: 1
        }
      ],
      // 是否指定门店
      showShopRange: 1,
      shopIds: [],
      // 发布状态
      releaseStatus: 1
    }
  },
  methods: {
    // 选择会籍卡
    chooseCard(value) {
      console.log(value)
    },
    // 优惠设置选择变化
    onChange(value) {
      console.log(value)
    },
    // 优惠设置选择变化
    rowSelection(value) {
      console.log(value)
    },
    // 活动时间
    changeTime(value) {
      console.log(value)
    },
    // 是否限制库存
    limitStock(value) {
      console.log(value)
    },
    // 选择门店
    onSelectShop(value) {
      console.log(value)
    },
    // 修改发布时间
    changeReleaseTime(value) {
      console.log(value)
    }
  },
  components: {
    SelectShop
  }
}
</script>
