const {S3Client} = require('@aws-sdk/client-s3')

const BUCKET_REGION=process.env.BUCKET_REGION;
const ACCESS_KEY=process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY=process.env.SECRET_ACCESS_KEY;

const s3Connection= ()=>{
    return new  S3Client({
        region:BUCKET_REGION,
    Credential:{
        acceesKeyId:ACCESS_KEY,
        scretAccessKey:SECRET_ACCESS_KEY
    }
})
}

module.exports={s3Connection}