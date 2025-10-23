const express= require(express);

const router=express.Router();

const products=require('../Models/Products');

//inserting data

router.post("/insertProduct",async(req,res)=>{
    const {ProductName, ProductPrice, ProductBarCode}=req.body();

    try {
        const pre = await products.findOne({ProductBarCode: ProductBarCode})
        console.log(pre);

        if(pre){
            res.status(422).json("Product Already Present");
        }else{
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode })
            
            await addProduct.save();
            res.status(200).json(addProduct);
            console.log(addProduct);
        }
    } catch (error) {
        console.log(error);
    }
})


//get data

router.get('/product/:id',async(req,res)=>{
    try {
        const getProduct=await products.findById(req.params,id);
        console.log(getProduct);
        res.status(200).json(getProduct);
    } catch (error) {
        console.log(error);
    }
})

//edit data

router.put('/updateProduct/:id',async(req,res)=>{

    try {
        const updateProducts = await products.findByIdAndUpdate(req.params.id,{ProductName,ProductPrice,ProductBarCode},{new:true});
        console.log("Updated");
        res.status(201).json(updateProducts);
    } catch (error) {
        console.log(error);
    }
})