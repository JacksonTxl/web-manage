<template>
  <div>
    <shop-select class="mg-r8" style="width: 160px" v-model="query.shop_id" @change="onChange"></shop-select>
    <a-select
      class="filter-staff__item mg-r8"
      allowClear
      style="width: 160px"
      placeholder="全部员工状态"
      v-model="query.work_status"
      @change="onChange"
    >
      <a-select-option
        v-for="status in workStatus"
        :value="status.id"
        :key="status.id"
      >{{status.name}}</a-select-option>
    </a-select>
    <st-input-search
      placeholder="搜索员工"
      style="width:226px"
      round="round"
      v-model="query.keyword"
      @search="onChange"></st-input-search>
  </div>
</template>
<script>
import { RouteService } from '../../../../../services/route.service'
import { UserService } from '../../../../../services/user.service'
import ShopSelect from '@/views/biz-components/shop-select'
export default {
  name: 'FilterStaff',
  serviceInject() {
    return {
      routeService: RouteService,
      userService: UserService
    }
  },
  rxState() {
    return {
      staffEnums: this.userService.staffEnums$,
      query: this.routeService.query$
    }
  },
  components: {
    ShopSelect
  },
  computed: {
    workStatus() {
      return [{ id: -1, name: '全部' }, ...this.computedList('work_status')]
    }
  },
  data() {
    return {
    }
  },
  methods: {
    computedList(key) {
      let arr = []
      let value = this.staffEnums[key].value
      for (let key in value) {
        arr.push({
          id: key,
          name: value[key]
        })
      }
      return arr
    },
    // 员工状态
    onChooseStaffStatus(e) {
      this.searchData.staff_status = e
    },
    onChooseShop(e) {
      this.searchData.shop_id = e
    },
    onChange() {
      this.$router.push({ query: this.query })
    },
    reset(value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
