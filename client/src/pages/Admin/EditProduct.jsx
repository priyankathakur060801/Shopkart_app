import { useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, getProduct } from "../../services/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    discountPrice: "",
    stock: "",
    featured: false,
    images: [],
    newImage: null,
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProduct(id);

      const p = data.product;

      setProduct({
        name: p.name || "",
        description: p.description || "",
        category: p.category || "",
        brand: p.brand || "",
        price: p.price || "",
        discountPrice: p.discountPrice || "",
        stock: p.stock || "",
        featured: p.featured || false,
        images: p.images || [],
        newImage: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,

      [e.target.name]: e.target.value,
    });
  };

  const updateProducts = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("brand", product.brand);
      formData.append("price", product.price);
      formData.append("discountPrice", product.discountPrice);
      formData.append("stock", product.stock);
      formData.append("featured", product.featured);

      if (product.newImage) {
        formData.append("images", product.newImage);
      }

      await updateProduct(id, formData);

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

      alert("Update Failed");
    }
  };

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,

      "&:hover fieldset": {
        borderColor: "#0b7b3c",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#0b7b3c",
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        p: {
          xs: 2,
          md: 5,
        },

        background: "linear-gradient(135deg,#e8f8ee,#f6fff8,#ffffff)",
      }}
    >
      <Paper
        sx={{
          width: {
            xs: "100%",
            sm: 700,
          },

          p: {
            xs: 3,
            md: 5,
          },

          borderRadius: 5,

          background: "#ffffff",

          border: "1px solid #d8f3e2",

          boxShadow: "0 20px 50px rgba(11,123,60,.18)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="900"
          textAlign="center"
          sx={{
            color: "#0b7b3c",
          }}
        >
          Edit Product
        </Typography>

        <Typography textAlign="center" color="text.secondary" mb={4}>
          Update your product details and image.
        </Typography>

        <form onSubmit={updateProducts}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            margin="normal"
            sx={fieldStyle}
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            margin="normal"
            sx={fieldStyle}
          />

          <TextField
            fullWidth
            label="Discount Price"
            name="discountPrice"
            value={product.discountPrice}
            onChange={handleChange}
            margin="normal"
            sx={fieldStyle}
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            margin="normal"
            sx={fieldStyle}
          />

          <TextField
            fullWidth
            label="Brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            margin="normal"
            sx={fieldStyle}
          />

          <TextField
            fullWidth
            label="Stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            margin="normal"
            sx={fieldStyle}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            margin="normal"
            sx={fieldStyle}
          />

          {product.images.length > 0 && (
            <Box
              sx={{
                mt: 4,

                display: "flex",

                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={`http://localhost:5000/uploads/${product.images[0]}`}
                sx={{
                  width: 220,

                  height: 220,

                  objectFit: "cover",

                  borderRadius: 4,

                  border: "4px solid #e8f8ee",

                  boxShadow: "0 12px 35px rgba(11,123,60,.2)",

                  transition: "0.3s",

                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              mt: 4,

              display: "flex",

              justifyContent: "center",
            }}
          >
            <Button
              component="label"
              variant="outlined"
              sx={{
                borderRadius: 3,

                px: 4,

                py: 1.5,

                fontWeight: "bold",

                textTransform: "none",

                color: "#0b7b3c",

                borderColor: "#0b7b3c",

                "&:hover": {
                  background: "#e8f8ee",

                  borderColor: "#0b7b3c",
                },
              }}
            >
              Choose New Image
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProduct({
                    ...product,

                    newImage: e.target.files[0],
                  })
                }
              />
            </Button>
          </Box>

          {product.newImage && (
            <Typography
              textAlign="center"
              mt={2}
              fontWeight="bold"
              sx={{
                color: "#0b7b3c",
              }}
            >
              {product.newImage.name}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 5,

              py: 1.7,

              borderRadius: 3,

              fontSize: 18,

              fontWeight: "bold",

              textTransform: "none",

              background: "linear-gradient(135deg,#0b7b3c,#22c55e)",

              boxShadow: "0 10px 25px rgba(11,123,60,.35)",

              "&:hover": {
                background: "linear-gradient(135deg,#075c2d,#0b7b3c)",
              },
            }}
          >
            Update Product
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default EditProduct;
