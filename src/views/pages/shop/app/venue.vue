<template>
  <st-panel app :tabs="authTabs">
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { VenueService } from './venue.service'
export default {
  name: 'ShopAppVenue',
  serviceInject() {
    return {
      venueService: VenueService
    }
  },
  rxState() {
    return {
      authTabs: this.venueService.authTabs$
    }
  }
}
</script>
