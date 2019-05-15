<template>
  <div>
    <a-select
      class="filter-staff__item mg-r8"
      style="width: 160px"
      allowClear
      @change="onChooseShop"
      placeholder="全部门店"
    >
      <a-select-option :value="1">门店1</a-select-option>
      <a-select-option :value="2">门店2</a-select-option>
    </a-select>
    <a-select
      class="filter-staff__item mg-r8"
      style="width: 160px"
      allowClear
      placeholder="全部员工状态"
      @change="onChooseStaffStatus"
    >
      <a-select-option
        v-for="status in workStatus"
        :value="status.value"
        :key="status.value"
      >{{status.label}}</a-select-option>
    </a-select>
    <a-button type="primary" class="mg-r8" @click="handleSubmit">查询</a-button>
  </div>
</template>
<script>
const workStatus = [{ label: '在职', value: 1 }, { label: '离职', value: 0 }]
export default {
  name: 'FilterStaff',
  data() {
    return {
      form: this.$form.createForm(this),
      searchData: {
        shop_id: null,
        staff_status: ''
      },
      workStatus
    }
  },
  methods: {
    // 员工状态
    onChooseStaffStatus(e) {
      this.searchData.staff_status = e
    },
    onChooseShop(e) {
      this.searchData.shop_id = e
    },
    handleSubmit() {
      this.$emit('search', this.searchData)
    },
    reset(value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
