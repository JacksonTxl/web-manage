<template>
  <div class="pages-brand-staff-info-member-container">
    <shop-select
      style="width: 160px"
      v-model="$searchQuery.shop_id"
      :defaultValue="-1"
      @change="onSingleSearch('shop_id', $event)"
    ></shop-select>
    <st-input-search
      class="fl-r"
      placeholder="请输入会员名姓名、手机号进行查询"
      @search="onSingleSearch('keyword', $event)"
    />
    <a-col :lg="24" class="mg-t16">
      <st-table
        :columns="memberColums"
        :dataSource="memberInfo"
        :scroll="{ x: 1300 }"
        :loading="loading.getStaffServiceCourses"
        :page="page"
        @change="onTableChange"
      >
        <template slot="course_name" slot-scope="text, record">
          <a href="javascript:;" class="mg-r8" @click="goCourseDetai(record)">
            {{ text }}
          </a>
        </template>
        <!-- <template slot="member_name" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goMemberDetai(record)">
              {{ text }}
            </a> 品牌下没有用户选项 不允许跳转
          </template> -->
        <template slot="course_status" slot-scope="text, record">
          <span v-if="record.course_status === '有效'" class="effective"></span>
          <span v-if="record.course_status === '无效'" class="invalid"></span>
          <span v-if="record.course_status === '已冻结'" class="frozen"></span>
          {{ text }}
        </template>
      </st-table>
    </a-col>
  </div>
</template>

<script>
import { memberColums } from './columns.config'
import { MemberService } from './member.service'
import ShopSelect from '@/views/biz-components/shop-select'
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      service: MemberService
    }
  },
  rxState() {
    return {
      memberInfo: this.service.memberInfo$,
      loading: this.service.loading$,
      page: this.service.page$
    }
  },
  data() {
    return {
      id: ''
    }
  },
  computed: {
    memberColums
  },
  components: {
    ShopSelect
  },
  mounted() {
    this.id = this.$searchQuery.id
  },
  methods: {
    goCourseDetai(e) {
      console.log('跳转到课程详情', e)
      let course_type = e.course_type
      let course_id = e.course_id
      this.$router.push({
        name: 'brand-product-course-personal-info',
        query: {
          id: course_id
        }
      })
    },
    goMemberDetai(e) {
      console.log('跳转到用户详情', e)
      let member_id = e.member_id
      this.$router.push({
        name: 'shop-member-info-basic',
        query: {
          id: e.member_id
        }
      })
    }
  }
}
</script>
