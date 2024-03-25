const redis = require('../utils/redisDb');


exports.redisCache = async(req, res, next)=>{
    const configType = req.body.id;

    redis.get(configType, (error, configType)=>{
        if(error) console.log(error)
        if(configType!=null){
            return res.json(JSON.parse(configType))
        } else {
            next();
        }
    })
}
