<template>
  <div class="shop-member-info">
    <st-panel class="shop-member-info-title">
      <a-row :gutter="24">
        <a-col :span="14">
          <div class="shop-member-info-title-pannel-left">
            <div class="shop-member-info-title-pannel__img">
              <div class="img-box  st-preview-item" v-viewer="{ url: 'data-src' }">
                <img
                  class="img-url"
                  :src="info.image_face.image_url" :data-src="info.image_face.image_url"
                >
                <span class="img-describe">{{info.member_level.name}}</span>
              </div>
              <div class="input-face" v-if="authCommon.face">
                <a href="#" @click="openFaceUpload">
                  <a-icon type="plus"/>录入人脸
                </a>
              </div>
            </div>

            <div class="shop-member-info-title-pannel__info">
              <st-t2>{{ info.member_name }}
                <st-icon  :type="info.sex=== 1? 'female':'male'" :style="info.sex=== 1? 'color:#FF5E41':'color:#3F66F6'"/>
              </st-t2>
              <div class="shop-member-info-title-pannel__info__phone">
                <div>
                  手机号：
                  <span>{{ info.mobile}}</span>
                </div>
                <div class="line" v-if="info.member_level.id !== 1"></div>
                <div v-if="info.member_level.id !== 1">
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
                <a v-modal-link="{ name: 'shop-add-lable',props:{
                  memberIds:[$route.query.id]},
                  on:{done: onModalTest }
                }">
                  <a-tag v-if="authCommon.add" style="background: #fff; borderStyle: dashed;">
                    <a-icon type="plus" style="margin-right: 8px;"/>标签
                  </a-tag>
                </a>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="10">
          <div class="shop-member-info-title-pannel-right">
            <div class="pannel-right__operation">
              <a-button
                v-if="auth['shop:member:member|edit']"
                type="primary"
                class="pannel-right__operation__margin"
                @click="editMember"
              >编辑资料</a-button>
              <a v-if="auth['shop:member:member|bind_card']" class="pannel-right__operation__margin" v-modal-link="{name: 'shop-binding-entity-card', props: {record: {member_id:$route.query.id, member_name: info.member_name, mobile: info.mobile}}}">
                <a-button class="pannel-right__operation__margin">绑定实体卡</a-button>
              </a>
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item key="1" v-if="auth['shop:member:member|bind_coach']">
                    <a v-modal-link="{ name: 'shop-distribution-coach',props: { memberIds: [id] } }">更改跟进教练</a>
                  </a-menu-item>
                  <a-menu-item key="2" v-if="auth['shop:member:member|bind_salesman']">
                    <a v-modal-link="{ name: 'shop-distribution-ales',props: { memberIds: [id] } }">更改跟进销售</a>
                  </a-menu-item>
                  <a-menu-item key="3" v-if="auth['shop:member:member|unbind_wechat']" @click="onRemoveBind">解除微信绑定</a-menu-item>
                  <!-- <a-menu-item key="4" v-if="auth['shop:member:member|transfer']">
                    <a v-modal-link="{ name: 'shop-transfer-shop',props: {record: {member_id:$route.query.id, member_name: info.member_name, mobile: info.mobile}}}">转店</a>
                  </a-menu-item> -->
                  <a-menu-item key="5" v-if="auth['shop:member:member|frozen']">
                    <a v-modal-link="{ name: 'shop-frozen', props: {record: {member_id:$route.query.id, member_name: info.member_name, mobile: info.mobile}}}">冻结用户</a>
                  </a-menu-item>
                  <a-menu-item key="6" v-if="auth['shop:member:member|rebind_card']">
                    <a v-modal-link="{ name: 'shop-missing-card',props: {record: {member_id:$route.query.id, member_name: info.member_name, mobile: info.mobile}}}">重绑实体卡</a>
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
                <span class="pannel-right__num font-number">{{ info.valid_card }}</span>
                <span class="pannel-right__num__margin">/</span>
                <span>张</span>
                <p>有效会员卡<st-help-tooltip id="TSXQ001" /></p>
              </div>
              <div class="pannel-right__num__box">
                <span class="pannel-right__num font-number">{{ info.valid_personal_class }}</span>
                <span class="pannel-right__num__margin">/</span>
                <span>节</span>
                <p>有效私教课<st-help-tooltip id="TSXQ002" /></p>
              </div>
              <div class="pannel-right__num__box">
                <span class="pannel-right__num font-number">{{ info.deposit_balance }}</span>
                <span class="pannel-right__num__margin">/</span>
                <span>元</span>
                <p>储值卡余额<st-help-tooltip id="TSXQ003" /></p>
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
          { label: '营销权益', route: { name: 'shop-member-info-sales-interests' ,query:{id:$route.query.id}} },
        ]"
    >
    <!-- 这个版本去掉 -->
    <!-- { label: '用户体测', route: { name: 'shop-member-info-user-experience',query:{id:$route.query.id} } }, -->

      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </div>
</template>

<script>
import { InfoService } from './info.service'
import { RouteService } from '@/services/route.service'
export default {
  serviceInject() {
    return {
      infoService: InfoService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      auth: this.infoService.auth$,
      authCommon: this.infoService.authCommon$,
      query: this.routeService.query$
    }
  },
  name: 'list',
  data() {
    return {
      id: ''
    }
  },
  methods: {
    openFaceUpload() {
      this.$modalRouter.push({
        name: 'face-recognition',
        on: {
          change: res => {
            let result = res[0]
            this.infoService.editFace(this.query.id, {
              image_face: result
            }).subscribe(() => {
              this.infoService.getHeaderInfo(this.query.id).subscribe()
            })
          }
        }
      })
    },
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
    this.id = this.$route.query.id
  }
}
</script>
