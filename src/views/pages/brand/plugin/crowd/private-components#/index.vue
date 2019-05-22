
<template>
  <div>
    <div class="shop-member-crowd-index-box">
      <div class="shop-member-crowd-index-box-title">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index-box__item">
            <img
              src="http://n.sinaimg.cn/sinacn14/39/w480h359/20181013/e040-hmivixm5109047.jpg"
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
          <span class="shop-member-crowd-index-box__btn-rq">人群分析</span>
          <span class="shop-member-crowd-index-box__btn-dx">
            <a-dropdown>
              <span class="ant-dropdown-link" href="#">
                定向运营
                <a-icon type="down"/>
              </span>
              <a-menu slot="overlay">
                <a-menu-item style="width:130px">
                  <a href="javascript:;">导出</a>
                </a-menu-item>
                <a-menu-item style="width:130px">
                  <a href="javascript:;" @click="newCrowd('功能正在开发中，敬请期待')">群发短信</a>
                </a-menu-item>
                <a-menu-item style="width:130px">
                  <a href="javascript:;" @click="newCrowd('功能正在开发中，敬请期待')">群发优惠</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </div>
      </div>
      <div class="shop-member-crowd-index-box-title" style="margin:0 12px;">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index-box__item">
            <img
              src="http://n.sinaimg.cn/sinacn14/39/w480h359/20181013/e040-hmivixm5109047.jpg"
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
          <span class="shop-member-crowd-index-box__btn-rq">人群分析</span>
          <span class="shop-member-crowd-index-box__btn-dx">
            <a-dropdown>
              <span class="ant-dropdown-link" href="#">
                定向运营
                <a-icon type="down"/>
              </span>
              <a-menu slot="overlay">
                <a-menu-item style="width:130px">
                  <a href="javascript:;">导出</a>
                </a-menu-item>
                <a-menu-item style="width:130px">
                  <a href="javascript:;" @click="newCrowd('功能正在开发中，敬请期待')">群发短信</a>
                </a-menu-item>
                <a-menu-item style="width:130px">
                  <a href="javascript:;" @click="newCrowd('功能正在开发中，敬请期待')">群发优惠</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </div>
      </div>
      <div class="shop-member-crowd-index-box-title">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index-box__item">
            <img
              src="http://n.sinaimg.cn/sinacn14/39/w480h359/20181013/e040-hmivixm5109047.jpg"
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
          <span class="shop-member-crowd-index-box__btn-rq">人群分析</span>
          <span class="shop-member-crowd-index-box__btn-dx">
            <a-dropdown>
              <span class="ant-dropdown-link" href="#">
                定向运营
                <a-icon type="down"/>
              </span>
              <a-menu slot="overlay">
                <a-menu-item style="width:130px">
                  <a href="javascript:;">导出</a>
                </a-menu-item>
                <a-menu-item style="width:130px">
                  <a href="javascript:;" @click="newCrowd('功能正在开发中，敬请期待')">群发短信</a>
                </a-menu-item>
                <a-menu-item style="width:130px">
                  <a href="javascript:;" @click="newCrowd('功能正在开发中，敬请期待')">群发优惠</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageService } from '@/services/message.service'

export default {
  serviceInject() {
    return {
      messageService: MessageService
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
  methods: {
    newCrowd(data) {
      this.messageService.warning({ content: data })
    }
  },
  mounted() {}
}
</script>
