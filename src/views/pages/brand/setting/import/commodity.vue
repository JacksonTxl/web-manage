<template>
  <st-panel app>
    <a-row :class="b('tip')">
      <st-icon type="attention" color="#FF5E41" :class="b('tip-icon')" />
      时间仅支持一份数据的导入，请您在非工作繁忙时间16:00~19:00导入。
    </a-row>
    <a-row :class="[b('row'), b('row-tip')]">
      <st-t2>
        导入商品
      </st-t2>
      <label>卡、课都属于商品</label>
    </a-row>
    <p :class="b('tip-msg')">
      请选择一项需要导入的内容，下载对应模板
    </p>
    <section>
      <a-row :class="b('table-row')">
        <div :class="[bTable('title'), bTable('row-2')]">会员卡</div>
        <div :class="bTable('content-2')">
          <div>
            <a-radio>基础信息</a-radio>
            <label :class="bTable('desc')">
              包含卡名称、卡类型等基础信息
            </label>
          </div>
          <div>
            <a-radio>价格信息</a-radio>
            <label :class="bTable('desc')">
              会员卡的价格信息，请在录入卡基础信息后进行导入
            </label>
          </div>
        </div>
      </a-row>
      <a-row :class="b('table-row')">
        <div :class="[bTable('title'), bTable('row-1')]">储值卡</div>
        <div :class="bTable('content-1')">
          <a-radio>储值卡信息</a-radio>
          <label :class="bTable('desc')">
            包含储值卡所有信息
          </label>
        </div>
      </a-row>
      <a-row :class="b('table-row')">
        <div :class="[bTable('title'), bTable('row-1')]">团体课</div>
        <div :class="bTable('content-1')">
          <a-radio>团体课信息</a-radio>
          <label :class="bTable('desc')">
            包含团体课所有信息，其中课程类型和目的仅支持导入已设置选项，请预先进行
            <a>设置</a>
            <st-tooltip />
          </label>
        </div>
      </a-row>
      <a-row :class="b('table-row')">
        <div :class="[bTable('title'), bTable('row-2')]">私教课</div>
        <div :class="bTable('content-2')">
          <div>
            <a-radio>基础信息</a-radio>
            <label :class="bTable('desc')">
              包含课程名称、课程类型、课程目的、时长等基础信息，其中课程类型和目的仅支持导入已设置选项，请预先进行
              <a>设置</a>
            </label>
          </div>
          <div>
            <a-radio>价格信息</a-radio>
            <label :class="bTable('desc')">
              私教课的价格信息，请在录入课程基础信息后导入。
            </label>
          </div>
        </div>
      </a-row>
      <a-row :class="[b('table-row'), bTable('bottom-line')]">
        <div :class="[bTable('title'), bTable('row-2')]">
          与门店关系
        </div>
        <div :class="bTable('content-2')">
          <div>
            <a-radio>支持消费的门店</a-radio>
            <label :class="bTable('desc')">
              部分卡和课程仅支持部分门店入场上课，导入支持消费的门店列表
            </label>
          </div>
          <div>
            <a-radio>支持售卖的门店</a-radio>
            <label :class="bTable('desc')">
              部分卡仅在部分门店可售，导入支持卡售卖的门店列表
            </label>
          </div>
        </div>
      </a-row>
    </section>
    <a-row :class="b('footer')">
      <st-button type="primary" :class="b('download')">下载模板</st-button>
      <st-button>上传文件</st-button>
    </a-row>
  </st-panel>
</template>
<script>
import { CommodityService } from './commodity.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { brandLogoFilter } from '@/filters/resource.filters'
import { PatternService } from '@/services/pattern.service'
export default {
  bem: {
    b: 'page-setting-commodity',
    bTable: 'page-setting-commodity__table-row'
  },
  serviceInject() {
    return {
      commodityService: CommodityService,
      routeService: RouteService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    const user = this.userService
    return {
      brandInfo: this.commodityService.brandInfo$,
      systemInfo: this.commodityService.systemInfo$,
      query: this.routeService.query$,
      settingEnums: user.settingEnums$,
      loading: this.commodityService.loading$
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
      this.commodityService.update(params).subscribe(() => {
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
