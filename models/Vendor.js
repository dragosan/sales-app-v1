import mongoose from "mongoose"

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, default: "" },
  tel: { type: String, default: "" },
  categ: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Categ",
  },
  initBalance: { type: Number, default: 0 },
  rate: { type: Number, default: 1 },
  plus: { type: Number, default: 0 },
  notes: { type: String, default: "" },
})

const Vendor = mongoose.model("Vendor", vendorSchema)

export default Vendor
