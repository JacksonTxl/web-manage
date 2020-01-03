<template>
  <div :class="manage()">
    <div :class="manage('left')">
      <st-t4>场馆列表</st-t4>
      <div :class="left('add')" v-if="auth.add" @click="onCLickAddVenue">
        <st-icon type="add"></st-icon>
        添加场馆
      </div>
      <ul :class="left('tree')">
        <li
          v-for="(venue, index) in venueList"
          :key="venue.id"
          @click="clickVenue(venue, $event)"
          :class="[left('item'), { active: index === 0 }]"
          :id="venue.id"
        >
          <span>{{ venue.venues_name }}</span>
          <st-more-dropdown
            :class="[left('opreation'), { active: index === 0 }]"
          >
            <a-menu-item
              @click="onClickEditVenue(venue.id)"
              v-if="venue.auth['shop:product:venues|edit']"
            >
              编辑场馆
            </a-menu-item>
            <a-menu-item v-if="venue.auth['shop:product:venues|del']">
              <st-popconfirm
                :title="'一旦删除则无法恢复，确认删除？'"
                @confirm="onClickDelVenue(venue.id)"
              >
                删除场馆
              </st-popconfirm>
            </a-menu-item>
            <a-menu-item
              @click="onClickSwitchVenue(venue)"
              v-if="venue.auth['shop:product:venues|switch']"
            >
              {{ venue.area_status === AREA_STATUS.OFF ? '开启' : '关闭' }}场馆
            </a-menu-item>
          </st-more-dropdown>
        </li>
      </ul>
    </div>
    <div :class="manage('right')">
      <st-panel>
        <portal to="SHOP_APP_VENUE_MANAGE">
          <header>
            <span>可预约时间：{{ venueInfo.reserve_time }}</span>
            <span>每场时长：{{ venueInfo.per_time }}</span>
            <span>默认价格：{{ venueInfo.price }}</span>
            <span>
              状态：{{
                venueInfo.area_status | enumFilter('venues_reserve.area_status')
              }}
            </span>
          </header>
          <st-hr></st-hr>
        </portal>

        <router-view></router-view>
      </st-panel>
    </div>
  </div>
</template>
<script>
import { ManageService } from './manage.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { PatternService } from '@/services/pattern.service'
import BrandAppVenueBasicSetting from '@/views/biz-modals/brand/app/venue/basic-setting'
import { AREA_STATUS } from '@/constants/venue'
const baseBem = 'shop-app-venue-manage'
export default {
  bem: {
    manage: baseBem,
    left: `${baseBem}__left`,
    right: `${baseBem}__right`
  },
  serviceInject() {
    return {
      manageService: ManageService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      info: this.manageService.info$,
      systemInfo: this.manageService.systemInfo$,
      loading: this.manageService.loading$,
      venueList: this.manageService.venueList$,
      auth: this.manageService.auth$
    }
  },
  modals: {
    BrandAppVenueBasicSetting
  },
  data() {
    return {
      AREA_STATUS,
      venueInfo: {
        reserve_time: '',
        per_time: '',
        price: '',
        area_status: ''
      }
    }
  },
  computed: {
    isEdit() {
      return this.$searchQuery.type === 'edit'
    }
  },
  created() {
    // if (this.venueList.length) {
    //   this.venueInfo = this.venueList[0]
    // }
  },
  methods: {
    clickVenue(venue, e) {
      this.$nextTick().then(() => {
        const itemClassName = 'shop-app-venue-manage__left__item',
          opreationClassName = 'shop-app-venue-manage__left__opreation'
        const doms = document.querySelectorAll(`.${itemClassName}`)
        const Opreation = document.querySelectorAll(`.${opreationClassName}`)
        Opreation.forEach(dom => {
          dom.setAttribute('class', 'venue-opreation')
        })
        doms.forEach(dom => {
          dom.setAttribute('class', `${itemClassName} pd-y8  pd-x16`)
        })
        e.currentTarget
          .querySelector('.venue-opreation')
          .setAttribute('class', `${opreationClassName} active`)
        e.currentTarget.setAttribute(
          'class',
          `${itemClassName} active pd-y8  pd-x16`
        )
      })
      this.venueInfo = venue
      this.$router.push({
        name: 'shop-app-venue-manage-list',
        query: { id: venue.venues_id }
      })
    },
    onClickSwitchVenue(venue) {
      const params = {
        id: venue.id,
        status:
          venue.area_status === AREA_STATUS.ON
            ? AREA_STATUS.OFF
            : AREA_STATUS.ON
      }
      this.manageService.switchVenue(params).subscribe(() => {
        this.manageService.getVenueList().subscribe()
      })
    },
    onClickEditVenue(id) {
      this.$router.push({
        name: 'shop-app-venue-manage-edit',
        query: { id: id }
      })
    },
    onClickDelVenue(id) {
      this.manageService.delVenue({ id }).subscribe(() => {
        this.manageService.getVenueList().subscribe()
      })
    },
    onCLickAddVenue() {
      this.$router.push({
        name: 'shop-app-venue-manage-add',
        query: {
          id: this.$searchQuery.id
        }
      })
    },
    onChange() {
      this.$router.push({})
    },
    onEdit() {
      this.$router.push({
        query: {
          type: 'edit'
        }
      })
    },
    onCancel() {
      this.$router.push({
        query: {}
      })
    },
    inputCheck() {
      const info = this.info
      const brandName = info.brand_name
      const { pattern } = this
      if (!pattern.CN_EN_NUM_SPACE('1-20').test(brandName)) {
        this.tip('品牌名称支持20字以内的中英文和数字')
        return false
      }
      return true
    },
    tip(msg) {
      this.messageService.error({
        content: msg
      })
    }
  }
}
</script>
