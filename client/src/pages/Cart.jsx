import { useEffect, useState } from "react";


import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

import Navbar from "../components/Navbar"; 
import { useNavigate } from "react-router-dom";

import { getCart, updateQuantity, removeItem } from "../services/cartService";
function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data.cart);
    } catch (err) {
      console.log(err);
    }
  };
const increase = async (id, qty) => {
  await updateQuantity(id, qty + 1);
  loadCart();
};

const decrease = async (id, qty) => {
  await updateQuantity(id, qty - 1);
  loadCart();
};

const remove = async (id) => {
  await removeItem(id);
  loadCart();
};
  if (!cart || cart.items.length === 0)
    return (
      <>
        <Navbar />

        <Typography textAlign="center" mt={5}>
          Cart is Empty
        </Typography>
      </>
    );
  const grandTotal =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) || 0;

 return (
   <>
     <Navbar />

     <Box
       sx={{
         minHeight: "100vh",
         bgcolor: "#f7faf8",
         py: 4,
         px: { xs: 2, md: 6 },
       }}
     >
       <Typography
         variant="h3"
         fontWeight="900"
         mb={6}
         sx={{
           color: "#0b7b3c",
           letterSpacing: 1,
           fontSize: {
             xs: "2rem",
             md: "2.8rem",
           },
           textShadow: "0 3px 10px rgba(11,123,60,.15)",
         }}
       >
         🛒 My Shopping Cart
       </Typography>

       <Box
         sx={{
           display: "grid",
           gridTemplateColumns: {
             xs: "1fr",
             md: "2fr 1fr",
           },
           gap: 4,
         }}
       >
         {/* LEFT PRODUCTS */}

         <Box>
           {cart.items.map((item) => (
             <Card
               sx={{
                 mb: 3,
                 borderRadius: 4,
                 p: 2.5,
                 display: "flex",
                 alignItems: "center",
                 gap: 3,

                 flexWrap: {
                   xs: "wrap",
                   md: "nowrap",
                 },

                 boxShadow: "0 8px 25px rgba(0,0,0,.08)",

                 border: "1px solid #e5f5eb",

                 transition: "0.3s",

                 "&:hover": {
                   transform: "translateY(-4px)",
                   boxShadow: "0 15px 35px rgba(11,123,60,.18)",
                 },
               }}
             >
               <CardMedia
                 component="img"
                 image={`http://localhost:5000/uploads/${item.product.images[0]}`}
                 sx={{
                   width: {
                     xs: 90,
                     md: 130,
                   },

                   height: {
                     xs: 90,
                     md: 130,
                   },
                   borderRadius: 3,
                   objectFit: "cover",
                 }}
               />

               <Box flex={1} minWidth={220}>
                 <Typography fontWeight="800" fontSize={20} color="#0b7b3c">
                   {item.product.name}
                 </Typography>

                 <Typography color="text.secondary" mt={1} fontSize={14}>
                   {item.product.category}
                 </Typography>

                 <Typography fontWeight="900" fontSize={22} mt={1}>
                   ₹{item.product.price}
                 </Typography>

                 <Box
                   sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: 1.5,
                     mt: 2,
                     whiteSpace: "nowrap",
                   }}
                 >
                   <Button
                     onClick={() => decrease(item.product._id, item.quantity)}
                     sx={{
                       minWidth: 35,
                       height: 35,
                       borderRadius: "50%",
                       bgcolor: "#e8f8ee",
                       color: "#0b7b3c",
                       fontSize: 20,
                     }}
                   >
                     -
                   </Button>

                   <Box
                     sx={{
                       px: 2,
                       py: 0.5,
                       bgcolor: "#f1f5f3",
                       borderRadius: 2,
                       fontWeight: "bold",
                     }}
                   >
                     {item.quantity}
                   </Box>

                   <Button
                     onClick={() => increase(item.product._id, item.quantity)}
                     sx={{
                       minWidth: 35,
                       height: 35,
                       borderRadius: "50%",
                       bgcolor: "#0b7b3c",
                       color: "white",
                       fontSize: 20,
                     }}
                   >
                     +
                   </Button>
                 </Box>
               </Box>

               <Box
                 sx={{
                   minWidth: 120,
                   textAlign: {
                     xs: "left",
                     md: "right",
                   },
                 }}
               >
                 <Typography fontWeight="900" fontSize={18} color="#0b7b3c">
                   ₹{item.product.price * item.quantity}
                 </Typography>

                 <Button
                   color="error"
                   sx={{
                     mt: 2,
                     borderRadius: 3,
                   }}
                   onClick={() => remove(item.product._id)}
                 >
                   Remove
                 </Button>
               </Box>
             </Card>
           ))}
         </Box>

         {/* ORDER SUMMARY */}

         <Card
           sx={{
             height: "fit-content",

             borderRadius: 5,

             p: 4,

             position: {
               md: "sticky",
             },

             top: 20,

             boxShadow: "0 15px 40px rgba(0,0,0,.12)",

             border: "2px solid #0b7b3c",
           }}
         >
           <Typography
             variant="h5"
             fontWeight="900"
             mb={3}
             sx={{
               color: "#0b7b3c",
               borderBottom: "3px solid #0b7b3c",
               pb: 1,
             }}
           >
             Order Summary
           </Typography>

           <Box display="flex" justifyContent="space-between" mb={2}>
             <Typography>Items</Typography>

             <Typography fontWeight="bold">{cart.items.length}</Typography>
           </Box>

           <Box display="flex" justifyContent="space-between" mb={2}>
             <Typography>Subtotal</Typography>

             <Typography fontWeight="bold">₹{grandTotal}</Typography>
           </Box>

           <hr />

           <Box display="flex" justifyContent="space-between" mt={3}>
             <Typography variant="h6" fontWeight="900">
               Total
             </Typography>

             <Typography variant="h5" fontWeight="900" color="#0b7b3c">
               ₹{grandTotal}
             </Typography>
           </Box>

           <Button
             fullWidth
             variant="contained"
             onClick={() => navigate("/checkout")}
             sx={{
               mt: 4,

               py: 1.7,

               borderRadius: 3,

               fontSize: 17,

               fontWeight: "bold",

               background: "linear-gradient(135deg,#0b7b3c,#22c55e)",
             }}
           >
             Proceed To Checkout
           </Button>
         </Card>
       </Box>
     </Box>
   </>
 );
}

export default Cart;
