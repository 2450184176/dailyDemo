<template>
  <div class="mapDiv">
    <div id="container"></div>
  </div>
</template>

<script>

export default {
  name: 'googleMap',
  data() {
    return {
      map: '',
    }
  },
  components: {},
  created() {},
  destroyed() {},
  methods: {},
  mounted () {
    this.$nextTick(() => {
      const map = new AMap.Map("container", {
        resizeEnable: true
      });
      const placeSearch = new AMap.PlaceSearch({
        city: 'beijing', // 兴趣点城市
        citylimit: true,  //是否强制限制在设置的城市内搜索
        pageSize: 10, // 单页显示结果条数
        children: 0, //不展示子节点数据
        pageIndex: 1, //页码
        extensions: 'base' //返回基本地址信息
      });
      //详情查询
      placeSearch.getDetails("B000A83U0P", (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          placeSearch_CallBack(result);
        }
      });
      const infoWindow = new AMap.InfoWindow({
        autoMove: true,
        offset: {x: 0, y: -30}
      });
      //回调函数
      function placeSearch_CallBack(data) {
        let poiArr = data.poiList.pois;
        //添加marker
        let marker = new AMap.Marker({
          map: map,
          position: poiArr[0].location
        });
        map.setCenter(marker.getPosition());
        infoWindow.setContent(createContent(poiArr[0]));
        infoWindow.open(map, marker.getPosition());
      }
      function createContent(poi) {  //信息窗体内容
        let s = [];
        s.push("<b>名称：" + poi.name+"</b>");
        s.push("地址：" + poi.address);
        s.push("电话：" + poi.tel);
        s.push("类型：" + poi.type);
        return s.join("<br>");
      }
    });
  },
  watch: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #container {
    margin: 50px;
    height: 500px;
    width: 90%;
    border-radius: 4px;
  }
</style>
