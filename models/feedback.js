const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        rating: {
            type: String,
            required: true
        },
        comments: {
            type: String,
            required: true
        }
    }
)
let feedbackModel = mongoose.model("feedback", schema)
module.exports =feedbackModel