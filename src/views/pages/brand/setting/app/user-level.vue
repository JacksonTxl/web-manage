<template>
  <st-panel>
    <div :class="b()">
      <st-t2>用户等级设置</st-t2>
      <a-row :gutter="12" class="mg-t24 ta-c">
        <!-- 潜在会员 -->
        <a-col :span="7">
          <div :class="b('item')">
            <st-t2>潜在会员</st-t2>
            <div>
              <img :class="b('item-icon')" src="~@/assets/img/member_potential.png" alt="潜在会员">
            </div>
            <div :class="b('sub-title')">条件</div>
            <ul>
              <li :class="b('list-item')">
                <i class="icon-member-checked icon-member-checked--potential"></i>注册品牌账号
              </li>
            </ul>
          </div>
        </a-col>
        <!-- 正式会员 -->
        <a-col :span="10">
          <div :class="b('item')">
            <st-t2>正式会员</st-t2>
            <a v-if="!isEdit" href="javascript: void(0);" :class="b('item-edit')" @click="onEdit">
              <st-icon type="edit"></st-icon>
              <span class="mg-l4 color-text-light">编辑</span>
            </a>
            <div>
              <img :class="b('item-icon')" src="~@/assets/img/member.png" alt="正式会员">
            </div>
            <div :class="b('sub-title')">条件</div>
            <div v-if="isEdit">
              <a-popover placement="bottomRight" trigger="click" class="slider-copy-bottom">
                <template slot="content">
                  <a-checkbox-group
                    class="slider-copy"
                  >
                    <div><a-checkbox>有效会员卡</a-checkbox></div>
                    <div><a-checkbox>有效储值卡</a-checkbox></div>
                    <div><a-checkbox>有效私教课程</a-checkbox></div>
                  </a-checkbox-group>
                </template>
                <a href="javascript: void(0);">
                  任选其一即升级
                  <st-icon type="down"></st-icon>
                </a>
              </a-popover>
            </div>
            <ul v-else>
              <li :class="b('list-item')">
                <i class="icon-member-checked"></i>有效会员卡、有效会员卡、有效会员卡、有效会员卡
              </li>
            </ul>
            <div class="mg-t24" :class="b('sub-title')">特权类目</div>
            <a-checkbox-group v-if="isEdit" @change="onChange">
              <a-checkbox value="A">A</a-checkbox>
              <a-checkbox value="B">B</a-checkbox>
            </a-checkbox-group>
            <ul v-else>
              <li :class="b('list-item')">
                <i class="icon-member-checked"></i>私教课
              </li>
            </ul>
          </div>
        </a-col>
        <!-- 流失会员 -->
        <a-col :span="7">
          <div :class="b('item')">
            <st-t2>流失会员</st-t2>
            <div>
              <img :class="b('item-icon')" src="~@/assets/img/member_lost.png" alt="流失会员">
            </div>
            <div :class="b('sub-title')">条件</div>
            <ul>
              <li :class="b('list-item')">
                <i class="icon-member-checked icon-member-checked--lost"></i>会员卡过期
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
    }
  },
  computed: {
    isEdit() {
      return this.query.type === 'edit'
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
    }
  }
}
</script>
