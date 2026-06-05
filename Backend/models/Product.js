import mongoose from "mongoose";

const productSchema = mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },
    websiteUrl:{
        type:String,
        required:false
    },

    image:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true,
        enum:['Electronic','Furniture','Clothes','Computer and tech']
    },

    stock:{
        type:Number,
        required:true
    }

},
{
    timestamps:true
}
);

const Product = mongoose.model("Product",productSchema);

export default Product;