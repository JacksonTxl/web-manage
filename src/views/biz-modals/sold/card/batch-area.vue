<template>
  <st-modal title="批量入场vip区域设置" size="small" v-model="show">
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
      <st-form-item label="入场vip区域" class="mg-b0">
        <a-checkbox-group v-model="cardVip">
          <a-checkbox
            v-for="(item, index) in vips"
            :key="index"
            :value="+item.id"
          >
            {{ item.area_name }}
          </a-checkbox>
        </a-checkbox-group>
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
        <st-button type="primary" :loading="loading.setCardVip">
          确认提交
        </st-button>
      </st-popconfirm>
    </template>
  </st-modal>
</template>

<script>
import { RouteService } from '@/services/route.service'
import { BatchAreaService } from './batch-area.service'
import { BATCH_TYPE, BATCH_INFO } from '@/constants/common/batch-operation'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalSoldCardArea',
  props: {
    id: {
      type: Array,
      required: true
    }
  },
  serviceProviders() {
    return [BatchAreaService]
  },
  serviceInject() {
    return {
      routeService: RouteService,
      batchAreaService: BatchAreaService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
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
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      batch_type: BATCH_TYPE.SELECTED
    }
  },
  mounted() {
    this.batchAreaService.init(this.query).subscribe()
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
      this.batchAreaService
        .setCardVip({
          batch_type: this.batch_type,
          sold_ids: this.id,
          vip_ids: this.cardVip,
          conditions: this.query
        })
        .subscribe(res => {
          this.show = false
          this.$emit('success')
        })
    }
  }
}
</script>
