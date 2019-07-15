const mongoose = require('mongoose')

const SubSchema = new mongoose.Schema({
  mail: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Sub = mongoose.model('Sub', SubSchema)

module.exports = Sub
