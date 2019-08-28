<template>
  <div>
    <st-panel app :class="bPage()">
      <div :class="bPage('global')">
        <st-t2>全局通行设置</st-t2>
        <div :class="bPage('global-item')">
          <div :class="bPage('global-item-title')">
            入场凭证优先级
            <div class="ta-r" style="color:#9BACB9">(默认)</div>
          </div>
          <div :class="bPage('global-item-content')">
            <st-table
              :columns="ruleColumns"
              :pagination="false"
              rowKey="level"
              :dataSource="info.entrance_proof"
            ></st-table>
          </div>
        </div>
        <div :class="bPage('global-item')">
          <div :class="bPage('global-item-title')">
            次卡扣费规则
          </div>
          <div :class="bPage('global-item-content')">
            {{ info.charge_type === PAY_RULE.HOUR ? info.charge_value : ''
            }}{{ info.charge_type_text }}
            <a
              v-if="auth.globalSet"
              v-modal-link="{
                name: 'hardware-rule',
                props: {
                  type: info.charge_type,
                  value: info.charge_value
                },
                on: {
                  success: getGlobalInfo
                }
              }"
            >
              设置
            </a>
          </div>
        </div>
        <div :class="bPage('global-item')">
          <div :class="bPage('global-item-title')">
            入场黑名单
          </div>
          <div :class="bPage('global-item-content')">
            <span>共{{ info.black_people }}人</span>
            <a
              v-if="auth.globalBlackSet"
              v-modal-link="{
                name: 'hardware-blacklist',
                on: {
                  success: getGlobalInfo
                }
              }"
            >
              设置
            </a>
          </div>
        </div>
      </div>
    </st-panel>
    <div :class="bPage('divider')"></div>

    <st-panel app :class="bPage()">
      <div :class="bPage('area')">
        <st-t2>单区域通行配置</st-t2>
        <st-table
          class="mg-t16"
          :page="page"
          :columns="columns"
          :loading="loading.getAreaList"
          :dataSource="list"
          @change="onTableChange"
          rowKey="area_id"
        >
          <div slot="action" slot-scope="text, record">
            <st-table-actions>
              <a
                v-if="record.auth['shop:setting:hardware|area_info']"
                v-modal-link="{
                  name: 'hardware-area',
                  props: {
                    isEdit: false,
                    id: record.area_id
                  }
                }"
              >
                详情
              </a>
              <a
                v-if="record.auth['shop:setting:hardware|area_set']"
                v-modal-link="{
                  name: 'hardware-area',
                  props: {
                    isEdit: true,
                    id: record.area_id
                  },
                  on: {
                    success: getAreaList
                  }
                }"
              >
                编辑
              </a>
            </st-table-actions>
          </div>
        </st-table>
      </div>
    </st-panel>
  </div>
</template>
<script>
import { columns, ruleColumns } from './list.config'
import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import HardwareArea from '@/views/biz-modals/hardware/area'
import HardwareBlacklist from '@/views/biz-modals/hardware/black-list'
import HardwareRule from '@/views/biz-modals/hardware/rule'
import { PAY_RULE } from '@/constants/setting/hardware'

export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      routeService: RouteService,
      listService: ListService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      query: this.routeService.query$,
      auth: this.listService.auth$,
      loading: this.listService.loading$,
      rule: this.listService.rule$
    }
  },
  bem: {
    bPage: 'page-shop-setting-entry-list'
  },
  modals: {
    HardwareArea,
    HardwareBlacklist,
    HardwareRule
  },
  data() {
    return {
      info: {},
      ruleOptions: '',
      PAY_RULE
    }
  },
  created() {
    this.getGlobalInfo()
  },
  computed: {
    columns,
    ruleColumns
  },
  methods: {
    getGlobalInfo() {
      return this.listService.getGlobalInfo().subscribe(res => {
        this.info = res.info
      })
    },
    // 编辑modal之后的刷新
    getAreaList() {
      this.$router.reload()
    }
  }
}
</script>
