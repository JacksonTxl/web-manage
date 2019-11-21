<template>
  <st-modal title="赠送额度" size="small" v-model="show">
    <st-form :form="form" labelWidth="75px">
      <st-form-item
        label="选择"
        required
        :help="helpText"
        :validateStatus="helpShow ? 'error' : ''"
      >
        <st-batch-select-radio
          :ids="this.ids"
          v-model="batch_type"
          :total="count"
        ></st-batch-select-radio>
      </st-form-item>
      <st-form-item label="赠送额度" required>
        <st-input-number
          :max="999"
          placeholder="请输入赠送额度"
          v-decorator="decorators.amount"
        >
          <span slot="addonAfter">
            {{ type | enumFilter('sold_common.unit') }}
          </span>
        </st-input-number>
      </st-form-item>
      <st-form-item label="备注" class="mg-b0">
        <a-textarea
          v-decorator="decorators.content"
          placeholder="请输入备注"
          :autosize="{ minRows: 4, maxRows: 6 }"
        />
      </st-form-item>
    </st-form>
    <template slot="footer">
      <st-button @click="show = false">
        取消
      </st-button>
      <st-popconfirm class="mg-l8" @confirm="onSubmit">
        <div slot="title" class="sold-popup-tip">
          <div class="sold-popup-tip__title">
            本次共选择{{ operateDataNum }}条记录，请再次确认是否提交！
          </div>
          <div class="sold-popup-tip__content">
            此操作将
            <span class="color-danger">覆盖</span>
            当前选择项已有数据，将会有2-5s无法正常使用。
          </div>
        </div>
        <st-button type="primary" :loading="loading.setGive">
          确认提交
        </st-button>
      </st-popconfirm>
    </template>
  </st-modal>
</template>

<script>
import { GivingService } from './giving.service'
import { ruleOptions } from './giving.config'
import { BATCH_TYPE, BATCH_INFO } from '@/constants/common/batch-operation'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalSoldCardGiving',
  bem: {
    giving: 'modal-sold-card-giving'
  },
  serviceProviders() {
    return [GivingService]
  },
  serviceInject() {
    return {
      givingService: GivingService
    }
  },
  rxState() {
    return {
      loading: this.givingService.loading$,
      count: this.givingService.count$
    }
  },
  props: {
    ids: {
      type: Array,
      required: true
    },
    type: {
      type: [String, Number],
      required: true
    }
  },
  mounted() {
    const params = cloneDeep(this.$searchQuery)
    params.card_type = this.type
    this.givingService.fetchCardNum(params).subscribe()
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      BATCH_TYPE,
      BATCH_INFO,
      form,
      decorators,
      show: false,
      batch_type: BATCH_TYPE.SELECTED
    }
  },
  computed: {
    helpText() {
      return this.count > this.BATCH_INFO.LIMIT_NUM
        ? this.BATCH_INFO.ERROR_TIP
        : ''
    },
    helpShow() {
      return this.count > this.BATCH_INFO.LIMIT_NUM
    },
    operateDataNum() {
      return this.batch_type === this.BATCH_TYPE.SELECTED
        ? this.ids.length
        : this.count
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.givingService
          .setGive({
            sold_ids: this.ids,
            batch_type: this.batch_type,
            card_type: this.type,
            conditions: this.$searchQuery,
            ...values
          })
          .subscribe(res => {
            this.$emit('success')
            this.show = false
          })
      })
    }
  }
}
</script>
