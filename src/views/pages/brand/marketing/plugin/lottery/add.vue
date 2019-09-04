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
            <div :class="bPage('lottery-scroll')">
              <ul class="bg-scroll">
                <img
                  src="~@/assets/img/brand/marketing/lottery/start.png"
                  alt
                  class="notice-img"
                />
                <li
                  v-for="(item, i) in list"
                  :key="i"
                  ref="rollLi"
                  :class="{ anim: animate && i == 0 }"
                ></li>
              </ul>
            </div>
            <div :class="bPage('lottery-turntable')">
              <img
                class="img"
                src="~@/assets/img/brand/marketing/lottery/start.png"
                :class="['run-item-' + current]"
              />
              <!-- <img src="~@/assets/img/brand/marketing/lottery/start.png" alt /> -->
              <span @click="handleStart" class="start-btn"></span>
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
                v-decorator="decorators.activity_name"
              ></a-input>
            </st-form-item>
            <st-form-item label="活动标题" labelWidth="84px" required>
              <a-input
                placeholder="请输入活动标题"
                v-decorator="decorators.share_title"
              ></a-input>
            </st-form-item>
            <st-form-item label="活动时间" labelWidth="84px" required>
              <a-range-picker
                placeholder="请输入活动时间"
                v-decorator="decorators.share_title"
              ></a-range-picker>
            </st-form-item>
            <st-form-item label="活动说明" labelWidth="84px" required>
              <a-textarea
                placeholder="请输入活动说明"
                v-decorator="decorators.activity_description"
              ></a-textarea>
            </st-form-item>
            <st-form-item label="活动轮播获奖信息说明" labelWidth="84px">
              <a-radio-group v-decorator="decorators.wheel_turn_around">
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
              <a-radio-group v-decorator="decorators.wheel_share_default">
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
              <a-select></a-select>
            </st-form-item>
            <st-form-item label="抽奖条件" labelWidth="84px" required>
              <a-radio-group v-decorator="decorators.draw_condition">
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
              <a-radio-group v-decorator="decorators.draw_times_type">
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
              <st-input-number style="width: 100px;"></st-input-number>
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
                        name: 'finance-add-template',
                        on: { change: refresh }
                      }"
                    >
                      新增底薪模板
                    </st-button>
                  </td>
                </tr>
                <template v-for="item in list">
                  <tr :key="item.id">
                    <td>{{ item.template_name }}</td>
                    <td>{{ item.salary }}</td>
                    <td>
                      <template v-if="item.used == 0">
                        <span>{{ item.used }}</span>
                      </template>
                      <template v-if="item.used != 0">
                        <a
                          v-modal-link="{
                            name: 'finance-search-staff-list-salary',
                            props: { id: item.id }
                          }"
                        >
                          {{ item.used }}
                        </a>
                      </template>
                    </td>
                    <td>{{ item.created_time }}</td>
                    <td>
                      <st-table-actions>
                        <a
                          v-modal-link="{
                            name: 'finance-basic-template-edit',
                            props: { item: item },
                            on: { change: refresh }
                          }"
                        >
                          编辑
                        </a>
                        <a href="javascript:;" @click="onDelete(item.id)">
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
              <a-input placeholder="请输入活动名称"></a-input>
            </st-form-item>
            <st-form-item label=" 图片">
              <a-radio-group>
                <a-radio></a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label="" labelWidth="84px">
              <st-button type="primary">完成</st-button>
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
      initSpeed: 200, // 初始速度
      speed: null, // 变化速度
      diff: 20, // 速度变化的值，值越大，变化地越快
      award: {}, // 抽中的奖品
      awards: [
        // 奖品列表
        {
          id: 1,
          name: '潘多拉音箱'
        },
        {
          id: 2,
          name: '小酷M1耳机'
        },
        {
          id: 3,
          name: '酷狗VIP会员'
        },
        {
          id: 4,
          name: '8元话费'
        },
        {
          id: 5,
          name: '12元话费'
        },
        {
          id: 6,
          name: '谢谢参与'
        },
        {
          id: 7,
          name: '4元话费'
        },
        {
          id: 8,
          name: '谢谢参与'
        }
      ],
      time: 0, // 记录开始抽奖的时间
      current: 0, // 当前转动的位置
      isRuningLucky: false, // 是否正在抽奖
      list: [
        // 中奖号码
        {
          phone: '186****2336抽中0元话费'
        },
        {
          phone: '166****2336抽中1元话费'
        },
        {
          phone: '156****2336抽中2元话费'
        }
      ],
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
      // stepsSpan: 12
    }
  },
  bem: {
    bPage: 'brand-marketing-plugin-lottery-add'
  },
  serviceInject() {
    return {
      addService: AddService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      drawCondition: this.addService.drawCondition$,
      drawTimesType: this.addService.drawTimesType$,
      invitePoster: this.addService.invitePoster$,
      wheelDefault: this.addService.wheelDefault$,
      wheelTurnAround: this.addService.wheelTurnAround$
    }
  },
  components: {
    H5Container,
    Steps
  },
  created() {
    console.log(this.decorators)
  },
  mounted() {
    let scrollTimer = setInterval(this.scroll, 2000)
  },
  methods: {
    next(para) {
      this.form.validate().then(() => {
        console.log(validate)
      })
      // this.currentIndex = para
    },
    getCurIndex(e) {
      let index = e.index.target.textContent - 1
      this.currentIndex = index >= 0 ? index : 0
    },
    refresh() {},
    // 抽奖
    handleStart() {
      if (this.isRuningLucky) {
        return this.message.success({ content: '抽奖中' })
      }
      if (isNaN(Number(this.initSpeed))) {
        return false
      }
      this.speed = this.initSpeed
      // 开始抽奖
      this.isRuningLucky = true
      this.time = Date.now()
      this.drawAward()
      Toast('开始抽奖')
    },
    drawAward() {
      // 请求接口，模拟一个抽奖数据(假设请求时间为2s)
      setTimeout(() => {
        this.award = {
          id: '4'
        }
        console.log('返回的抽奖结果是', this.award)
      }, 2000)
      this.move()
    },
    move() {
      let timer = setTimeout(() => {
        this.current++
        if (this.current > 7) {
          this.current = 0
        }
        // 若抽中的奖品id存在，则开始减速转动
        if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
          console.log('奖品出来了')
          this.speed += this.diff // 转动减速

          // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来
          if (
            (Date.now() - this.time) / 1000 > 4 &&
            this.award.id == this.awards[this.current].id
          ) {
            clearTimeout(timer)
            setTimeout(() => {
              this.isRuningLucky = false
              this.message.success({ content: '编辑成功' })

              // 这里写停下来要执行的操作（弹出奖品框）
              Toast(
                '您抽中的奖品是' +
                  this.awards[this.current].name +
                  ',奖品id是' +
                  this.awards[this.current].id
              )
            }, 400)
            return
          }
          // 若抽中的奖品不存在，则加速转动
        } else {
          if (this.speed >= 50) {
            this.speed -= this.diff // 转动加速
          }
        }
        this.move()
      }, this.speed)
    },
    // 中奖名单滚动
    scroll() {
      this.animate = true
      let timer = setTimeout(() => {
        this.list.push(this.list[0])
        this.list.shift()
        this.animate = false
      }, 500)
    }
  }
}
</script>
