import mongoose from "mongoose"

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  notes: { type: String, default: "" },
})

const Type = mongoose.model("Type", typeSchema)

export default Type
