<template>
  <div :class="manage()">
    <div :class="left()">
      <st-t4>场馆列表</st-t4>
      <div :class="left('add')" v-if="auth.add" @click="onCLickAddVenue">
        <st-icon type="add"></st-icon>
        添加场馆
      </div>
      <ul :class="left('tree')">
        <li
          v-for="venue in venueList"
          :key="venue.id"
          @click="clickVenue(venue)"
          :class="[left('item'), { active: venue.active }]"
          :id="venue.id"
        >
          <span>{{ venue.venues_name }}</span>
          <st-more-dropdown :class="left('opreation')">
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
            <a-menu-item v-if="venue.auth['shop:product:venues|switch']">
              <span
                @click="onClickSwitchVenue(venue)"
                v-if="venue.area_status === AREA_STATUS.OFF"
              >
                开启场馆
              </span>
              <st-popconfirm
                v-if="venue.area_status === AREA_STATUS.ON"
                :title="'确认关闭场馆？'"
                @confirm="onClickSwitchVenue(venue)"
              >
                关闭场馆
              </st-popconfirm>
            </a-menu-item>
          </st-more-dropdown>
        </li>
      </ul>
    </div>
    <div :class="right()">
      <st-panel>
        <portal to="SHOP_APP_VENUE_MANAGE">
          <header>
            <span>可预约时间：{{ venueInfo.reserve_time }}</span>
            <span>
              每场时长：{{
                venueInfo.per_time | enumFilter('venues_reserve.reserve_time')
              }}
            </span>
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
    left: 'left',
    right: 'right'
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
  updated() {
    this.initActive()
  },
  created() {
    this.initActive()
  },
  methods: {
    initActive() {
      if (!this.venueList.length) return
      let id = +this.$searchQuery.id
      let area_id = +this.$searchQuery.area_id
      let index = -1
      if (id) index = this.venueList.findIndex(item => item.venues_id === id)
      if (area_id) index = this.venueList.findIndex(item => item.id === area_id)
      if (index < 0) {
        index = 0
        this.clickVenue(this.venueList[index])
        return
      }
      this.setActive(this.venueList[index])
    },
    setActive(venue) {
      this.venueList.forEach(item => (item.active = false))
      venue.active = true
      this.venueInfo = venue
      this.manageService.setPerTime(venue.per_time)
    },
    clickVenue(venue) {
      this.setActive(venue)
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
        query: { area_id: id }
      })
    },
    onClickDelVenue(id) {
      this.manageService.delVenue({ id }).subscribe(() => {
        this.manageService.getVenueList().subscribe(() => {
          if (!this.venueList.length) {
            this.venueInfo = {}
            this.$router.push({
              name: 'shop-app-venue-manage-list'
            })
          }
        })
      })
    },
    // TODO:
    onCLickAddVenue() {
      this.$router.push({
        name: 'shop-app-venue-manage-add',
        query: {
          id: this.venueInfo.venues_id
        }
      })
    }
  }
}
</script>
