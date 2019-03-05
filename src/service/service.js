export const saveUserInfo = params => fetch('/api/yjzzjManager/service/wjjm/saveUserInfo.htm', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
export const getGdtcList = params => fetch(`/api/yjzzjManager/service/wjjm/getGdtcList.htm?${params}`, { method: 'POST' }); // 固定套餐列表
export const getGdtcItemList = params => fetch(`/api/yjzzjManager/service/wjjm/getGdtcItemList.htm?${params}`, { method: 'POST' }); // 固定套餐项目
export const getUpdateBylist = params => fetch(`/api/yjzzjManager/service/wjjm/getYYByUpdateList.htm?${params}`, { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
export const getPEItem = params => fetch(`/api/yjzzjManager/service/wjjm/GetPEItem.htm?${params}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
export const getReport = params => fetch('/api/yjzzjManager/service/wjjm/getReport', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
export const getAddItemList = params => fetch(`/api/yjzzjManager/service/wjjm/getAddItemList.htm?${params}`, { method: 'POST' });
export const getPatientOrder = params => fetch('/api/yjzzjManager/service/wjjm/getPatientOrder', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
export const getBasicInfo = params => fetch('/api/yjzzjManager/service/wjjm/getBasicInfo', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
export const getTcDetail = params => fetch('/api/yjzzjManager/service/wjjm/getTcDetail', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
export const getPEItemConflict = params => fetch(`/api/yjzzjManager/service/wjjm/getPEItemConflict.htm?${params}`, { method: 'POST' });
export const getYysj = params => fetch(`/api/yjzzjManager/service/wjjm/getYysj.htm?${params}`, { method: 'POST' });
export const generatePeItem = params => fetch('/api/yjzzjManager/service/wjjm/generatePeItem', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
export const getPeItemDasStrDetail = params => fetch('/api/yjzzjManager/service/wjjm/getPeItemDasStrDetail', { method: 'POST', body: params, headers: { 'Content-Type': 'application/json' } });
export const getyhxx1 = params => fetch(`/api/yjzzjManager/service/wjjm/yhxx1.htm?${params}`, { method: 'POST' });
export const getxzfl = params => fetch(`/api/yjzzjManager/service/wjjm/getxzfl.htm?${params}`, { method: 'POST' });
export const gettjzxx = params => fetch(`/api/yjzzjManager/service/wjjm/tjzxx.htm?${params}`, { method: 'POST' });
export const yyTj = params => fetch(`/api/yjzzjManager/service/wjjm/yyTj.htm?${params}`, { method: 'POST' });
export const login = params => fetch(`/api/yjzzjManager/service/wjjm/yysj.htm?${params}`);
