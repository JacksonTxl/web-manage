<template>
  <div class="shop-member-info">
    <st-panel class="shop-member-info-title">
      <a-row :gutter="24">
        <a-col :span="14">
          <div class="shop-member-info-title-pannel-left">
            <div class="shop-member-info-title-pannel__img">
              <div class="img-box">
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
              <st-t2>{{ info.member_name }}</st-t2>
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
                  <a-tag style="background: #fff; borderStyle: dashed;">
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
              <a-button type="primary" class="pannel-right__operation__margin" @click="editMember">编辑资料</a-button>
              <a-button class="pannel-right__operation__margin">绑定实体卡</a-button>
              <a-select
                class="pannel-right__operation__margin"
                defaultValue="更多操作"
                style="width: 120px"
              >
                <a-select-option value="jack">
                  <modal-link tag="a" :to=" { name: 'shop-distribution-ales'}">更改跟进销售</modal-link>
                </a-select-option>
                <a-select-option value="lucy">
                  <modal-link tag="a" :to=" { name: 'shop-distribution-coach'}">更改跟进教练</modal-link>
                </a-select-option>
              </a-select>
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
          { label: '用户体验', route: { name: 'shop-member-info-user-experience',query:{id:$route.query.id} } },
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
      info: this.infoService.info$
    }
  },
  name: 'list',
  data() {
    return {}
  },
  methods: {
    handleClose(tag) {
      console.log(tag)
      let self = this
      this.infoService
        .getMemberLabelDelete({ user_id: self.$route.query.id, tag_id: tag.id })
        .subscribe(state => {})
    },
    editMember() {
      console.log(this.$route.query)
      this.$router.push({ name: 'shop-member-edit', query: { id: this.$route.query.id } })
    },
    onModalTest() {
      console.log(111111111111111111)
      let self = this
      this.infoService.getHeaderInfo(self.$route.query.id).subscribe()
    }
  },
  mounted() {
    // console.log('=========', this.info)
  }
}
</script>
