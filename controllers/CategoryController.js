import express from 'express'
import CategoryModel from '../models/CategoryModel.js'
import slugify from 'slugify';

export const createCategoryController =async(req,res)=>{
    try {
        const {name} = req.body;
        if( !name){
            return res.status(401).send({
                message:"name is required"

            })
        }
        const existingcategory = await CategoryModel.findOne({name})
     if(existingcategory){
        return res.status(200).send({
            success:true,
            message:"CATEGORY ALREADY EXIST"
        })
     }
     const category = await new CategoryModel({name,slug:slugify(name)}).save()
     return res.status(201).send({
        success:true,
        message:"Data store successfull",
        category
      })
    
    } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error found",
          error,
        });
      }
}
 

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

export const getAllCategoryController =async(req,res)=>{

  try {
    const category = await CategoryModel.find({});
    if (!category) {
      return res.status(200).send({
        success: false,
        message: "No category Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: category.length,
      message: "All category lists",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting Blogs",
      error,
    });
  }

}

export const singleCategoryController = async(req,res)=>{
try {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(200).send({
        success: false,
        message: "No category Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: category.length,
      message: "single category ",
      category,
    });
  
} catch (error) {
  console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting category",
      error,
    });
}

}

export const deleteCategoryController =async (req,res)=>{
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(200).send({
        success: false,
        message: "No category Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: category.length,
      message: "Category delete successfully ",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting category",
      error,
    });
    
  }
}