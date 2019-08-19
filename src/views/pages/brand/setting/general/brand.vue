<template>
  <st-panel app>
    <a-row>
      <a-col :span="12">
        <st-t2>品牌信息</st-t2>
      </a-col>
      <a-col v-if="!isEdit" :span="12" class="ta-r">
        <st-info-action icon="edit" text="编辑" @click="onEdit" />
      </a-col>
    </a-row>
    <div class="mg-t24" :class="b()">
      <div :class="b('logo-wrap')">
        <st-image-upload
          v-if="isEdit"
          width="90px"
          height="90px"
          :list="imageList"
          placeholder="上传logo"
          :cropperModal="{ title: '标题', cropper: { aspectRatio: 1 / 1 } }"
          @change="onImgChange"
        ></st-image-upload>
        <span v-else v-viewer="{ url: 'data-src' }">
          <img
            :class="b('logo')"
            :data-src="brandInfo.image.image_url | brandLogoFilter({ w: 1000 })"
            :src="
              brandInfo.image.image_url | brandLogoFilter({ w: 180, h: 180 })
            "
            alt="brand logo"
          />
        </span>
      </div>
      <div>
        <div>
          <h2>
            <a-input
              v-if="isEdit"
              v-model="brandInfo.brand_name"
              maxlength="20"
            />
            <span v-else>{{ brandInfo.brand_name }}</span>
            <!-- <span v-if="brandInfo.is_authentic" :class="b('certify-status')">
              <i class="st-icon-certified"></i>
              <span :class="b('certify-des')">已认证</span>
            </span> -->
          </h2>
        </div>
        <div>
          <span>
            <st-icon type="contact" :class="b('icon')" />
            {{ brandInfo.contact }}
          </span>
          <span :class="b('mobile')">
            <st-icon :class="b('icon')" type="mobile" />
            {{ brandInfo.mobile }}
          </span>
        </div>
      </div>
    </div>
    <a-row :gutter="24" class="mg-t24">
      <a-col :lg="12">
        <st-info :isWeakenLabel="true">
          <st-info-item label="当前系统版本">
            {{ systemInfo.brand_type | enumFilter('setting.brand_type') }}
          </st-info-item>
          <st-info-item label="首次开通时间">
            {{ systemInfo.first_time }}
          </st-info-item>
          <st-info-item label="品牌介绍"></st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="12">
        <st-info :isWeakenLabel="true">
          <st-info-item label="有效门店数">
            共{{ systemInfo.valid_shop_number }}家门店
          </st-info-item>
          <st-info-item label="有效插件数">
            共{{ systemInfo.valid_plugin_number }}个插件
          </st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <div v-if="isEdit">
      <st-textarea
        v-model="brandInfo.description"
        maxlength="300"
        placeholder="这个人很懒，什么都没留下"
      />
      <div class="mg-t24 ta-c">
        <st-button type="primary" @click="onSave" :loading="loading.update">
          确定
        </st-button>
        <st-button class="mg-l8" @click="onCancel">取消</st-button>
      </div>
    </div>
    <st-container
      v-if="!isEdit && brandInfo.description"
      type="2"
      class="bg-gray"
    >
      {{ brandInfo.description }}
    </st-container>
  </st-panel>
</template>
<script>
import { BrandService } from './brand.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { brandLogoFilter } from '@/filters/resource.filters'
import { PatternService } from '@/services/pattern.service'
export default {
  bem: {
    b: 'page-setting-brand'
  },
  serviceInject() {
    return {
      brandService: BrandService,
      routeService: RouteService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    const user = this.userService
    return {
      brandInfo: this.brandService.brandInfo$,
      systemInfo: this.brandService.systemInfo$,
      query: this.routeService.query$,
      settingEnums: user.settingEnums$,
      loading: this.brandService.loading$
    }
  },
  data() {
    return {
      imageList: []
    }
  },
  computed: {
    isEdit() {
      return this.query.type === 'edit'
    }
  },
  created() {
    this.imageList = [this.brandInfo.image]
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
      if (!this.inputCheck()) {
        return
      }
      const info = this.brandInfo
      const params = {
        brand_name: info.brand_name,
        album_id: info.album_id,
        image: this.imageList[0],
        description: info.description
      }
      this.brandService.update(params).subscribe(() => {
        this.messageService.success({
          content: '保存成功'
        })
        this.$router.push({
          force: true
        })
        this.userService.getUser().subscribe()
      })
    },
    onCancel() {
      this.$router.push({
        query: {}
      })
    },
    onImgChange(list) {
      this.imageList = list
    },
    inputCheck() {
      const info = this.brandInfo
      const brandName = info.brand_name
      const { pattern } = this
      if (!pattern.CN_EN_NUM_SPACE('1-20').test(brandName)) {
        this.tip('品牌名称支持20字以内的中英文和数字')
        return false
      }
      return true
    },
    tip(msg) {
      this.messageService.error({
        content: msg
      })
    }
  }
}
</script>
