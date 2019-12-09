<template>
  <st-modal
    title="批量入场vip区域设置"
    size="small"
    v-model="show"
    :class="batch()"
  >
    <st-form labelWidth="75px">
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
      <st-form-item label="入场vip区域" :class="batch('entry')">
        <a-checkbox-group v-model="cardVip" v-if="vips.length">
          <a-checkbox
            v-for="(item, index) in vips"
            :key="index"
            :value="+item.id"
          >
            {{ item.area_name }}
          </a-checkbox>
        </a-checkbox-group>
        <span v-else>未设置vip区域场地</span>
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
        <st-button
          type="primary"
          :loading="loading.setCardVip"
          :disabled="btnDisabled"
        >
          确认提交
        </st-button>
      </st-popconfirm>
    </template>
  </st-modal>
</template>

<script>
import { BatchAreaService } from './batch-area.service'
import { BATCH_TYPE, BATCH_INFO } from '@/constants/common/batch-operation'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalSoldCardArea',
  bem: {
    batch: 'sold-card-batch-area'
  },
  props: {
    ids: {
      type: Array,
      required: true
    },
    searchQuery: Object
  },
  serviceProviders() {
    return [BatchAreaService]
  },
  serviceInject() {
    return {
      batchAreaService: BatchAreaService
    }
  },
  rxState() {
    return {
      vips: this.batchAreaService.vips$,
      loading: this.batchAreaService.loading$,
      count: this.batchAreaService.count$
    }
  },
  data() {
    return {
      BATCH_TYPE,
      BATCH_INFO,
      show: false,
      cardVip: [],
      batch_type: BATCH_TYPE.SELECTED,
      btnDisabled: false
    }
  },
  watch: {
    vips(newVal) {
      newVal.length === 0
        ? (this.btnDisabled = true)
        : (this.btnDisabled = false)
    }
  },
  mounted() {
    this.batchAreaService.init(this.searchQuery).subscribe()
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
      this.batchAreaService
        .setCardVip({
          batch_type: this.batch_type,
          sold_ids: this.ids,
          vip_ids: this.cardVip,
          conditions: this.searchQuery
        })
        .subscribe(res => {
          this.show = false
          this.$emit('success')
        })
    }
  }
}
</script>
