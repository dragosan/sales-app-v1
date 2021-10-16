import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  itemArticle: { type: String, required: true },
  itemVnArticle: { type: String, default: "" },
  itemName: { type: String, default: "" },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Vendor",
  },
  categ: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Categ",
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Type",
  },
  vnPrice: { type: Number, default: 0 },
  custPrice: { type: Number, default: 0 },
  itemBarcode: { type: String },
  itemBal: { type: Number, default: 0 },
  itemOrderLimit: { type: Number, default: 10 },
  itemColor: { type: String, default: "black" },
  itemSize: { type: Number, default: 40 },
  notes: { type: String, default: "" },
})

const Item = mongoose.model("Item", itemSchema)

export default Item
