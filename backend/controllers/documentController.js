const { PutObjectCommand, GetObjectCommand   } = require('@aws-sdk/client-s3');
const { s3Connection } = require('../utils/s3Connection');
 
const bucketName = process.env.BUCKET_NAMES

exports.uploadImageToS3 = async (content, docName, docType) => {
    try {
        const s3Client = await s3Connection();
        const date = new Date().toDateString().split(' ').join('-');
        const timestamp = Date.now();
        const key = `${docName}-${date}-${timestamp}`
        let documentInput = {
            Bucket: bucketName,
            Body: content,
            Key: key
        }
        const cmd = new PutObjectCommand(documentInput);
        const res = await s3Client.send(cmd);
        return Promise.resolve({ bucketName, key })
    } catch (err) {
        console.log(`error at saving file in s3`, err);
        return Promise.reject();
    }
}

exports.getImageFromS3 = async (key) => {
    try {
        const s3Client = await s3Connection();
        const params = {
            Bucket: bucketName,
            Key: key
        };    
         const getObjectCommand  = new GetObjectCommand(params);
        const response  = await s3Client.send(getObjectCommand);

        const chunks = [];
        response.Body.on('data', (chunk) => {
            chunks.push(chunk);
        });

        await new Promise((resolve, reject) => {
            response.Body.on('end', () => {
                resolve();
            });
            response.Body.on('error', (err) => {
                reject(err);
            });
        });

        const buffer = Buffer.concat(chunks);
        const base64Image = buffer.toString('base64');
         console.log(base64Image);   
        return Promise.resolve(base64Image)
    } catch (err) {
        console.log(`error in fetching file`, err);
        return Promise.reject(err);
    }
};