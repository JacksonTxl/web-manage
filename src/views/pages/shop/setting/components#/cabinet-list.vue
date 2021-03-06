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
        <a-row :gutter="16" :class="b()">
          <a-col
            v-for="(item, index) in list"
            :key="index"
            :md="6"
            :lg="4"
            :xl="3"
          >
            <div
              :class="b('item')"
              @mouseenter="mouseEventHander('enter', item.id)"
              @mouseleave="mouseEventHander('leave', item.id)"
            >
              <template v-if="item.is_smart">
                <div class="smart-cabinet-logo" v-if="item.is_online">
                  <st-icon
                    class="smart-cabinet-logo__img"
                    type="cabinet-logo"
                    color="#ffffff"
                  ></st-icon>
                </div>

                <st-help-tooltip :isCustom="true" title="该储物柜已离线" v-else>
                  <div class="smart-cabinet-logo smart-cabinet-logo--disabled">
                    <st-icon
                      class="smart-cabinet-logo__img"
                      type="cabinet-logo"
                      color="#9BACB9"
                    ></st-icon>
                  </div>
                </st-help-tooltip>
              </template>

              <div :class="b('item-num')">{{ item.serial_num }}</div>
              <div v-if="item.price_num" :class="b('item-price')">
                ¥{{ item.price_num }}/天
              </div>
              <div :class="b('action')">
                <a-checkbox v-if="isOperationInBatch" :value="item.id" />
                <a
                  v-else
                  v-modal-link="{
                    name: `shop-cabinet-edit-${type}`,
                    props: {
                      id: item.id,
                      areaName
                    },
                    on: {
                      change
                    }
                  }"
                >
                  <span
                    v-if="editFlag === `enter-${item.id}` && auth.edit"
                    :class="b('item-edit')"
                  >
                    编辑
                  </span>
                </a>
              </div>
            </div>
          </a-col>
        </a-row>
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
export default {
  bem: {
    b: 'st-setting-cabinet'
  },
  serviceInject() {
    return {
      cabinetService: CabinetService
    }
  },
  rxState() {
    const cabinetService = this.cabinetService
    return {
      resData: cabinetService.resData$,
      auth: cabinetService.auth$
    }
  },
  modals: {
    ShopCabinetEditLongTerm,
    ShopCabinetEditTemporary
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
    list() {
      return this.resData.list
    },
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
