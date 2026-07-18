import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { Edit, Delete,Add ,Home,Dashboard} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

 return (
   <Box
     sx={{
       p: {
         xs: 2,
         md: 4,
       },
       background: "#f6fff8",
       minHeight: "100vh",
     }}
   >
     <Box
       sx={{
         mb: 5,
         p: 4,
         borderRadius: 5,
         background: "linear-gradient(135deg,#0b7b3c,#22c55e)",
         color: "#fff",
         display: "flex",
         justifyContent: "space-between",
         alignItems: "center",
         flexWrap: "wrap",
         gap: 2,
         boxShadow: "0 15px 35px rgba(11,123,60,.3)",
       }}
     >
       <Box>
         <Typography
           variant="h3"
           fontWeight="bold"
           sx={{
             letterSpacing: 1,
           }}
         >
           Products
         </Typography>

         <Typography
           sx={{
             opacity: 0.9,
             mt: 1,
             fontSize: 17,
           }}
         >
           Manage your products, update details and monitor inventory.
         </Typography>

         <Chip
           label={`${products.length} Products Available`}
           sx={{
             mt: 2,
             bgcolor: "rgba(255,255,255,.2)",
             color: "#fff",
             fontWeight: "bold",
           }}
         />
       </Box>

       <Box
         sx={{
           display: "flex",
           gap: 2,
           alignItems: "center",
           flexWrap: "wrap",
         }}
       >
         {/* Home Button */}
         <Button
           variant="contained"
           startIcon={<Home />}
           onClick={() => navigate("/")}
           sx={{
             bgcolor: "rgba(255,255,255,.18)",
             color: "#fff",
             px: 3,
             py: 1.5,
             borderRadius: 3,
             fontWeight: "bold",
             textTransform: "none",
             backdropFilter: "blur(10px)",
             "&:hover": {
               bgcolor: "rgba(255,255,255,.25)",
               transform: "translateY(-2px)",
             },
           }}
         >
           Home
         </Button>

         {/* Dashboard Button */}
         <Button
           variant="contained"
           startIcon={<Dashboard />}
           onClick={() => navigate("/admin")}
           sx={{
             bgcolor: "rgba(255,255,255,.15)",
             color: "#fff",
             px: 3,
             py: 1.5,
             borderRadius: 3,
             fontWeight: "bold",
             textTransform: "none",
             backdropFilter: "blur(10px)",
             "&:hover": {
               bgcolor: "rgba(255,255,255,.25)",
               transform: "translateY(-2px)",
             },
           }}
         >
           Dashboard
         </Button>

         {/* Add Product Button */}
         <Button
           variant="contained"
           startIcon={<Add />}
           onClick={() => navigate("/admin/add-product")}
           sx={{
             bgcolor: "#fff",
             color: "#0b7b3c",
             px: 4,
             py: 1.5,
             borderRadius: 3,
             fontWeight: "bold",
             textTransform: "none",
             fontSize: 16,
             boxShadow: "0 8px 20px rgba(0,0,0,.2)",
             "&:hover": {
               bgcolor: "#f5f5f5",
               transform: "translateY(-2px)",
             },
           }}
         >
           Add New Product
         </Button>
       </Box>
     </Box>

     <Grid container spacing={4}>
       {products.map((product) => (
         <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
           <Card
             sx={{
               borderRadius: 5,

               overflow: "hidden",

               height: "100%",

               display: "flex",

               flexDirection: "column",

               background: "#ffffff",

               border: "1px solid #d8f3e2",

               boxShadow: "0 10px 30px rgba(11,123,60,.12)",

               transition: "0.35s",

               "&:hover": {
                 transform: "translateY(-10px)",

                 boxShadow: "0 20px 45px rgba(11,123,60,.25)",
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
                 image={
                   product.images.length
                     ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${product.images[0]}`
                     : "https://via.placeholder.com/500"
                 }
                 alt={product.name}
                 sx={{
                   height: 240,
                   borderBottom: "1px solid #e8f8ee",
                   objectFit: "cover",
                   transition: "0.5s",
                   "&:hover": {
                     transform: "scale(1.08)",
                   },
                 }}
               />

               {product.featured && (
                 <Chip
                   label="Featured"
                   color="success"
                   sx={{
                     position: "absolute",
                     top: 12,
                     right: 12,
                     fontWeight: "bold",
                     borderRadius: 2,
                   }}
                 />
               )}
             </Box>

             <CardContent sx={{ flexGrow: 1 }}>
               <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                 {product.name}
               </Typography>

               <Typography variant="body2" color="text.secondary" gutterBottom>
                 {product.brand}
               </Typography>

               <Typography
                 variant="h5"
                 sx={{
                   color: "#0b7b3c",
                 }}
                 fontWeight="bold"
                 mt={2}
               >
                 ₹ {product.price}
               </Typography>

               <Box
                 mt={2}
                 display="flex"
                 justifyContent="space-between"
                 alignItems="center"
               >
                 <Chip
                   label={`Stock : ${product.stock}`}
                   sx={{
                     fontWeight: "bold",

                     color: product.stock > 0 ? "#0b7b3c" : "#d32f2f",

                     borderColor: product.stock > 0 ? "#0b7b3c" : "#d32f2f",
                   }}
                   variant="outlined"
                 />

                 <Chip
                   label={product.category}
                   sx={{
                     color: "#0b7b3c",
                     borderColor: "#0b7b3c",
                     fontWeight: "bold",
                   }}
                   variant="outlined"
                 />
               </Box>
             </CardContent>

             <CardActions
               sx={{
                 p: 2,
                 gap: 1,
               }}
             >
               <Button
                 fullWidth
                 sx={{
                   borderRadius: 3,

                   textTransform: "none",

                   py: 1.2,

                   fontWeight: "bold",

                   background: "linear-gradient(135deg,#0b7b3c,#22c55e)",

                   "&:hover": {
                     background: "linear-gradient(135deg,#075c2d,#0b7b3c)",
                   },
                 }}
                 startIcon={<Edit />}
                 onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                 sx={{
                   borderRadius: 3,
                   textTransform: "none",
                   py: 1.2,
                 }}
               >
                 Edit
               </Button>

               <Button
                 fullWidth
                 color="error"
                 sx={{
                   borderRadius: 3,

                   textTransform: "none",

                   py: 1.2,

                   fontWeight: "bold",

                   background: "#fff5f5",

                   color: "#d32f2f",

                   border: "1px solid #ffcdd2",

                   "&:hover": {
                     background: "#d32f2f",

                     color: "#fff",
                   },
                 }}
                 startIcon={<Delete />}
                 onClick={() => handleDelete(product._id)}
                 sx={{
                   borderRadius: 3,
                   textTransform: "none",
                   py: 1.2,
                 }}
               >
                 Delete
               </Button>
             </CardActions>
           </Card>
         </Grid>
       ))}
     </Grid>
   </Box>
 );
};

export default Products;
