<template>
  <st-panel-layout class="shop-member-info">
    <a-row class="shop-member-info-title">
      <a-col :span="14">
        <div class="shop-member-info-title-pannel-left">
          <div class="shop-member-info-title-pannel__img">
            <div
              class="img-box  st-preview-item st-preview-item--cover"
              v-viewer="{ url: 'data-src' }"
            >
              <img
                class="img-url"
                :src="info.image_face.image_url"
                :data-src="info.image_face.image_url"
              />
              <span class="img-describe">{{ info.member_level.name }}</span>
            </div>
            <div class="input-face" v-if="authCommon.face">
              <a href="#" @click="openFaceUpload">
                <a-icon type="plus" />
                录入人脸
              </a>
            </div>
          </div>

          <div class="shop-member-info-title-pannel__info">
            <st-t2>
              {{ info.member_name }}
              <st-icon
                v-if="basicInfo.sex === 1 && !basicInfo.is_minors"
                :type="'female'"
                :style="'color:#FF5E41'"
              />
              <st-icon
                v-if="basicInfo.sex === 2 && !basicInfo.is_minors"
                :type="'male'"
                :style="'color:#3F66F6'"
              />
              <st-icon
                v-if="basicInfo.is_minors && basicInfo.sex.id === 1"
                type="user-type"
                color="#FF5E41"
              />
              <st-icon
                v-if="basicInfo.is_minors && basicInfo.sex.id === 2"
                type="user-type"
                color="#3F66F6"
              />
            </st-t2>
            <div class="shop-member-info-title-pannel__info__phone">
              <div v-if="basicInfo.is_minors">
                <span class="mg-r8">
                  家长：
                  <span>{{ parentInfo.username }}</span>
                </span>
                <span class="line"></span>
                <span>
                  手机号：
                  <span>{{ parentInfo.mobile }}</span>
                </span>
              </div>
              <div v-else>
                手机号：
                <span>{{ info.mobile }}</span>
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
                  >
                    {{ tag.name }}
                  </a-tag>
                </a-tooltip>
              </template>
              <a
                v-modal-link="{
                  name: 'shop-add-lable',
                  props: {
                    memberIds: [$searchQuery.id]
                  },
                  on: { done: onModalTest }
                }"
              >
                <a-tag
                  v-if="authCommon.add"
                  style="background: #fff; borderStyle: dashed;"
                >
                  <a-icon type="plus" style="margin-right: 8px;" />
                  标签
                </a-tag>
              </a>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="10">
        <div class="shop-member-info-title-pannel-right">
          <div class="pannel-right__operation">
            <st-btn-actions :options="btnOptions" />
          </div>
          <div class="pannel-right__operation">
            <div class="pannel-right__num__box">
              <span class="pannel-right__num font-number">
                {{ info.valid_card }}
              </span>
              <span class="pannel-right__num__margin">/</span>
              <span>张</span>
              <p>
                有效{{ $c('member_card') }}
                <st-help-tooltip id="TSXQ001" />
              </p>
            </div>
            <div class="pannel-right__num__box">
              <span class="pannel-right__num font-number">
                {{ info.valid_personal_class }}
              </span>
              <span class="pannel-right__num__margin">/</span>
              <span>节</span>
              <p>
                有效私教课
                <st-help-tooltip id="TSXQ002" />
              </p>
            </div>
            <div class="pannel-right__num__box">
              <span class="pannel-right__num font-number">
                {{ info.deposit_balance }}
              </span>
              <span class="pannel-right__num__margin">/</span>
              <span>元</span>
              <p>
                储值卡余额
                <st-help-tooltip id="TSXQ003" />
              </p>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <st-panel
      app
      :tabs="[
        {
          label: '用户资料',
          route: {
            name: 'shop-member-info-basic',
            query: { id: $searchQuery.id }
          }
        },
        {
          label: '员工跟进',
          route: {
            name: 'shop-member-info-follow-history',
            query: { id: $searchQuery.id }
          }
        },
        {
          label: '预约上课',
          route: {
            name: 'shop-member-info-sold',
            query: { id: $searchQuery.id }
          }
        },
        {
          label: '卡课消费',
          route: {
            name: 'shop-member-info-reserve',
            query: { id: $searchQuery.id }
          }
        },
        {
          label: '营销权益',
          route: {
            name: 'shop-member-info-sales-interests',
            query: { id: $searchQuery.id }
          }
        },
        {
          label: '跟进日志',
          route: {
            name: 'shop-member-info-follow-record',
            query: { id: $route.query.id }
          }
        }
      ]"
    >
      <!-- 这个版本去掉 -->
      <!-- { label: '用户体测', route: { name: 'shop-member-info-user-experience',query:{id:$searchQuery.id} } }, -->

      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </st-panel-layout>
</template>

<script>
import { InfoService } from './info.service'
import FaceRecognition from '@/views/biz-modals/face/recognition'
import ShopAddLable from '@/views/biz-modals/shop/add-lable'
import ShopBindingEntityCard from '@/views/biz-modals/shop/binding-entity-card'
import ShopDistributionCoach from '@/views/biz-modals/shop/distribution-coach'
import ShopDistributionSale from '@/views/biz-modals/shop/distribution-sale'
import ShopFrozen from '@/views/biz-modals/shop/frozen'
import ShopMissingCard from '@/views/biz-modals/shop/missing-card'
export default {
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      basicInfo: this.infoService.basicInfo$,
      parentInfo: this.infoService.parentInfo$,
      auth: this.infoService.auth$,
      authCommon: this.infoService.authCommon$
    }
  },
  modals: {
    FaceRecognition,
    ShopAddLable,
    ShopBindingEntityCard,
    ShopDistributionCoach,
    ShopDistributionSale,
    ShopFrozen,
    ShopMissingCard
  },
  name: 'list',
  data() {
    return {
      id: ''
    }
  },
  computed: {
    btnOptions() {
      return [
        {
          text: '编辑资料',
          click: this.editMember,
          if: this.auth['shop:member:member|edit']
        },
        {
          text: '绑定实体卡',
          click: this.openBindingEntityCardModal,
          if: this.auth['shop:member:member|bind_card']
        },
        {
          text: `绑定跟进${this.$c('coach')}`,
          click: this.onDistributionCoach,
          if: this.auth['shop:member:member|bind_coach']
        },
        {
          text: `更改跟进${this.$c('coach')}`,
          click: this.onDistributionCoach,
          if: this.auth['shop:member:member|change_coach']
        },
        {
          text: '更改跟进销售',
          click: this.onDistributionSale,
          if: this.auth['shop:member:member|change_salesman']
        },
        {
          text: '绑定跟进销售',
          click: this.onDistributionSale,
          if: this.auth['shop:member:member|bind_salesman']
        },
        {
          text: '解除微信绑定',
          click: this.onRemoveBind,
          if: this.auth['shop:member:member|unbind_wechat']
        },
        {
          text: '冻结用户',
          click: this.openFrozenModal,
          if: this.auth['shop:member:member|frozen']
        },
        {
          text: '重绑实体卡',
          click: this.openMissingCardModal,
          if: this.auth['shop:member:member|rebind_card']
        }
      ]
    }
  },
  methods: {
    submitSuccess() {
      this.$router.reload()
      this.$message.success({ content: '提交成功' })
    },
    getRecord() {
      return {
        member_id: this.$searchQuery.id,
        member_name: this.info.member_name,
        mobile: this.info.mobile
      }
    },
    openFrozenModal() {
      this.$modalRouter.push({
        name: 'shop-frozen',
        props: {
          record: this.getRecord()
        },
        on: {
          success: () => {
            this.submitSuccess()
          }
        }
      })
    },
    openMissingCardModal() {
      this.$modalRouter.push({
        name: 'shop-missing-card',
        props: {
          record: this.getRecord()
        },
        on: {
          success: () => {
            this.submitSuccess()
          }
        }
      })
    },
    openBindingEntityCardModal() {
      this.$modalRouter.push({
        name: 'shop-binding-entity-card',
        props: {
          record: this.getRecord()
        },
        on: {
          success: () => {
            this.submitSuccess()
          }
        }
      })
    },

    openFaceUpload() {
      this.$modalRouter.push({
        name: 'face-recognition',
        on: {
          change: res => {
            let result = res[0]
            this.infoService
              .editFace(this.$searchQuery.id, {
                image_face: result
              })
              .subscribe(() => {
                this.infoService.getHeaderInfo(this.$searchQuery.id).subscribe()
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
      let self = this
      this.infoService
        .getMemberLabelDelete({ user_id: self.$searchQuery.id, tag_id: tag.id })
        .subscribe(state => {})
    },
    editMember() {
      this.$router.push({
        name: 'shop-member-edit',
        query: { id: this.$searchQuery.id }
      })
    },
    onModalTest() {
      let self = this
      this.infoService.getHeaderInfo(self.$searchQuery.id).subscribe()
    },
    // 分配教练
    onDistributionCoach() {
      this.$modalRouter.push({
        name: 'shop-distribution-coach',
        props: {
          memberIds: [this.$searchQuery.id],
          coachId: this.info.follow_coach_id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 分配销售
    onDistributionSale() {
      this.$modalRouter.push({
        name: 'shop-distribution-sale',
        props: {
          memberIds: [this.$searchQuery.id],
          saleId: this.info.follow_salesman_id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    }
  },
  mounted() {
    this.id = this.$searchQuery.id
  }
}
</script>
