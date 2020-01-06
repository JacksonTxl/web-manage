<template>
  <st-modal
    :title="`选择${$c('coach')}`"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
  >
    <div>
      <a-select
        mode="multiple"
        style="width: 100%"
        :placeholder="`请输入${$c('coach')}昵称、姓名、手机号进行查询`"
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
          {{ item.nickname || item.staff_name }}
        </a-select-option>
      </a-select>
      <p class="color-text-light mg-t8">
        已选择{{ coachIds.length }}个{{ $c('coach') }}
      </p>
      <p class="ta-r">
        <st-button @click="onCancelSelect">取消</st-button>
        <st-button type="primary" class="mg-l8" @click="onConfirmSelect">
          确定
        </st-button>
      </p>
    </div>
  </st-modal>
</template>
<script>
import { SelectService } from './select.service'
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
      selectService: SelectService
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
    },
    type: {
      type: String,
      default: ''
    }
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
      if (this.type === 'smallCourse') {
        this.selectService
          .getSmallCourseCoachSelect({
            shop_ids: this.shopIds,
            size: this.size,
            keyword: this.keyword
          })
          .subscribe(res => {
            this.list = res.list
          })
      } else {
        this.selectService
          .getCoachSelect({
            shop_ids: this.shopIds,
            size: this.size,
            keyword: this.keyword
          })
          .subscribe(res => {
            this.list = res.coaches
          })
      }
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
