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
                placeholder="请输入活动名称"
                @change="changeName"
              >
                <span slot="suffix">
                  {{ groupName.length }}
                  /30
                </span>
              </a-input>
            </st-form-item>
            <st-form-item label="拼团门店" required>
              <a-select @change="chooseShop" showSearch placeholder="请输入">
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :lg="16">
            <st-form-item label="优惠设置" required>
              <div :class="basic('table')">
                <st-table
                  rowKey="card_id"
                  :columns="cardColumns"
                  :dataSource="tableData"
                  :pagination="false"
                  :scroll="{ y: 230 }"
                  align="center"
                >
                  <template
                    slot="group_price"
                    slot-scope="customRender, record"
                  >
                    <st-input-number v-model="record.group_price">
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
          <a-col :lg="10">
            <st-form-item label="选择课程包" required>
              <a-select @change="chooseCourse" showSearch placeholder="请输入">
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </st-form-item>
            <st-form-item label="活动时间" required>
              <!-- <st-range-picker
                v-model="decorators.activityTime"
              ></st-range-picker> -->
              <a-range-picker
                @change="changeTime"
                :showTime="{ format: 'HH:mm' }"
                :disabledDate="disabledDate"
                format="YYYY-MM-DD HH:mm"
              />
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :lg="10">
            <st-form-item required>
              <span slot="label">
                参团人数
                <st-help-tooltip id="TBPTXJ001" />
              </span>
              <st-input-number v-decorator="decorators.num">
                <template slot="addonAfter">
                  人
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <span slot="label">
                拼团有效期
                <st-help-tooltip id="TBPTXJ002" />
              </span>
              <st-input-number v-decorator="decorators.time">
                <template slot="addonAfter">
                  小时
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <span slot="label">
                活动库存
                <st-help-tooltip id="TBPTXJ003" />
              </span>
              <a-checkbox @change="limitStock">限制库存&nbsp;&nbsp;</a-checkbox>
              <st-input-number
                :class="basic('stock')"
                v-decorator="decorators.stock"
              ></st-input-number>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :lg="10">
            <st-form-item required>
              <span slot="label">
                发布状态
                <st-help-tooltip id="TBPTXJ005" />
              </span>
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
import { ruleOptions, cardColumns } from './add-course.config'
import moment from 'moment'
export default {
  bem: {
    basic: 'brand-marketing-group-course'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      groupName: '',
      cardColumns,
      tableData: [
        {
          district_name: '33',
          group_price: '44',
          card_id: 1
        },
        {
          district_name: '33',
          group_price: '44',
          card_id: 2
        }
      ],
      // 发布状态
      releaseStatus: 1
    }
  },
  methods: {
    // 选择门店
    chooseShop(value) {
      console.log(value)
    },
    // 选择课程包
    chooseCourse(value) {
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
    // 修改发布时间
    changeReleaseTime(value) {
      console.log(value)
    },
    changeName(e) {
      this.groupName = e.target.value
    },
    disabledDate(current) {
      return (
        current && current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')
      )
    }
  }
}
</script>
