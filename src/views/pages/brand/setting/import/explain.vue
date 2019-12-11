<template>
  <st-panel app>
    <div class="page-header">
      <st-t2>
        开始使用系统后，以前的数据怎么办？请参照以下说明完成批量导入
      </st-t2>
    </div>
    <a-row :class="b('row')">
      <p>
        1、门店是所有数据的基础，完成门店设置后进行数据导入。
        <router-link
          :to="{
            path: `/brand/setting/shop/list`
          }"
          target="_blank"
        >
          尚未完成，去设置？
        </router-link>
      </p>
      <p>
        2、导入文件格式仅支持xlxs，每份文件最多支持100000条数据。
      </p>
      <p>
        3、为了保证系统顺畅，将在系统非繁忙时间内，按照您上传文件的顺序依次进行数据导入，请您在次日检查导入结果。
      </p>
      <p>
        4、请在导入前阅读
        <a href="https://help.styd.cn/" target="__blank">帮助中心导入文档</a>
        ，避免出现数据导入错误。
      </p>
    </a-row>
    <st-container type="2" class="bg-gray">
      <div :class="b('item-content')" class="mg-b16">
        <div class="item">
          <st-t3 class="title">导入员工</st-t3>
          <label class="desc">员工基础信息</label>
          <st-button
            v-if="auth$.staff"
            type="primary"
            @click="goRouter('/brand/setting/import/staff')"
          >
            导入员工
          </st-button>
        </div>
        <p>若员工数量较少，建议手动添加，无需导入。</p>
      </div>
      <div :class="b('item-content')" class="mg-b16">
        <div class="item">
          <st-t3 class="title">导入商品</st-t3>
          <label class="desc">卡、课都属于商品</label>
          <st-button
            v-if="auth$.product"
            type="primary"
            @click="goRouter('/brand/setting/import/commodity')"
          >
            导入商品
          </st-button>
        </div>
        <p>若卡课数量较少，建议手动添加，无需导入。</p>
      </div>

      <div :class="b('item')">
        <st-t3 class="title">导入用户</st-t3>
        <label class="desc">
          门店会员（潜在会员、正式会员、流失会员）
        </label>
        <st-button
          v-if="auth$.member"
          type="primary"
          @click="goRouter('/brand/setting/import/member')"
        >
          导入用户
        </st-button>
      </div>
      <div :class="b('item-content')">
        <div class="item">
          <st-t3 class="title">导入售出</st-t3>
          <label class="desc">售出的卡、课记录</label>
          <st-button
            v-if="auth$.sold"
            type="primary"
            @click="goRouter('/brand/setting/import/sold')"
          >
            导入售出
          </st-button>
        </div>
        <p>
          1.请在完成员工、商品、用户的添加后导入售出，否则售出若关联到对应的用户、卡课、将无法成功导入。
          <br />
          2.导入售出后，若您售卖出新的卡课，请在交易签单中完成售卖，不要通过导入功能进行数据补充，否则会导致数据错乱。
          <br />
          3.售出会影响门店财务等相关统计，请在确认导入数据无误的情况下进行数据导入。
        </p>
      </div>
    </st-container>
  </st-panel>
</template>
<script>
import { ExplainService } from './explain.service'

export default {
  bem: {
    b: 'page-setting-explain',
    bContentItem: 'page-setting-explain__item-content'
  },
  serviceInject() {
    return {
      explainService: ExplainService
    }
  },
  rxState() {
    const { auth$ } = this.explainService
    return {
      auth$
    }
  },
  data() {
    return {}
  },
  methods: {
    goRouter(path) {
      this.$router.push({
        path
      })
    }
  }
}
</script>
