<template>
  <div>
    <club-component></club-component>
  </div>
</template>
<script>
import ClubComponent from '../dashboard#/club.component'
export default {
  name: 'DashboardClub',
  data() {
    return {
    }
  },
  components: {
    ClubComponent
  }
}
</script>
