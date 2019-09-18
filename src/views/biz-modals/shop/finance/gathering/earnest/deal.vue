<template>
  <st-modal title="定金签单" v-model="show" @cancel="onCancel" size="small">
    <div :class="sale('content')">
      <a-row :class="[sale('info'), 'mg-b24']">
        <a-col :span="13">
          <st-info>
            <st-info-item label="定金金额">
              {{ info.product_name }}
            </st-info-item>
            <st-info-item label="收款时间">
              {{ info.product_type }}
            </st-info-item>
            <st-info-item label="销售人员">
              {{ info.price }}
            </st-info-item>
            <st-info-item class="mg-b24" label="收款人员">
              {{ info.price }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名" v-if="info.sale_range">
              {{ info.sale_range.name }}
            </st-info-item>
            <st-info-item label="手机号">{{ info.is_transfer }}</st-info-item>
            <st-info-item label="订单号">{{ info.is_transfer }}</st-info-item>
            <st-info-item class="mg-b24" label="订单状态">
              {{ info.transfer }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="88px">
        <st-form-item labelGutter="12px" label="商品类型" required>
          <a-select
            allowClear
            placeholder="输入选择商品类型"
            :defaultActiveFirstOption="false"
            :showArrow="false"
            :filterOption="false"
            v-decorator="decorators.product_type"
          >
            <a-select-option
              v-for="(item, index) in productTypes"
              :value="item.id"
              :key="index"
            >
              {{ item.member_name }}
            </a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item labelGutter="12px" label="商品名称" required>
          <a-select
            showSearch
            allowClear
            placeholder="输入商品名称搜索"
            :defaultActiveFirstOption="false"
            :showArrow="false"
            :filterOption="false"
            v-decorator="decorators.memberId"
            @search="onProductSearch"
            notFoundContent="无搜索结果"
          >
            <a-select-option
              v-for="(item, index) in list"
              :value="item.id"
              :key="index"
            >
              <span
                v-html="
                  `${item.member_name} ${item.mobile}`.replace(
                    new RegExp(memberSearchText, 'g'),
                    `\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`
                  )
                "
              >
                {{ item.member_name }} {{ item.mobile }}
              </span>
            </a-select-option>
          </a-select>
        </st-form-item>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="onNext" type="primary">
        下一步
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { DealService } from './deal.service'
import { cloneDeep } from 'lodash-es'
import { ruleOptions } from './deal.config'
export default {
  name: 'ModalShopFinanceGatheringEarnestDeal',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  serviceProviders() {
    return [DealService]
  },
  serviceInject() {
    return {
      dealService: DealService
    }
  },
  rxState() {
    return {
      loading: this.dealService.loading$,
      list: this.dealService.list$,
      productTypes: this.dealService.productTypes$,
      info: this.dealService.info$
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      // 搜索会员
      memberSearchText: '',
      searchMemberIsShow: true
    }
  },
  created() {
    this.dealService.init(this.id).subscribe()
  },
  methods: {
    // 搜索产品
    onProductSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.dealService.list$.commit(() => [])
        this.form.resetFields(['member_id'])
      } else {
        this.dealService.getList(data).subscribe(res => {
          if (!res.list.length) {
            this.form.resetFields(['member_id'])
          }
        })
      }
    },
    onCancel() {
      this.show = false
    },
    onNext() {
      this.form.validate().then(values => {
        // 到签单页面
      })
    }
  }
}
</script>
