const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    docType: {
        type: String
    },
    bucket: {
        type: String
    },
    docName: {
        type: String
    },
    key: {
        type: String
    },
    userId: {
        type: String
    },
    active:{
        type:Boolean
    }
},
    { timestamps: true }
);

const documentsModel = mongoose.model('documents', collectionSchema);
module.exports = documentsModel;