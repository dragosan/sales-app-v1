import mongoose from "mongoose"

const categSchema = new mongoose.Schema({
  name: { type: String, required: true },
  notes: { type: String, default: "" },
})

const Categ = mongoose.model("Categ", categSchema)

export default Categ
