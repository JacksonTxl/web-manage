<template>
  <div :class="bPage()">
    <div :class="bPage('content')">
      <div :class="bPage('h5')">
        <h5-container>
          <template v-slot:title>
            幸运大转盘
          </template>
          <div :class="bPage('lottery')">
            <img
              :class="bPage('lottery-banner')"
              src="~@/assets/img/brand/marketing/lottery/bg.png"
            />
            <span>{{ preview.title }}</span>
            <div :class="bPage('lottery-turntable')">
              <div
                class="img-wrap"
                :class="'run - item-' + index"
                v-for="(item, index) in prizeList"
                :key="index"
              >
                <img class="img" :src="item.image.image_url" alt="" />
                {{ item.prize_name }}
              </div>
            </div>
            <div :class="bPage('lottery-footer')">
              <div :class="bPage('lottery-title')">活动规则</div>
              <div class="mg-b24">
                <span>活动时间:</span>
                <span>{{ preview.startTime }}-{{ preview.endTime }}</span>
              </div>
              <div class="mg-b24">
                <span>抽奖规则:</span>
                <span>每人每天有{{ preview.perTimes }}次机会</span>
              </div>
              <div class="mg-b24">
                <span>活动说明:</span>
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
            <st-form-item label="活动名称" labelWidth="84px" required>
              <a-input
                placeholder="请输入活动名称"
                v-decorator="decorators.activity_base.activity_name"
              ></a-input>
            </st-form-item>
            <st-form-item label="活动标题" labelWidth="84px" required>
              <a-input
                @change="getTitle"
                placeholder="请输入活动标题"
                v-decorator="decorators.activity_base.share_title"
              ></a-input>
            </st-form-item>
            <st-form-item label="活动时间" labelWidth="84px" required>
              <a-range-picker
                placeholder="请输入活动时间"
                @change="onDateChange"
              ></a-range-picker>
            </st-form-item>
            <st-form-item label="活动说明" labelWidth="84px" required>
              <a-textarea
                @change="getDescription"
                placeholder="请输入活动说明"
                v-decorator="decorators.activity_base.activity_description"
              ></a-textarea>
            </st-form-item>
            <st-form-item label="活动轮播获奖信息说明" labelWidth="84px">
              <a-radio-group
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
            <st-form-item label="分享设置" labelWidth="84px">
              <a-radio-group
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
            </st-form-item>
            <st-form-item label="" labelWidth="84px">
              <st-button type="primary" @click="next(1)">下一步</st-button>
            </st-form-item>
          </st-form>

          <st-form :form="form" labelGutter="0" v-show="currentIndex == 1">
            <st-form-item label="参与用户" labelWidth="84px" required>
              <a-select
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
            <st-form-item label="抽奖条件" labelWidth="84px" required>
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
            <st-form-item label=" 抽奖机会" labelWidth="84px" required>
              <a-radio-group
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
            </st-form-item>
            <st-form-item label=" 中奖次数" labelWidth="84px">
              每人最多可中奖
              <st-input-number
                @change="getPerTimes"
                style="width: 100px;"
                v-decorator="decorators.activity_rule.per_times"
              ></st-input-number>
              次
            </st-form-item>
            <st-form-item label="" labelWidth="84px">
              <st-button type="primary" @click="next(2)">下一步</st-button>
            </st-form-item>
          </st-form>
          <st-form v-show="currentIndex == 2">
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
            <st-form-item label="名称">
              <a-input
                placeholder="请输入奖品名称"
                v-decorator="decorators.activity_lucky.lucky_name"
              ></a-input>
            </st-form-item>
            <st-form-item label=" 图片">
              <a-radio-group>
                <a-radio
                  v-for="(item, index) in imgType"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
              <st-image-upload
                width="164px"
                height="164px"
                :list="fileList"
                @change="onChangeGetAvatar"
                :sizeLimit="2"
                placeholder="上传头像"
              ></st-image-upload>
            </st-form-item>
            <st-form-item label="" labelWidth="84px">
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
      animate: false,
      preview: {
        title: '',
        startTime: '',
        endTime: '',
        perTimes: 0,
        description: ''
      },
      fileList: [],
      prizeList: [],
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
      currentIndex: 0
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
      crowd: this.addService.crowd$,
      imgType: this.addService.imgType$
    }
  },
  modals: {
    BrandMarketingPluginAddPrize
  },
  components: {
    H5Container,
    Steps
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
            'activity_base.share_title'
          ])
          .then(() => {
            this.currentIndex = para
          })
      }
      if (para === 2) {
        this.form
          .validate([
            'activity_rule.crowd_id',
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
    },
    onSubmit() {
      this.form.validate().then(value => {
        value.activity_base.start_time = this.preview.startTime
        value.activity_base.end_time = this.preview.endTime
        value.activity_prizes = this.prizeList
        // value.activity_lucky.lucky_image = this.fileList[0]
        this.addService.add(value).subscribe(res => {})
      })
    },
    getTitle(e) {
      this.preview.title = e.target.value
    },
    getPerTimes(e) {
      this.preview.perTimes = e.target.value
    },
    getDescription(e) {
      this.preview.description = e.target.value
    },
    refresh() {},
    onDateChange(data, str) {
      this.preview.startTime = str[0]
      this.preview.endTime = str[1]
    },
    getPrizeInfo(val) {
      this.prizeList.push(val)
      if (this.prizeList.length >= 3) {
      }
    },
    onDelete(para) {
      this.prizeList = this.prizeList.filter(item => {
        return item.prize_name !== para
      })
    },
    editVIew(id) {
      return this.addService.editVIew(id).subscribe(res => {})
    }
  }
}
</script>
