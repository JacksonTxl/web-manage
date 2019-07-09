<template>
  <div>
    <club-component></club-component>
    <!-- <studio-component></studio-component> -->
  </div>
</template>
<script>
import ClubComponent from './dashboard#/club.component'
import StudioComponent from './dashboard#/studio.component'
export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  components: {
    ClubComponent
    // StudioComponent
  }
}
</script>
