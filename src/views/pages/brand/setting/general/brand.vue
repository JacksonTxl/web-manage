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
        <st-image-upload v-if="isEdit"
          width="90px"
          height="90px"
          :list="[brandInfo.image]"
          placeholder="上传品牌logo"
          :cropperModal="{ title:'标题', cropper: { aspectRatio: 1/1 } }"
           @change="onImgChange"
        >
        </st-image-upload>
        <img v-else :class="b('logo')"
          :src="brandInfo.image.image_key | brandLogoFilter({ w: 180, h: 180 })" alt="brand logo"
        >
      </div>
      <div>
        <div>
          <h2>
            {{brandInfo.brand_name}}
            <span v-if="brandInfo.is_authentic" :class="b('certify-status')">
              <i class="st-icon-certified"></i>
              <span :class="b('certify-des')">已认证</span>
            </span>
          </h2>
        </div>
        <div>
          <span>
            <st-icon type="contact" :class="b('icon')" />{{brandInfo.contact}}
          </span>
          <span :class="b('mobile')">
            <st-icon :class="b('icon')" type="mobile" />{{brandInfo.mobile}}
          </span>
        </div>
      </div>
    </div>
    <a-row :gutter="24" class="mg-t24">
      <a-col :lg="12">
        <st-info :isWeakenLabel="true">
          <st-info-item label="当前系统版本">{{systemInfo.brand_type | enumFilter('setting.brand_type')}}</st-info-item>
          <st-info-item label="首次开通时间">{{systemInfo.first_time}}</st-info-item>
          <st-info-item label="品牌介绍"></st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="12">
        <st-info :isWeakenLabel="true">
          <st-info-item label="有效门店数">共{{systemInfo.valid_shop_number}}家门店</st-info-item>
          <st-info-item label="有效插件数">共{{systemInfo.valid_plugin_number}}个插件</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <div v-if="isEdit">
      <st-textarea v-model="brandInfo.description" maxlength="300" placeholder="这个人很懒，什么都没留下" />
      <div class="mg-t24 ta-c">
        <st-button type="primary" @click="onSave">确定</st-button>
        <st-button class="mg-l8" @click="onCancel">取消</st-button>
      </div>
    </div>
    <st-container v-if="!isEdit && brandInfo.description" type="2" class="bg-gray">
      {{brandInfo.description}}
    </st-container>
  </st-panel>
</template>
<script>
import { BrandService } from './brand.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { brandLogoFilter } from '@/filters/resource.filters'
export default {
  bem: {
    b: 'page-setting-brand'
  },
  serviceInject() {
    return {
      brandService: BrandService,
      routeService: RouteService,
      messageService: MessageService,
      userService: UserService
    }
  },
  rxState() {
    const user = this.userService
    return {
      resData: this.brandService.resData$,
      query: this.routeService.query$,
      settingEnums: user.settingEnums$
    }
  },
  data() {
    return {
      image: {}
    }
  },
  computed: {
    brandInfo() {
      return this.resData.info.brand_info
    },
    systemInfo() {
      return this.resData.info.system_info
    },
    isEdit() {
      return this.query.type === 'edit'
    }
  },
  created() {
    this.image = this.brandInfo.image
  },
  methods: {
    onEdit() {
      this.$router.push({
        query: {
          type: 'edit'
        }
      })
    },
    onSave() {
      const params = {
        album_id: this.brandInfo.album_id,
        image: this.image,
        description: this.brandInfo.description
      }
      this.brandService.update(params).subscribe(() => {
        this.messageService.success({
          content: '保存成功'
        })
        this.$router.push({
          query: {},
          force: true
        })
      })
    },
    onCancel() {
      this.$router.push({
        query: {}
      })
    },
    onImgChange(list) {
      this.image = list[0]
    }
  }
}
</script>
