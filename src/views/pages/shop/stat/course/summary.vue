<template>
  <div>
    <st-table-header-section class="mg-b16">
      <st-button
        v-if="auth.export"
        type="primary"
        v-export-excel="{ type: 'course/shop', query: $searchQuery }"
      >
        全部导出
      </st-button>

      <div slot="actions">
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </div>
    </st-table-header-section>
    <st-total
      :class="bPage('total')"
      :indexs="totalColumns"
      :dataSource="total$"
      hasTitle
    >
      <template v-slot:personal_checkin_amount="record">
        <st-total-item
          @click.native="onCLickPersonalCheckinAmount"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
      <template v-slot:team_checkin_amount="record">
        <st-total-item
          @click.native="onCLickTeamCheckinAmount"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
      <template v-slot:small_checkin_amount="record">
        <st-total-item
          @click.native="onCLickSmallCheckinAmount"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
      <template v-slot:personal_course_num="record">
        <st-total-item
          @click.native="onCLickPersonalNum"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
      <template v-slot:team_course_num="record">
        <st-total-item
          @click.native="onCLickTeamNum"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
      <template v-slot:small_course_num="record">
        <st-total-item
          @click.native="onCLickSmallNum"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
    </st-total>
    <st-table
      class="mg-t12"
      :page="page"
      :scroll="{ x: 3000 }"
      @change="onTableChange"
      :loading="loading.init"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <a
        slot="personal_course_num"
        @click="getPersonalCourse(record)"
        slot-scope="text, record"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <a
        slot="personal_checkin_amount"
        @click="getPersonalConsume(record)"
        slot-scope="text, record"
      >
        {{ text }}
      </a>
      <a
        slot="team_course_num"
        slot-scope="text, record"
        @click="getTeamCourse(record)"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <a
        slot="team_checkin_amount"
        slot-scope="text, record"
        @click="getTeamConsume(record)"
      >
        {{ text }}
      </a>
      <a
        slot="small_course_num"
        slot-scope="text, record"
        @click="getSmallCourse(record)"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <a
        slot="small_checkin_amount"
        slot-scope="text, record"
        @click="getSmallConsume(record)"
      >
        {{ text }}
      </a>
      <span slot="personalTitle">
        私教消课价值（元)
        <st-help-tooltip id="TSCR001" />
      </span>
      <span slot="teamTitle">
        团课消课价值（元）
        <st-help-tooltip id="TSCR002" />
      </span>
      <span slot="smallTitle">
        {{ smallCourseText }}
        <st-help-tooltip id="TSCR003" />
      </span>
    </st-table>
  </div>
</template>
<script>
import { SummaryService } from './summary.service'
import tableMixin from '@/mixins/table.mixin'
import ShopStatPersonalCourse from '@/views/biz-modals/shop/stat/personal-course'
import ShopStatPersonalConsume from '@/views/biz-modals/shop/stat/personal-consume'
import ShopStatTeamCourse from '@/views/biz-modals/shop/stat/team-course'
import ShopStatTeamConsume from '@/views/biz-modals/shop/stat/team-consume'
import ShopStatSmallCourse from '@/views/biz-modals/shop/stat/small-course'
import ShopStatSmallConsume from '@/views/biz-modals/shop/stat/small-consume'
import { columns, totalColumns } from './summary.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-course',
    bHeard: 'header'
  },
  modals: {
    ShopStatPersonalCourse,
    ShopStatPersonalConsume,
    ShopStatTeamCourse,
    ShopStatTeamConsume,
    ShopStatSmallCourse,
    ShopStatSmallConsume
  },
  serviceInject() {
    return {
      summaryService: SummaryService
    }
  },
  rxState() {
    return {
      loading: this.summaryService.loading$,
      list: this.summaryService.list$,
      total$: this.summaryService.total$,
      page: this.summaryService.page$,
      auth: this.summaryService.auth$
    }
  },
  computed: {
    columns,
    totalColumns,
    smallCourseText(vm) {
      return `${vm.$c('small_course')}消课价值（元)`
    }
  },
  methods: {
    onCLickPersonalCheckinAmount() {
      this.$modalRouter.push({
        name: 'shop-stat-personal-consume',
        props: {
          type: 'total'
        }
      })
    },
    onCLickTeamCheckinAmount() {
      console.log('你点击了+ onCLickTeamCheckinAmount')
      this.$modalRouter.push({
        name: 'shop-stat-team-consume',
        props: {
          type: 'total'
        }
      })
    },
    onCLickSmallCheckinAmount() {
      this.$modalRouter.push({
        name: 'shop-stat-small-consume',
        props: {
          type: 'total'
        }
      })
    },
    onCLickPersonalNum() {
      this.$modalRouter.push({
        name: 'shop-stat-personal-course',
        props: {
          type: 'total'
        }
      })
    },
    onCLickTeamNum() {
      this.$modalRouter.push({
        name: 'shop-stat-team-course',
        props: {
          type: 'total'
        }
      })
    },
    onCLickSmallNum() {
      this.$modalRouter.push({
        name: 'shop-stat-small-course',
        props: {
          type: 'total'
        }
      })
    },
    getPersonalCourse(record) {
      this.$modalRouter.push({
        name: 'shop-stat-personal-course',
        props: {
          record
        }
      })
    },
    getPersonalConsume(record) {
      this.$modalRouter.push({
        name: 'shop-stat-personal-consume',
        props: {
          record
        }
      })
    },
    getTeamCourse(record) {
      this.$modalRouter.push({
        name: 'shop-stat-team-course',
        props: {
          record
        }
      })
    },
    getTeamConsume(record) {
      this.$modalRouter.push({
        name: 'shop-stat-team-consume',
        props: {
          record
        }
      })
    },
    getSmallCourse(record) {
      this.$modalRouter.push({
        name: 'shop-stat-small-course',
        props: {
          record
        }
      })
    },
    getSmallConsume(record) {
      this.$modalRouter.push({
        name: 'shop-stat-small-consume',
        props: {
          record
        }
      })
    },
    recentChange(searchFieldsValue) {
      this.onMultiSearch(searchFieldsValue)
    }
  }
}
</script>
