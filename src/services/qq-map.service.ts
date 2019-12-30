import { Injectable } from 'vue-service-app'
import { Observable } from 'rxjs'
import { AppConfig } from '@/constants/config'

/**
 * 腾讯地图
 */
@Injectable()
export class QqMapService {
  isCreated = false
  lat = null
  lng = null
  mapObject = null
  markerObject = null
  constructor(private appConfig: AppConfig) {}
  init(params: any = {}) {
    this.lat = params.lat
    this.lng = params.lng
    return new Promise(resolve => {
      if (!this.isCreated) {
        this.create().then(() => {
          this.initMap()
          resolve()
        })
      } else {
        this.initMap()
        resolve()
      }
    })
  }
  create() {
    return new Promise(resolve => {
      // @ts-ignore
      window.initQqMap = () => {
        this.isCreated = true
        resolve()
      }
      const script = document.createElement('script')
      script.src = `https://map.qq.com/api/js?v=2.exp&key=${
        this.appConfig.QQ_MAP_KEY
      }&libraries=place&callback=initQqMap`
      // @ts-ignore
      document.head.appendChild(script)
    })
  }
  /**
   * 实例化地图
   */
  initMap() {
    // @ts-ignore
    let center = new qq.maps.LatLng(this.lat, this.lng)
    // @ts-ignore
    this.mapObject = new qq.maps.Map(document.getElementById('mapcontainer'), {
      center,
      zoom: 13,
      disableDefaultUI: true
    })
    this.resetMap(center)
  }
  /**
   * 重置地图
   * @param position
   */
  resetMap(position: any) {
    console.log('reset', position)
    // @ts-ignore
    let anchor = new qq.maps.Point(8, 16)
    // @ts-ignore
    let size = new qq.maps.Size(16, 16)
    // @ts-ignore
    let origin = new qq.maps.Point(0, 0)
    // @ts-ignore
    let icon = new qq.maps.MarkerImage(
      require('@/assets/img/map_location.png'),
      size,
      origin,
      anchor,
      size
    )
    // @ts-ignore
    this.markerObject && this.markerObject.setMap(null)
    // @ts-ignore
    this.markerObject = new qq.maps.Marker({
      position,
      icon: icon,
      // @ts-ignore
      animation: qq.maps.MarkerAnimation.DROP,
      map: this.mapObject
    })
    // @ts-ignore
    this.mapObject.panTo(position)
  }
  getLocation(url: string) {
    let index = 0
    let o$ = new Observable(observer => {
      index++
      const key = '__jsonp_callback' + index
      const script = document.createElement('script')
      script.src = url + key
      script.onerror = err => observer.error(err)
      // @ts-ignore
      window[key] = (response: any) => {
        // @ts-ignore
        script.parentNode.removeChild(script)
        // @ts-ignore
        delete window[key]
        observer.next(response)
        observer.complete()
      }

      document.getElementsByTagName('head')[0].appendChild(script)
      index = 0
    })
    return o$
  }
}
