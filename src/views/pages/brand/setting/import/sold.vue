<template>
  <st-panel app>
    <a-row :class="b('tip')">
      <st-icon type="attention" color="#FF5E41" :class="b('tip-icon')" />
      时间仅支持一份数据的导入，请您在非工作繁忙时间16:00~19:00导入。
    </a-row>
    <a-row :class="[b('row'), b('row-tip')]">
      <st-t2>
        导入售出
      </st-t2>
      <label>售出的卡、课记录</label>
    </a-row>
    <a-row>
      请选择需要导入的门店:
      <a-select placeholder="请选择门店"></a-select>
    </a-row>
    <p :class="b('tip-msg')">
      请选择一项需要导入的内容，下载对应模板
    </p>
    <section>
      <a-row :class="b('table-row')">
        <div :class="[bTable('title'), bTable('row-2')]">会员卡</div>
        <div :class="bTable('content-2')">
          <div>
            <a-radio>会员卡</a-radio>
            <label :class="bTable('desc')">
              包含期卡和次卡——默认不限制入场时间
            </label>
          </div>
          <div>
            <a-radio>会员卡入场时间</a-radio>
            <label :class="bTable('desc')">
              售出的会员卡限制入场时间，请批量导入入场时间
            </label>
          </div>
        </div>
      </a-row>
      <a-row :class="b('table-row')">
        <div :class="[bTable('title'), bTable('row-1')]">储值卡</div>
        <div :class="bTable('content-1')">
          <a-radio>储值卡(全部售出信息)</a-radio>
        </div>
      </a-row>
      <a-row :class="b('table-row')">
        <div :class="[bTable('title'), bTable('row-1')]">私教课</div>
        <div :class="bTable('content-1')">
          <a-radio>私教课</a-radio>
        </div>
      </a-row>
      <a-row :class="[b('table-row'), bTable('bottom-line')]">
        <div :class="[bTable('title'), bTable('row-1')]">租赁柜</div>
        <div :class="bTable('content-1')">
          <a-radio>租赁柜</a-radio>
          <label :class="bTable('desc')">
            导入前请预先
            <a>设置</a>
            柜子所在区域和柜号
          </label>
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
import { SoldService } from './sold.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { brandLogoFilter } from '@/filters/resource.filters'
import { PatternService } from '@/services/pattern.service'
export default {
  bem: {
    b: 'page-setting-sold',
    bTable: 'page-setting-sold__table-row'
  },
  serviceInject() {
    return {
      soldService: SoldService,
      routeService: RouteService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    const user = this.userService
    return {
      brandInfo: this.soldService.brandInfo$,
      systemInfo: this.soldService.systemInfo$,
      query: this.routeService.query$,
      settingEnums: user.settingEnums$,
      loading: this.soldService.loading$
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
      this.soldService.update(params).subscribe(() => {
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
