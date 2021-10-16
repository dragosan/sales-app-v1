import { combineReducers } from "redux"
import { getCategsReducer } from "./categReducer"
import {
  createItemsReducer,
  deleteItemReducer,
  getItemReducer,
  getItemsReducer,
  searchItemsReducer,
} from "./itemReducer"
import { createPurchaseReducer } from "./purchaseReducer"
import { getTypesReducer } from "./typeReducer"
import {
  authReducer,
  createUserReducer,
  deleteUserReducer,
  getUserReducer,
  getUsersReducer,
} from "./userReducer"
import {
  createVendorReducer,
  deleteVendorReducer,
  getVendorReducer,
  getVendorsReducer,
} from "./vendorReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  usersGet: getUsersReducer,
  userGet: getUserReducer,
  userCreate: createUserReducer,
  userDelete: deleteUserReducer,
  vendorsGet: getVendorsReducer,
  vendorCreate: createVendorReducer,
  vendorGet: getVendorReducer,
  vendorDelete: deleteVendorReducer,
  itemsGet: getItemsReducer,
  itemGet: getItemReducer,
  itemsCreate: createItemsReducer,
  itemDelete: deleteItemReducer,
  itemSearch: searchItemsReducer,
  purchaseCreate: createPurchaseReducer,
  categsGet: getCategsReducer,
  typesGet: getTypesReducer,
})

export default rootReducer
