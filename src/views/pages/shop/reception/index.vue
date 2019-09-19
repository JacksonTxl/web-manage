<template>
  <section :class="reception()">
    <div :class="reception('form-block')" class="mg-b12">
      <div
        :class="reception('form-block-item')"
        v-for="(item, index) in summaryList"
        :key="index"
      >
        <div :class="reception('form-block-detail')">
          <div :class="reception('form-block-number')">
            <p>{{ item.label }} ({{ item.unit }})</p>
            <ICountUp
              v-if="auth[item.type]"
              class="number-up font-number"
              :endVal="summaryInfo[item.type].num"
            />
            <span v-else>- -</span>
            <!-- <p>{{summaryInfo[item.type].num}}</p> -->
          </div>
          <div v-if="auth[item.type]" :class="reception('form-block-chart')">
            <front-simple-area
              :color="item.color"
              :unit="item.unit"
              :data="summaryInfo[item.type].stChart"
            ></front-simple-area>
          </div>
          <div v-else :class="reception('form-block-nonedata')"></div>
        </div>
        <div :class="reception('form-block-button')">
          <template v-if="auth[item.type] && item.version === 1">
            <span @click="onDetail(item.type)">查看详情</span>
            <st-icon @click="onDetail(item.type)" type="right-small" />
          </template>
          <span v-if="!auth[item.type]" disabled>暂无权限</span>
          <span v-if="item.version === 2" style="color:rgba(0,0,0,0)">
            暂无权限
          </span>
        </div>
      </div>
    </div>
    <div :class="reception('operation-list')" class="mg-b12">
      <template v-for="(item, index) in filterShortcutList">
        <div
          :class="reception('operation-item')"
          @click="onShortcut(item.id)"
          :disabled="!item.auth || item.version > RECEPTION.VERSION_1"
          :key="index"
        >
          <p>
            <st-icon :type="item.icon" />
          </p>
          <p>{{ item.label }}</p>
        </div>
        <div
          :class="reception('opertaion-line')"
          :key="~index"
          v-if="(index + 1) % shortcutList.length !== 0"
        ></div>
      </template>
    </div>
    <div :class="reception('member-todoist')">
      <div :class="reception('member')">
        <div :class="reception('member-search')">
          <a-select
            v-model="selectMember"
            :class="reception('member-search-select')"
            showSearch
            allowClear
            :showArrow="false"
            placeholder="检索姓名或手机号查找用户"
            :defaultActiveFirstOption="false"
            :filterOption="false"
            @select="onMemberSelect"
            @search="onMemberSearch"
          >
            <span slot="notFoundContent" v-if="isSearchNone">
              查无此用户，
              <a @click="onAddUser">添加新用户？</a>
            </span>
            <span slot="notFoundContent" v-else>无数据</span>
            <a-select-option v-for="item in memberList" :key="item.id">
              <span
                v-html="
                  `${item.member_name} ${item.mobile}`.replace(
                    new RegExp(lastMemberSearchText, 'g'),
                    `\<span class='global-highlight-color'\>${lastMemberSearchText}\<\/span\>`
                  )
                "
              >
                {{ item.member_name }} {{ item.mobile }}
              </span>
            </a-select-option>
          </a-select>
          <st-button
            type="primary"
            :loading="loading.setEntrance"
            @click="onEntry"
            :disabled="!isSelectMember || !auth.checkin"
            v-if="!isEntry"
          >
            入场
          </st-button>
          <st-button
            type="danger"
            :loading="loading.setEntranceLeave"
            @click="onLeave"
            v-else
            :disabled="!isSelectMember || !auth.checkout"
          >
            离场
          </st-button>
        </div>
        <div :class="reception('info')">
          <div :class="reception('personal-info')">
            <div>
              <st-info>
                <st-info-item label="名称">{{ memberName }}</st-info-item>
                <st-info-item label="手机号">{{ memberMobile }}</st-info-item>
                <st-info-item label="实体卡号">
                  {{ memberPhysicalCard }}
                </st-info-item>
                <st-info-item label="会员类型">{{ memberType }}</st-info-item>
                <st-info-item class="mg-b0" label="入场状态">
                  {{ memberEntryStatus }}
                </st-info-item>
              </st-info>
            </div>
            <div class="imgPlaceholder" v-if="!isSelectMember">
              <img src="~@/assets/img/reception_avatar_default.png" alt="" />
            </div>
            <face-upload
              :class="reception('upload')"
              width="180px"
              height="180px"
              placeholder="上传人脸"
              @change="photoChange"
              :list="photoList"
              v-else
            ></face-upload>
          </div>
          <div :class="reception('set-info')" v-if="!isEntry">
            <div class="set-info-item">
              <span class="set-info-label">入场凭证</span>
              <div class="set-info-select entrance-item">
                <a-select v-model="proof" style="width:100%">
                  <a-select-option
                    :value="-1"
                    v-if="!entranceOptionList.length"
                  >
                    无
                  </a-select-option>
                  <a-select-option
                    v-for="item in entranceOptionList"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div class="set-info-item" v-if="isSelectMember">
              <span class="set-info-label">跟进销售</span>
              <template v-if="!isEditSeller">
                <span class="set-info-value">
                  {{ selectMemberInfo.seller.name || '无' }}
                  <a @click="isEditSeller = true" v-if="auth.bindSalesman">
                    <st-icon type="edit"></st-icon>
                    &nbsp;编辑
                  </a>
                </span>
              </template>
              <template v-else>
                <a-select
                  v-model="seller"
                  @change="onSellerChange"
                  class="set-info-select mg-r8"
                >
                  <a-select-option :value="-1">无</a-select-option>
                  <a-select-option
                    v-for="item in sellerList"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <st-button
                  type="primary"
                  :loading="loading.editSeller"
                  @click="onEditSeller"
                >
                  确定
                </st-button>
                <a
                  class="set-info-edit-button mg-l8"
                  @click="onEditSellerCancel"
                >
                  取消
                </a>
              </template>
            </div>
            <div class="set-info-item" v-else>
              <span class="set-info-label">跟进销售</span>
              <span class="set-info-value">无</span>
            </div>
            <div class="set-info-item" v-if="isSelectMember">
              <span class="set-info-label">跟进教练</span>
              <template v-if="!isEditCoach">
                <span class="set-info-value">
                  {{ selectMemberInfo.coach.name || '无' }}
                  <a @click="isEditCoach = true" v-if="auth.bindCoach">
                    <st-icon type="edit"></st-icon>
                    &nbsp;编辑
                  </a>
                </span>
              </template>
              <template v-else>
                <a-select
                  v-model="coach"
                  @change="onCoachChange"
                  class="set-info-select mg-r8"
                >
                  <a-select-option :value="-1">无</a-select-option>
                  <a-select-option
                    v-for="item in coachList"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <st-button
                  type="primary"
                  :loading="loading.editCoach"
                  @click="onEditCoach"
                >
                  确定
                </st-button>
                <a
                  class="set-info-edit-button mg-l8"
                  @click="onEditCoachCancel"
                >
                  取消
                </a>
              </template>
            </div>
            <div class="set-info-item" v-else>
              <span class="set-info-label">跟进教练</span>
              <span class="set-info-value">无</span>
            </div>
            <div class="set-info-item">
              <span class="set-info-label">储物柜</span>
              <a-select
                showSearch
                placeholder="输入储物柜号搜索"
                optionFilterProp="children"
                v-model="cabinet"
                :filterOption="filterOption"
                class="set-info-select"
              >
                <a-select-option :value="-1">无</a-select-option>
                <a-select-option
                  v-for="item in stCabinetList"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
          </div>
          <div :class="reception('set-info')" v-else>
            <div class="set-info-item">
              <span class="set-info-label">入场凭证</span>
              <span class="set-info-value" v-if="selectMemberInfo.proof">
                {{ selectMemberInfo.proof.name }}
              </span>
            </div>
            <div class="set-info-item">
              <span class="set-info-label">跟进销售</span>
              <template v-if="!isEditSeller">
                <span class="set-info-value">
                  {{ selectMemberInfo.seller.name || '无' }}
                  <a @click="isEditSeller = true" v-if="auth.bindSalesman">
                    <st-icon type="edit"></st-icon>
                    &nbsp;编辑
                  </a>
                </span>
              </template>
              <template v-else>
                <a-select
                  v-model="seller"
                  @change="onSellerChange"
                  class="set-info-select mg-r8"
                >
                  <a-select-option :value="-1">无</a-select-option>
                  <a-select-option
                    v-for="item in sellerList"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <st-button
                  type="primary"
                  :loading="loading.editSeller"
                  @click="onEditSeller"
                >
                  确定
                </st-button>
                <a
                  class="set-info-edit-button mg-l8"
                  @click="onEditSellerCancel"
                >
                  取消
                </a>
              </template>
            </div>
            <div class="set-info-item">
              <span class="set-info-label">跟进教练</span>
              <template v-if="!isEditCoach">
                <span class="set-info-value">
                  {{ selectMemberInfo.coach.name || '无' }}
                  <a @click="isEditCoach = true" v-if="auth.bindCoach">
                    <st-icon type="edit"></st-icon>
                    &nbsp;编辑
                  </a>
                </span>
              </template>
              <template v-else>
                <a-select
                  v-model="coach"
                  @change="onCoachChange"
                  class="set-info-select mg-r8"
                >
                  <a-select-option :value="-1">无</a-select-option>
                  <a-select-option
                    v-for="item in coachList"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <st-button
                  type="primary"
                  :loading="loading.editCoach"
                  @click="onEditCoach"
                >
                  确定
                </st-button>
                <a
                  class="set-info-edit-button mg-l8"
                  @click="onEditCoachCancel"
                >
                  取消
                </a>
              </template>
            </div>
            <div class="set-info-item">
              <span class="set-info-label">储物柜</span>
              <template v-if="!isEditCabinet">
                <span class="set-info-value">
                  {{ selectMemberInfo.cabinet.name || '无' }}
                  <a @click="isEditCabinet = true">
                    <st-icon type="edit"></st-icon>
                    &nbsp;编辑
                  </a>
                </span>
              </template>
              <template v-else>
                <a-select v-model="cabinet" class="set-info-select mg-r8">
                  <a-select-option :value="-1">无</a-select-option>
                  <a-select-option
                    v-for="item in stCabinetList"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <st-button
                  type="primary"
                  :loading="loading.editEntranceCabinet"
                  @click="onEditCabinet"
                >
                  确定
                </st-button>
                <a
                  class="set-info-edit-button mg-l8"
                  @click="onEditCabinetCancel"
                >
                  取消
                </a>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div :class="reception('todoist')">
        <a-tabs defaultActiveKey="1" class="todoist-tabs">
          <a-tab-pane tab="待办" key="1" forceRender>
            <div :class="reception('todoist-to-do')">
              <st-button
                type="dashed"
                icon="add"
                @click="onAddWorkNotes"
                :disabled="!auth.addTodo"
                class="to-do-add"
              >
                添加待办
              </st-button>
              <ul :class="reception('todoist-to-do-list')" v-scrollBar>
                <li
                  v-for="(item, i) in workNoteList"
                  :key="i"
                  class="animated delay-f2s"
                  :class="{
                    fadeOut: i === animateIndex,
                    'mg-t12': i + 1 > 2,
                    'mg-r12': (i + 1) % 2 !== 0
                  }"
                >
                  <div class="to-do-main">
                    <template v-if="item.nickname">
                      <a-tooltip
                        overlayClassName="st-light-tooltip"
                        v-if="item.nickname.length > 2"
                      >
                        <template slot="title">
                          {{ item.nickname }}
                        </template>
                        <span class="operation-name cursor-pointer">
                          {{ item.nickname.substr(0, 2) }}
                        </span>
                      </a-tooltip>
                      <span class="operation-name cursor-pointer" v-else>
                        {{ item.nickname }}
                      </span>
                    </template>
                    <span class="operation-name cursor-pointer" v-else>无</span>
                    <p>
                      <span class="fw-600">
                        <a-tooltip
                          placement="topLeft"
                          overlayClassName="st-light-tooltip"
                        >
                          <template slot="title">
                            {{ item.subject }}
                          </template>
                          <span>{{ item.subject }}</span>
                        </a-tooltip>
                      </span>
                      <span>
                        <a-tooltip
                          placement="topLeft"
                          overlayClassName="st-light-tooltip"
                        >
                          <template slot="title">
                            {{ item.content }}
                          </template>
                          <span>{{ item.content }}</span>
                        </a-tooltip>
                      </span>
                    </p>
                  </div>
                  <div class="operation-time">
                    <span class="font-number">{{ item.created_time }}</span>
                    <st-button
                      class="to-do-button"
                      @click="onSetWorkNote(item, i)"
                    >
                      完成
                    </st-button>
                  </div>
                </li>
                <li
                  v-if="workNoteList.length % 2 !== 0"
                  class="mg-t12 none-item"
                ></li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="已完成" key="2" forceRender>
            <ul :class="reception('todoist-finish-list')" v-scrollBar>
              <li
                v-for="(item, i) in workNoteDoneList"
                :key="i"
                :class="{ 'mg-t12': i + 1 > 2, 'mg-r12': (i + 1) % 2 !== 0 }"
              >
                <div class="finish-main">
                  <template v-if="item.nickname">
                    <a-tooltip
                      overlayClassName="st-light-tooltip"
                      v-if="item.nickname.length > 2"
                    >
                      <template slot="title">
                        {{ item.nickname }}
                      </template>
                      <span class="operation-name cursor-pointer">
                        {{ item.nickname.substr(0, 2) }}
                      </span>
                    </a-tooltip>
                    <span class="operation-name cursor-pointer" v-else>
                      {{ item.nickname }}
                    </span>
                  </template>
                  <span class="operation-name" v-else>无</span>
                  <p>
                    <span class="fw-600">
                      <a-tooltip
                        placement="topLeft"
                        overlayClassName="st-light-tooltip"
                      >
                        <template slot="title">
                          {{ item.subject }}
                        </template>
                        <span>{{ item.subject }}</span>
                      </a-tooltip>
                    </span>
                    <span>
                      <a-tooltip
                        placement="topLeft"
                        overlayClassName="st-light-tooltip"
                      >
                        <template slot="title">
                          {{ item.content }}
                        </template>
                        <span>{{ item.content }}</span>
                      </a-tooltip>
                    </span>
                  </p>
                </div>
                <div class="operation-time">
                  <span class="font-number">{{ item.updated_time }}</span>
                  <span class="finish-status">已完成</span>
                </div>
              </li>
              <li
                v-if="workNoteDoneList.length % 2 !== 0"
                class="mg-t12 none-item"
              ></li>
            </ul>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </section>
</template>
<script>
import { IndexService } from './index.service'
import { cloneDeep } from 'lodash-es'
import moment from 'moment'
import { timer } from 'rxjs'
import FrontSimpleArea from '@/views/biz-components/stat/front-simple-area'
import FrontAddMember from '@/views/biz-modals/front/add-member'
import FrontAddWorkNote from '@/views/biz-modals/front/add-work-note'
import FaceUpload from '@/views/biz-components/face-upload/face-upload'
import { summaryList, shortcutList } from './index.config'
import { RECEPTION } from '@/constants/reception/reception'
export default {
  name: 'PageShopReception',
  bem: {
    reception: 'page-shop-reception'
  },
  modals: {
    FrontAddMember,
    FrontAddWorkNote
  },
  serviceInject() {
    return {
      indexService: IndexService
    }
  },
  rxState() {
    return {
      auth: this.indexService.auth$,
      entranceOptionList: this.indexService.entranceOptionList$,
      cabinetList: this.indexService.cabinetList$,
      summaryInfo: this.indexService.summaryInfo$,
      coachList: this.indexService.coachList$,
      sellerList: this.indexService.sellerList$,
      memberList: this.indexService.memberList$,
      workNoteList: this.indexService.workNoteList$,
      workNoteDoneList: this.indexService.workNoteDoneList$,
      loading: this.indexService.loading$
    }
  },
  components: {
    FrontSimpleArea,
    FaceUpload
  },
  data() {
    return {
      RECEPTION,
      // 根据权限处理后的快捷操作列表
      filterShortcutList: [],
      // 搜索会员的关键字
      memberSearchText: '',
      // 搜索会员的最后一次关键字
      lastMemberSearchText: '',
      // 选择的会员
      selectMember: undefined,
      // memberId
      memberId: undefined,
      // 会员信息
      selectMemberInfo: {},
      // 入场凭证
      proof: -1,
      // 是否编辑销售
      isEditSeller: false,
      // 入场选择销售
      seller: -1,
      // 是否编辑教练
      isEditCoach: false,
      // 入场选择教练
      coach: -1,
      // 储物柜
      cabinet: -1,
      // 是否编辑储物柜
      isEditCabinet: false,
      // 头像
      photoList: [],
      // 待办animate动画index
      animateIndex: 9999999999,
      stCabinetList: []
    }
  },
  computed: {
    // 会员列表是否未搜索到
    summaryList,
    shortcutList,
    isSearchNone() {
      return this.memberSearchText !== '' && !this.memberList.length
    },
    // 是否已入场
    isEntry() {
      return (
        !!this.isSelectMember &&
        this.selectMemberInfo.entry_status &&
        +this.selectMemberInfo.entry_status.value === 1
      )
    },
    // 是否确定了会员
    isSelectMember() {
      return this.selectMemberInfo.entry_status && this.memberId
    },
    // 会员名称
    memberName() {
      return this.isSelectMember ? this.selectMemberInfo.member_name : '无'
    },
    // 会员手机号
    memberMobile() {
      return this.isSelectMember ? this.selectMemberInfo.mobile : '无'
    },
    // 会员实体卡号
    memberPhysicalCard() {
      return this.isSelectMember ? this.selectMemberInfo.physical_card : '无'
    },
    // 会员类型
    memberType() {
      return this.isSelectMember && this.selectMemberInfo.member_type
        ? this.selectMemberInfo.member_type.name
        : '无'
    },
    // 会员入场状态
    memberEntryStatus() {
      return this.isSelectMember && this.selectMemberInfo.entry_status
        ? this.selectMemberInfo.entry_status.name
        : '无'
    }
  },
  watch: {
    entranceOptionList: {
      deep: true,
      handler(newVal) {
        this.proof = newVal.length ? newVal[0].id : -1
      }
    }
  },
  created() {
    this.indexService.resetEntranceOptionList()
  },
  mounted() {
    this.init()
  },
  methods: {
    photoChange(list) {
      this.indexService
        .editFace(this.memberId, {
          image_face: list[0]
        })
        .subscribe(res => {
          this.getMemberInfo(this.memberId)
        })
    },
    init() {
      this.formatShortcutList()
      this.seller = this.selectMemberInfo.seller
        ? this.selectMemberInfo.seller.id || -1
        : -1
      this.coach = this.selectMemberInfo.coach
        ? this.selectMemberInfo.coach.id || -1
        : -1
    },
    formatShortcutList() {
      this.shortcutList.forEach(i => {
        i.auth = this.auth[i.id]
      })
      let trueArray = []
      let falseArray = []
      trueArray = this.shortcutList.filter(
        i => this.auth[i.id] && i.version === 1
      )
      falseArray = this.shortcutList.filter(
        i => !this.auth[i.id] || i.version > this.RECEPTION.VERSION_1
      )
      this.filterShortcutList = cloneDeep([...trueArray, ...falseArray])
    },
    // 储物柜下拉名称搜索
    filterOption(input, option) {
      return option.componentOptions.children[0].text.includes(input)
    },
    // 查看详情
    onDetail(type) {
      switch (type) {
        case 'today_order':
          this.$router.push({
            path: '/shop/finance/order/list',
            query: {
              start_date: `${moment().format('YYYY-MM-DD')}`,
              end_date: `${moment().format('YYYY-MM-DD')}`
            }
          })
          break
        case 'today_team_course':
          this.$router.push({
            name: 'shop-product-course-schedule-team',
            query: {
              start_date: `${moment().format('YYYY-MM-DD')}`,
              end_date: `${moment()
                .add(1, 'd')
                .format('YYYY-MM-DD')}`
            },
            params: {
              today: true
            }
          })
          break
        case 'today_entry':
          this.$router.push({
            path: '/shop/reception/entrance'
          })
          break
      }
    },
    // 快捷操作
    onShortcut(data) {
      switch (data) {
        case 'checkInPage':
          this.$router.push({ path: '/shop/reception/entrance' })
          break
        case 'orderPage':
          this.$router.push({ path: '/shop/sold/transaction/list' })
          break
        case 'schedulePage':
          this.$router.push({ path: '/shop/product/course/schedule/team' })
          break
        case 'reservePage':
          this.$router.push({ path: '/shop/reception/visiting' })
          break
      }
    },
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data.trim()
      if (data.trim() !== '') {
        this.lastMemberSearchText = data.trim()
        this.indexService.memberListAction$.dispatch({
          keyword: data
        })
      }
    },
    // 选择了会员
    onMemberSelect(data) {
      this.selectMember = data
      this.memberId = data
      this.getMemberInfo(data)
    },
    // 获取会员详情
    getMemberInfo(id) {
      this.indexService.getMemberInfo(id).subscribe(res => {
        this.selectMemberInfo = cloneDeep(res.info)
        this.indexService.getEntranceOptionList(id).subscribe()
        this.indexService.getCabinetList(id).subscribe(() => {
          this.stCabinetList =
            this.selectMemberInfo.cabinet && this.selectMemberInfo.cabinet.id
              ? [this.selectMemberInfo.cabinet, ...this.cabinetList]
              : cloneDeep(this.cabinetList)
        })
        this.seller = res.info.seller.id || -1
        this.coach = res.info.coach.id || -1
        this.cabinet = res.info.cabinet.id || -1
        this.photoList = !Array.isArray(res.info.face_url)
          ? [res.info.face_url]
          : []
      })
    },
    // 添加会员
    onAddUser() {
      this.$modalRouter.push({
        name: 'front-add-member',
        on: {
          success: res => {
            this.onMemberSelect(res.id)
            this.onMemberSearch(res.name)
          }
        }
      })
    },
    onSellerChange(data) {
      // this.selectMemberInfo.seller.id = data
      // this.selectMemberInfo.seller.name = this.sellerList.filter(i=>i.id===data)[0].name
    },
    // 修改销售
    onEditSeller() {
      this.indexService
        .editSeller({
          member_id: this.memberId,
          seller_id: this.seller === -1 ? 0 : this.seller
        })
        .subscribe(res => {
          this.isEditSeller = false
          if (this.seller === -1) {
            this.selectMemberInfo.seller = {}
          } else {
            this.selectMemberInfo.seller.id = this.seller
            this.selectMemberInfo.seller.name = this.sellerList.filter(
              i => i.id === this.seller
            )[0].name
          }
        })
    },
    onEditSellerCancel() {
      this.isEditSeller = false
      this.seller = this.selectMemberInfo.seller.id || -1
    },
    onCoachChange(data) {
      // this.selectMemberInfo.cocah.id = data
      // this.selectMemberInfo.cocah.name = this.coachList.filter(i=>i.id===data)[0].name
    },
    // 修改教练
    onEditCoach() {
      this.indexService
        .editCoach({
          member_id: +this.memberId,
          coach_id: this.coach === -1 ? 0 : this.coach
        })
        .subscribe(res => {
          this.isEditCoach = false
          if (this.coach === -1) {
            this.selectMemberInfo.coach = {}
          } else {
            this.selectMemberInfo.coach.id = this.coach
            this.selectMemberInfo.coach.name = this.coachList.filter(
              i => i.id === this.coach
            )[0].name
          }
        })
    },
    onEditCoachCancel() {
      this.isEditCoach = false
      this.coach = this.selectMemberInfo.coach.id || -1
    },
    onEditCabinetCancel() {
      this.isEditCabinet = false
      this.cabinet = this.selectMemberInfo.cabinet.id || -1
    },
    // 添加待办
    onAddWorkNotes() {
      this.$modalRouter.push({
        name: 'front-add-work-note',
        on: {
          success: () => {
            this.indexService.getWorkNoteList().subscribe()
          }
        }
      })
    },
    // 入场
    onEntry() {
      let cabinet_id = this.cabinet === -1 ? undefined : +this.cabinet
      let proof_type = this.entranceOptionList.filter(
        i => i.id === this.proof
      )[0].proof_type
      let proof_value = +this.proof
      let seller_id = this.seller === -1 ? undefined : +this.seller
      let coach_id = this.coach === -1 ? undefined : +this.coach
      this.indexService
        .setEntrance({
          member_id: +this.memberId,
          cabinet_id,
          proof_type,
          proof_value,
          seller_id,
          coach_id
        })
        .subscribe(res => {
          this.selectMemberInfo = cloneDeep(res.info)
          this.cabinet = res.info.cabinet.id || -1
          document.activeElement.blur() // 移除焦点元素
        })
    },
    // 离场
    onLeave() {
      this.indexService.setEntranceLeave(this.memberId).subscribe(res => {
        this.selectMember = undefined
        this.memberId = undefined
        this.selectMemberInfo = {}
        this.proof = -1
        this.seller = -1
        this.coach = -1
        this.cabinet = -1
        this.isEditCabinet = false
        this.indexService.resetEntranceOptionList()
        this.indexService.resetCabinetList()
      })
    },
    // 入场会员修改储物柜
    onEditCabinet() {
      let cabinet_id = this.cabinet === -1 ? 0 : +this.cabinet
      this.indexService
        .editEntranceCabinet({
          member_id: +this.memberId,
          cabinet_id
        })
        .subscribe(res => {
          if (this.cabinet === -1) {
            this.selectMemberInfo.cabinet = {}
          } else {
            let cabinetName = this.stCabinetList.filter(
              i => i.id === this.cabinet
            )[0].name
            this.selectMemberInfo.cabinet = {
              id: this.cabinet,
              name: cabinetName
            }
          }
          this.isEditCabinet = false
        })
    },
    // 完成待办
    onSetWorkNote(item, index) {
      this.$confirm({
        title: '完成待办',
        content: `确定完成${item.subject}吗？`,
        onOk: () => {
          return this.indexService
            .setWorkNote(item.id)
            .toPromise()
            .then(() => {
              this.animateIndex = index
              timer(800).subscribe(() => {
                this.animateIndex = 999999999
                this.indexService.getWorkNoteList().subscribe()
                this.indexService.getWorkNoteDoneList().subscribe()
              })
            })
        }
      })
    }
  }
}
</script>
