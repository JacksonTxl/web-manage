<template>
  <st-modal
    title="延长有效期"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-card-giving1"
  >
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
          :total="list_num"
        ></st-batch-select-radio>
      </st-form-item>
      <st-form-item label="延长天数" required>
        <st-input-number
          :max="999"
          placeholder="请输入延长天数"
          v-decorator="decorators.extend_days"
        >
          <span slot="addonAfter">
            天
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
import { ExtengDayService } from './extend-day.service'
import { ruleOptions } from './extend-day.config'
import { BATCH_TYPE, BATCH_INFO } from '@/constants/common/batch-operation'
export default {
  name: 'ModalSoldCourseGiving',
  serviceProviders() {
    return [ExtengDayService]
  },
  serviceInject() {
    return {
      extengDayService: ExtengDayService
    }
  },
  rxState() {
    return {
      list_num: this.extengDayService.list_num$,
      loading: this.extengDayService.loading$
    }
  },
  props: {
    ids: {
      type: Array,
      required: true
    },
    searchQuery: {
      type: Object
    }
  },
  mounted() {
    this.extengDayService.fetchCourseNum(this.searchQuery).subscribe()
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
      description: '',
      batch_type: BATCH_TYPE.SELECTED
    }
  },
  computed: {
    helpText() {
      return this.list_num > this.BATCH_INFO.LIMIT_NUM
        ? this.BATCH_INFO.ERROR_TIP
        : ''
    },
    helpShow() {
      return this.list_num > this.BATCH_INFO.LIMIT_NUM
    },
    operateDataNum() {
      return this.batch_type === this.BATCH_TYPE.SELECTED
        ? this.ids.length
        : this.list_num
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.extengDayService
          .taskExtendDays({
            batch_type: this.batch_type,
            sold_ids: this.ids,
            conditions: this.searchQuery,
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
