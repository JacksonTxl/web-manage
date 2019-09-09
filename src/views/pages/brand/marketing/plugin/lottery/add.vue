<template>
  <div :class="bPage()">
    <div :class="bPage('content')">
      <div :class="bPage('h5')">
        <h5-container>
          <template v-slot:title>
            幸运大转盘
          </template>
          <div :class="bPage('lottery')">
            <div :class="bPage('swiper')" v-if="isStopSwiper === 1">
              <swiper :options="sliderOptions" style="width:100%;">
                <swiper-slide
                  v-for="(item, index) in prizeInfoList"
                  :key="index"
                >
                  <span :class="bPage('swiper-text')">{{ item }}</span>
                </swiper-slide>
              </swiper>
            </div>
            <img
              :class="bPage('lottery-banner')"
              src="~@/assets/img/brand/marketing/lottery/bg.png"
            />
            <img
              :class="bPage('lottery-title-bg')"
              src="~@/assets/img/brand/marketing/lottery/title_bg.png"
            />
            <span :class="bPage('lottery-subtitle')">{{ preview.title }}</span>
            <div
              :class="bPage('lottery-turntable')"
              v-if="prizeList.length > 0"
            >
              <div
                class="img-wrap"
                :class="'run-item-' + index"
                v-for="(item, index) in prizeList"
                :key="index"
              >
                <img class="img" :src="item.prize.image_url" alt="" />
                {{ item.prize_name }}
              </div>
              <div v-if="notPrize.prize_name" class="img-wrap run-item-7">
                <img class="img" :src="notPrize.prize.image_url" alt="" />
                {{ notPrize.prize_name }}
              </div>
            </div>
            <div :class="bPage('lottery-footer')">
              <div :class="bPage('lottery-title')">活动规则</div>
              <div class="mg-b24">
                <span class="mg-r8">活动时间:</span>
                <span>{{ preview.startTime }}-{{ preview.endTime }}</span>
              </div>
              <div class="mg-b24">
                <span class="mg-r8">抽奖规则:</span>
                <span>每人每天有{{ preview.perTimes }}次机会</span>
              </div>
              <div class="mg-b24">
                <span class="mg-r8">活动说明:</span>
                <span>{{ preview.description }}</span>
              </div>
            </div>
          </div>
        </h5-container>
      </div>
      <div :class="bPage('form')">
        <a-row class="mg-b24" :gutter="8">
          <a-col offset="1">
            <Steps
              :value="currentIndex"
              @skip="getCurIndex"
              :stepArr="stepArr"
            />
          </a-col>
        </a-row>
        <div style="padding:24px;">
          <st-form :form="form" labelGutter="0" v-show="currentIndex == 0">
            <st-form-item label="活动名称" labelWidth="124px" required>
              <a-input
                :disabled="info.activity_status === 2"
                placeholder="请输入活动名称"
                v-decorator="decorators.activity_base.activity_name"
              ></a-input>
            </st-form-item>
            <st-form-item label="活动标题" labelWidth="124px" required>
              <a-input
                :disabled="info.activity_status === 2"
                @change="getTitle"
                placeholder="请输入活动标题"
                v-decorator="decorators.activity_base.activity_sub_name"
              ></a-input>
            </st-form-item>
            <st-form-item label="活动时间" labelWidth="124px" required>
              <a-range-picker
                :disabled="info.activity_status === 2"
                format="YYYY-MM-DD HH:mm"
                v-model="dateRangeVal"
                @change="onDateChange"
              ></a-range-picker>
            </st-form-item>
            <st-form-item label="活动说明" labelWidth="124px" required>
              <a-textarea
                @change="getDescription"
                :disabled="info.activity_status === 2"
                placeholder="请输入活动说明"
                v-decorator="decorators.activity_base.activity_description"
              ></a-textarea>
            </st-form-item>
            <st-form-item label="活动轮播获奖信息说明" labelWidth="124px">
              <a-radio-group
                :disabled="info.activity_status === 2"
                @change="stopSwiper"
                v-decorator="decorators.activity_base.wheel_turn_around"
              >
                <a-radio
                  v-for="(item, index) in wheelTurnAround"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label="分享设置" labelWidth="124px">
              <a-radio-group
                @change="getCurShareType"
                :disabled="info.activity_status === 2"
                v-decorator="decorators.activity_base.wheel_share_default"
              >
                <a-radio
                  v-for="(item, index) in wheelDefault"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
              <div v-if="shareType === 2">
                <st-form-item label="选择图片" labelWidth="124px">
                  <st-image-upload
                    width="164px"
                    height="164px"
                    :list="fileShareList"
                    @change="onShareChangeGetAvatar"
                    :sizeLimit="2"
                    placeholder="上传头像"
                  ></st-image-upload>
                </st-form-item>
                <st-form-item label="分享标题" labelWidth="124px">
                  <a-input
                    placeholder="分享标题"
                    v-decorator="decorators.activity_base.share_title"
                  ></a-input>
                </st-form-item>
              </div>
            </st-form-item>
            <st-form-item label="" labelWidth="124px">
              <st-button type="primary" @click="next(1)">下一步</st-button>
            </st-form-item>
          </st-form>

          <st-form :form="form" labelGutter="0" v-show="currentIndex == 1">
            <st-form-item label="参与用户" labelWidth="124px" required>
              <a-radio-group
                @change="getCurCrowdType"
                v-decorator="decorators.activity_rule.join_crowd_all"
              >
                <a-radio
                  v-for="(item, index) in joinCrowdAll"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>

              <a-select
                v-show="crowdType === 2"
                placeholder="请选择参与用户"
                v-decorator="decorators.activity_rule.crowd_id"
              >
                <a-select-option
                  v-for="(item, index) in crowd"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </st-form-item>
            <st-form-item label="抽奖条件" labelWidth="124px" required>
              <a-radio-group
                v-decorator="decorators.activity_rule.draw_condition"
              >
                <a-radio
                  v-for="(item, index) in drawCondition"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label=" 抽奖机会" labelWidth="124px" required>
              <a-radio-group
                @change="getCurTimesType"
                v-decorator="decorators.activity_rule.draw_times_type"
              >
                <a-radio
                  v-for="(item, index) in drawTimesType"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
              <div v-if="timesType === 1">
                每人每天有
                <a-input-number
                  :min="1"
                  :max="9999"
                  :precision="1"
                  @change="getPerTimes"
                  style="width: 100px;"
                  placeholder="请输入"
                  v-decorator="decorators.activity_rule.per_times"
                ></a-input-number>
                次
              </div>
              <div v-else>
                每人总共有
                <a-input-number
                  :min="1"
                  :max="9999"
                  :precision="1"
                  style="width: 100px;"
                  placeholder="请输入"
                  v-decorator="decorators.activity_rule.total_times"
                ></a-input-number>
                次
              </div>
            </st-form-item>
            <st-form-item label=" 中奖次数" labelWidth="124px">
              每人最多可中奖
              <a-input
                @change="getTotalTimes"
                style="width: 100px;"
                placeholder="请输入"
                v-decorator="decorators.activity_rule.prize_times"
              ></a-input>
              次
            </st-form-item>
            <st-form-item label="" labelWidth="124px">
              <st-button type="primary" @click="next(2)">下一步</st-button>
            </st-form-item>
          </st-form>
          <st-form :form="form" v-show="currentIndex == 2">
            <st-t3 class="mg-b24">奖品设置</st-t3>
            <st-form-table>
              <thead>
                <tr>
                  <template v-for="(item, index) in columsTitlelist">
                    <th :key="index">{{ item }}</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="6" class="st-form-table__add">
                    <st-button
                      type="dashed"
                      block
                      v-if="prizeList.length < 7"
                      v-modal-link="{
                        name: 'brand-marketing-plugin-add-prize',
                        on: { change: getPrizeInfo }
                      }"
                    >
                      添加奖品
                    </st-button>
                  </td>
                </tr>
                <template v-for="item in prizeList">
                  <tr :key="item.id">
                    <td>{{ item.prize_name }}</td>
                    <td>{{ item.prize_type }}</td>
                    <td>
                      <!-- {{ item.support_shop_ids.length }} -->
                    </td>
                    <td>
                      {{ item.number }}
                    </td>
                    <td>{{ item.rate }}</td>
                    <td>
                      <st-table-actions>
                        <a
                          v-modal-link="{
                            name: 'brand-marketing-plugin-add-prize',
                            props: {
                              info: item
                            },
                            on: { change: getPrizeInfo }
                          }"
                        >
                          编辑
                        </a>
                        <a
                          href="javascript:;"
                          @click="onDelete(item.prize_name)"
                        >
                          删除
                        </a>
                      </st-table-actions>
                    </td>
                  </tr>
                </template>
              </tbody>
            </st-form-table>
            <st-t3 class="mg-b24 mg-t32">未中奖设置</st-t3>
            <st-form-item label="名称" required>
              <a-input
                @change="getName"
                placeholder="请输入未奖品名称"
                v-decorator="decorators.activity_lucky.lucky_name"
              ></a-input>
            </st-form-item>
            <st-form-item label=" 图片" required>
              <a-radio-group v-model="notPrizeImgType">
                <a-radio
                  v-for="(item, index) in imgType"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
              <st-image-upload
                v-if="notPrizeImgType === 2"
                width="164px"
                height="164px"
                :list="fileList"
                @change="onChangeGetAvatar"
                :sizeLimit="2"
                placeholder="上传头像"
              ></st-image-upload>
            </st-form-item>
            <st-form-item label="" labelWidth="124px">
              <st-button type="primary" @click="onSubmit">完成</st-button>
            </st-form-item>
          </st-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AddService } from './add.service'
import H5Container from '@/views/biz-components/h5/h5-container'
import Steps from '../../../staff/add#/st-steps'
import { ruleOptions } from './form.config.ts'
import { PatternService } from '@/services/pattern.service'
import BrandMarketingPluginAddPrize from '@/views/biz-modals/brand/marketing/plugin/add-prize'
import { RouteService } from '@/services/route.service'
import { cloneDeep } from 'lodash-es'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'PluginLotteryAdd',
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      columsTitlelist: [
        '奖品名称',
        '奖品类型',
        '可用门店',
        '奖品数量（个）',
        '中奖概率',
        '操作'
      ],
      info: {},
      preview: {
        title: '',
        startTime: '',
        endTime: '',
        perTimes: 0,
        description: ''
      },
      fileList: [],
      fileShareList: [],
      prizeList: [],
      timesType: 1,
      crowdType: 1,
      shareType: 1,
      isStopSwiper: 1,
      stepArr: [
        {
          title: '基础信息',
          key: 1
        },
        {
          title: '抽奖规则',
          key: 2
        },
        {
          title: '奖项设置',
          key: 3
        }
      ],
      currentIndex: 0,
      notPrizeImgType: 1,
      dateRangeVal: [],
      defaultImg: {
        image_url:
          'https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/default/img-lottery-prize-defalut-1x.png',
        image_key: 'image/default/img-lottery-prize-defalut-1x.png'
      },
      notPrize: {
        prize_name: '',
        prize: {
          image_url:
            'https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/dev/image/10000/2019-09-05/分组3___f12c6b9b10bb___.png'
        }
      },
      sliderOptions: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      swiperOption: {
        spaceBetween: 6,
        slidesPerView: 1.05
      }
    }
  },
  bem: {
    bPage: 'brand-marketing-plugin-lottery-add'
  },
  serviceInject() {
    return {
      addService: AddService,
      pattern: PatternService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      drawCondition: this.addService.drawCondition$,
      drawTimesType: this.addService.drawTimesType$,
      invitePoster: this.addService.invitePoster$,
      wheelDefault: this.addService.wheelDefault$,
      wheelTurnAround: this.addService.wheelTurnAround$,
      joinCrowdAll: this.addService.joinCrowdAll$,
      crowd: this.addService.crowd$,
      imgType: this.addService.imgType$,
      prizeInfoList: this.addService.prizeInfoList$
    }
  },
  modals: {
    BrandMarketingPluginAddPrize
  },
  components: {
    H5Container,
    Steps,
    swiper,
    swiperSlide
  },
  created() {
    if (this.query.activity_id) {
      this.editVIew(this.query.activity_id)
    }
  },
  mounted() {},
  methods: {
    next(para) {
      if (para === 1) {
        this.form
          .validate([
            'activity_base.activity_name',
            'activity_base.activity_description',
            'activity_base.wheel_turn_around',
            'activity_base.wheel_share_default',
            'activity_base.share_title',
            'activity_base.activity_sub_name'
          ])
          .then(() => {
            this.currentIndex = para
          })
      }
      if (para === 2) {
        this.form
          .validate([
            'activity_rule.join_crowd_all',
            'activity_rule.draw_condition',
            'activity_rule.draw_times_type'
          ])
          .then(() => {
            this.currentIndex = para
          })
      }
    },
    getCurIndex(e) {
      let index = e.index.target.textContent - 1
      this.currentIndex = index >= 0 ? index : 0
    },
    onChangeGetAvatar(imageFiles) {
      this.fileList = cloneDeep(imageFiles)
      this.notPrize.prize = cloneDeep(imageFiles)
    },
    onShareChangeGetAvatar(imageFiles) {
      this.fileShareList = cloneDeep(imageFiles)
    },
    onSubmit() {
      this.form.validate().then(value => {
        value.activity_base.start_time = this.preview.startTime
        value.activity_base.end_time = this.preview.endTime
        value.activity_base.share_bg =
          this.shareType === 2 ? this.fileShareList[0] : this.defaultImg
        value.activity_prizes = this.prizeList
        value.activity_lucky.lucky =
          this.notPrizeImgType === 2 ? this.fileList[0] : this.defaultImg
        this.addService.add(value).subscribe(res => {
          this.$router.push('./success')
        })
      })
    },
    getTitle(e) {
      this.preview.title = e.target.value
    },
    getName(e) {
      this.notPrize.prize_name = e.target.value
      // this.prizeList =
      //   this.tempList.length > 0
      //     ? this.tempList.length.concat(this.notPrize)
      //     : this.notPrize
    },
    getPerTimes(e) {
      this.preview.perTimes = e
    },
    getTotalTimes() {},
    getDescription(e) {
      this.preview.description = e.target.value
    },
    // 抽奖次数类型
    getCurTimesType(e) {
      this.timesType = e.target.value
    },
    // 人群类型
    getCurCrowdType(e) {
      this.crowdType = e.target.value
    },
    // 分享类型
    getCurShareType(e) {
      this.shareType = e.target.value
    },
    // 轮播开关
    stopSwiper(e) {
      this.isStopSwiper = e.target.value
    },
    refresh() {},
    onDateChange(data, str) {
      this.preview.startTime = str[0]
      this.preview.endTime = str[1]
    },
    getPrizeInfo(val) {
      this.prizeList.push(val)
      this.tempList = this.prizeList
    },
    onDelete(para) {
      this.prizeList = this.prizeList.filter(item => {
        return item.prize_name !== para
      })
    },
    editVIew(id) {
      return this.addService.editVIew(id).subscribe(res => {
        this.info = res
        this.form.setFieldsValue({
          activity_base: this.info.activity_base,
          activity_lucky: this.info.activity_lucky,
          activity_prizes: this.info.activity_prizes,
          activity_rule: this.info.activity_rule
        })
        this.dateRangeVal = [
          moment(res.activity_base.start_time),
          moment(res.activity_base.end_time)
        ]
        this.prizeList = res.activity_prizes
        this.preview.startTime = res.activity_base.start_time
        this.preview.endTime = res.activity_base.end_time
        this.preview.perTimes = res.activity_rule.per_times
        this.preview.description = res.activity_base.activity_description
        this.preview.title = res.activity_base.activity_sub_name
        this.notPrize.prize_name = res.activity_lucky.lucky_name
      })
    }
  }
}
</script>
