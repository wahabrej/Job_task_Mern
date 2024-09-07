import fs from 'fs'
import productModel from '../models/productModel.js'
import slugify from 'slugify';
export const createProductController = async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} =req.files
        if( !name || !description || !price || !category || !quantity  || (!photo && photo.size >1000000)){
            return res.status(401).send({
                message:"all field  is required"
 
            })
        }


       const products = await new productModel({...req.fields,slug:slugify(name)})
     if(photo){
      products.photo.data = fs.readFileSync(photo.path)
      products.photo.contentType = photo.type

      await products.save()
        return res.status(201).send({
            success:true,
            message:"product create successfully",
            products
        })
     }
   
    
    } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error found",
          error,
        });
      }
}

export const getProductController =async(req,res)=>{
  try {
    const product = await productModel.find({}).populate('category').select('-photo').limit(12).sort({createdAt:-1});

    if (!product) {
      return res.status(200).send({
        success: false,
        message: "No product Found",
      });
    }
    return res.status(200).send({
      success: true,
      ProductCount: product.length,
      message: "All category lists",
      product,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error found",
      error,
    });
  }
}

export const singleProductController =async(req,res)=>{
  try {

    const id = req.params.id;
    const product = await productModel.findById(id).select('-photo').populate('category')
    res.status(200).send({
      success: true,
      ProductCount: product.length,
      message: "All product lists",
      product,
      id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error found",
      error,
    });
  }
} 

export const ProductphotoController = async (req, res) => {
  try {
    const { id } = req.params; // Correct destructuring
    const product = await productModel.findById(id);

    if (product || product.photo || product.photo.data) {
      res.set('Content-Type', product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occurred",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params; // Correctly destructure id from req.params
    await productModel.findByIdAndDelete(id); // Remove .select('-photo') as it's not needed

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error occurred",
      error,
    });
  }
};
export const updateProductController = async(req,res)=>{
  try {
    const { id } = req.params;
    const {name,slug,description,price,category,quantity,shipping} = req.fields;
    const {photo} =req.files
    if( !name || !description || !price || !category || !quantity  || (!photo && photo.size >1000000)){
        return res.status(401).send({
            message:"all field  is required"

        })
    }
  

    const products = await  productModel.findByIdAndUpdate(id,{...req.fields,slug:slugify(name)},{new:true})
    if(photo){
     products.photo.data = fs.readFileSync(photo.path)
     products.photo.contentType = photo.type

     await products.save()
       return res.status(201).send({
           success:true,
           message:"product update successfully",
           products
       })
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occurred",
      error,
    });
  }
}

export const filterProductController =async(req,res)=>{
try {

  const {checked,radio} = req.body
  let args = {}
  if(checked.length > 0 )
    {
      args.category =checked
    }
if(radio.length) args.price = {$gte: radio[0],$lte:radio[1]}

const products = await productModel.find(args)
res.status(200).send({
  success: true,
  
  products,
});
  
} catch (error) {
  console.log(error);
  return res.status(500).send({
    success: false,
    message: "Error occurred",
    error,
  });
}
}
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel.find({
      $or: [
        {
          name: { $regex: keyword, $options: "i" }
        },
        {
          description: { $regex: keyword, $options: "i" }
        }
      ]
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occurred",
      error,
    });
  }
};

export const similarProductController =async(req,res)=>{
  try {

    const {pid,cid}=req.params;
    const product = await productModel.find({
      category :cid,
      _id:{$ne:pid}
    }).select('-photo').limit(3).populate("category")
    res.status(200).send({
      success: true,
      
      product,
    });
      
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occurred",
      error,
    });
  }
}