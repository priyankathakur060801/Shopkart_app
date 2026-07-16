import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../services/cartService";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  CardMedia,
  CircularProgress,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import Swal from "sweetalert2";


import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import Navbar from "../components/Navbar";
import { getProduct } from "../services/userProductService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
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
  });
  }
};
  if (!product) {
    return (
      <>
        <Navbar />
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 5 },
            borderRadius: 5,
            border: "2px solid #0b7b3c",
            background: "#fff",
            boxShadow: "0 15px 35px rgba(11,123,60,.12)",
          }}
        >
          <Grid container spacing={6}>
            {/* Product Image */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  bgcolor: "#f6fff8",
                  borderRadius: 5,
                  p: 3,
                  border: "2px solid #0b7b3c",
                }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:5000/uploads/${product.images[0]}`}
                  sx={{
                    height: 500,
                    objectFit: "contain",
                    transition: ".4s",

                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Product Info */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip
                label="New Arrival"
                sx={{
                  bgcolor: "#0b7b3c",
                  color: "#fff",
                  mb: 2,
                  fontWeight: "bold",
                }}
              />

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: "#0b7b3c" }}
              >
                {product.name}
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "#666",
                  lineHeight: 1.8,
                  fontSize: 17,
                }}
              >
                {product.description}
              </Typography>

              <Typography
                sx={{
                  mt: 4,
                  fontSize: 38,
                  color: "#0b7b3c",
                  fontWeight: "bold",
                }}
              >
                ₹ {product.price}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography sx={{ mb: 1 }}>
                <b>Category:</b> {product.category}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <b>Brand:</b> {product.brand}
              </Typography>

              <Typography sx={{ mb: 3 }}>
                <b>Stock:</b>{" "}
                <span
                  style={{
                    color: product.stock > 0 ? "#0b7b3c" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {product.stock}
                </span>
              </Typography>

              <Box
                sx={{
                  bgcolor: "#f6fff8",
                  border: "1px solid #0b7b3c",
                  borderRadius: 3,
                  p: 2,
                  mb: 4,
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <LocalShippingIcon sx={{ color: "#0b7b3c", mr: 1 }} />
                  <Typography>Free Delivery Available</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <VerifiedIcon sx={{ color: "#0b7b3c", mr: 1 }} />
                  <Typography>100% Genuine Product</Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{
                  bgcolor: "#0b7b3c",
                  px: 6,
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontSize: 16,

                  "&:hover": {
                    bgcolor: "#08642f",
                  },
                }}
              >
                Add To Cart
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default ProductDetails;
