<template>
    <div style="padding: 24px">
        <header>
            <div class="headerbutton">
                <div style="display: inline-block" >
                    <h2>请完善您的基本信息</h2><h5>PELEASE IMPROVE YOUR BASIC INFORMATION</h5>
                </div>
            </div>
            <div style="background: #f8f8f8;padding: 1rem">
                <span style="color: red;font-size: 1rem">*为必填项</span>
            </div>
        </header>
        <section>
            <div class="rowstyle">
                <span class="fontstyle justifyfont" >
                    姓 名
                </span>
                <Input size="large" style="width: 208px;margin-right: 5rem" v-model="idname"/>
                <span class="fontstyle">
                     <span class="star">*</span>
                    年 龄(岁)
                </span>
                <Input size="large" style="width: 208px;" v-model="age"/>
            </div>
            <div class="rowstyle">
                <span class="fontstyle justifyfont">
                    性 别
                </span>
                <Select v-model="model1" style="width:208px;margin-right: 5rem" size="large" >
                <Option v-for="item in sex" :value="item" :key="item">{{ item }}</Option>
                </Select>
                <span class="fontstyle"> 婚 姻 状 况</span>
                <Select v-model="model2" style="width:208px" size="large">
                    <Option v-for="item in marriage" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </div>
            <div class="rowstyle">
                <span class="fontstyle justifyfont">
                    民 族
                </span>
                <Select v-model="model3" style="width:208px;margin-right: 5rem" size="large" >
                    <Option v-for="item in nation" :value="item" :key="item">{{ item }}</Option>
                </Select>
                <span class="fontstyle">
                    <span class="star">*</span>
                    联系电话
                </span>
                <Input size="large" style="width: 208px;" v-model="mobilephone"/>
            </div>
            <div class="rowstyle">
                <span class="fontstyle">文 化 程 度</span>
                <Select v-model="modal4" style="width:208px;margin-right: 5rem" size="large" >
                    <Option v-for="item in education" :value="item" :key="item">{{ item }}</Option>
                </Select>
                <span class="fontstyle">职 业 类 型</span>
                <Select v-model="modal5" style="width:208px" size="large">
                    <Option v-for="item in job" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </div>
            <div class="rowstyle" style="position: relative">
                <span class="fontstyle">身 高 (c m)</span>
                <Input size="large" style="width: 200px;margin-right: 5rem" v-model="Height">
                <span slot="prepend"><Icon type="md-add" @click.native="Height+= 1"/></span>
                <span slot="append"><Icon type="md-remove" @click.native="Height > 0 ? Height -=1 : Height =0 "/></span>
                </Input>
                <span class="fontstyle">体 重 (k g)</span>
                <Input size="large" style="width: 200px;" v-model="Weight">
                <span slot="prepend"><Icon type="md-add" @click.native="Weight+= 1"/></span>
                <span slot="append"><Icon type="md-remove" @click.native="Weight > 0 ? Weight -=1 : Weight =0 "/></span>
                </Input>
            </div>
            <div class="rowstyle">
                <span class="fontstyle">BMI 计 算</span>
                <Input size="large" style="width: 208px;margin-right: 5rem" v-model="BMI"/>
                <span class="fontstyle">身 份 证 号</span>
                <Input size="large" style="width: 208px;" v-model="idnum"/>
                <!-- <input type="file" accept="image/*" capture="camera"> -->
            </div>
        </section>
        <footer style="margin-top: 5rem;text-align: center">
            <Button type="primary" size="large" @click.native="subpersoninfo">确认信息</Button>
        </footer>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { saveUserInfo } from '../../service/service';

export default {
  name: 'personinfo',
  data() {
    return {
      model1: '',
      model2: '',
      model3: '',
      modal4: 0,
      modal5: '',
      Height: 0,
      mobilephone: '',
      camerastring: '',
      Weight: 0,
      idnum: '',
      idname: '',
      sex: ['男', '女'],
      marriage: ['已婚', '未婚', '未知'],
      nation: [
        '汉族',
        '壮族',
        '满族',
        '回族',
        '苗族',
        '维吾尔族',
        '土家族',
        '彝族',
        '蒙古族',
        '藏族',
        '布依族',
        '侗族',
        '瑶族',
        '朝鲜族',
        '白族',
        '哈尼族',
        '哈萨克族',
        '黎族',
        '傣族',
        '畲族',
        '傈僳族',
        '仡佬族',
        '东乡族',
        '高山族',
        '拉祜族',
        '水族',
        '佤族',
        '纳西族',
        '羌族',
        '土族',
        '仫佬族',
        '锡伯族',
        '柯尔克孜族',
        '达斡尔族',
        '景颇族',
        '毛南族',
        '撒拉族',
        '布朗族',
        '塔吉克族',
        '阿昌族',
        '普米族',
        '鄂温克族',
        '怒族',
        '京族',
        '基诺族',
        '德昂族',
        '保安族',
        '俄罗斯族',
        '裕固族',
        '乌孜别克族',
        '门巴族',
        '鄂伦春族',
        '独龙族',
        '塔塔尔族',
        '赫哲族',
        '珞巴族',
      ],
      education: [
        '小学',
        '初中',
      ],
      job: [
        '工人',
        '教师',
      ],
    };
  },
  computed: {
    ...mapState(['personinfo']),
    BMI: {
      get() {
        if (this.Height === 0) { return 0; }
        return (this.Weight / ((this.Height / 100) * (this.Height / 100))).toFixed(2);
      },
    },
  },
  methods: {
    ...mapMutations(['PERSONINFO']),
    subpersoninfo() {
      const userinfo = {
        zjbh00: this.idnum,
        xm0000: this.idname,
        xb0000: this.modal1 === '男' ? '1' : '2',
        dhhm00: this.mobilephone,
        nl0000: this.age,
        hyzk00: this.modal2,
        mz0000: this.modal3,
        whcd00: '',
        zylb00: '',
        csrq00: '',
        dz0000: '',
        yxrqks: '',
        yxrqjs: '',
        fzjg00: '',
        tz0000: this.Weight,
        sg0000: this.Height,
        bmi000: !this.BMI === true ? 0 : this.BMI,
        zp0000: '',
        dept00: '',
        career: '',
      };
      saveUserInfo(JSON.stringify(userinfo)).then(response => response.json()).then((res) => {
        if (res.errorcode === '00') {
          this.$Message.success({ content: res.message });
          this.PERSONINFO(userinfo);
        } else {
          this.$Message.success({ content: res.message });
        }
      });
    },
  },
};
</script>

<style scoped>
.rowstyle1{
    margin-top: 3vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.justifyfont{
    height: 1.5rem;
}
.justifyfont1{
    height: 3rem;
}
.star{
    color: red;
}
@media screen and (max-width: 768px) {
    .star{
        margin-left: -1rem;
    }
}
.justifyfont::after{
     content: '';
     height: 1px;
     width: 100%;
     display: inline-block;
}
.justifyfont1::after{
     content: '';
     height: 1px;
     width: 100%;
     display: inline-block;
}
.fontstyle{
    width: 5rem;
    text-align: justify;
    margin-right: 0.5rem;
}

</style>
