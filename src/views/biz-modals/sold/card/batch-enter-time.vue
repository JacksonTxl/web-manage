<template>
  <st-modal title="变更入场时段" size="default" v-model="show">
    <st-form labelWidth="75px">
      <st-form-item
        label="选择"
        required
        :help="helpText"
        :validateStatus="helpShow ? 'error' : ''"
      >
        <a-radio-group v-model="batch_type">
          <a-radio :style="radioStyle" :key="1" :value="BATCH_TYPE.SELECTED">
            已选当前{{ id.length }}条数据
          </a-radio>
          <a-radio
            :style="radioStyle"
            :key="2"
            :value="BATCH_TYPE.CONDITION"
            :disabled="helpShow"
          >
            已选现有筛选条件下全部的{{ count }}条数据
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item label="入场时段" required>
        <a-radio-group v-model="admissionTime">
          <a-radio
            v-for="(item, index) in inoutTypes"
            :value="+item.value"
            :key="index"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <shop-hour-picker
        v-if="admissionTime === inoutTypes[1].value"
        v-model="timeList"
      ></shop-hour-picker>
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
        <st-button type="primary" :loading="loading.setCardEnterTime">
          确认提交
        </st-button>
      </st-popconfirm>
    </template>
  </st-modal>
</template>

<script>
import { BatchEnterTimeService } from './batch-enter-time.service'
import { BATCH_TYPE, BATCH_INFO } from '@/constants/common/batch-operation'
import { cloneDeep } from 'lodash-es'
import ShopHourPicker from '@/views/biz-components/shop-hour-picker/shop-hour-picker'
export default {
  name: 'ModalSoldCardBatchEnterTime',
  serviceProviders() {
    return [BatchEnterTimeService]
  },
  serviceInject() {
    return {
      batchEnterTimeService: BatchEnterTimeService
    }
  },
  rxState() {
    return {
      loading: this.batchEnterTimeService.loading$,
      count: this.batchEnterTimeService.count$,
      inoutTypes: this.batchEnterTimeService.inoutTypes$
    }
  },
  components: {
    ShopHourPicker
  },
  props: {
    id: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.batchEnterTimeService.fetchCardNum(this.$searchQuery).subscribe()
  },
  data() {
    return {
      BATCH_TYPE,
      BATCH_INFO,
      show: false,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      batch_type: BATCH_TYPE.SELECTED,
      timeList: [],
      admissionTime: 1
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
        ? this.id.length
        : this.count
    }
  },
  methods: {
    onSubmit() {
      this.batchEnterTimeService
        .setCardEnterTime({
          sold_ids: this.id,
          batch_type: this.batch_type,
          inout_type: this.admissionTime,
          inout_time: this.timeList,
          conditions: this.$searchQuery
        })
        .subscribe(res => {
          this.$emit('success')
          this.show = false
        })
    }
  }
}
</script>
