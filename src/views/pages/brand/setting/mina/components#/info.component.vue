<template>
  <div :class="info()" :loading="loading.subAudit && loading.getInfo">
    <div class="left">
      <st-t2>
        微信小程序（基础版）
        <span v-if="data.is_auth === 1" class="bg-gray color-text-light">
          发布时间：{{ data.mina_info.send_date }}
        </span>
      </st-t2>
      <a-row v-if="data.is_auth === 1" :gutter="24" class="mg-t16">
        <a-col :lg="8">
          <st-info>
            <st-info-item label="小程序名称">
              {{ data.mina_info.name }}
            </st-info-item>
            <st-info-item label="系统版本">
              {{ data.mina_info.version }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :lg="8">
          <st-info>
            <st-info-item
              label="微信认证"
              v-if="Number(data.mina_info.verify_type_info) > -1"
            >
              已认证
            </st-info-item>
            <st-info-item label="微信认证" v-else>未认证</st-info-item>
            <st-info-item label="发布状态">
              {{ data.mina_info.send_status | sendstatusFilter }}
              <a :class="info('a')" @click="submitAudit">
                {{ data.mina_info.send_status | authBtnFilter }}
              </a>
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :lg="8">
          <st-info>
            <st-info-item label="微信支付">
              已配置
              <a :class="info('a')" @click="resetMch">重新配置</a>
            </st-info-item>
            <st-info-item label="微信授权">
              {{ data.is_auth | authFilter }}
              <a :class="info('a')" :href="data.auth_url">重新授权</a>
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>

      <p v-if="data.is_auth === 0">
        三体微信小程序为您提供了运营场馆用户的一套完整解决方案，精心打造场馆展示、卡课购买、会员体系、课程预约、营销推广、训练数据等功能模块，助力开拓微信渠道，实现新老客户运营。
      </p>
      <section v-if="data.is_auth === 0">
        <ul>
          <li>
            <img :src="brand" />
            <p>
              <st-t4>品牌曝光</st-t4>
              基于微信生态，打造品牌形象
            </p>
          </li>
          <li>
            <img :src="user" />
            <p>
              <st-t4>用户体验</st-t4>
              流畅使用过程，降低转化损耗
            </p>
          </li>
          <li>
            <img :src="flow" />
            <p>
              <st-t4>流量裂变</st-t4>
              一体化营销加速，高效实现流量变现
            </p>
          </li>
        </ul>
      </section>
    </div>
    <div class="right">
      <img :src="data.mina_info ? data.mina_info.qrcode_url : ''" />
      <p>三体微信小程序示例 扫码查看</p>
    </div>
  </div>
</template>
<script>
import brand from '@/assets/img/brand/setting/mina/icon_brand.png'
import user from '@/assets/img/brand/setting/mina/icon_user.png'
import flow from '@/assets/img/brand/setting/mina/icon_flow.png'
import { IndexService } from '../index.service'
import BrandSettingMinaMch from '@/views/biz-modals/brand/setting-mina-mch'
export default {
  bem: {
    info: 'info-component'
  },
  props: {
    data: Object
  },
  modals: {
    BrandSettingMinaMch
  },
  serviceInject() {
    return {
      indexService: IndexService
    }
  },
  rxState() {
    return {
      loading: this.indexService.loading$
    }
  },
  data() {
    return {
      brand: brand,
      user: user,
      flow: flow
    }
  },
  filters: {
    authFilter(v) {
      let authMap = {
        0: '未授权',
        1: '已授权'
      }
      return authMap[v]
    },
    sendstatusFilter(v) {
      let statusMap = {
        0: '未发布',
        1: '审核中',
        2: '审核失败',
        3: '审核成功',
        4: '发布失败',
        5: '发布成功'
      }
      return statusMap[v]
    },
    authBtnFilter(v) {
      let btnMap = {
        0: '提交',
        1: '',
        2: '重新提交',
        3: '重新提交',
        4: '重新提交',
        5: '重新提交'
      }
      return btnMap[v]
    }
  },
  methods: {
    resetMch() {
      this.$modalRouter.push({
        name: 'brand-setting-mina-mch',
        on: {
          success: () => {
            this.$router.push({ query: this.query, force: true })
          }
        }
      })
    },
    submitAudit() {
      this.indexService.subAudit().subscribe(res => {
        console.log(res)
        this.indexService.getInfo().subscribe()
      })
    }
  }
}
</script>
