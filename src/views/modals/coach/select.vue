<template>
  <a-modal
    title="选择教练"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
  >
    <div>
      <a-select
        mode="multiple"
        style="width: 100%"
        placeholder="请输入教练昵称、姓名、手机号进行查询"
        :defaultValue="selected"
        @change="change"
      >
        <a-select-option v-for="item in list" :key="`${item.coach_id}`">{{item.coach_name}}</a-select-option>
      </a-select>
      <p class="color-text-light mg-t8">已选择{{coachIds.length}}个教练</p>
      <p class="ta-r">
        <st-button @click="onCancelSelect">取消</st-button>
        <st-button type="primary" class="mg-l8" @click="onConfirmSelect">确定</st-button>
      </p>
    </div>
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      coachIds: []
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    selected: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    selected(val) {
      this.coachIds = val
    }
  },
  methods: {
    change(coachIds) {
      this.coachIds = coachIds
    },
    onConfirmSelect() {
      this.show = false
      this.$emit('change', this.coachIds)
    },
    onCancelSelect() {
      this.show = false
    }
  }
}
</script>
