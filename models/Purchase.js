import mongoose from "mongoose"

const purchaseSchema = new mongoose.Schema({
  serial: { type: String, default: "0" },
  date: { type: Date, default: Date.now },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Vendor",
  },
  contact: { type: String, default: "" },
  notes: { type: String, default: "" },
  purchaseDetails: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Item",
      },
      quantity: { type: Number, default: 10 },
      priceVn: { type: Number, required: true },
      priceCust: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
})

const Purchase = mongoose.model("purchase", purchaseSchema)

export default Purchase
