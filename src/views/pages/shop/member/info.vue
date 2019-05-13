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
                      :afterClose="() => handleClose(tag)"
                    >{{ tag.name }}</a-tag>
                  </a-tooltip>
                </template>
                <a-input
                  v-if="inputVisible"
                  ref="input"
                  type="text"
                  size="small"
                  :style="{ width: '78px' }"
                  :value="inputValue"
                  @change="handleInputChange"
                  @blur="handleInputConfirm"
                  @keyup.enter="handleInputConfirm"
                />
                <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
                  <a-icon type="plus" style="margin-right: 8px;"/>标签
                </a-tag>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="10">
          <div class="shop-member-info-title-pannel-right">
            <div class="pannel-right__operation">
              <a-button type="primary" class="pannel-right__operation__margin">编辑资料</a-button>
              <a-button class="pannel-right__operation__margin">绑定实体卡</a-button>
              <a-select
                class="pannel-right__operation__margin"
                defaultValue="更多操作"
                style="width: 120px"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </div>
            <div class="pannel-right__operation">
              <div class="pannel-right__num__box">
                <span class="pannel-right__num">3</span>
                <span class="pannel-right__num__margin">/</span>
                <span>张</span>
                <p>有效会员卡</p>
              </div>
              <div class="pannel-right__num__box">
                <span class="pannel-right__num">3</span>
                <span class="pannel-right__num__margin">/</span>
                <span>张</span>
                <p>有效会员卡</p>
              </div>
              <div class="pannel-right__num__box">
                <span class="pannel-right__num">3</span>
                <span class="pannel-right__num__margin">/</span>
                <span>张</span>
                <p>有效会员卡</p>
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
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose(tag) {},
    showInput() {
      this.inputVisible = true
      this.$nextTick(function() {
        this.$refs.input.focus()
      })
    },
    handleInputChange(e) {
      this.inputValue = e.target.value
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      console.log(tags)
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
    }
  },
  mounted() {
    console.log('=========', this.info)
  }
}
</script>
