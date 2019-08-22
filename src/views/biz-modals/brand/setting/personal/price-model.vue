<template>
  <st-modal
    title="私教课程定价设置"
    class="modal-price-model-setting"
    v-model="show"
    :bodyStyle="{ padding: 0 }"
    @ok="save"
    @cancel="cancel"
    :confirmLoading="loading.update"
  >
    <a-alert
      message="此操作将影响所有私教课程的定价，无法撤回，请谨慎操作"
      banner
    />
    <st-form>
      <st-container type="2">
        <!-- 私教课程定价模式 -->
        <st-t4>私教课程定价模式</st-t4>
        <!-- 教练统一定价 -->
        <div class="mg-t4" v-if="info.price_model === PERSONAL.PRICEMODEL_1">
          教练统一定价
          <span class="st-des">
            （每一个私教课程，所授课的教练的课程售出价格一致）
          </span>
        </div>
        <!-- 教练分级定价 -->
        <div class="mg-t4" v-if="info.price_model === PERSONAL.PRICEMODEL_2">
          教练分级定价
          <span class="st-des">
            （每一个私教课程，按教练等级进行差异化定价）
          </span>
        </div>
        <!-- 私教课程售卖模式 -->
        <st-t4 class="mg-t24">私教课程售卖模式</st-t4>
        <a-radio-group
          class="full-width"
          :value="info.sale_model"
          @change="onSaleModelChange"
        >
          <st-container
            class="mg-t8"
            v-for="(item, index) of saleModels"
            :key="index"
          >
            <a-row class="align-items-center">
              <a-col :span="6">
                <a-radio :value="+item.value">{{ item.label }}</a-radio>
              </a-col>
              <a-col :span="18" class="st-des">
                <div v-if="+item.value === PERSONAL.SALEMODEL_1">
                  <div>1. 设置课程最低课时费和最高课时费</div>
                  <div>2. 超过售卖价格范围时，不支持购买</div>
                  <div>3. 不支持在用户端直接购买私教课</div>
                </div>
                <div v-if="+item.value === PERSONAL.SALEMODEL_2">
                  <div>1. 设置课程的固定课时费</div>
                  <div>2. 支持用户在用户端在线购买</div>
                </div>
              </a-col>
            </a-row>
          </st-container>
        </a-radio-group>
      </st-container>
      <!-- 私教课程定价设置 -->
      <st-container type="2" v-if="isShowPriceSet">
        <st-t4>私教课程定价设置</st-t4>
        <st-container type="2" class="bg-gray mg-t8">
          <!-- 教练谈单切换至统一标价 -->
          <div v-if="info.sale_model === PERSONAL.SALEMODEL_2">
            <div class="st-des">
              切换教练谈单至统一标价，从目前私教课程的范围定价中选择最低价或最高价设置为私教课程的标准定价
            </div>
            <st-form-item
              class="mg-b0 mg-t8"
              labelWidth="70px"
              label="课程最低价"
            >
              <a-radio-group
                :value="info.standard_price"
                @change="onStandardPriceChange"
              >
                <a-radio
                  v-for="(item, index) of standardPrices"
                  :key="+index"
                  :value="+item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
            </st-form-item>
          </div>
          <!-- 统一标价切换至教练谈单 -->
          <div v-if="info.sale_model === PERSONAL.SALEMODEL_1">
            <div class="st-des">
              切换统一标价至教练谈单，需要设置私教课程的范围定价，设置后遇到小数位，则四舍五入，保留一位小数
            </div>
            <st-form-item class="mg-b0" labelWidth="70px" label="课程最低价">
              私教课程当前定价下调
              <st-input-number
                style="width: 120px"
                class="mg-l16"
                v-model="info.min_price_percent"
              >
                <span slot="addonAfter">%</span>
              </st-input-number>
            </st-form-item>
            <div class="mg-t8 color-danger">
              最低价 = 私教课程当前定价 -（私教课程当前定价*设置的下调百分比）
            </div>
            <st-form-item
              class="mg-b0 mg-t24"
              labelWidth="70px"
              label="课程最高价"
            >
              私教课程当前定价上调
              <st-input-number
                style="width: 120px"
                class="mg-l16"
                v-model="info.max_price_percent"
              >
                <span slot="addonAfter">%</span>
              </st-input-number>
            </st-form-item>
            <div class="mg-t8 color-danger">
              最高价 = 私教课程当前定价+（私教课程当前定价*设置的上调百分比
            </div>
          </div>
        </st-container>
      </st-container>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { PriceModelService } from './price-model.service'
import { PERSONAL } from '@/constants/setting/personal'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      settingService: PriceModelService
    }
  },
  rxState() {
    return {
      loading: this.settingService.loading$,
      standardPrices: this.settingService.standardPrices$,
      saleModels: this.settingService.saleModels$
    }
  },
  data() {
    return {
      PERSONAL,
      show: false,
      form: this.$form.createForm(this),
      info: {},
      isShowPriceSet: false
    }
  },
  created() {
    this.settingService.getInfo().subscribe(res => {
      this.info = res
    })
  },
  methods: {
    onSaleModelChange(e) {
      const saleModel = e.target.value
      this.info.sale_model = saleModel
      this.isShowPriceSet = saleModel !== this.info.origin_sale_model
    },
    onStandardPriceChange(e) {
      this.info.standard_price = e.target.value
    },
    cancel() {
      this.show = false
    },
    save() {
      this.settingService.update({ ...this.info }).subscribe(() => {
        this.messageService.success({
          content: '提交成功'
        })
        this.show = false
        this.$emit('change')
      })
    }
  }
}
</script>
