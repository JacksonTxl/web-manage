<template>
  <st-panel app>
    <a-row :class="b('tip')">
      <st-icon type="attention" color="#FF5E41" :class="b('tip-icon')" />
      时间仅支持一份数据的导入，请您在非工作繁忙时间16:00~19:00导入。
    </a-row>
    <a-row :class="[b('row'), b('row-tip')]">
      <st-t2>
        导入用户
      </st-t2>
      <label>门店会员（潜在会员、正式会员、流失会员）</label>
    </a-row>
    <section>
      <a-row :class="[b('table-row'), bTable('bottom-line')]">
        <div :class="bTable('content-2')">
          <div>
            <a-radio>用户基础信息</a-radio>
          </div>
          <div>
            <a-radio>用户跟进员工</a-radio>
            <label :class="bTable('desc')">
              门店维度下，跟进的教练或销售
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
import { MemberService } from './member.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { brandLogoFilter } from '@/filters/resource.filters'
import { PatternService } from '@/services/pattern.service'
export default {
  bem: {
    b: 'page-setting-member',
    bTable: 'page-setting-member__table-row'
  },
  serviceInject() {
    return {
      memberService: MemberService,
      routeService: RouteService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    const user = this.userService
    return {
      brandInfo: this.memberService.brandInfo$,
      systemInfo: this.memberService.systemInfo$,
      query: this.routeService.query$,
      settingEnums: user.settingEnums$,
      loading: this.memberService.loading$
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
      this.memberService.update(params).subscribe(() => {
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
