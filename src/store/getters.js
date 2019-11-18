const getters = {
  // sidebar: state => state.app.sidebar

  // 新建经销商数据
  NDparams: state => state.newDealer.params,
  NDownerCdTypes: state => state.newDealer.ownerCdTypes,
  NDlevelList: state => state.newDealer.levelList,
  NDbusinessTypesValues: state => state.newDealer.businessTypesValues,
  NDbusinessTypes: state => state.newDealer.businessTypes,

  //新建承租人数据
  NLparams: state => state.newLessee.params,
  NLmarryList: state => state.newLessee.marryList,
  NLlesseeTypeList: state => state.newLessee.lesseeTypeList,
  
}
export default getters
