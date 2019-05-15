<template>
  <st-panel app>
    <a-row>
      <a-col :span="12">
        <st-t2>品牌信息</st-t2>
      </a-col>
      <a-col v-if="!isEdit" :span="12" class="ta-r">
        <a href="javascript: void(0);">
          <st-icon type="edit"></st-icon>
          <span class="mg-l4 color-text-light" @click="onEdit">编辑</span>
        </a>
      </a-col>
    </a-row>
    <div class="mg-t24" :class="b()">
      <div :class="b('logo-wrap')">
        <img :class="b('logo')" src="http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg?x-oss-process=image/resize,interlace_1,m_fill,w_1000" alt="brand logo">
      </div>
      <div>
        <div>
          <h2>
            {{info.brand_name}}
            <span :class="b('certify-status')">
              <i class="st-icon-certified"></i>
              <span :class="b('certify-des')">已认证</span>
            </span>
          </h2>
        </div>
        <div>
          <span>{{info.contact}}</span>
          <span>{{info.mobile}}</span>
        </div>
      </div>
    </div>
    <a-row :gutter="24" class="mg-t24">
      <a-col :lg="12">
        <st-info :isWeakenLabel="true">
          <st-info-item label="当前系统版本">俱乐部（单店版）</st-info-item>
          <st-info-item label="首次开通时间">2019-04-11 17:39:25</st-info-item>
          <st-info-item label="品牌介绍"></st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="12">
        <st-info :isWeakenLabel="true">
          <st-info-item label="有效门店数">共3家门店</st-info-item>
          <st-info-item label="有效插件数">共7个插件</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <st-textarea v-model="info.description" v-if="isEdit" maxlength="300" placeholder="这个人很懒，什么都没留下"></st-textarea>
    <st-container v-if="!isEdit && info.description" type="2" class="bg-gray">
      {{info.description}}
    </st-container>
  </st-panel>
</template>
<script>
import { BrandService } from './brand.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
export default {
  bem: {
    b: 'page-setting-brand'
  },
  serviceInject() {
    return {
      brandService: BrandService,
      routeService: RouteService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      resData: this.brandService.resData$,
      query: this.routeService.query$
    }
  },
  computed: {
    info() {
      return this.resData.info
    },
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
    }
  }
}
</script>
