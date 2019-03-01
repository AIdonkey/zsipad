<template>
    <div style="padding: 24px">
        <header>
            <div class="headerbutton">
                <div style="display: inline-block" >
                    <h2>问卷调查</h2><h5>QUESTIONNAIRE SURVEY</h5>
                </div>
            </div>
        </header>
        <div>
            <div class="breadcumb0">
                <div class="breadcontain">健康史</div>
            </div>
            <div class="breadcumb1">
                <!--<span class="breadcumb1"></span>-->
            </div>
            <div class="breadcumb2" :style="[medicalway >= 7? activestyle1: inactivestyle1]">

            </div>
            <div class="breadcumb" :style="[medicalway >= 7? activestyle: inactivestyle]">
                <div class="breadcontain" >生活习惯</div>
            </div>

            <div class="breadcumb1" :style="[medicalway >= 7? acitvestyle2: inactivestyle2]">
            </div>
            <div class="breadcumb2" :style="[medicalway >= 8? activestyle1: inactivestyle1]">

            </div>
            <div class="breadcumb" :style="[medicalway >= 8? activestyle: inactivestyle]">
                <div class="breadcontain">躯体症状</div>
            </div>

            <div class="breadcumb1" :style="[medicalway >= 8? activestyle2: inactivestyle2]">
            </div>
        </div>
        <div style="display: inline-block" v-for="i in 7" :key="i">
            <div class="linecumb" :style="[medicalway+1 >= i? '': inactivestyle]"></div>
            <div class="circlecumb" :style="[medicalway+1 >= i? '': inactivestyle]"></div>
        </div>
        <div>
            <div class="mhistory" v-for="(item, index) in medicalhistory" :key="item">
            <span v-show="index < 7">{{item}}</span>
        </div>
        <div class="questioncontent">
          <div>
            <div v-for="item in question" :key="item.id" class="questionline" v-show="(item.flag === undefined || item.flag === 0) && (item.idgf === undefined || item.idgf === medicalhistory[medicalway])">
                {{item.name}}
                <div class="questioncheck">
                    <Checkbox v-model="item1.check" v-for="item1 in item.answer" :key="item1.value" @change.native="changeanswer(item, $event, item1)">
                        {{item1.label}}
                    </Checkbox>
                </div>
            </div>
          </div>
            <div style='text-align:center;display:flex; flex-direction:row; justify-content: space-evenly;'>
              <div>
                <!-- <Icon type="md-arrow-back" style="position: absolute;
    top: 18rem;
    right: 5rem;" size="30"/>
    <Icon type="md-arrow-forward" style="position: absolute;
    top: 20rem;
    right: 5rem;" size="30"/> -->
                <Button @click="medicalway--" v-show="medicalway > 0" size="large" style="position: absolute;
    bottom: 5rem;
    right: 4rem;width:6rem" type="primary">上一题</Button>
                <Button @click="medicalway++" v-show="medicalway < medicalhistory.length-1" size="large" style="position: absolute;
    bottom: 2rem;
    right: 4rem;width:6rem"  type="primary">下一题</Button>
                <Button  v-show="medicalway === medicalhistory.length-1" size="large"  style="position: absolute;
    bottom: 2rem;
    right: 4rem;
    width:6rem" type="primary" @click.native="submitquestionnaire">提交问卷</Button>
              </div>
              
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'questionnaire',
  data() {
    return {
      medicalhistory: ['家族史', '现病史', '过敏史', '用药史', '手术史', '输血史', '个人史', '生活习惯', '躯体症状'],
      question: [
        {
          name: '1.您的父母或兄弟姐妹是否患有明确诊断的疾病？', id: 15, answer: [{ label: '是', value: '15:1:QA001:0', check: false }, { label: '否', value: '15:2:QA002:1', check: false }], idgf: '家族史',
        },
        {
          name: '请选择疾病的名称：（可多选）', id: 52, idf: '15:1:QA001:0', answer: [{ label: '高血压病', value: '52:105:QA105:1', check: false }, { label: '脑卒中', value: '52:106:QA106:1', check: false }, { label: '冠心病', value: '52:107:QA107:1', check: false }, { label: '外周血管病', value: '52:108:QA108:1', check: false }, { label: '心力衰竭', value: '52:109:QA109:1', check: false }, { label: '糖尿病', value: '52:110:QA110:1', check: false }, { label: '肥胖症', value: '52:111:QA111:1', check: false }, { label: '慢性肾脏疾病', value: '52:112:QA112:1', check: false }, { label: '慢性阻塞性肺病', value: '52:113:QA113:1', check: false }, { label: '骨质疏松', value: '52:114:QA114:1', check: false }, { label: '痛风', value: '52:115:QA115:1', check: false }, { label: '恶性肿瘤', value: '52:116:QA116:0', check: false }, { label: '风湿免疫性疾病', value: '52:117:QA117:1', check: false }, { label: '精神疾病', value: '52:118:QA118:1', check: false }, { label: '其他', value: '52:119:QA119:1', check: false }], multiple: 1, flag: 1, idgf: '家族史',
        },
        {
          name: '您的父亲是否在55岁、母亲在65岁之前患有上述疾病吗？', id: 53, idf: '15:1:QA001:0', answer: [{ label: '是', value: '53:120:QA120:1', check: false }, { label: '否', value: '53:121:QA121:1', check: false }], flag: 1, idgf: '家族史',
        },
        {
          name: '请确定所患的恶性肿瘤名称:', id: 54, idf: '52:116:QA116:0', answer: [{ label: '肺癌', value: '54:122:QA122:1', check: false }, { label: '肝癌', value: '54:123:QA123:1', check: false }, { label: '胃癌', value: '54:124:QA124:1', check: false }, { label: '食管癌', value: '54:125:QA125:1', check: false }, { label: '结直肠癌', value: '54:126:QA126:1', check: false }, { label: '白血病', value: '54:127:QA127:1', check: false }, { label: '脑瘤', value: '54:128:QA128:1', check: false }, { label: '乳腺癌', value: '54:129:QA129:1', check: false }, { label: '胰腺癌', value: '54:130:QA130:1', check: false }, { label: '骨癌', value: '54:131:QA131:1', check: false }, { label: '膀胱癌', value: '54:132:QA132:1', check: false }, { label: '鼻咽癌', value: '54:133:QA133:1', check: false }, { label: '宫颈癌', value: '54:134:QA134:1', check: false }, { label: '子宫癌', value: '54:135:QA135:1', check: false }, { label: '前列腺癌', value: '54:136:QA136:1', check: false }, { label: '卵巢癌', value: '54:137:QA137:1', check: false }, { label: '甲状腺癌', value: '54:138:QA138:1', check: false }, { label: '皮肤癌', value: '54:139:QA139:1', check: false }, { label: '其他', value: '54:140:QA140:1', check: false }], multiple: 1, flag: 1, idgf: '家族史',
        },
        {
          name: '2.您是否患有明确诊断的疾病或异常？', id: 16, answer: [{ label: '是', value: '16:3:QA003:0', check: false }, { label: '否', value: '16:4:QA004:1', check: false }], idgf: '现病史',
        },
        {
          name: '请您确认具体疾病或异常的名称：（可多选）', id: 55, idf: '16:3:QA003:0', answer: [{ label: '心脑血管疾病', value: '55:141:QA141:0', check: false }, { label: '内分泌疾病', value: '55:142:QA142:0', check: false }, { label: '消化系统疾病', value: '55:143:QA143:0', check: false }, { label: '呼吸系统疾病', value: '55:144:QA144:0', check: false }, { label: '泌尿系统疾病', value: '55:145:QA145:0', check: false }, { label: '风湿免疫系统', value: '55:146:QA146:0', check: false }, { label: '妇科系统', value: '55:147:QA147:0', check: false }, { label: '其他', value: '55:148:QA148:0', check: false }], multiple: 1, flag: 1, idgf: '现病史',
        },
        {
          name: '心脑血管疾病', id: 56, idf: '55:141:QA141:0', answer: [{ label: '外周血管病', value: '56:153:QA153:0', check: false }, { label: '高血压', value: '56:149:QA149:0', check: false }, { label: '脑卒中', value: '56:150:QA150:0', check: false }, { label: '冠心病', value: '56:151:QA151:0', check: false }, { label: '高脂血症', value: '56:152:QA152:0', check: false }, { label: '痛风', value: '56:154:QA154:0', check: false }, { label: '心律失常', value: '56:155:QA155:0', check: false }], multiple: 1, flag: 1, idgf: '现病史',
        },
        {
          name: '请选择您被诊断患有高血压的年龄:', id: 64, idf: '56:149:QA149:0', answer: [{ label: '15岁以下', value: '64:184:QA184:1', check: false }, { label: '15岁到45岁', value: '64:185:QA185:1', check: false }, { label: '45岁以上', value: '64:186:QA186:1', check: false }], flag: 1, idgf: '现病史',
        },
        {
          name: '请选择您被诊断患有脑卒中的年龄:', id: 65, idf: '56:150:QA150:0', answer: [{ label: '15岁以下', value: '65:187:QA187:1', check: false }, { label: '15岁到45岁', value: '65:188:QA188:1', check: false }, { label: '45岁以上', value: '65:189:QA189:1', check: false }], flag: 1, idgf: '现病史',
        },
        {
          name: '请选择您被诊断患有冠心病的年龄:', id: 66, idf: '56:151:QA151:0', answer: [{ label: '15岁以下', value: '66:190:QA190:1', check: false }, { label: '15岁到45岁', value: '66:191:QA191:1', check: false }, { label: '45岁以上', value: '66:192:QA192:1', check: false }], flag: 1, idgf: '现病史',
        },
        {
          name: '请选择您被诊断患有高脂血症的年龄:', id: 67, idf: '56:152:QA152:0', answer: [{ label: '15岁以下', value: '67:193:QA193:1', check: false }, { label: '15岁到45岁', value: '67:194:QA194:1', check: false }, { label: '45岁以上', value: '67:195:QA195:1', check: false }], flag: 1, idgf: '现病史',
        },
        {
          name: '请选择您被诊断患有外周血管病的年龄:', id: 68, idf: '56:153:QA153:0', answer: [{ label: '15岁以下', value: '68:196:QA196:1', check: false }, { label: '15岁到45岁', value: '68:197:QA197:1', check: false }, { label: '45岁以上', value: '68:198:QA198:1', check: false }], flag: 1, idgf: '现病史',
        },
        {
          name: '请选择您被诊断患有痛风的年龄:', id: 69, idf: '56:154:QA154:0', answer: [{ label: '15岁以下', value: '69:199:QA199:1', check: false }, { label: '15岁到45岁', value: '69:200:QA200:1', check: false }, { label: '45岁以上', value: '69:201:QA201:1', check: false }], flag: 1, idgf: '现病史',
        },
        {
          name: '请选择您被诊断患有心律失常的年龄:', id: 70, idf: '56:155:QA155:0', answer: [{ label: '15岁以下', value: '70:202:QA202:1', check: false }, { label: '15岁到45岁', value: '70:203:QA203:1', check: false }, { label: '45岁以上', value: '70:204:QA204:1', check: false }], flag: 1, idgf: '现病史',
        },
        {
          name: '请选择您被诊断患有糖尿病的年龄:', id: 71, idf: '56:156:QA156:0', answer: [{ label: '15岁以下', value: '71:205:QA205:1', check: false }, { label: '15岁到45岁', value: '71:206:QA206:1', check: false }, { label: '45岁以上', value: '71:207:QA207:1', check: false }], flag: 1, idgf: '现病史',
        },
        {
          name: '请选择您被诊断患有甲状腺疾病的年龄:', id: 72, idf: '56:157:QA157:0', answer: [{ label: '15岁以下', value: '72:208:QA208:1', check: false }, { label: '15岁到45岁', value: '72:209:QA209:1', check: false }, { label: '45岁以上', value: '72:210:QA210:1', check: false }], flag: 1, idgf: '现病史',
        },
        {
          name: '内分泌疾病', id: 57, idf: '55:142:QA142:0', answer: [{ label: '糖尿病', value: '57:156:QA156:0', check: false }, { label: '甲状腺疾病', value: '57:157:QA157:0', check: false }], multiple: 1, flag: 1, idgf: '现病史',
        },
        {
          name: '消化系统疾病', id: 58, idf: '55:143:QA143:0', answer: [{ label: '消化系统肿瘤', value: '58:158:QA158:1', check: false }, { label: '慢性胃炎或胃溃疡', value: '58:159:QA159:1', check: false }, { label: '幽门螺杆菌感染', value: '58:160:QA160:1', check: false }, { label: '胃息肉', value: '58:161:QA161:1', check: false }, { label: '肠道息肉', value: '58:162:QA162:1', check: false }, { label: '脂肪肝', value: '58:163:QA163:1', check: false }, { label: '慢性胰腺炎', value: '58:164:QA164:1', check: false }, { label: '慢性肝炎或肝硬化', value: '58:165:QA165:1', check: false }, { label: '慢性胆囊炎', value: '58:166:QA166:1', check: false }, { label: '胆石症', value: '58:167:QA167:1', check: false }], multiple: 1, flag: 1, idgf: '现病史',
        },
        {
          name: '呼吸系统疾病', id: 59, idf: '55:144:QA144:0', answer: [{ label: '呼吸系统肿瘤', value: '59:168:QA168:1', check: false }, { label: '慢性阻塞性肺病', value: '59:169:QA169:1', check: false }, { label: '哮喘', value: '59:170:QA170:1', check: false }, { label: '结核病', value: '59:171:QA171:1', check: false }], multiple: 1, flag: 1, idgf: '现病史',
        },
        {
          name: '泌尿系统疾病', id: 60, idf: '55:145:QA145:0', answer: [{ label: '泌尿系肿瘤', value: '60:172:QA172:1', check: false }, { label: '慢性肾脏疾病', value: '60:173:QA173:1', check: false }, { label: '前列腺炎或肥大', value: '60:174:QA174:1', check: false }], multiple: 1, flag: 1, idgf: '现病史',
        },
        {
          name: '风湿免疫系统疾病', id: 61, idf: '55:146:QA146:0', answer: [{ label: '类风湿性关节炎', value: '61:175:QA175:1', check: false }, { label: '系统性红斑狼疮', value: '61:176:QA176:1', check: false }], multiple: 1, flag: 1, idgf: '现病史',
        },
        {
          name: '妇科系统疾病', id: 62, idf: '55:147:QA147:0', answer: [{ label: '妇科恶性肿瘤', value: '62:177:QA177:1', check: false }, { label: '子宫内膜异位', value: '62:178:QA178:1', check: false }, { label: '痛经', value: '62:179:QA179:1', check: false }, { label: '人乳头瘤病毒（HPV）感染', value: '62:180:QA180:1', check: false }, { label: '卵巢囊肿', value: '62:181:QA181:1', check: false }], multiple: 1, flag: 1, idgf: '现病史',
        },
        {
          name: '其他疾病', id: 63, idf: '55:148:QA148:0', answer: [{ label: '骨质疏松', value: '63:182:QA182:1', check: false }, { label: '乳腺疾病', value: '63:183:QA183:1', check: false }], multiple: 1, flag: 1, idgf: '现病史',
        },
        {
          name: '3.您是否出现过过敏？', id: 17, answer: [{ label: '是', value: '17:5:QA005:0', check: false }, { label: '否', value: '17:6:QA006:1', check: false }], idgf: '过敏史',
        },
        {
          name: '请选择过敏源:（可多选）', id: 73, idf: '17:5:QA005:0', answer: [{ label: '药物过敏', value: '73:211:QA211:1', check: false }, { label: '碘消毒液过敏', value: '73:212:QA212:1', check: false }, { label: '食物过敏', value: '73:213:QA213:1', check: false }], multiple: 1, flag: 1, idgf: '过敏史',
        },
        {
          name: '4.您是否长期服用药物？（连续服用6个月以上，平均每日服用一次以上）', id: 18, answer: [{ label: '是', value: '18:7:QA007:0', check: false }, { label: '否', value: '18:8:QA008:1', check: false }], idgf: '用药史',
        },
        {
          name: '您长期服用哪些药物？（可多选）', id: 74, idf: '18:7:QA007:0', answer: [{ label: '抗心律失常药', value: '74:214:QA214:1', check: false }, { label: '缓解哮喘药物', value: '74:215:QA215:1', check: false }, { label: '解热镇痛药（如布洛芬等）', value: '74:216:QA216:1', check: false }, { label: '强的松类药物', value: '74:217:QA217:1', check: false }, { label: '雌激素类药物', value: '74:218:QA218:1', check: false }, { label: '利尿剂', value: '74:219:QA219:1', check: false }, { label: '镇静剂或安眠药', value: '74:220:QA220:1', check: false }, { label: '中草药', value: '74:221:QA221:1', check: false }, { label: '避孕药', value: '74:222:QA222:1', check: false }, { label: '抗抑郁药物', value: '74:223:QA223:1', check: false }, { label: '抗血栓药', value: '74:224:QA224:0', check: false }, { label: '抗生素', value: '74:225:QA225:0', check: false }, { label: '降尿酸药', value: '74:226:QA226:1', check: false }, { label: '降压药', value: '74:227:QA227:1', check: false }, { label: '降糖药', value: '74:228:QA228:1', check: false }, { label: '调脂药（降脂药）', value: '74:229:QA229:1', check: false }, { label: '其他', value: '74:230:QA230:1', check: false }], multiple: 1, flag: 1, idgf: '用药史',
        },
        {
          name: '是否服用以下药物：', id: 85, idf: '18:7:QA007:0', answer: [{ label: '氯吡格雷', value: '85:288:QA288:1', check: false }, { label: '其他', value: '85:290:QA290:1', check: false }, { label: '拜阿司匹林', value: '85:287:QA287:1', check: false }, { label: '华法林', value: '85:289:QA289:1', check: false }], flag: 1, idgf: '用药史',
        },
        {
          name: '近两周是否服用抗生素?', id: 86, idf: '18:7:QA007:0', answer: [{ label: '是', value: '86:291:QA291:1', check: false }, { label: '否', value: '86:292:QA292:1', check: false }], flag: 1, idgf: '用药史',
        },
        {
          name: '5.您是否因病进行过手术治疗？', id: 19, answer: [{ label: '是', value: '19:9:QA009:0', check: false }, { label: '否', value: '19:10:QA010:1', check: false }], idgf: '手术史',
        },
        {
          name: '请您选择手术的部位？（可多选）', id: 75, idf: '19:9:QA009:0', answer: [{ label: '头颅（含脑）', value: '75:296:QA296:1', check: false }, { label: '眼', value: '75:297:QA297:1', check: false }, { label: '耳鼻咽喉', value: '75:298:QA298:1', check: false }, { label: '颌面部及口腔', value: '75:299:QA299:1', check: false }, { label: '颈部或甲状腺', value: '75:300:QA300:1', check: false }, { label: '胸部（含肺部）', value: '75:301:QA301:1', check: false }, { label: '心脏（含心脏介入)', value: '75:302:QA302:1', check: false }, { label: '外周血管', value: '75:303:QA303:1', check: false }, { label: '胃肠', value: '75:304:QA304:1', check: false }, { label: '肝胆', value: '75:305:QA305:1', check: false }, { label: '肾脏', value: '75:306:QA306:1', check: false }, { label: '脊柱', value: '75:307:QA307:1', check: false }, { label: '四肢及关节', value: '75:308:QA308:1', check: false }, { label: '膀胱', value: '75:309:QA309:1', check: false }, { label: '妇科', value: '75:310:QA310:1', check: false }, { label: '乳腺', value: '75:311:QA311:1', check: false }, { label: '前列腺', value: '75:312:QA312:1', check: false }, { label: '其他', value: '75:313:QA313:1', check: false }], multiple: 1, flag: 1, idgf: '手术史',
        },
        {
          name: '6.您是否有过输血史？', id: 21, answer: [{ label: '是', value: '21:11:QA011:1', check: false }, { label: '否', value: '21:12:QA012:1', check: false }], idgf: '输血史',
        },
        {
          name: '7.您是否有过不洁性生活史？', id: 22, answer: [{ label: '是', value: '22:13:QA013:1', check: false }, { label: '否', value: '22:14:QA014:1', check: false }], idgf: '个人史',
        },
        {
          name: '8.您是否绝经？', id: 23, answer: [{ label: '是', value: '23:15:QA015:0', check: false }, { label: '否', value: '23:16:QA016:1', check: false }], idgf: '个人史', xb: 2,
        },
        {
          name: '您的绝经年龄是___岁', id: 76, idf: '23QA015', answer: [{ label: '小于45岁', value: '76:249:QA249:1', check: false }, { label: '大于45岁', value: '76:250:QA250:1', check: false }], idgf: '个人史', xb: 2,
        },
        {
          name: '9.1您是否生育过？', id: 24, answer: [{ label: '是', value: '24:17:QA017:0', check: false }, { label: '否', value: '24:18:QA018:1', check: false }], idgf: '个人史', xb: 2,
        },
        {
          name: '9.2您是否需要进行备孕前检查？', id: 77, answer: [{ label: '是', value: '77:251:QA251:0', check: false }, { label: '否', value: '77:252:QA252:1', check: false }], idgf: '个人史', xb: 2,
        },
        {
          name: '您是否曾患有妊娠糖尿病或者妊娠高血压病？', id: 78, idf: '77QA251', answer: [{ label: '妊娠糖尿病', value: '78:255:QA255:1', check: false }, { label: '妊娠高血压病', value: '78:256:QA256:1', check: false }, { label: '其他', value: '78:257:QA257:1', check: false }], idgf: '个人史', xb: 2,
        },
        {
          name: '9.3您当前孕产状态？', id: 79, answer: [{ label: '已怀孕', value: '79:253:QA253:1', check: false }, { label: '哺乳期', value: '79:254:QA254:1', check: false }, { label: '无', value: '79:258:QA258:1', check: false }], idgf: '个人史', xb: 2,
        },
        {
          name: '10.您吸烟吗？', id: 26, answer: [{ label: '不吸', value: '26:30:QA030:1', check: false }, { label: '吸烟', value: '26:31:QA031:0', check: false }, { label: '吸烟，已戒（戒烟1年以上）', value: '26:32:QA032:0', check: false }, { label: '被动吸烟（每天累计15分钟以上，且每周1天以上）', value: '26:33:QA033:1', check: false }], idgf: '生活习惯',
        },
        {
          name: '您通常每天吸多少支烟？（含戒烟前）____支', id: 80, idf: '26:31:QA031:0', answer: [{ label: '1~2支', value: '80:259:QA259:0', check: false }, { label: '3~4支', value: '80:260:QA260:0', check: false }, { label: '>5支', value: '80:261:QA261:0', check: false }], flag: 1, idgf: '生活习惯',
        },
        {
          name: '您抽烟的时间是多久？', id: 87, idf: '26:31:QA031:0', answer: [{ label: '小于5年', value: '87:293:QA293:1', check: false }, { label: '5～15年', value: '87:294:QA294:1', check: false }, { label: '大于15年', value: '87:295:QA295:1', check: false }], flag: 1, idgf: '生活习惯',
        },
        {
          name: '11.您的饮酒频率是多少？（平均每周饮酒1次以上）', id: 27, answer: [{ label: '完全不喝酒', value: '27:267:QA267:1', check: false }, { label: '每周饮酒少于1次', value: '27:268:QA268:0', check: false }, { label: '1～2次', value: '27:269:QA269:0', check: false }, { label: '3～5次', value: '27:270:QA270:0', check: false }, { label: '>5次', value: '27:271:QA271:0', check: false }, { label: '以前喝，现已戒酒（戒酒1年以上）', value: '27:272:QA272:0', check: false }], idgf: '生活习惯',
        },
        {
          name: '您一般喝什么酒?', id: 81, idf: '27QA268', answer: [{ label: '白酒', value: '81:262:QA262:0', check: false }, { label: '啤酒', value: '81:263:QA263:0', check: false }, { label: '红酒', value: '81:264:QA264:0', check: false }, { label: '什么都喝', value: '81:265:QA265:0', check: false }], multiple: 1, idgf: '生活习惯',
        },
        {
          name: '您喝酒的时间是多少年？', id: 82, idf: '27QA268', answer: [{ label: '小于5年', value: '82:273:QA273:1', check: false }, { label: '5～15年', value: '82:274:QA274:1', check: false }, { label: '大于15年', value: '82:275:QA275:1', check: false }], idgf: '生活习惯',
        },
        {
          name: '您每次喝几两？（1两相当于50 ml白酒，100 ml红酒，300 ml啤酒）', id: 83, idf: '27QA268', answer: [{ label: '1～2两', value: '83:276:QA276:0', check: false }, { label: '3～4两 ', value: '83:277:QA277:0', check: false }, { label: '>5两', value: '83:278:QA278:0', check: false }], idgf: '生活习惯',
        },
        {
          name: '12.您感到头晕或头昏吗？', id: 28, answer: [{ label: '没有', value: '28:37:QA037:1', check: false }, { label: '经常', value: '28:39:QA039:1', check: false }, { label: '偶尔', value: '28:38:QA038:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '13.您感到有胸闷气喘或呼吸困难吗？', id: 29, answer: [{ label: '没有', value: '29:40:QA040:1', check: false }, { label: '经常', value: '29:42:QA042:1', check: false }, { label: '偶尔', value: '29:41:QA041:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '14.您感到低热（体温偏高）吗？', id: 30, answer: [{ label: '没有', value: '30:43:QA043:1', check: false }, { label: '偶尔', value: '30:44:QA044:1', check: false }, { label: '经常', value: '30:45:QA045:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '15.您感到恶心、反酸或上腹部不适吗？', id: 31, answer: [{ label: '没有', value: '31:46:QA046:1', check: false }, { label: '偶尔', value: '31:47:QA047:1', check: false }, { label: '经常', value: '31:48:QA048:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '16.您有过食欲不振、消化不良或腹胀吗？', id: 32, answer: [{ label: '偶尔', value: '32:50:QA050:1', check: false }, { label: '经常', value: '32:51:QA051:1', check: false }, { label: '没有', value: '32:49:QA049:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '17.您有过不明原因跌倒或晕倒吗？', id: 33, answer: [{ label: '偶尔', value: '33:53:QA053:1', check: false }, { label: '经常', value: '33:54:QA054:1', check: false }, { label: '没有', value: '33:52:QA052:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '18.您感到明显的手足发麻或刺痛吗？', id: 34, answer: [{ label: '经常', value: '34:57:QA057:1', check: false }, { label: '没有', value: '34:55:QA055:1', check: false }, { label: '偶尔', value: '34:56:QA056:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '19.您双下肢水肿吗？', id: 35, answer: [{ label: '没有', value: '35:58:QA058:1', check: false }, { label: '经常', value: '35:60:QA060:1', check: false }, { label: '偶尔', value: '35:59:QA059:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '20.您排尿困难吗？', id: 36, answer: [{ label: '没有', value: '36:61:QA061:1', check: false }, { label: '偶尔', value: '36:62:QA062:1', check: false }, { label: '经常', value: '36:63:QA063:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '21.您有尿频、尿急、尿痛及尿血吗？', id: 37, answer: [{ label: '没有', value: '37:64:QA064:1', check: false }, { label: '偶尔', value: '37:65:QA065:1', check: false }, { label: '经常', value: '37:66:QA066:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '22.您有腹泻、腹痛或大便习惯改变吗？', id: 38, answer: [{ label: '没有', value: '38:67:QA067:1', check: false }, { label: '偶尔', value: '38:68:QA068:1', check: false }, { label: '经常', value: '38:69:QA069:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '23.您出现过柏油样便或便中带血吗？', id: 39, answer: [{ label: '偶尔', value: '39:71:QA071:1', check: false }, { label: '经常', value: '39:72:QA072:1', check: false }, { label: '没有', value: '39:70:QA070:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '24.您出现过不明原因的身体消瘦或体重减轻吗？（体重减轻超过原体重的10%）', id: 40, answer: [{ label: '否', value: '40:74:QA074:1', check: false }, { label: '是', value: '40:73:QA073:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '25.您是否发现乳房有包块，并伴有胀痛吗（与月经周期无关）？', id: 41, answer: [{ label: '是', value: '41:75:QA075:1', check: false }, { label: '否', value: '41:76:QA076:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '26.您有不明原因的阴道出血、白带异常吗？', id: 42, answer: [{ label: '否', value: '42:78:QA078:1', check: false }, { label: '是', value: '42:77:QA077:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '27.您身体有过明显的疼痛吗？（外伤除外）', id: 43, answer: [{ label: '是', value: '43:79:QA079:0', check: false }, { label: '否', value: '43:80:QA080:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '疼痛的部位？', id: 84, idf: '43:79:QA079:0', answer: [{ label: '头', value: '84:279:QA279:1', check: false }, { label: '颈肩', value: '84:280:QA280:1', check: false }, { label: '咽喉', value: '84:281:QA281:1', check: false }, { label: '腰背', value: '84:282:QA282:1', check: false }, { label: '胸部', value: '84:283:QA283:1', check: false }, { label: '腹部', value: '84:284:QA284:1', check: false }, { label: '四肢', value: '84:285:QA285:1', check: false }, { label: '关节', value: '84:286:QA286:1', check: false }], multiple: 1, flag: 1, idgf: '躯体症状',
        },
        {
          name: '28.您感到疲劳乏力或周身明显不适吗？', id: 44, answer: [{ label: '偶尔', value: '44:82:QA082:1', check: false }, { label: '经常', value: '44:83:QA083:1', check: false }, { label: '没有', value: '44:81:QA081:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '29.您视力有下降吗？', id: 45, answer: [{ label: '没有', value: '45:84:QA084:1', check: false }, { label: '明显', value: '45:86:QA086:1', check: false }, { label: '轻微', value: '45:85:QA085:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '30.您有鼻出血或浓血鼻涕吗？', id: 46, answer: [{ label: '没有', value: '46:87:QA087:1', check: false }, { label: '经常', value: '46:89:QA089:1', check: false }, { label: '偶尔', value: '46:88:QA088:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '31.您出现过吞咽不适、哽噎感吗？', id: 47, answer: [{ label: '没有', value: '47:90:QA090:1', check: false }, { label: '偶尔', value: '47:91:QA091:1', check: false }, { label: '经常', value: '47:92:QA092:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '32.您有过咳痰带血或咯血吗？', id: 48, answer: [{ label: '没有', value: '48:93:QA093:1', check: false }, { label: '偶尔', value: '48:94:QA094:1', check: false }, { label: '经常', value: '48:95:QA095:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '33.您感到胸痛或心前区憋闷不适吗？', id: 49, answer: [{ label: '没有', value: '49:96:QA096:1', check: false }, { label: '偶尔', value: '49:97:QA097:1', check: false }, { label: '经常', value: '49:98:QA098:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '34.您有明显的咳嗽、咳痰吗？', id: 50, answer: [{ label: '没有', value: '50:99:QA099:1', check: false }, { label: '偶尔', value: '50:100:QA100:1', check: false }, { label: '经常', value: '50:101:QA101:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '35.您听力有下降吗？', id: 51, answer: [{ label: '没有', value: '51:102:QA102:1', check: false }, { label: '轻微', value: '51:103:QA103:1', check: false }, { label: '明显', value: '51:104:QA104:1', check: false }], idgf: '躯体症状',
        },
        {
          name: '36.您的工作/生活场所经常会接触到哪些有害物质？', id: 25, answer: [{ label: '无或很少', value: '25:21:QA021:1', check: false }, { label: '噪音、震动', value: '25:22:QA022:1', check: false }, { label: '粉尘', value: '25:24:QA024:1', check: false }, { label: '化学污染', value: '25:25:QA025:1', check: false }, { label: '空气污染', value: '25:26:QA026:1', check: false }, { label: '烹饪油烟', value: '25:28:QA028:1', check: false }, { label: '其他', value: '25:29:QA029:1', check: false }, { label: '电磁辐射', value: '25:23:QA023:1', check: false }, { label: '建筑装修污染', value: '25:27:QA027:1', check: false }], multiple: 1, idgf: '躯体症状',
        },
      ],
      medicalway: 0,
      inactivestyle: { background: '#bfc5ff' },
      activestyle: { background: '#7e8aff' },
      activestyle1: {
        'border-bottom': '1.5rem solid #7e8aff',
        'border-left': '1.5rem solid transparent',
        'border-top': '1.5rem solid #7e8aff',
        'border-right': '1.5rem solid #7e8aff',
      },
      inactivestyle1: {
        'border-bottom': '1.5rem solid #bfc5ff',
        'border-left': '1.5rem solid transparent',
        'border-top': '1.5rem solid #bfc5ff',
        'border-right': '1.5rem solid #bfc5ff',
      },
      acitvestyle2: {
        'border-bottom': '1.5rem solid transparent',
        'border-left': '1.5rem solid #7e8aff',
        'border-top': '1.5rem solid transparent',
        'border-right': '1.5rem solid transparent',
      },
      inactivestyle2: {
        'border-bottom': '1.5rem solid transparent',
        'border-left': '1.5rem solid #bfc5ff',
        'border-top': '1.5rem solid transparent',
        'border-right': '1.5rem solid transparent',
      },
    };
  },
  mounted() {
    this.initanswer();
  },
  beforeCreate() {

  },
  methods: {
    initanswer() { // 初始化答案
      const initan = ['51:102:QA102:1', '49:96:QA096:1', '38:67:QA067:1', '58:158:QA158:1', '15:1:QA001:0', '52:116:QA116:0'];
      if (initan) {
        for (let i = 0; i < this.question.length; i++) {
          for (let j = 0; j < this.question[i].answer.length; j++) {
            if (initan.indexOf(this.question[i].answer[j].value) !== -1) {
              this.question[i].answer[j].check = true;
            }
          }
        }
        for (let i = 0; i < this.question.length; i++) {
          if (this.question[i].idf !== undefined) {
            for (let j = 0; j < this.question.length; j++) {
              for (let k = 0; k < this.question[j].answer.length; k++) {
                if (this.question[i].idf === this.question[j].answer[k].value && this.question[j].answer[k].check === true) {
                  this.question[i].flag = 0;
                } else if (this.question[i].idf === this.question[j].answer[k].value) {
                  this.question[i].flag = 1;
                  for (let g = 0; g < this.question[i].answer.length; g++) {
                    this.question[i].answer[g].check = false;
                  }
                }
              }
            }
          }
        }
      }
      this.$Spin.hide();
    },
    changeanswer(data, event, data1) { // 修改选项
      if (data.multiple !== 1) {
        const len = data.answer.length;
        for (let i = 0; i < len; i++) {
          if (data.answer[i].value !== data1.value) {
            data.answer[i].check = false;
          }
        }
      }
      for (let i = 0; i < this.question.length; i++) {
        if (this.question[i].idf !== undefined) {
          for (let j = 0; j < this.question.length; j++) {
            for (let k = 0; k < this.question[j].answer.length; k++) {
              if (this.question[i].idf === this.question[j].answer[k].value && this.question[j].answer[k].check === true) {
                this.question[i].flag = 0;
              } else if (this.question[i].idf === this.question[j].answer[k].value) {
                this.question[i].flag = 1;
                for (let g = 0; g < this.question[i].answer.length; g++) {
                  this.question[i].answer[g].check = false;
                }
              }
            }
          }
        }
      }
    },
    submitquestionnaire() {
      let questionstr = '';
      for (let i = 0; i < this.question.length; i++) {
        for (let j = 0; j < this.question[i].answer.length; j++) {
          if (this.question[i].answer[j].check === true) {
            questionstr += `${this.question[i].answer[j].value},`;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
    .breadcumb0 {
        width: 26%;
        height: 3rem;
        background-color: #7e8aff;
        display: inline-block;
        border: 0;
        vertical-align: top;
    }
    .breadcumb {
        width: 23.4%;
        height: 3rem;
        background-color: #7e8aff;
        display: inline-block;
        border: 0;
        vertical-align: top;
    }
    .breadcumb1{
        content: '';
        border-bottom: 1.5rem solid transparent;
        border-left: #7e8aff 1.5rem solid;
        border-top: 1.5rem solid transparent;
        border-right:1.5rem solid transparent;
        display: inline-block;
    }
    .breadcumb2{
        content: '';
        margin-left: -2.1rem;
        border-bottom: 1.5rem solid #7e8aff;
        border-left:  1.5rem solid transparent;
        border-top: 1.5rem solid #7e8aff;
        border-right:1.5rem solid #7e8aff;
        display: inline-block;
    }
    .circlecumb{
        -webkit-border-radius: 10px 10px 10px 0;
        -moz-border-radius: 10px 10px 0 0;
        border-radius: 30px 0 30px  30px;
        transform: rotate(45deg);
        background: #7e8aff;
        height: 30px;
        width: 30px;
        display: inline-block;
    }
    .linecumb{
        width: 5.8vw;
        height: 2px;
        border: 0;
        margin: 0 auto;
        display: inline-block;
        padding: 0;
        background: #7e8aff;
        overflow: hidden;
        vertical-align: text-top;
    }
    .linecumb:first{
        width: 3vw;
    }
    .mhistory{
        margin-left: 4.2vw;
        display: inline-block;
    }
    .breadcontain{
        line-height: 3;
        text-align: center;
        color: white;
    }
    .questionline{
        padding: 14px;
    }
    .questioncheck{
        display: grid;
        grid: auto-flow/1fr 1fr 1fr;
    }
</style>
