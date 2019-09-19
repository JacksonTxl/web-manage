<template>
  <div>
    <div :class="b('num')">{{ item.serial_num }}</div>
    <div :class="b('normal')" v-if="false">
      <div :class="b('status')">空闲</div>
      <div :class="b('price')">¥{{ item.price_num || 0 }}/天</div>
    </div>
    <div :class="bItemUsing()" v-if="true">
      <p :class="bItemUsing('title')">胡超</p>
      <p :class="bItemUsing('time')">到期时间</p>
      <p :class="bItemUsing('time')">2019/03/06 00:00</p>
    </div>
    <p v-if="false" :class="b('item-broken-text')">胡超</p>
    <div
      :class="bItemUsing('action')"
      v-if="editFlag === `enter-${item.id}` && auth.edit && !isOperationInBatch"
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
</template>
<script>
export default {
  name: 'CabinetItem',
  bem: {
    b: 'shop-reception-cabinet-item'
  },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    available() {
      return this.value.status === 'available'
    },
    inuse() {
      return this.value.status === 'inuse'
    },
    unavailable() {
      return this.value.status === 'unavailable'
    }
  }
}
</script>
