<template>
  <div :class="bPage()">
    <header class="mg-b16" style="height: 300px;background: #fff"></header>
    <st-panel>
      <div slot="title" :class="bSearch()">
        <div :class="bSearch('button-group')">
          <st-button
            @click="onClickRouterPush({ pathName: 'addActivity' })"
            icon="add"
            type="primary"
          >
            新增活动
          </st-button>
          <st-button
            @click="onClickRouterPush({ pathName: 'checkinActivity' })"
            class="mg-l16"
            icon="add"
            type="primary"
          >
            签到验票
          </st-button>
        </div>
        <div :class="bSearch('input-group')">
          <a-select
            placeholder="请选择优惠券状态"
            @change="onSingleSearch('coupon_status', $event)"
            class="mg-r16"
            style="width: 160px"
          ></a-select>
          <st-input-search
            @search="onSingleSearch('coupon_name', $event)"
            placeholder="请输入优惠券名称"
            style="width: 290px;"
          />
        </div>
      </div>
      <st-table
        :page="page$"
        rowKey="id"
        :columns="columns"
        @change="onTableChange"
        :scroll="{ x: 1500 }"
        :dataSource="list$"
      >
        <template slot="action" slot-scope="text, record">
          <st-table-actions>
            <a @click="onEdit({ record, pathName: 'editActivity' })">
              编辑
            </a>
            <a @click="onGeneralize(record)">
              推广
            </a>
            <a @click="onEdit(record)">
              名单
            </a>
            <a @click="onGeneralize(record)">
              复制
            </a>
            <a @click="onStop(record)">
              结束
            </a>
          </st-table-actions>
        </template>
      </st-table>
    </st-panel>
  </div>
</template>

<script>
// table
import tableMixin from '@/mixins/table.mixin'
import { ListService } from './list.service'
import { columns } from './list.config'
import { RouteService } from '@/services/route.service'

// modal
export default {
  name: 'acti',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-plugin-activity-registration',
    bSearch: 'search'
  },
  data() {
    return {
      redirectPath: {
        addActivity: 'brand-marketing-plugin-activity-registration-add',
        editActivity: 'brand-marketing-plugin-activity-registration-edit',
        checkinActivity: 'brand-marketing-plugin-activity-registration-checkin'
      }
    }
  },
  serviceInject() {
    return {
      service: ListService,
      routeService: RouteService
    }
  },
  rxState() {
    const { page$, list$ } = this.service
    return {
      query: this.routeService.query$,
      page$,
      list$
    }
  },
  computed: {
    columns
  },
  methods: {
    onClickRouterPush({ record, pathName }) {
      this.$router.push({ name: this.redirectPath[pathName] })
    }
  }
}
</script>
