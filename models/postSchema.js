const mongoose=require('mongoose')

const postSchema= mongoose.Schema({

    writer:{type:String},
    title:{type:String},
    postText:{type:String},
    postImage:{type:String},
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

},{timestamps:true})



module.exports=mongoose.model('post',postSchema)