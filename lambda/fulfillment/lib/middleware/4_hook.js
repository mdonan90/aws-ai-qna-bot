var aws=require('../aws')
var lambda= new aws.Lambda()
var _=require('lodash')

module.exports=function(req,res){
    var arn=_.get(res.result,"l")
    if(arn){
        console.log("Lambda PostProcess Hooks:",JSON.stringify({
            req,
            res,
            response_type:"continue"
        },null,2))
        console.log("Hook Invoking",arn)
        return lambda.invoke({
            FunctionName:arn,
            InvocationType:"RequestResponse",
            Payload:JSON.stringify({req,res})
        }).promise()
        .then(result=>{
            var parsed=JSON.parse(result.Payload)
            console.log("Result",JSON.stringify(parsed,null,2))
            return parsed
        })
    }else{
        return {req,res}
    }
}
