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
        @change="onChange"
        @search="onSearch"
      >
        <a-select-option v-for="item in list" :key="`${item.id}`">{{item.nickname}}</a-select-option>
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
import { SelectService } from './select.service'
export default {
  data() {
    return {
      show: false,
      coachIds: [],
      keyword: '',
      size: 10
    }
  },
  serviceInject() {
    return {
      selectService: SelectService
    }
  },
  rxState() {
    return {
      list: this.selectService.list$
    }
  },
  props: {
    selected: {
      type: Array,
      default() {
        return []
      }
    },
    shopIds: {
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
  created() {
    this.search()
  },
  methods: {
    onChange(coachIds) {
      this.coachIds = coachIds
    },
    onSearch(keyword) {
      console.log('on search')
      this.keyword = keyword
      this.search()
    },
    search() {
      this.selectService.getCoachSelect({
        shop_ids: this.shopIds,
        size: this.size,
        keyword: this.keyword
      }).subscribe()
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
