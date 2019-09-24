<template>
  <div :class="bPage()">
    <div :class="bPage('content')">
      <div :class="bPage('h5')">
        <h5-container>
          <template v-slot:title>
            幸运大转盘
          </template>
          <div :class="bPage('lottery')">
            <div
              :class="bPage('swiper')"
              v-if="isStopSwiper === STOP_SWIPER.DEFAULT"
            >
              <swiper :options="sliderOptions">
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
            <div :class="bPage('lottery-turntable')">
              <div style="position:relative" v-if="prizeList.length > 0">
                <div
                  class="img-wrap"
                  :class="'run-item-' + index"
                  v-for="(item, index) in prizeList"
                  :key="index"
                >
                  <img class="img" :src="item.prize.image_url" alt="奖品图片" />
                  <div class="text">{{ item.prize_name }}</div>
                </div>
              </div>
              <div v-if="notPrize.prize_name" class="img-wrap run-item-7">
                <div class="img">
                  <img
                    style="width:100%"
                    :src="notPrize.prize ? notPrize.prize.image_url : ''"
                    alt="奖品图片"
                  />
                </div>
                <div class="text">{{ notPrize.prize_name }}</div>
              </div>
            </div>
            <div :class="bPage('lottery-footer')">
              <div :class="bPage('lottery-title')">活动规则</div>
              <div class="mg-b24">
                <span class="mg-r8">活动时间:</span>
                <span>{{ preview.startTime }}--{{ preview.endTime }}</span>
              </div>
              <div class="mg-b24">
                <span class="mg-r8">抽奖规则:</span>
                <span v-if="timesType === 1">
                  每人每天有{{ preview.perTimes }}次机会
                </span>
                <span v-else>每人总共有{{ preview.totalTimes }}次机会</span>
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
            <Steps :value="currentIndex" @skip="next" :stepArr="stepArr" />
          </a-col>
        </a-row>
        <div style="padding:24px;">
          <st-form
            style="width:500px"
            :form="form"
            labelGutter="0"
            v-show="currentIndex == 0"
            labelWidth="124px"
          >
            <st-form-item label="活动名称" required>
              <a-input
                :disabled="info.activity_status === ACTIVITY_STATUS.DISABLED"
                placeholder="请输入活动名称"
                v-decorator="decorators.activity_base.activity_name"
              ></a-input>
            </st-form-item>
            <st-form-item label="活动标题" required>
              <a-input
                :disabled="info.activity_status === ACTIVITY_STATUS.DISABLED"
                @change="getTitle"
                placeholder="请输入活动标题"
                v-decorator="decorators.activity_base.activity_sub_name"
              ></a-input>
            </st-form-item>
            <st-form-item label="活动时间" required>
              <a-range-picker
                :disabled="info.activity_status === ACTIVITY_STATUS.DISABLED"
                :disabledDate="disabledDate"
                :showTime="{
                  hideDisabledOptions: true,
                  defaultValue: defaultValue
                }"
                format="YYYY-MM-DD HH:mm"
                v-model="dateRangeVal"
                @change="onDateChange"
              ></a-range-picker>
            </st-form-item>
            <st-form-item label="活动说明">
              <st-textarea
                :maxlength="500"
                @change="getDescription"
                :disabled="info.activity_status === ACTIVITY_STATUS.DISABLED"
                placeholder="请输入活动说明"
                v-decorator="decorators.activity_base.activity_description"
              ></st-textarea>
            </st-form-item>
            <st-form-item label="活动轮播获奖信息说明">
              <a-radio-group
                :disabled="info.activity_status === ACTIVITY_STATUS.DISABLED"
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
            <st-form-item label="分享设置">
              <a-radio-group
                @change="getCurShareType"
                :disabled="info.activity_status === ACTIVITY_STATUS.DISABLED"
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
              <div v-if="shareType === 2" :class="bPage('share-upload')">
                <st-form-item label="选择图片" labelWidth="60px">
                  <st-image-upload
                    width="96px"
                    height="96px"
                    :list="fileShareList"
                    @change="onShareChangeGetAvatar"
                    placeholder="上传图片"
                  ></st-image-upload>
                  <span :class="bPage('share-upload-text')">
                    请上传jbg、png格式的图片
                  </span>
                </st-form-item>
                <st-form-item label="分享标题" labelWidth="60px">
                  <a-input
                    placeholder="分享标题"
                    v-decorator="decorators.activity_base.share_title"
                  ></a-input>
                </st-form-item>
              </div>
              <img
                class="default-img"
                v-else
                :src="share[0].image_url"
                alt="默认图片"
              />
            </st-form-item>
            <st-form-item labelFix>
              <st-button type="primary" @click="next(1)">下一步</st-button>
            </st-form-item>
          </st-form>

          <st-form
            style="width:500px"
            :form="form"
            labelGutter="0"
            v-show="currentIndex == 1"
            labelWidth="124px"
          >
            <st-form-item label="参与用户" required>
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
                v-if="crowdType === CROWD_TYPE.CUSTOM"
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
            <st-form-item label="抽奖条件" required>
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
            <st-form-item label=" 抽奖机会" required>
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
                  :max="999"
                  :step="1"
                  :precision="0"
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
                  :max="999"
                  :step="1"
                  :precision="0"
                  style="width: 100px;"
                  placeholder="请输入"
                  v-decorator="decorators.activity_rule.total_times"
                ></a-input-number>
                次
              </div>
            </st-form-item>
            <st-form-item label=" 中奖次数">
              每人最多可中奖
              <a-input-number
                :min="1"
                :max="999"
                :step="1"
                :precision="0"
                style="width: 100px;"
                placeholder="请输入"
                v-decorator="decorators.activity_rule.prize_times"
              ></a-input-number>
              次
            </st-form-item>
            <st-form-item labelFix>
              <st-button type="primary" @click="next(2)">下一步</st-button>
            </st-form-item>
          </st-form>
          <st-form
            style="width:500px;padding-left:62px;"
            :form="form"
            v-show="currentIndex == 2"
          >
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
                      :disabled="query.activity_id && query.status === 1"
                      @click="getCurPrizeIndex(-1)"
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
                <template v-for="(item, index) in prizeList">
                  <tr :key="item.id">
                    <td>{{ item.prize_name }}</td>
                    <td>{{ item.prize_type === 1 ? '优惠券' : '兑换码' }}</td>
                    <td>
                      {{
                        item.prize_type === 1
                          ? item.shop_num || item.support_shop_ids.length
                          : item.support_shop_ids.length
                      }}
                    </td>
                    <td @click="editTableIndexNum(index)">
                      <st-input-number
                        :min="1"
                        :max="99999"
                        :step="1"
                        :precision="0"
                        :value="item.number"
                        :index="index"
                        @change="editTableNum"
                      ></st-input-number>
                    </td>
                    <td @click="editTableIndexRate(index)">
                      <st-input-number
                        :min="0"
                        :max="100"
                        :float="true"
                        :value="item.rate"
                        @change="editTableRate"
                      ></st-input-number>
                    </td>
                    <td>
                      <st-table-actions>
                        <a
                          :disabled="query.activity_id && query.status === 1"
                          @click="getCurPrizeIndex(index)"
                          v-modal-link="{
                            name: 'brand-marketing-plugin-add-prize',
                            props: {
                              info: item,
                              id: query.activity_id,
                              status: query.status
                            },
                            on: { change: getPrizeInfo }
                          }"
                        >
                          编辑
                        </a>
                        <a
                          :disabled="query.activity_id && query.status === 1"
                          href="javascript:;"
                          @click="onDelete(index)"
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
              <a-radio-group
                v-decorator="decorators.activity_lucky.image_default"
                @change="getNotImgType"
              >
                <a-radio
                  v-for="(item, index) in imgType"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
              <div
                v-if="notPrizeImgType === NOT_PRIZE_IMG_TYPE.CUSTOM"
                :class="bPage('lucky-upload')"
              >
                <st-image-upload
                  width="96px"
                  height="96px"
                  :list="fileList"
                  @change="onChangeGetAvatar"
                  placeholder="上传图片"
                ></st-image-upload>
                <span :class="bPage('lucky-upload-text')">
                  请上传jbg、png格式的图片
                </span>
              </div>

              <img
                class="default-img"
                v-else
                :src="lucky[0].image_url"
                alt="默认图片"
              />
            </st-form-item>
            <st-form-item labelFix>
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
import Steps from './components#/step'
import { ruleOptions } from './form.config.ts'
import { PatternService } from '@/services/pattern.service'
import BrandMarketingPluginAddPrize from '@/views/biz-modals/brand/marketing/plugin/add-prize'
import { RouteService } from '@/services/route.service'
import { cloneDeep } from 'lodash-es'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {
  TIMES_TYPE,
  CROWD_TYPE,
  SHARE_TYPE,
  STOP_SWIPER,
  ACTIVITY_STATUS,
  NOT_PRIZE_IMG_TYPE
} from '@/constants/marketing/lottery'

export default {
  name: 'PluginLotteryAdd',
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      TIMES_TYPE,
      CROWD_TYPE,
      SHARE_TYPE,
      STOP_SWIPER,
      ACTIVITY_STATUS,
      NOT_PRIZE_IMG_TYPE,
      columsTitlelist: [
        '奖品名称',
        '奖品类型',
        '可用门店（家）',
        '奖品数量（个）',
        '中奖概率 (%)',
        '操作'
      ],
      info: {},
      tableIndex: 0,
      preview: {
        title: '',
        startTime: '',
        endTime: '',
        perTimes: 0,
        totalTimes: 0,
        description: ''
      },
      fileList: [],
      fileShareList: [],
      prizeList: [],
      timesType: TIMES_TYPE.DEFAULT,
      crowdType: CROWD_TYPE.DEFAULT,
      shareType: SHARE_TYPE.DEFAULT,
      isStopSwiper: STOP_SWIPER.DEFAULT,
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
      curPrizeIndex: -1,
      notPrizeImgType: NOT_PRIZE_IMG_TYPE.DEFAULT,
      dateRangeVal: [],
      notPrize: {
        prize_name: '未中奖',
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
      },
      defaultValue: [moment().format('HH:mm'), moment('11:59', 'HH:mm')]
    }
  },
  bem: {
    bPage: 'page-brand-marketing-plugin-lottery-add'
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
      prizeInfoList: this.addService.prizeInfoList$,
      lucky: this.addService.lucky$,
      prize: this.addService.prize$,
      share: this.addService.share$
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
  mounted() {
    this.notPrize.prize = this.lucky[0]
    if (this.query.activity_id) {
      this.editVIew(this.query.activity_id)
    }
  },
  methods: {
    next(para) {
      if (para.index) {
        para = para.index - 1
      }
      if (para === 0) {
        this.currentIndex = 0
      }
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
            'activity_base.activity_name',
            'activity_base.activity_description',
            'activity_base.wheel_turn_around',
            'activity_base.wheel_share_default',
            'activity_base.share_title',
            'activity_base.activity_sub_name',
            'activity_rule.join_crowd_all',
            'activity_rule.draw_condition',
            'activity_rule.draw_times_type'
          ])
          .then(() => {
            this.currentIndex = para
          })
      }
    },
    onChangeGetAvatar(imageFiles) {
      this.fileList = cloneDeep(imageFiles)
      this.notPrize.prize = this.fileList[0]
    },
    onShareChangeGetAvatar(imageFiles) {
      this.fileShareList = cloneDeep(imageFiles)
    },
    onSubmit() {
      this.form.validate().then(value => {
        value.activity_base.start_time = this.preview.startTime
        value.activity_base.end_time = this.preview.endTime
        // 选择自定义却不传图片
        value.activity_base.share_bg =
          this.shareType === SHARE_TYPE.CUSTOM
            ? this.fileShareList[0] || this.share[0]
            : this.share[0]
        value.activity_prizes = this.prizeList
        value.activity_lucky.lucky =
          this.notPrizeImgType === NOT_PRIZE_IMG_TYPE.CUSTOM
            ? this.fileList[0] || this.prize[0]
            : this.prize[0]
        if (this.query.activity_id) {
          value.activity_id = this.query.activity_id
          this.addService.edit(value).subscribe(res => {
            this.$router.push('./success?id=' + res.id)
          })
        } else {
          this.addService.add(value).subscribe(res => {
            this.$router.push('./success?id=' + res.id)
          })
        }
      })
    },
    getTitle(e) {
      this.preview.title = e.target.value
    },
    getName(e) {
      this.notPrize.prize_name = e.target.value
    },
    getPerTimes(val) {
      this.preview.perTimes = val
    },
    getTotalTimes(val) {
      this.preview.totalTimes = val
    },
    getDescription(val) {
      this.preview.description = val
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
    onDateChange(data, str) {
      this.preview.startTime = str[0]
      this.preview.endTime = str[1]
    },
    getNotImgType(e) {
      this.notPrizeImgType = e.target.value
    },
    getPrizeInfo(val) {
      if (this.curPrizeIndex > -1) {
        this.prizeList.splice(this.curPrizeIndex, 1, val)
      } else {
        this.prizeList.push(val)
      }
    },
    getCurPrizeIndex(index) {
      this.curPrizeIndex = index
    },
    disabledDate(current) {
      return (
        current && current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')
      )
    },
    onDelete(para) {
      this.prizeList = this.prizeList.filter((item, index) => {
        return index !== para
      })
    },
    editTableIndexNum(index) {
      this.tableIndex = index
    },
    editTableNum(val) {
      this.prizeList[this.tableIndex].number = val
    },
    editTableIndexRate(index) {
      this.tableIndex = index
    },
    editTableRate(val) {
      this.prizeList[this.tableIndex].rate = val
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
        this.shareType = res.activity_base.wheel_share_default
        this.timesType = res.activity_rule.draw_times_type
        this.isStopSwiper = res.activity_base.wheel_turn_around
        this.notPrizeImgType = res.activity_lucky.image_default
        res.activity_lucky.lucky &&
          (this.fileList[0] = res.activity_lucky.lucky)
        this.fileShareList[0] = res.activity_base.share_bg
        this.share[0] = res.activity_base.share_bg
        this.prize[0] = res.activity_lucky.lucky
      })
    }
  }
}
</script>
