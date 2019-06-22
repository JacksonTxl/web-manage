<template>
  <div class="shop-member-info">
    <st-panel class="shop-member-info-title">
      <a-row :gutter="24">
        <a-col :span="14">
          <div class="shop-member-info-title-pannel-left">
            <div class="shop-member-info-title-pannel__img">
              <div class="img-box  st-preview-item">
                <img
                  class="img-url"
                  src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=234634259,4236876085&fm=27&gp=0.jpg"
                  alt
                >
                <span class="img-describe">正式会员</span>
              </div>
              <div class="input-face">
                <a href="javascript:;">
                  <a-icon type="plus"/>录入人脸
                </a>
              </div>
            </div>

            <div class="shop-member-info-title-pannel__info">
              <st-t2>{{ info.member_name }}
                <st-icon  :type="info.sex=== 1? 'female':'man'" :style="info.sex=== 1? 'color:#FF5E41':'color:#3F66F6'"/>
              </st-t2>
              <div class="shop-member-info-title-pannel__info__phone">
                <div>
                  手机号：
                  <span>{{ info.mobile}}</span>
                </div>
                <div class="line"></div>
                <div>
                  首次成为会员时间：
                  <span>{{ info.be_member_time }}</span>
                </div>
              </div>
              <div class="label-list">
                <template v-for="(tag, index) in info.member_tag">
                  <a-tooltip :key="index" :title="tag.name">
                    <a-tag
                      class="tag-item"
                      :key="tag.name"
                      :closable="true"
                      @close="handleClose(tag)"
                    >{{ tag.name }}</a-tag>
                  </a-tooltip>
                </template>
                <modal-link
                  tag="a"
                  :to=" { name: 'shop-add-lable',props:{selectedRowData:[{id:$route.query.id}]}, on:{done: onModalTest }}"
                >
                  <a-tag v-if="auth.tag" style="background: #fff; borderStyle: dashed;">
                    <a-icon type="plus" style="margin-right: 8px;"/>标签
                  </a-tag>
                </modal-link>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="10">
          <div class="shop-member-info-title-pannel-right">
            <div class="pannel-right__operation">
              <a-button
                v-if="auth.edit"
                type="primary"
                class="pannel-right__operation__margin"
                @click="editMember"
              >编辑资料</a-button>
              <modal-link
                v-if="auth.bindCard"
                tag="a"
                class="pannel-right__operation__margin"
                :to="{name: 'shop-binding-entity-card', props: {record: {member_id:$route.query.id, member_name: info.member_name, mobile: info.mobile}}}"
              >
                <a-button class="pannel-right__operation__margin">绑定实体卡</a-button>
              </modal-link>
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item key="1" v-if="auth.changeCoach">
                    <modal-link tag="a" :to=" { name: 'shop-distribution-coach',props: {selectedRowData: [id]}}">更改跟进教练</modal-link>
                  </a-menu-item>
                  <a-menu-item key="2" v-if="auth.changeSalesman">
                    <modal-link tag="a" :to=" { name: 'shop-distribution-ales',props: {selectedRowData: [id]}}">更改跟进销售</modal-link>
                  </a-menu-item>
                  <a-menu-item key="3"  v-if="auth.unbindWechat" @click="onRemoveBind">解除微信绑定</a-menu-item>
                  <a-menu-item key="4">
                    <modal-link tag="a"  v-if="auth.transfer" :to=" { name: 'shop-transfer-shop',props: {record: {member_id:$route.query.id, member_name: info.member_name, mobile: info.mobile}}}">转店</modal-link>
                  </a-menu-item>
                  <a-menu-item key="5">
                    <modal-link tag="a"  v-if="auth.frozen" :to=" { name: 'shop-frozen'}">冻结用户</modal-link>
                  </a-menu-item>
                  <a-menu-item key="6">
                    <modal-link tag="a"  v-if="auth.rebindCard" :to=" { name: 'shop-missing-card',props: {record: {member_id:$route.query.id, member_name: info.member_name, mobile: info.mobile}}}">遗失补卡</modal-link>
                  </a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px">
                  更多操作
                  <a-icon type="down"/>
                </a-button>
              </a-dropdown>
            </div>
            <div class="pannel-right__operation">
              <div class="pannel-right__num__box">
                <span class="pannel-right__num">{{ info.valid_card }}</span>
                <span class="pannel-right__num__margin">/</span>
                <span>张</span>
                <p>有效会员卡</p>
              </div>
              <div class="pannel-right__num__box">
                <span class="pannel-right__num">{{ info.valid_personal_class }}</span>
                <span class="pannel-right__num__margin">/</span>
                <span>节</span>
                <p>有效私教课</p>
              </div>
              <div class="pannel-right__num__box">
                <span class="pannel-right__num">{{ info.deposit_balance }}</span>
                <span class="pannel-right__num__margin">/</span>
                <span>元</span>
                <p>储值卡余额</p>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel
      :tabs="[
          { label: '用户资料', route: { name: 'shop-member-info-basic',query:{id:$route.query.id} } },
          { label: '员工跟进', route: { name: 'shop-member-info-follow-history',query:{id:$route.query.id} }},
          { label: '预约上课', route: { name: 'shop-member-info-sold',query:{id:$route.query.id} } },
          { label: '卡课消费', route: { name: 'shop-member-info-reserve',query:{id:$route.query.id} } },
          { label: '销售权益', route: { name: 'shop-member-info-sales-interests' ,query:{id:$route.query.id}} },
          { label: '用户体测', route: { name: 'shop-member-info-user-experience',query:{id:$route.query.id} } },
        ]"
    >
      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </div>
</template>

<script>
import { InfoService } from './info.service'
export default {
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      auth: this.infoService.auth$
    }
  },
  name: 'list',
  data() {
    return {
      id: ''
    }
  },
  methods: {
    onRemoveBind() {
      let that = this
      this.$confirm({
        title: '提示信息',
        content: '确认解绑选中的会员关系？',
        onOk() {
          that.infoService.removeWechatBind(that.id).subscribe(() => {
            console.log('ok')
          })
        },
        onCancel() {}
      })
    },
    handleClose(tag) {
      console.log(tag)
      let self = this
      this.infoService
        .getMemberLabelDelete({ user_id: self.$route.query.id, tag_id: tag.id })
        .subscribe(state => {})
    },
    editMember() {
      console.log(this.$route.query)
      this.$router.push({
        name: 'shop-member-edit',
        query: { id: this.$route.query.id }
      })
    },
    onModalTest() {
      let self = this
      this.infoService.getHeaderInfo(self.$route.query.id).subscribe()
    }
  },
  mounted() {
    console.log('=========', this.info)
    this.id = this.$route.query.id
  }
}
</script>
