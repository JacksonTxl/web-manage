<template>
  <st-modal
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
        :value="coachIds"
        @change="onChange"
        @search="onSearch"
        :filterOption="false"
        @focus="onFocus"
        @blur="onBlur"
      >
        <a-select-option
          v-for="item in list"
          :key="`${item.id}`"
          :value="item.id"
        >
          {{item.nickname}}
        </a-select-option>
      </a-select>
      <p class="color-text-light mg-t8">已选择{{coachIds.length}}个教练</p>
      <p class="ta-r">
        <st-button @click="onCancelSelect">取消</st-button>
        <st-button type="primary" class="mg-l8" @click="onConfirmSelect">确定</st-button>
      </p>
    </div>
  </st-modal>
</template>
<script>
import { RecommendService } from './recommend.service'
export default {
  data() {
    return {
      show: false,
      coachIds: [],
      keyword: '',
      size: 50,
      list: []
    }
  },
  serviceInject() {
    return {
      selectService: RecommendService
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
  created() {
    this.coachIds = this.selected
    this.search()
  },
  methods: {
    onChange(coachIds) {
      this.coachIds = coachIds
      this.onSearch('')
    },
    onSearch(keyword) {
      this.keyword = keyword
      this.search('')
    },
    search() {
      this.selectService.getCoachSelect({
        shop_ids: this.shopIds,
        size: this.size,
        keyword: this.keyword
      }).subscribe(res => {
        this.list = res.coaches
      })
    },
    onConfirmSelect() {
      this.show = false
      this.$emit('change', this.coachIds)
    },
    onCancelSelect() {
      this.show = false
    },
    onFocus() {
      this.onSearch('')
    },
    onBlur() {
      this.keyword = ''
    }
  }
}
</script>
