<template>
  <div>
    <div class="shop-member-crowd-index-box">
      <div class="shop-member-crowd-index-box-title">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index-box__item">
            <img
              src="../../../../../../assets/img/shop_crowd_new.png"
              class="shop-member-crowd-index-box__img"
            />
            <div class="shop-member-crowd-index-box__info">
              <st-t4 class="shop-member-crowd-index-box__info__title">
                {{ value[0].crowd_name }}
              </st-t4>
              <div>{{ value[0].description }}</div>
            </div>
          </div>
          <div class="shop-member-crowd-index-box__num">
            <div class="shop-member-crowd-index-box__num-item">
              <div class="shop-member-crowd-index-box__number">
                {{ value[0].crowd_total_num.value }}
              </div>
              <div class="shop-member-crowd-index-box__num-describe">
                {{ value[0].crowd_total_num.name }}
              </div>
            </div>
            <div class="shop-member-crowd-index-box__num-item-middel">
              <div class="shop-member-crowd-index-box__number">
                {{ value[0].yesterday_admission.value }}
              </div>
              <div class="shop-member-crowd-index-box__num-describe">
                {{ value[0].yesterday_admission.name }}
              </div>
            </div>
            <div class="shop-member-crowd-index-box__num-item">
              <div class="shop-member-crowd-index-box__number">
                {{ value[0].yesterday_deal_numb.value }}
              </div>
              <div class="shop-member-crowd-index-box__num-describe">
                {{ value[0].yesterday_deal_numb.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="shop-member-crowd-index-box__btn">
          <router-link
            class="shop-member-crowd-index-box__btn-rq shop-member-crowd-index-box__btn-rq-line"
            tag="span"
            :to="{
              name: 'shop-member-crowd-analysis',
              query: { urlid: 0, id: value[0].id }
            }"
          >
            人群分析
          </router-link>
          <a-tooltip>
            <!-- <template slot="title">
              功能暂未开放
            </template> -->
            <span
              v-if="auth.export"
              v-export-excel="{ type: 'crowd/' + value[0].id }"
              class="shop-member-crowd-index-box__btn-rq"
            >
              导出
            </span>
          </a-tooltip>
        </div>
      </div>
      <div class="shop-member-crowd-index-box-title" style="margin:0 12px;">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index-box__item">
            <img
              src="~@/assets/img/shop_crowd_expire.png"
              class="shop-member-crowd-index-box__img"
            />
            <div class="shop-member-crowd-index-box__info">
              <st-t4 class="shop-member-crowd-index-box__info__title">
                {{ value[1].crowd_name }}
              </st-t4>
              <div>{{ value[1].description }}</div>
            </div>
          </div>
          <div class="shop-member-crowd-index-box__num">
            <div class="shop-member-crowd-index-box__num-item">
              <div class="shop-member-crowd-index-box__number">
                {{ value[1].crowd_total_num.value }}
              </div>
              <div class="shop-member-crowd-index-box__num-describe">
                {{ value[1].crowd_total_num.name }}
              </div>
            </div>
            <div class="shop-member-crowd-index-box__num-item-middel">
              <div class="shop-member-crowd-index-box__number">
                {{ value[1].yesterday_admission.value }}
              </div>
              <div class="shop-member-crowd-index-box__num-describe">
                {{ value[1].yesterday_admission.name }}
              </div>
            </div>
            <div class="shop-member-crowd-index-box__num-item">
              <div class="shop-member-crowd-index-box__number">
                {{ value[1].yesterday_deal_numb.value }}
              </div>
              <div class="shop-member-crowd-index-box__num-describe">
                {{ value[1].yesterday_deal_numb.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="shop-member-crowd-index-box__btn">
          <router-link
            class="shop-member-crowd-index-box__btn-rq shop-member-crowd-index-box__btn-rq-line"
            tag="span"
            :to="{
              name: 'shop-member-crowd-analysis',
              query: { urlid: 1, id: value[1].id }
            }"
          >
            人群分析
          </router-link>
          <a-tooltip>
            <!-- <template slot="title">
              功能暂未开放
            </template> -->
            <span
              v-if="auth.export"
              v-export-excel="{ type: 'crowd/' + value[1].id }"
              class="shop-member-crowd-index-box__btn-rq"
            >
              导出
            </span>
          </a-tooltip>
        </div>
      </div>
      <div class="shop-member-crowd-index-box-title">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index-box__item">
            <img
              src="../../../../../../assets/img/shop_crowd_private_teaching.png"
              class="shop-member-crowd-index-box__img"
            />
            <div class="shop-member-crowd-index-box__info">
              <st-t4 class="shop-member-crowd-index-box__info__title">
                {{ value[2].crowd_name }}
              </st-t4>
              <div>{{ value[2].description }}</div>
            </div>
          </div>
          <div class="shop-member-crowd-index-box__num">
            <div class="shop-member-crowd-index-box__num-item">
              <div class="shop-member-crowd-index-box__number">
                {{ value[2].crowd_total_num.value }}
              </div>
              <div class="shop-member-crowd-index-box__num-describe">
                {{ value[2].crowd_total_num.name }}
              </div>
            </div>
            <div class="shop-member-crowd-index-box__num-item-middel">
              <div class="shop-member-crowd-index-box__number">
                {{ value[2].yesterday_admission.value }}
              </div>
              <div class="shop-member-crowd-index-box__num-describe">
                {{ value[2].yesterday_admission.name }}
              </div>
            </div>
            <div class="shop-member-crowd-index-box__num-item">
              <div class="shop-member-crowd-index-box__number">
                {{ value[2].yesterday_deal_numb.value }}
              </div>
              <div class="shop-member-crowd-index-box__num-describe">
                {{ value[2].yesterday_deal_numb.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="shop-member-crowd-index-box__btn">
          <router-link
            class="shop-member-crowd-index-box__btn-rq shop-member-crowd-index-box__btn-rq-line"
            tag="span"
            :to="{
              name: 'shop-member-crowd-analysis',
              query: { urlid: 2, id: value[2].id }
            }"
          >
            人群分析
          </router-link>
          <a-tooltip>
            <!-- <template slot="title">
              功能暂未开放
            </template> -->
            <span
              v-if="auth.export"
              v-export-excel="{ type: 'crowd/' + value[2].id }"
              class="shop-member-crowd-index-box__btn-rq"
            >
              导出
            </span>
          </a-tooltip>
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
    value: Array
  },
  data() {
    return {}
  },
  created() {
    console.log(this.value)
  },
  methods: {
    newCrowd(data) {
      this.messageService.warn({ content: data })
    },
    exportFunc(id) {
      // this.aService.getListInfo(id).subscribe()
    }
  },
  mounted() {}
}
</script>
