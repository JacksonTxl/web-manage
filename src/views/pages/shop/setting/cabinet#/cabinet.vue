<template>
  <div>
    <section v-if="value.length">
      <div v-if="isOperationInBatch">
        <a-checkbox
          :indeterminate="indeterminate"
          :checked="checkAll"
          @change="onCheckAllChange"
        />
        <span>已选 <span class="color-primary">{{checkedList.length}}</span> / {{value.length}}</span>
      </div>
      <a-checkbox-group :value="checkedList" @change="onChange" class="full-width mg-t16">
        <a-row :gutter="16" :class="b()">
          <a-col v-for="(item, index) in value" :key="index" :md="6" :lg="4" :xl="3">
            <div :class="b('item')"
              @mouseenter="mouseEventHander('enter', item.id)"
              @mouseleave="mouseEventHander('leave', item.id)"
            >
              <div :class="b('item-num')">{{item.serial_num}}</div>
              <div v-if="item.price_num" :class="b('item-price')">¥{{item.price_num}}/天</div>
              <div :class="b('action')">
                <a-checkbox
                  v-if="isOperationInBatch"
                  :value="item.id"
                />
                <a
                  v-else
                  v-modal-link="{
                    name: `shop-cabinet-edit-${type}`,
                    props: { id: item.id }
                  }"
                >
                  <span v-if="editFlag === `enter-${item.id}`">编辑</span>
                </a>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </section>
    <section v-else>
      <st-no-data text="暂无储物柜～"/>
    </section>
  </div>
</template>
<script>
export default {
  bem: {
    b: 'st-setting-cabinet'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    isOperationInBatch: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'temporary'
    }
  },
  computed: {
    plainOptions() {
      const { value } = this
      const ret = []
      value.forEach(item => {
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
      this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
      this.checkAll = checkedList.length === plainOptions.length
      this.$emit('change', checkedList)
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
      this.$emit('change', this.checkedList)
    },
    mouseEventHander(type, id) {
      this.editFlag = `${type}-${id}`
    }
  }
}
</script>
