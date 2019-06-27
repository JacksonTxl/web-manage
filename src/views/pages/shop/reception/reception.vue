<template>
  <section :class="reception()">
    <div :class="reception('form-block')" class="mg-b24">
      <div :class="reception('form-block-item')" v-for="(item,index) in summaryList" :key="index">
        <div :class="reception('form-block-detail')">
          <div :class="reception('form-block-number')">
            <p>{{item.label}}（{{item.unit}}）</p>
            <ICountUp class="number-up" :endVal="summaryInfo[item.type].num"/>
            <!-- <p>{{summaryInfo[item.type].num}}</p> -->
          </div>
          <div :class="reception('form-block-chart')" :style="`background:hsl(${Date.now()*index%360},50%,50%)`"></div>
        </div>
        <div :class="reception('form-block-button')">
          <span>查看详情</span>
          <st-icon type="right-small"/>
        </div>
      </div>
    </div>
    <div :class="reception('operation-list')" class="mg-b24">
      <template v-for="(item,index) in shortcutList">
        <div :class="reception('operation-item')" :key="index">
          <p>
            <st-icon :type="item.icon"/>
          </p>
          <p>{{item.label}}</p>
        </div>
        <div :class="reception('opertaion-line')" :key="~index" v-if="(index+1)%shortcutList.length!==0"></div>
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
            <span slot="notFoundContent" v-if="isSearchNone">查无此用户，<a @click="onAddUser">添加新用户？</a></span>
            <span slot="notFoundContent" v-else>无数据</span>
            <a-select-option
            v-for="(item) in memberList"
            :key="item.id">
              <span v-html="`${item.member_name}&nbsp;&nbsp;&nbsp;${item.mobile}`.replace(new RegExp(lastMemberSearchText,'g'),`\<span class='global-highlight-color'\>${lastMemberSearchText}\<\/span\>`)">
                {{item.member_name}}&nbsp;&nbsp;&nbsp;{{item.mobile}}
              </span>
            </a-select-option>
          </a-select>
          <st-button type="primary" :loading="loading.setEntrance" @click="onEntry" :disabled="!isSelectMember" v-if="!isEntry">入场</st-button>
          <st-button type="danger" :loading="loading.setEntranceLeave" @click="onLeave" v-else :disabled="!isSelectMember">离场</st-button>
        </div>
        <div :class="reception('info')">
          <div :class="reception('personal-info')">
            <div>
              <st-info>
                <st-info-item label="名称">{{memberName}}</st-info-item>
                <st-info-item label="手机号">{{memberMobile}}</st-info-item>
                <st-info-item label="实体卡号">{{memberPhysicalCard}}</st-info-item>
                <st-info-item label="会员类型">{{memberType}}</st-info-item>
                <st-info-item class="mg-b0" label="入场状态">{{memberEntryStatus}}</st-info-item>
              </st-info>
            </div>
            <st-image-upload
            :class="reception('upload')"
            width="180px"
            height="180px"
            :list="photoList"></st-image-upload>
          </div>
          <div :class="reception('set-info')" v-if="!isEntry">
            <p>
              <span class="set-info-label">入场凭证</span>
              <a-select v-model="proof" class="set-info-select">
                <a-select-option :value="-1" v-if="!entranceOptionList.length">无</a-select-option>
                <a-select-option v-for="(item) in entranceOptionList" :value="item.id" :key="item.id">{{item.name}}</a-select-option>
              </a-select>
            </p>
            <p>
              <span class="set-info-label">跟进销售</span>
              <a-select v-model="seller" class="set-info-select">
                <a-select-option :value="-1">无</a-select-option>
                <a-select-option v-for="(item) in sellerList" :value="item.id" :key="item.id">{{item.name}}</a-select-option>
              </a-select>
            </p>
            <p>
              <span class="set-info-label">跟进教练</span>
              <a-select v-model="coach" class="set-info-select">
                <a-select-option :value="-1">无</a-select-option>
                <a-select-option v-for="(item) in coachList" :value="item.id" :key="item.id">{{item.name}}</a-select-option>
              </a-select>
            </p>
            <p>
              <span class="set-info-label">储物柜</span>
              <a-select v-model="cabinet" class="set-info-select">
                <a-select-option :value="-1">无</a-select-option>
                <a-select-option v-for="(item) in cabinetList" :value="item.id" :key="item.id">{{item.name}}</a-select-option>
              </a-select>
            </p>
          </div>
          <div :class="reception('set-info')" v-else>
            <st-info>
              <st-info-item label="入场凭证" v-if="selectMemberInfo.proof">{{selectMemberInfo.proof.name}}</st-info-item>
              <st-info-item label="跟进销售" v-if="selectMemberInfo.seller">{{selectMemberInfo.seller.name || '无'}}</st-info-item>
              <st-info-item label="跟进教练" v-if="selectMemberInfo.coach">{{selectMemberInfo.coach.name || '无'}}</st-info-item>
              <st-info-item label="储物柜" v-if="!isEditCabinet">
                <span v-if="selectMemberInfo.cabinet">{{selectMemberInfo.cabinet.name || '无'}}</span>
                &nbsp;&nbsp;
                <a @click="isEditCabinet=true">
                  <st-icon type="anticon:edit"></st-icon>&nbsp;
                  <span>编辑</span>
                </a>
              </st-info-item>
            </st-info>
            <p :class="reception('cabinet-edit')" v-if="isEditCabinet">
              <span class="set-info-edit-label">储物柜</span>
              <a-select v-model="cabinet" class="set-info-edit-select">
                <a-select-option :value="-1">无</a-select-option>
                <a-select-option v-for="(item) in cabinetList" :value="item.id" :key="item.id">{{item.name}}</a-select-option>
              </a-select>
              <st-button type="primary" :loading="loading.editEntranceCabinet" @click="onEditCabinet">确定</st-button>
              <a class="set-info-edit-button" @click="isEditCabinet=false">取消</a>
            </p>
          </div>
        </div>
      </div>
      <div :class="reception('todoist')">
        <a-tabs defaultActiveKey="1" class="todoist-tabs">
          <a-tab-pane tab="待办" key="1" forceRender>
            <div :class="reception('todoist-to-do')">
              <st-button icon="anticon:plus" type="dashed" @click="onAddWorkNotes" class="to-do-add">添加待办</st-button>
              <ul :class="reception('todoist-to-do-list')" v-scrollBar>
                <li v-for=" (item,i) in workNoteList" :key="i" :class="{'mg-t12':(i+1)>2,'mg-r12':(i+1)%2!==0}">
                  <div class="to-do-main">
                    <span class="operation-name" v-if="item.nickname">{{item.nickname.substr(0,2)}}</span>
                    <span class="operation-name" v-else>无</span>
                    <p>
                      <span>{{item.subject}}</span>
                      <span>{{item.content}}</span>
                    </p>
                  </div>
                  <div class="operation-time">
                    <span>{{item.created_time}}</span>
                    <st-button class="to-do-button" @click="onSetWorkNote(item)">完成</st-button>
                  </div>
                </li>
                <li v-if="workNoteList.length%2!==0" class="mg-t12 none-item"></li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="已完成" key="2" forceRender>
            <ul :class="reception('todoist-finish-list')" v-scrollBar>
              <li v-for=" (item,i) in workNoteDoneList" :key="i" :class="{'mg-t12':(i+1)>2,'mg-r12':(i+1)%2!==0}">
                <div class="finish-main">
                  <span class="operation-name" v-if="item.nickname">{{item.nickname.substr(0,2)}}</span>
                  <span class="operation-name" v-else>无</span>
                  <p>
                    <span>{{item.subject}}</span>
                    <span>{{item.content}}</span>
                  </p>
                </div>
                <div class="operation-time">
                  <span>{{item.updated_time}}</span>
                  <span class="finish-status">已完成</span>
                </div>
              </li>
              <li v-if="workNoteDoneList.length%2!==0" class="mg-t12 none-item"></li>
            </ul>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </section>
</template>
<script>
import { ReceptionService } from './reception.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'PageShopReception',
  bem: {
    reception: 'page-shop-reception'
  },
  serviceInject() {
    return {
      receptionService: ReceptionService
    }
  },
  rxState() {
    return {
      entranceOptionList: this.receptionService.entranceOptionList$,
      cabinetList: this.receptionService.cabinetList$,
      summaryInfo: this.receptionService.summaryInfo$,
      coachList: this.receptionService.coachList$,
      sellerList: this.receptionService.sellerList$,
      memberList: this.receptionService.memberList$,
      workNoteList: this.receptionService.workNoteList$,
      workNoteDoneList: this.receptionService.workNoteDoneList$,
      loading: this.receptionService.loading$
    }
  },
  data() {
    return {
      // 头部统计信息
      summaryList: [
        {
          label: '今日订单',
          type: 'today_order',
          unit: '单'
        }, {
          label: '今日预约',
          type: 'today_reserve',
          unit: '条'
        }, {
          label: '今日团课',
          type: 'today_team_course',
          unit: '节'
        }, {
          label: '今日收银',
          type: 'today_revenue',
          unit: '元'
        }, {
          label: '今日入场',
          type: 'today_entry',
          unit: '人'
        }
      ],
      // 快捷操作
      shortcutList: [
        {
          id: 1,
          icon: 'reception-create',
          label: '销售开单'
        },
        {
          id: 2,
          icon: 'reception-order',
          label: '预约管理'
        },
        {
          id: 3,
          icon: 'reception-customer',
          label: '入场管理'
        },
        {
          id: 4,
          icon: 'reception-advance',
          label: '定金押金'
        },
        {
          id: 5,
          icon: 'reception-course',
          label: '课程预约'
        },
        {
          id: 6,
          icon: 'reception-cabinet',
          label: '储物柜'
        },
        {
          id: 7,
          icon: 'reception-record',
          label: '预约到访'
        }
      ],
      // 搜索会员的关键字
      memberSearchText: '',
      // 搜索会员的最后一次关键字
      lastMemberSearchText: '',
      // 选择的会员
      selectMember: undefined,
      // 会员信息
      selectMemberInfo: {},
      // 入场凭证
      proof: -1,
      // 入场选择销售
      seller: -1,
      // 入场选择教练
      coach: -1,
      // 储物柜
      cabinet: -1,
      // 是否编辑储物柜
      isEditCabinet: false,
      // 头像
      photoList: []
    }
  },
  computed: {
    // 会员列表是否未搜索到
    isSearchNone() {
      return this.memberSearchText !== '' && !this.memberList.length
    },
    // 是否已入场
    isEntry() {
      return !!this.isSelectMember && this.selectMemberInfo.entry_status && +this.selectMemberInfo.entry_status.value === 1
    },
    // 是否确定了会员
    isSelectMember() {
      return this.selectMemberInfo.entry_status
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
      return this.isSelectMember && this.selectMemberInfo.member_type ? this.selectMemberInfo.member_type.name : '无'
    },
    // 会员入场状态
    memberEntryStatus() {
      return this.isSelectMember && this.selectMemberInfo.entry_status ? this.selectMemberInfo.entry_status.name : '无'
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
  methods: {
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data.trim()
      if (data.trim() !== '') {
        this.lastMemberSearchText = data.trim()
        this.receptionService.memberListAction$.dispatch({
          keyword: data
        })
      }
    },
    // 选择了会员
    onMemberSelect(data) {
      this.selectMember = data
      this.getMemberInfo(data)
    },
    // 获取会员详情
    getMemberInfo(id) {
      this.receptionService.getMemberInfo(id).subscribe(res => {
        this.selectMemberInfo = cloneDeep(res.info)
        this.receptionService.getEntranceOptionList(id).subscribe()
        this.receptionService.getCabinetList(id).subscribe()
      })
    },
    // 添加会员
    onAddUser() {
      this.$modalRouter.push({
        name: 'front-add-member',
        on: {
          success: res => {
            this.getMemberInfo(res.id)
            // this.onMemberSelect(res.id)
          }
        }
      })
    },
    // 添加待办
    onAddWorkNotes() {
      this.$modalRouter.push({
        name: 'front-add-work-note',
        on: {
          success: () => {
            this.receptionService.getWorkNoteList().subscribe()
          }
        }
      })
    },
    // 入场
    onEntry() {
      let cabinet_id = this.cabinet === -1 ? undefined : +this.cabinet
      let proof_type = this.entranceOptionList.filter(i => i.id === this.proof)[0].proof_type
      let proof_value = +this.proof
      let seller_id = this.seller === -1 ? undefined : +this.seller
      let coach_id = this.coach === -1 ? undefined : +this.coach
      this.receptionService.setEntrance({
        member_id: +this.selectMember,
        cabinet_id,
        proof_type,
        proof_value,
        seller_id,
        coach_id
      }).subscribe(res => {
        this.selectMemberInfo = cloneDeep(res.info)
        this.cabinet = res.info.cabinet.id || -1
      })
    },
    // 离场
    onLeave() {
      this.receptionService.setEntranceLeave(this.selectMemberInfo.id).subscribe(res => {
        this.selectMember = undefined
        this.selectMemberInfo = {}
        this.proof = -1
        this.seller = -1
        this.coach = -1
        this.cabinet = -1
        this.isEditCabinet = false
        this.receptionService.resetEntranceOptionList()
        this.receptionService.resetCabinetList()
      })
    },
    // 入场会员修改储物柜
    onEditCabinet() {
      let cabinet_id = this.cabinet === -1 ? undefined : +this.cabinet
      this.receptionService.editEntranceCabinet({
        id: this.selectMemberInfo.id,
        cabinet_id
      }).subscribe(res => {
        if (this.cabinet === -1) {
          this.selectMemberInfo.cabinet = {}
        } else {
          let cabinetName = this.cabinetList.filter(i => i.id === this.cabinet)[0].name
          this.selectMemberInfo.cabinet = {
            id: this.cabinet,
            name: cabinetName
          }
        }
        this.isEditCabinet = false
      })
    },
    // 完成待办
    onSetWorkNote(item) {
      this.$confirm({
        title: '完成待办',
        content: `确定完成${item.subject}吗？`,
        onOk: () => {
          return this.receptionService.setWorkNote(item.id).toPromise().then(() => {
            this.receptionService.getWorkNoteList().subscribe()
            this.receptionService.getWorkNoteDoneList().subscribe()
          })
        }
      })
    }
  }
}
</script>
