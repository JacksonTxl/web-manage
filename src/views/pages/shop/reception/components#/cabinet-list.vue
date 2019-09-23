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
            :class="[b('item'), cabinetClass(item)]"
            v-for="(item, index) in list"
            :key="index"
            @mouseenter="mouseEventHander('enter', item.id)"
            @mouseleave="mouseEventHander('leave', item.id)"
          >
            <div :class="b('item-num')">{{ item.serial_num }}</div>
            <div class="smart-cabinet-logo" v-if="item.is_smart">
              <st-icon
                class="smart-cabinet-logo__img"
                type="cabinet-logo"
                color="#3F66F6"
              ></st-icon>
            </div>
            <div
              :class="b('item-normal')"
              v-if="
                cabinetUsingItem(item).cabinet_business_type ===
                  CABINET.CABINET_BUSINESS_TYPE_AVAILABLE
              "
            >
              <div :class="b('item-status')">空闲</div>
              <div :class="b('item-price')" v-if="cabinetType">
                ¥{{ item.price_num || 0 }}/天
              </div>
            </div>
            <div
              :class="bItemUsing()"
              v-if="
                cabinetUsingItem(item).cabinet_business_type ===
                  CABINET.CABINET_BUSINESS_TYPE_USING
              "
            >
              <p :class="bItemUsing('title')">{{ item.user_name }}</p>
              <p :class="bItemUsing('time')" v-if="cabinetType">
                到期时间
              </p>
              <p :class="bItemUsing('time')" v-if="cabinetType">
                {{ item.end_time }}
              </p>
            </div>
            <p
              v-if="
                cabinetUsingItem(item).cabinet_business_type ===
                  CABINET.CABINET_BUSINESS_TYPE_BROKEN
              "
              :class="b('item-broken-text')"
            >
              损坏
            </p>
            <p
              v-if="
                cabinetUsingItem(item).cabinet_business_type ===
                  CABINET.CABINET_BUSINESS_TYPE_REPAIR
              "
              :class="b('item-repair-text')"
            >
              维修
            </p>
            <div
              :class="bItemUsing('action')"
              v-if="
                item.is_smart &&
                  cabinetUsingItem(item).cabinet_business_type ===
                    CABINET.CABINET_BUSINESS_TYPE_USING &&
                  editFlag === `enter-${item.id}` &&
                  auth.edit &&
                  !isOperationInBatch
              "
            >
              <a @click="openCabinetModal(item)">
                远程开柜
              </a>
            </div>
            <div
              :class="bItemUsing('action')"
              v-if="
                cabinetUsingItem(item).cabinet_business_type !==
                  CABINET.CABINET_BUSINESS_TYPE_USING &&
                  editFlag === `enter-${item.id}` &&
                  auth.edit &&
                  !isOperationInBatch
              "
            >
              <a @click="editCabinetModal(item)">
                编辑
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
import ShopCabinetEditStatus from '@/views/biz-modals/shop/cabinet/edit-status'
import { CABINET } from '@/constants/reception/cabinet'
import { RouteService } from '@/services/route.service'
export default {
  bem: {
    b: 'shop-reception-cabinet',
    bItemUsing: 'shop-reception-cabinet-item-using',
    bItemBroken: 'shop-reception-cabinet-item-broken'
  },
  serviceInject() {
    return {
      cabinetService: CabinetService,
      routeService: RouteService
    }
  },
  rxState() {
    const cabinetService = this.cabinetService
    return {
      list: cabinetService.list$,
      auth: cabinetService.auth$,
      query: this.routeService.query$
    }
  },
  modals: {
    ShopCabinetEditLongTerm,
    ShopCabinetEditTemporary,
    ShopCabinetEditStatus,
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
    },
    cabinetType() {
      return this.query.type === 'long-term'
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
    cabinetUsingItem(item) {
      if (this.cabinetType && item.sale_status === 1) {
        item.cabinet_business_type = 2
      }
      return item
    },
    cabinetClass(item) {
      let cabinet = ''
      switch (this.cabinetUsingItem(item).cabinet_business_type) {
        case this.CABINET.CABINET_BUSINESS_TYPE_AVAILABLE:
          cabinet = ''
          break
        case this.CABINET.CABINET_BUSINESS_TYPE_USING:
          cabinet = 'shop-reception-cabinet__item-normal-using'
          if (item.is_smart) {
            cabinet = 'shop-reception-cabinet__item-using'
          }
          break
        case this.CABINET.CABINET_BUSINESS_TYPE_BROKEN:
          cabinet = 'shop-reception-cabinet__item-broken'
          break
        case this.CABINET.CABINET_BUSINESS_TYPE_REPAIR:
          cabinet = 'shop-reception-cabinet__item-repair'
          break
      }
      return cabinet
    },
    openCabinetModal(item) {
      this.$modalRouter.push({
        name: 'shop-cabinet-open',
        props: {
          id: item.id,
          userName: item.user_name,
          userMobile: item.mobile
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    editCabinetModal(item) {
      this.$modalRouter.push({
        name: 'shop-cabinet-edit-status',
        props: {
          id: item.id,
          useStatus: this.cabinetUsingItem(item).cabinet_business_type
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
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
