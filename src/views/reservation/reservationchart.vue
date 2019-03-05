<template>
  <div>
    <div id="mychart" style="width: 500px;height: 500px"></div>
  </div>
</template>

<script>
import { getYysj } from '../../service/service';

export default {
  data() {
    return {
      reserdate: [],
    };
  },

  components: {},

  computed: {},

  mounted() {
    getYysj(`tjh000=${0}&yyid00=${this.hospital}`).then(response => response.json()).then((resp) => { this.reserdate = resp.responseEntity.entity; });
  },

  methods: {
    drawchart() {
      const myChart = this.$echarts.init(document.getElementById('mychart'));
      myChart.setOption({
        title: { text: '医院预约情况' },
        legend: {
          data: ['预约量'],
        },
        tootip: {},
        xAxis: {
          data: [this.$moment(this.reserdate[0].KDRQ00).format('dddd'), '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        },
        yAxis: {
        },
        series: [{
          name: '预约量',
          type: 'bar',
          color: 'blue',
          data: [
            this.reserdate[0].SYYYL0,
            this.reserdate[1].SYYYL0,
            this.reserdate[2].SYYYL0,
            this.reserdate[3].SYYYL0,
            this.reserdate[4].SYYYL0,
            this.reserdate[5].SYYYL0,
            this.reserdate[6].SYYYL0,
          ],
        }],
      });
    },
  },
};

</script>
<style lang='scss' scoped>
</style>
