<template>
  <st-modal
  title="入场vip区域设置"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-card-area">
    <div :class="area('content')">
      <st-form labelWidth="75px">
        <div :class="area('area')">
          <st-form-item label="入场vip区域" class="mg-b0">
            <a-checkbox-group v-model="cardVip">
                <a-checkbox
                v-for="(item,index) in vips"
                :key="index"
                :value="+item.id">{{item.area_name}}</a-checkbox>
              </a-checkbox-group>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.setCardVip" type="primary">确认提交</st-button>
    </template>
  </st-modal>
</template>

<script>
import { AreaService } from './area.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalSoldCardArea',
  bem: {
    area: 'modal-sold-card-area'
  },
  props: {
    id: {
      type: Array,
      required: true
    }
  },
  serviceInject() {
    return {
      areaService: AreaService
    }
  },
  rxState() {
    return {
      vips: this.areaService.vips$,
      loading: this.areaService.loading$
    }
  },
  computed: {
    isOnlyOne() {
      return this.id.length === 1
    }
  },
  methods: {
    onSubmit() {
      this.areaService.setCardVip({
        id: this.id,
        vip_id: this.cardVip
      }).subscribe(res => {
        this.show = false
        this.$emit('success')
      })
    }
  },
  data() {
    return {
      show: false,
      cardVip: []
    }
  },
  created() {
    this.areaService.getVips().subscribe()
    if (this.isOnlyOne) {
      this.areaService.getCardVip(this.id[0]).subscribe(res => {
        res.list.forEach(o => {
          if (o.it_is === 1) {
            this.cardVip.push(o.id)
          }
        })
      })
    }
  }
}
</script>
