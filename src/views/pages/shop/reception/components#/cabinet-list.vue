<template>
  <div>
    <section v-if="list && list.length">
      <div v-if="isOperationInBatch" class="mg-b12">
        <a-checkbox
          :indeterminate="indeterminate"
          :checked="checkAll"
          @change="onCheckAllChange"
        />
        <span>
          已选
          <span class="color-primary">{{ checkedList.length }}</span>
          / {{ list.length }}
        </span>
      </div>
      <a-checkbox-group
        :value="checkedList"
        @change="onChange"
        class="full-width"
      >
        <div :class="b()">
          <div
            :class="[b('item'), b('item-using')]"
            v-for="(item, index) in list"
            :key="index"
            @mouseenter="mouseEventHander('enter', item.id)"
            @mouseleave="mouseEventHander('leave', item.id)"
          >
            <div :class="b('item-num')">{{ item.serial_num }}</div>
            <div class="smart-cabinet-logo">
              <st-icon
                class="smart-cabinet-logo__img"
                type="cabinet-logo"
                color="#3F66F6"
              ></st-icon>
            </div>
            <div :class="b('item-normal')" v-if="false">
              <div :class="b('item-status')">空闲</div>
              <div :class="b('item-price')">¥{{ item.price_num || 0 }}/天</div>
            </div>
            <div :class="bItemUsing()" v-if="true">
              <p :class="bItemUsing('title')">胡超</p>
              <p :class="bItemUsing('time')">到期时间</p>
              <p :class="bItemUsing('time')">2019/03/06 00:00</p>
            </div>
            <p v-if="false" :class="b('item-broken-text')">胡超</p>
            <div
              :class="bItemUsing('action')"
              v-if="
                editFlag === `enter-${item.id}` &&
                  auth.edit &&
                  !isOperationInBatch
              "
            >
              <a
                v-modal-link="{
                  name: `shop-cabinet-open`,
                  props: {
                    id: 0
                  },
                  on: {
                    change
                  }
                }"
              >
                <span>远程开柜</span>
              </a>
            </div>
            <div :class="b('action')" v-if="isOperationInBatch">
              <a-checkbox :value="item.id" />
            </div>
          </div>
        </div>
      </a-checkbox-group>
    </section>
    <section v-else>
      <st-no-data text="暂无储物柜～" />
    </section>
  </div>
</template>
<script>
import { CabinetListService as CabinetService } from './cabinet-list.service'
import ShopCabinetEditLongTerm from '@/views/biz-modals/shop/cabinet/edit-long-term'
import ShopCabinetEditTemporary from '@/views/biz-modals/shop/cabinet/edit-temporary'
import ShopCabinetOpen from '@/views/biz-modals/shop/cabinet/open'
import { CABINET } from '@/constants/reception/cabinet'
export default {
  bem: {
    b: 'shop-reception-cabinet',
    bItemUsing: 'shop-reception-cabinet-item-using',
    bItemBroken: 'shop-reception-cabinet-item-broken'
  },
  serviceInject() {
    return {
      cabinetService: CabinetService
    }
  },
  rxState() {
    const cabinetService = this.cabinetService
    return {
      list: cabinetService.list$,
      auth: cabinetService.auth$
    }
  },
  modals: {
    ShopCabinetEditLongTerm,
    ShopCabinetEditTemporary,
    ShopCabinetOpen
  },
  props: {
    isOperationInBatch: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'temporary'
    },
    areaName: {
      type: String,
      default: ''
    }
  },
  watch: {
    isOperationInBatch() {
      this.checkedList = []
      this.indeterminate = false
      this.checkAll = false
    }
  },
  computed: {
    plainOptions() {
      const { list } = this
      const ret = []
      list.forEach(item => {
        ret.push(item.id)
      })
      return ret
    }
  },
  data() {
    return {
      CABINET,
      checkedList: [],
      indeterminate: false,
      checkAll: false,
      editFlag: ''
    }
  },
  methods: {
    onChange(checkedList) {
      const { plainOptions } = this
      this.checkedList = checkedList
      this.indeterminate =
        !!checkedList.length && checkedList.length < plainOptions.length
      this.checkAll = checkedList.length === plainOptions.length
      this.$emit('selectChange', checkedList)
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
      this.$emit('selectChange', this.checkedList)
    },
    mouseEventHander(type, id) {
      this.editFlag = `${type}-${id}`
    },
    change() {
      this.$emit('change')
    }
  }
}
</script>
