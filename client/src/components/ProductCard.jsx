import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";


import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const handleAddToCart = async () => {
    try {
      const res = await addToCart(product._id);
Swal.fire({
  icon: "success",
  title: "Added to Cart!",
  html: `
    <b>${product.name}</b><br/>
    has been added to your cart successfully.
  `,
  confirmButtonText: "Continue Shopping",
  confirmButtonColor: "#0b7b3c",
  background: "#ffffff",
  color: "#222",
  width: 420,
  showClass: {
    popup: "animate__animated animate__zoomIn",
  },
  hideClass: {
    popup: "animate__animated animate__zoomOut",
  },
});
    } catch (err) {
Swal.fire({
  icon: "error",
  title: "Oops!",
  text: err.response?.data?.message || "Something went wrong",
  confirmButtonColor: "#0b7b3c",
});    }
  };

 return (
   <Card
     sx={{
       height: "100%",
       display: "flex",
       flexDirection: "column",
       overflow: "hidden",
       borderRadius: 5,
       background: "#fff",
       border: "2px solid #0b7b3c",
       transition: "all .35s ease",
       boxShadow: "0 8px 20px rgba(0,0,0,0.08)",

       "&:hover": {
         transform: "translateY(-10px)",
         boxShadow: "0 18px 40px rgba(11,123,60,.25)",
       },
     }}
   >
     <Box
       sx={{
         overflow: "hidden",
         position: "relative",
       }}
     >
       <CardMedia
         component="img"
         height="250"
         image={
           product.images?.length
             ? `http://localhost:5000/uploads/${product.images[0]}`
             : "https://via.placeholder.com/300x220?text=No+Image"
         }
         alt={product.name}
         sx={{
           transition: ".4s",

           "&:hover": {
             transform: "scale(1.08)",
           },
         }}
       />

       <Chip
         label="New"
         sx={{
           position: "absolute",
           top: 15,
           left: 15,
           bgcolor: "#0b7b3c",
           color: "white",
           fontWeight: "bold",
         }}
       />
     </Box>

     <CardContent sx={{ flexGrow: 1 }}>
       <Typography
         variant="h6"
         fontWeight={700}
         noWrap
         sx={{
           color: "#0b7b3c",
         }}
       >
         {product.name}
       </Typography>

       <Typography
         variant="body2"
         sx={{
           mt: 1,
           color: "#666",
           height: 48,
           overflow: "hidden",
         }}
       >
         {product.description}
       </Typography>

       <Typography
         sx={{
           mt: 2,
           fontSize: 28,
           fontWeight: "bold",
           color: "#0b7b3c",
         }}
       >
         ₹{product.price}
       </Typography>
     </CardContent>

     <CardActions
       sx={{
         px: 2,
         pb: 2,
         gap: 1,
       }}
     >
       <Button
         fullWidth
         variant="outlined"
         startIcon={<VisibilityIcon />}
         onClick={() => navigate(`/product/${product._id}`)}
         sx={{
           borderColor: "#0b7b3c",
           color: "#0b7b3c",
           borderRadius: 3,
           py: 1,

           "&:hover": {
             borderColor: "#0b7b3c",
             bgcolor: "#eaf7ef",
           },
         }}
       >
         Details
       </Button>

       <Button
         fullWidth
         variant="contained"
         startIcon={<ShoppingCartIcon />}
         onClick={handleAddToCart}
         sx={{
           bgcolor: "#0b7b3c",
           borderRadius: 3,
           py: 1,

           "&:hover": {
             bgcolor: "#08642f",
           },
         }}
       >
         Cart
       </Button>
     </CardActions>
   </Card>
 );
}

export default ProductCard;
