const getters = {
  // sidebar: state => state.app.sidebar

  // 新建经销商数据
  NDparams: state => state.newDealer.params,
  NDownerCdTypes: state => state.newDealer.ownerCdTypes,
  NDlevelList: state => state.newDealer.levelList,
  NDbusinessTypesValues: state => state.newDealer.businessTypesValues,
  NDbusinessTypes: state => state.newDealer.businessTypes,
  
}
export default getters
