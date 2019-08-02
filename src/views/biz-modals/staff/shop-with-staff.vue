<template>
  <st-modal
    class="modal-support-course-shops"
    title="查看店详情"
    v-model="show"
  >
    <st-container>
      <st-table
        :columns="columns"
        :rowKey="record => record.shop_name"
        :pagination="null"
        :dataSource="shopList"
      ></st-table>
    </st-container>
  </st-modal>
</template>
<script>
const columns = [
  {
    title: '省',
    dataIndex: 'province_name'
  },
  {
    title: '市',
    dataIndex: 'city_name'
  },
  {
    title: '区',
    dataIndex: 'district_name'
  },
  {
    title: '门店',
    dataIndex: 'name'
  }
]
export default {
  name: 'SupportCourseShops',
  serviceInject() {
    return {
      brandService: BrandService
    }
  },
  data() {
    return {
      columns,
      show: false,
      supportShopList: []
    }
  },
  props: {
    shopList: {
      type: Number,
      default: -1
    }
  },
  methods: {
    getShops() {
      this.brandService
        .getCoursePersonalSupportShops({ course_id: this.courseId })
        .subscribe(state => {
          this.supportShopList = state.shops
        })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
