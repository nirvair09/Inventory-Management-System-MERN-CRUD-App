import React, { useEffect } from "react";

import { NavLink,useParams,useNavigate } from "react-router-dom";

export default function InsertProduct(){
   const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productBarcode, setProductBarcode] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

     const setName = (e) => {
        setProductName(e.target.value);
      };
    
      const setPrice = (e) => {
        setProductPrice(e.target.value);
      };
    
      const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };

    const {id}=useParams("");

    useEffect(()=>{

        const getProduct=async()=>{
            try {
                const res=await fetch(`http://localhost:3001/product/${id}`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    }
                });

                const data=res.json();

                if (res.status === 201) {
              console.log("Data Retrieved.");
              setProductName(data.ProductName);
              setProductPrice(data.ProductPrice);
              setProductBarcode(data.ProductBarcode);
            } else {
              console.log("Something went wrong. Please try again.");
            }
            } catch (error) {
                console.log(error);
            }
        }

    },[id]);

    const updateProduct = async(e)=>{
        e.preventDefault();

        if(!productName||!productBarcode||!productPrice){
            setError("Please fill all fields")
            return;
        }

        setLoading(true);
        setError("");

        try {

            const res= await fetch(`http://localhost:3001/updateproduct/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    "ProductName":productName,
                    "ProductBarcode":productBarcode,
                    "ProductPrice":productPrice,
                })
            })

            await res.json();

            if(res.status===201){
                alert("updation Done");
                navigate("/products");
            }else{
                setError("Some error happended");
            }
            
        } catch (error) {
            setError("error happended");
            console.log(error);
            
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className='container-fluid p-5'>
            <h1 className=''>Enter Product Information</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_name" className="form-label fs-4 fw-bold">Product Name</label>
                <input type="text" onChange={setName} value={productName} className="form-control fs-5" id="product_name" placeholder="Enter Product Name" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_price" className="form-label fs-4 fw-bold">Product Price</label>
                <input type="number" onChange={setPrice} value={productPrice} className="form-control fs-5" id="product_price" placeholder="Enter Product Price" required />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_barcode" className="form-label fs-4 fw-bold">Product Barcode</label>
                <input type="number" onChange={setBarcode} value={productBarcode} maxLength={12} className="form-control fs-5" id="product_barcode" placeholder="Enter Product Barcode" required />
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/products" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                <button type="submit" onClick={updateProduct} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
            </div>
            <div className="col text-center col-lg-6 ">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}