export const saveUserInfo = params => fetch('/api/yjzzjManager/service/wjjm/saveUserInfo.htm', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } }); // 保存用户信息
export const getGdtcList = params => fetch(`/api/yjzzjManager/service/wjjm/getGdtcList.htm?${params}`, { method: 'POST' }); // 固定套餐列表
export const getGdtcItemList = params => fetch(`/api/yjzzjManager/service/wjjm/getGdtcItemList.htm?${params}`, { method: 'POST' }); // 固定套餐项目
// 提交订单
export const getUpdateBylist = params => fetch(`/api/yjzzjManager/service/wjjm/getYYByUpdateList.htm?${params}`, { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
// 获取体检项目
export const getPEItem = params => fetch(`/api/yjzzjManager/service/wjjm/GetPEItem.htm?${params}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
// 获取报告
export const getReport = params => fetch('/api/yjzzjManager/service/wjjm/getReport.htm', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
// 获取新增项目
export const getAddItemList = params => fetch(`/api/yjzzjManager/service/wjjm/getAddItemList.htm?${params}`, { method: 'POST' });
// 获取订单
export const getPatientOrder = params => fetch('/api/yjzzjManager/service/wjjm/getPatientOrder', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
// 获取体检报告基本信息
export const getBasicInfo = params => fetch('/api/yjzzjManager/service/wjjm/getBasicInfo.htm', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
// 获取套餐详情
export const getTcDetail = params => fetch('/api/yjzzjManager/service/wjjm/getTcDetail', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
// 获取冲突项目
export const getPEItemConflict = params => fetch(`/api/yjzzjManager/service/wjjm/getPEItemConflict.htm?${params}`, { method: 'POST' });
// 获取预约时间
export const getYysj = params => fetch(`/api/yjzzjManager/service/wjjm/getYysj.htm?${params}`, { method: 'POST' });
// 问卷生成体检项目
export const generatePeItem = params => fetch('/api/yjzzjManager/service/wjjm/generatePeItem.htm', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
// 获取已答问卷内容
export const getPeItemDasStrDetail = params => fetch('/api/yjzzjManager/service/wjjm/getPeItemDasStrDetail.htm', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
// 获取用户信息
export const getyhxx1 = params => fetch(`/api/yjzzjManager/service/wjjm/yhxx1.htm?${params}`, { method: 'POST' });
// 获取体检套餐分类
export const getxzfl = params => fetch(`/api/yjzzjManager/service/wjjm/getxzfl.htm?${params}`, { method: 'POST' });
// 获取体检者信息
export const gettjzxx = params => fetch(`/api/yjzzjManager/service/wjjm/tjzxx.htm?${params}`, { method: 'POST' });
// 预约体检
export const yyTj = params => fetch(`/api/yjzzjManager/service/wjjm/yyTj.htm?${params}`, { method: 'POST' });
// 登录
export const login = params => fetch('/api/yjzzjManager/service/wjjm/login.htm', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
// 检验登录
export const checkLogin = params => fetch('/api/yjzzjManager/service/wjjm/checkLogin.htm', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
