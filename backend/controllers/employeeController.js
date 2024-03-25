const employeeModel = require('../models/employeeModel');
const Document = require('../models/document')

const documentController= require('./documentController');

// const redis = require('../utils/redisDb');

// Create
exports.registration = async (req, res) => {
  try {
    const { userName, firstName, lastName, email, age, phoneNumber, profile } = req.body;
    if(!email){
      throw error('Please provide valid emailId')
    }

    const newRecord = await employeeModel.create(
      {  userName, firstName, lastName, email, phoneNumber, age });
      if(profile){
        const docId = await this.saveDocument(newRecord?._id, profile);
      }
      await employeeModel.findByIdAndUpdate(newRecord?._id, {profile:docId})
    return res.json({ message: 'Record created successfully', data: newRecord });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err });
  }
}


exports.saveDocument = async (userId, file) => {
  try{
    const fileName=file.name;
    const fileType=file.type;
    const base64Image=file.data?.replace(/data[^,]*base64,/g, '');
    // Decode the base64 string to binary data
    const binaryData = Buffer.from(base64Image, 'base64');
    
    const document = await documentController.uploadImageToS3(binaryData, fileName, fileType)
    const docJson = {
      docType: fileType,
      docName: fileName,
      userId: userId,
      key: document?.key,
      bucketName:document?.bucketName,
      active: true
    }
    const response = await Document.create(docJson) 
    return Promise.resolve(response?._id)
  }catch(err){
    console.log('error in save document',err)
    throw new Error('Save document failure', err);
  }
}

// Read
exports.get = async (req, res) => {
  try {
    const { id } = req.body;
    const record = await employeeModel.findOne({ _id: id });
    if (record) {
      res.json(record);
      redis.set(id, record)
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.getDocument = async (req, res) => {
  try{
    const docId = req.query.id
    if(!docId){
      throw new Error('Please provide documentId');
    }
    const document = await Document.findById(docId).lean()

    if(document && document.key && document.bucketName){
      throw new Error("invalid documentId")
    }
    const documentResponse = await documentController.getImageFromS3(document.key, document.bucketName)
    const fileDetails = {
      fileName:document?.docName,
      fileType:document?.docType,
      url:  `data:${document?.docName};base64,${documentResponse}`
    }
    return res.status(200).json({message:'success', url:fileDetails.url})
  }catch(err){
    console.log('error in save document',err);
    return res.status(400).json({message:'error', error:err})
  }
}

