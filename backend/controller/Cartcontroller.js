// import usermodel from '../model/usermodel.js'

// //add items to cart user

// const addTocart = async (req, res) => {
//     try {
//       // Find the user by userId
//       let userData = await usermodel.findById(req.body.userId);
  
//       // Get the user's cart data (if it exists, or initialize it as an empty object)
//       let cartData = userData.cartData || {};
  
//       // Check if the item already exists in the cart, if not set it to 1, otherwise increment by 1
//       if (!cartData[req.body.itemId]) {
//         cartData[req.body.itemId] = 1;
//       } else {
//         cartData[req.body.itemId] += 1;
//       }
  
//       // Update the user's cartData in the database
//       await usermodel.findByIdAndUpdate(req.body.userId, {  ₹set: { cartData } });
  
//       // Send success response
//       res.json({ success: true, message: "Added to cart" });
//     } catch (error) {
//       console.log(error);
//       // Send error response
//       res.json({ success: false, message: "Error ... Not added to cart" });
//     }
//   };


// //remove items from user cart
//  const removefromCart=async(req,res)=>{
//        try {
//           let userData=await usermodel.findById(req.body.userId);
//           let cartData=await userData.cartData;
//           if(cartData[req.body.itemId]>0){
//               cartData[req.body.itemId]-=1;
//           }
//           await usermodel.findByIdAndUpdate(req.body.userId,{cartData});
//           res.json({success:true,message:"Removed from Cart"})
//        } catch (error) {
//          console.log(error);
//          res.json({success:false,message:"Error"});
         
//        }
//  }


//  //fetch user cart data

//  const getcart=async(req,res)=>{
//         try {
//           let userData=await  usermodel.findById(req.body.userId);
//           let cartData=await userData.cartData;
//           res.json({success:true,cartData});
//         } catch (error) {
//           console.log(error);
//           res.json({success:false,message:"Error"});
          
          
//         }

//  }


//  export {addTocart,removefromCart,getcart}

import usermodel from '../model/usermodel.js';

// Add items to cart for the user
const addTocart = async (req, res) => {
    const { userId, itemId } = req.body; // Destructure req.body

    try {
        // Find the user by userId
        let userData = await usermodel.findById(userId);
        
        // Check if userData exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the user's cart data (initialize it as an empty object if it doesn't exist)
        let cartData = userData.cartData || {};

        // Check if the item already exists in the cart, if not set it to 1, otherwise increment by 1
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        // Update the user's cartData in the database
        await usermodel.findByIdAndUpdate(userId, { cartData });

        // Send success response
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        // Send error response
        res.status(500).json({ success: false, message: "Error ... Not added to cart" });
    }
};

// Remove items from user cart
const removefromCart = async (req, res) => {
    const { userId, itemId } = req.body; // Destructure req.body

    try {
        let userData = await usermodel.findById(userId);
        
        // Check if userData exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // Check if the item exists in the cart
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;

            // Remove the item from the cart if the quantity is zero
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }

            // Update the user's cartData in the database
            await usermodel.findByIdAndUpdate(userId, { cartData });
            res.json({ success: true, message: "Removed from Cart" });
        } else {
            res.status(400).json({ success: false, message: "Item not in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

// Fetch user cart data
const getcart = async (req, res) => {
    const { userId } = req.body; // Destructure req.body

    try {
        // Find user by userId
        let userData = await usermodel.findById(userId);
        
        // Check if userData exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Safely access cartData
        let cartData = userData.cartData || {}; // Ensure cartData is an object
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
};

export { addTocart, removefromCart, getcart };
