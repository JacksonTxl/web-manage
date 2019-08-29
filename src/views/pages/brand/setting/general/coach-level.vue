<template>
  <st-panel app v-if="auth.get">
    <st-t2>教练等级</st-t2>
    <div class="mg-t24 st-des">
      已添加{{ resData.total }}个，支持添加{{ resData.max }}个
    </div>
    <st-form-table class="mg-t8">
      <thead>
        <tr>
          <th>教练等级</th>
          <th>关联教练数</th>
          <th>关联薪资模板数</th>
          <th v-if="isShowPricingNum">关联课程定价数</th>
          <th>创建人</th>
          <th>最后修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="auth.add">
          <td :colspan="isShowPricingNum ? 7 : 6" class="st-form-table__add">
            <a
              v-modal-link="{
                name: 'coach-level-add',
                on: {
                  change: onListChange
                }
              }"
            >
              <st-button
                type="dashed"
                icon="add"
                block
                :disabled="resData.total >= resData.max"
              >
                添加教练等级
              </st-button>
            </a>
          </td>
        </tr>
        <tr v-for="(item, index) in resData.list" :key="index">
          <td>{{ item.setting_name }}</td>
          <td>{{ item.used_number }}</td>
          <td>{{ item.salary_template }}</td>
          <td v-if="isShowPricingNum">{{ item.class_price }}</td>
          <td>{{ item.operator_name }}</td>
          <td>{{ item.updated_time }}</td>
          <td>
            <st-table-actions>
              <a
                v-if="item.auth['brand:setting:coach_level|edit']"
                v-modal-link="{
                  name: 'coach-level-edit',
                  props: {
                    id: item.id,
                    setting_name: item.setting_name
                  },
                  on: {
                    change: onListChange
                  }
                }"
              >
                编辑
              </a>
              <st-popconfirm
                v-if="item.auth['brand:setting:coach_level|del']"
                @confirm="onDelete(item.id)"
              >
                <div slot="title">
                  <div v-if="item.class_price === 0">
                    删除后不可进行恢复,确定删除此教练等级？
                  </div>
                  <div>
                    删除教练等级{{ item.setting_name }}
                    <div class="color-danger">
                      当前有
                      {{ item.class_price }}
                      条私教课程定价使用了此教练等级,将同时删除
                      {{ item.class_price }} 条课程定价,请谨慎操作？
                    </div>
                  </div>
                </div>
                <a>删除</a>
              </st-popconfirm>
            </st-table-actions>
          </td>
        </tr>
      </tbody>
    </st-form-table>
  </st-panel>
</template>
<script>
import { CoachLevelService } from './coach-level.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import CoachLevelEdit from '@/views/biz-modals/coach-level/edit.vue'
import CoachLevelAdd from '@/views/biz-modals/coach-level/add.vue'

export default {
  serviceInject() {
    return {
      listService: CoachLevelService,
      routeService: RouteService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      resData: this.listService.resData$,
      query: this.routeService.query$,
      auth: this.listService.auth$
    }
  },
  modals: {
    CoachLevelAdd,
    CoachLevelEdit
  },
  computed: {
    isShowPricingNum() {
      return this.resData.price_setting === 2
    }
  },
  methods: {
    onDelete(id) {
      this.listService.deleteCoachLevel({ id }).subscribe(() => {
        this.messageService.success({
          content: '删除成功'
        })
        this.onListChange()
      })
    },
    onTableChange(pagination) {
      this.$router.push({
        query: {
          page: pagination.current
        }
      })
    },
    onListChange() {
      this.$router.push({
        query: {
          page: 1
        },
        force: true
      })
    }
  }
}
</script>
