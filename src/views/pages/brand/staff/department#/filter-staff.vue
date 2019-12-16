<template>
  <div class="filter-staff">
    <shop-select
      class="filter-staff__item mg-r8"
      v-model="$searchQuery.shop_id"
      @change="onSingleSearch('shop_id', $event)"
    ></shop-select>
    <a-select
      class="filter-staff__item mg-r8"
      allowClear
      placeholder="全部员工状态"
      v-model="$searchQuery.work_status"
      @change="onSingleSearch('work_status', $event)"
      :options="workStatus"
    />
    <st-input-search
      class="filter-staff__item"
      placeholder="搜索员工"
      round="round"
      v-model="$searchQuery.keyword"
      @search="onKeywordsSearch('keyword', $event)"
    ></st-input-search>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import tableMixin from '@/mixins/table.mixin'
import ShopSelect from '@/views/biz-components/shop-select'
export default {
  name: 'FilterStaff',
  mixins: [tableMixin],
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      staffEnums: this.userService.getOptions$('staff.work_status')
    }
  },
  components: {
    ShopSelect
  },
  computed: {
    workStatus() {
      return [{ value: -1, label: '全部员工状态' }, ...this.staffEnums]
    }
  },
  data() {
    return {}
  },
  methods: {
    // 员工状态
    onChooseStaffStatus(e) {
      this.searchData.staff_status = e
    },
    onChooseShop(e) {
      this.searchData.shop_id = e
    },
    onChange() {
      this.$router.push({ query: this.$searchQuery })
    },
    reset(value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
