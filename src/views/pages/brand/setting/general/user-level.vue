<template>
  <st-panel>
    <div :class="b()">
      <st-t2>用户等级设置</st-t2>
      <a-row :gutter="12" class="mg-t24 ta-c">
        <!-- 潜在会员 -->
        <a-col :span="7">
          <div :class="b('item')">
            <st-t2>{{potential.level_name}}</st-t2>
            <div>
              <img :class="b('item-icon')" src="~@/assets/img/member_potential.png" alt="潜在会员">
            </div>
            <div :class="b('sub-title')">条件</div>
            <ul>
              <li
                :class="b('list-item')"
              >
                <i class="icon-member-checked icon-member-checked--potential"></i>
                <span v-for="(item, index) in potential.condition"
                :key="index">
                  {{item.condition_text | textFilter(potential.condition, index)}}
                </span>
              </li>
            </ul>
          </div>
        </a-col>
        <!-- 正式会员 -->
        <a-col :span="10">
          <div :class="b('item')">
            <st-t2>{{member.level_name}}</st-t2>
            <a v-if="!isEdit" href="javascript: void(0);" :class="b('item-edit')" @click="onEdit">
              <st-icon type="edit"></st-icon>
              <span class="mg-l4 color-text-light">编辑</span>
            </a>
            <div>
              <img :class="b('item-icon')" src="~@/assets/img/member.png" alt="正式会员">
            </div>
            <div :class="b('sub-title')">条件</div>
            <select-condition v-if="isEdit" @change="onConditionChange" />
            <ul v-else>
              <li
                :class="b('list-item')"
              >
                <i class="icon-member-checked icon-member-checked--potential"></i>
                <span v-for="(item, index) in member.condition"
                :key="index">
                  {{item.condition_text | textFilter(member.condition, index)}}
                </span>
              </li>
            </ul>
            <div class="mg-t24" :class="b('sub-title')">特权类目</div>
            <select-rights v-if="isEdit" @change="onRightsChange"/>
            <ul v-else>
              <li :class="b('list-item')">
                <i class="icon-member-checked"></i>
                <span v-for="(item, index) in member.rights"
                :key="index">
                  {{item.rights_text | textFilter(member.rights, index)}}
                </span>
              </li>
            </ul>
          </div>
        </a-col>
        <!-- 流失会员 -->
        <a-col :span="7">
          <div :class="b('item')">
            <st-t2>{{lost.level_name}}</st-t2>
            <div>
              <img :class="b('item-icon')" src="~@/assets/img/member_lost.png" alt="流失会员">
            </div>
            <div :class="b('sub-title')">条件</div>
            <ul>
              <li
                :class="b('list-item')"
              >
                <i class="icon-member-checked icon-member-checked--potential"></i>
                <span v-for="(item, index) in lost.condition"
                :key="index">
                  {{item.condition_text | textFilter(lost.condition, index)}}
                </span>
              </li>
            </ul>
          </div>
        </a-col>
      </a-row>
      <div class="ta-c mg-t24" v-if="isEdit">
        <st-button type="primary" @click="onSave">保存</st-button>
      </div>
    </div>
  </st-panel>
</template>
<script>
import { UserLevelService } from './user-level.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import SelectCondition from './user-level#/select-condition'
import SelectRights from './user-level#/select-rights'
export default {
  bem: {
    b: 'page-user-level'
  },
  serviceInject() {
    return {
      listService: UserLevelService,
      routeService: RouteService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      resData: this.listService.resData$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      checkedCondition: []
    }
  },
  filters: {
    textFilter(text, list, index) {
      return text + (index < list.length - 1 ? '、' : '')
    }
  },
  components: {
    SelectCondition,
    SelectRights
  },
  computed: {
    isEdit() {
      return this.query.type === 'edit'
    },
    /**
     * 潜在会员
     */
    potential() {
      return this.resData.list[0]
    },
    /**
     * 正式会员
     */
    member() {
      return this.resData.list[1]
    },
    /**
     * 流失会员
     */
    lost() {
      return this.resData.list[2]
    }
  },
  methods: {
    onEdit() {
      this.$router.push({
        query: {
          type: 'edit'
        }
      })
    },
    onChange() {
      console.log('changed')
    },
    onSave() {
      this.$router.push({
        query: {}
      })
    },
    onConditionChange(val) {
      this.checkedCondition = val
    },
    onRightsChange(val) {
      console.log('rights changed', val)
      this.checkedRights = val
    }
  }
}
</script>
