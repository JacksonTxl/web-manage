<template>
  <st-panel app>
    <a-row :class="b('row')">
      <st-t2>
        开始使用系统后，以前的数据怎么办？请参照以下说明完成批量导入
      </st-t2>
    </a-row>
    <a-row :class="b('row')">
      <p>
        1、门店是所有数据的基础，完成门店设置后进行数据导入。
        <a>尚未完成，去设置？</a>
      </p>
      <p>
        2、为了保证系统顺畅，同一时间仅支持一份数据的导入
      </p>
      <p>
        3、导入文件格式支持xlxs
      </p>
      <p>
        4、每份文件最多支持上传1000条数据
      </p>
    </a-row>
    <st-container type="2" class="bg-gray">
      <div :class="b('item')">
        <st-t3 :class="bItem('title')">导入员工</st-t3>
        <label :class="bItem('desc')">员工基础信息</label>
        <st-button type="primary">导入员工</st-button>
      </div>
      <div :class="b('item')">
        <st-t3 :class="bItem('title')">导入商品</st-t3>
        <label :class="bItem('desc')">卡、课都属于商品</label>
        <st-button type="primary">导入商品</st-button>
      </div>
      <div :class="b('item')">
        <st-t3 :class="bItem('title')">导入用户</st-t3>
        <label :class="bItem('desc')">
          门店会员（潜在会员、正式会员、流失会员）
        </label>
        <st-button type="primary">导入用户</st-button>
      </div>
      <div :class="b('item-content')">
        <div :class="bContentItem('item')">
          <st-t3 :class="bContentItem('title')">导入售出</st-t3>
          <label :class="bContentItem('desc')">售出的卡、课记录</label>
          <st-button type="primary">导入售出</st-button>
        </div>
        <p>
          售出会影响门店财务等相关统计，目前仅支持门店状态为“创建中”时进行数据导入。
          <br />
          请在确认售出导入数据无误的情况下，更改店铺状态，一旦更改无法恢复，其他状态下，均不支持售出导入。
        </p>
      </div>
    </st-container>
  </st-panel>
</template>
<script>
import { ExplainService } from './explain.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { brandLogoFilter } from '@/filters/resource.filters'
import { PatternService } from '@/services/pattern.service'
export default {
  bem: {
    b: 'page-setting-explain',
    bItem: 'page-setting-explain__item',
    bContentItem: 'page-setting-explain__item-content'
  },
  serviceInject() {
    return {
      explainService: ExplainService,
      routeService: RouteService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    const user = this.userService
    return {
      brandInfo: this.explainService.brandInfo$,
      systemInfo: this.explainService.systemInfo$,
      query: this.routeService.query$,
      settingEnums: user.settingEnums$,
      loading: this.explainService.loading$
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
      this.explainService.update(params).subscribe(() => {
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
