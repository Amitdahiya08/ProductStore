import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req,res)=>{
    
    try {
        const products  = await Product.find({});
        res.status(200).json({success:true , data:products});
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
};

export const createProduct = async(req,res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success : false , message : "Please provide all the fields"});
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success:true , data: newProduct});
    } catch (error) {
        console.log("Error in creating new product",error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
};

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message : "Invalid Product Id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success : true, message : "product deleted Successfully"});
    } catch (error) {
        console.log("ERROR", error.message);
        res.status(500).json({success:false, message:"Server ERROR"});
    }
};


export const updateProduct = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message : "Invalid Product Id"});
    }

    const product = req.body;
    try {
        const result =  await Product.findByIdAndUpdate(id,product , {new:true})
        res.status(200).json({success : true, data : result});
    } catch (error) {
        console.log("ERROR", error.message);
        res.status(500).json({success:false, message:"Server ERROR "});
    }
};

