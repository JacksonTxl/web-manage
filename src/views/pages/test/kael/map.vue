<template>
  <st-panel app>
    <div class="kael-map">
      <div>
        <input id="keyword" type="textbox" value="酒店">
        <a-button type="primary" @click="searchKeyword">搜索1111</a-button>
      </div>
      <div style="width:603px;height:300px" id="container"></div>
      <div style="width: 500px; height: 180px" id="infoDiv"></div>
    </div>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      searchService: [],
      markers: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let that = this
      var center = new qq.maps.LatLng(31.230350, 121.473720)
      var map = new qq.maps.Map(document.getElementById('container'), {
        center: center,
        zoom: 13
      })

      // var latlngBounds = new qq.maps.LatLngBounds()
      // 设置Poi检索服务，用于本地检索、周边检索
      that.searchService = new qq.maps.SearchService({
        location: '上海',
        pageIndex: 1,
        pageCapacity: 5,
        panel: document.getElementById('infoDiv'),
        autoExtend: true,
        complete: function(results) {
          console.log(results)
          // 设置回调函数参数
          // var pois = results.detail.pois
          // for (var i = 0, l = pois.length; i < l; i++) {
          //   var poi = pois[i]
          //   //扩展边界范围，用来包含搜索到的Poi点
          //   latlngBounds.extend(poi.latLng)
          //   var marker = new qq.maps.Marker({
          //     map: map,
          //     position: poi.latLng
          //   })

          //   marker.setTitle(i + 1)

          //   that.markers.push(marker)
          // }
          // //调整地图视野
          // map.fitBounds(latlngBounds)
        },
        // 若服务请求失败，则运行以下函数
        error: function() {
          alert('出错了。')
        }
      })
    },
    // 清除地图上的marker
    clearOverlays(overlays) {
      var overlay
      while ((overlay = overlays.pop())) {
        overlay.setMap(null)
      }
    },
    // 设置搜索的范围和关键字等属性
    searchKeyword() {
      var keyword = document.getElementById('keyword').value
      // this.clearOverlays(this.markers)
      // 根据输入的城市设置搜索范围
      // searchService.setLocation("北京");
      // 根据输入的关键字在搜索范围内检索
      this.searchService.search('鸿元')
    }
  }
}
</script>
