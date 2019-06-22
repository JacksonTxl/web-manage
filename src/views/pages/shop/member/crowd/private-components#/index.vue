
<template>
  <div>
    <div class="shop-member-crowd-index-box">
      <div class="shop-member-crowd-index-box-title">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index-box__item">
            <img
              src="../../../../../../assets/img/shop_crowd_new.png"
              class="shop-member-crowd-index-box__img"
            >
            <div class="shop-member-crowd-index-box__info">
              <st-t4 class="shop-member-crowd-index-box__info__title">新注册用户</st-t4>
              <div>近7天内，新注册的潜在用户</div>
            </div>
          </div>
          <div class="shop-member-crowd-index-box__num">
            <div class="shop-member-crowd-index-box__num-item">
              <div
                class="shop-member-crowd-index-box__number"
              >{{value.new_register_member.crowd_total_num}}</div>
              <div class="shop-member-crowd-index-box__num-describe">人群总数</div>
            </div>
            <div class="shop-member-crowd-index-box__num-item">
              <div
                class="shop-member-crowd-index-box__number"
              >{{value.new_register_member.yesterday_admission}}</div>
              <div class="shop-member-crowd-index-box__num-describe">昨日入场</div>
            </div>
            <div class="shop-member-crowd-index-box__num-item">
              <div
                class="shop-member-crowd-index-box__number"
              >{{value.new_register_member.yesterday_deal_numb}}</div>
              <div class="shop-member-crowd-index-box__num-describe">昨日交易</div>
            </div>
          </div>
        </div>
        <div class="shop-member-crowd-index-box__btn">
          <router-link
            v-if="auth.analyst"
            class="shop-member-crowd-index-box__btn-rq"
            tag="span"
            :to="{name:'shop-member-crowd-analysis', query:{urlid:0,id:value.new_register_member.id}}"
          >人群分析</router-link>

          <span
            v-if="auth.export"
            class="shop-member-crowd-index-box__btn-rq"
            @click="exportFunc(value.new_register_member.id)"
          >导出</span>
        </div>
      </div>
      <div class="shop-member-crowd-index-box-title" style="margin:0 12px;">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index-box__item">
            <img
              src="../../../../../../assets/img/shop_crowd_expire.png"
              class="shop-member-crowd-index-box__img"
            >
            <div class="shop-member-crowd-index-box__info">
              <st-t4 class="shop-member-crowd-index-box__info__title">会员卡即将到期会员</st-t4>
              <div>未来30天内,有会员卡到期的会员</div>
            </div>
          </div>
          <div class="shop-member-crowd-index-box__num">
            <div class="shop-member-crowd-index-box__num-item">
              <div
                class="shop-member-crowd-index-box__number"
              >{{value.person_course_expiring_crowd.crowd_total_num}}</div>
              <div class="shop-member-crowd-index-box__num-describe">人群总数</div>
            </div>
            <div class="shop-member-crowd-index-box__num-item">
              <div
                class="shop-member-crowd-index-box__number"
              >{{value.person_course_expiring_crowd.yesterday_admission}}</div>
              <div class="shop-member-crowd-index-box__num-describe">昨日入场</div>
            </div>
            <div class="shop-member-crowd-index-box__num-item">
              <div
                class="shop-member-crowd-index-box__number"
              >{{value.person_course_expiring_crowd.yesterday_deal_numb}}</div>
              <div class="shop-member-crowd-index-box__num-describe">昨日交易</div>
            </div>
          </div>
        </div>
        <div class="shop-member-crowd-index-box__btn">
          <router-link
            v-if="auth.analyst"
            class="shop-member-crowd-index-box__btn-rq"
            tag="span"
            :to="{name:'shop-member-crowd-analysis', query:{urlid:1,id:value.person_course_expiring_crowd.id}}"
          >人群分析</router-link>

          <span
            v-if="auth.export"
            class="shop-member-crowd-index-box__btn-rq"
            @click="exportFunc(value.person_course_expiring_crowd.id)"
          >导出</span>
        </div>
      </div>
      <div class="shop-member-crowd-index-box-title">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index-box__item">
            <img
              src="../../../../../../assets/img/shop_crowd_private_teaching.png"
              class="shop-member-crowd-index-box__img"
            >
            <div class="shop-member-crowd-index-box__info">
              <st-t4 class="shop-member-crowd-index-box__info__title">私教课即将失效会员</st-t4>
              <div>私教课剩余次数小于5次的会员</div>
            </div>
          </div>
          <div class="shop-member-crowd-index-box__num">
            <div class="shop-member-crowd-index-box__num-item">
              <div
                class="shop-member-crowd-index-box__number"
              >{{value.expiring_crowd.crowd_total_num}}</div>
              <div class="shop-member-crowd-index-box__num-describe">人群总数</div>
            </div>
            <div class="shop-member-crowd-index-box__num-item">
              <div
                class="shop-member-crowd-index-box__number"
              >{{value.expiring_crowd.yesterday_admission}}</div>
              <div class="shop-member-crowd-index-box__num-describe">昨日入场</div>
            </div>
            <div class="shop-member-crowd-index-box__num-item">
              <div
                class="shop-member-crowd-index-box__number"
              >{{value.expiring_crowd.yesterday_deal_numb}}</div>
              <div class="shop-member-crowd-index-box__num-describe">昨日交易</div>
            </div>
          </div>
        </div>
        <div class="shop-member-crowd-index-box__btn">
          <router-link
            v-if="auth.analyst"
            class="shop-member-crowd-index-box__btn-rq"
            tag="span"
            :to="{name:'shop-member-crowd-analysis', query:{urlid:2,id:value.expiring_crowd.id}}"
          >人群分析</router-link>
          <span
            v-if="auth.export"
            class="shop-member-crowd-index-box__btn-rq"
            @click="exportFunc(value.expiring_crowd.id)"
          >导出</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { IndexService } from './index.service'
import { CrowdAPI } from '@/api/v1/crowd'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      crowdAPI: CrowdAPI,
      aService: IndexService
    }
  },
  rxState() {
    return {
      auth: this.aService.auth$
    }
  },
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: Object
  },
  data() {
    return {}
  },
  created() {
    console.log(this.crowdAPI.crowdShopExport())
  },
  methods: {
    newCrowd(data) {
      this.messageService.warning({ content: data })
    },
    exportFunc(id) {
      this.aService.getListInfo(id).subscribe()
    }
  },
  mounted() {}
}
</script>
