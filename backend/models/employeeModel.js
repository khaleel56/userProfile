const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  firstName:{
    type: String
  },
  lastName:{
    type: String
  },
  userName: {
    type: String
  },
  email:{
    type: String
  },
  contact:{
    type: String 
  },
	profile: {
    type: String
  },
	age: {
    type: String
  },
	active: {
    type: Boolean,
    default:true
  },
	employeeId: {
    type: String
  },
  address:{
    type: String
  }
},
{timestamps:true});

const userModel = mongoose.model('employee', collectionSchema);
module.exports = userModel;