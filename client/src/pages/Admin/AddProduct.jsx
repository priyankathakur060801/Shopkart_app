import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { addProduct } from "../../services/productService";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    discountPrice: "",
    stock: "",
    featured: false,
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setProduct({
      ...product,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });

      images.forEach((image) => {
        formData.append("images", image);
      });

      const res = await addProduct(formData);

      alert(res.message);

      setProduct({
        name: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        discountPrice: "",
        stock: "",
        featured: false,
      });

      setImages([]);

      navigate("/admin/products");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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

        p: {
          xs: 2,
          md: 4,
        },

        background: "linear-gradient(135deg,#e8f8ee,#f6fff8,#ffffff)",
      }}
    >
      <Card
        sx={{
          maxWidth: 1000,

          mx: "auto",

          borderRadius: 5,

          overflow: "hidden",

          background: "#ffffff",

          border: "1px solid #d8f3e2",

          boxShadow: "0 20px 50px rgba(11,123,60,.18)",
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            p: 4,

            color: "white",

            background: "linear-gradient(135deg,#0b7b3c,#22c55e)",
          }}
        >
          <Typography variant="h4" fontWeight="900">
            Add Product
          </Typography>

          <Typography
            sx={{
              opacity: 0.9,

              mt: 1,
            }}
          >
            Add a new product to your ShopKart store
          </Typography>
        </Box>

        <CardContent
          sx={{
            p: {
              xs: 3,
              md: 5,
            },
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Stock Quantity"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Discount Price"
                  name="discountPrice"
                  value={product.discountPrice}
                  onChange={handleChange}
                  sx={fieldStyle}
                />
              </Grid>

              {/* IMAGE UPLOAD */}

              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "2px dashed #0b7b3c",

                    borderRadius: 4,

                    p: 4,

                    textAlign: "center",

                    background: "#f6fff8",
                  }}
                >
                  <Button
                    component="label"
                    variant="outlined"
                    sx={{
                      borderRadius: 3,

                      px: 5,

                      py: 1.3,

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
                    Upload Product Images
                    <input
                      hidden
                      multiple
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>

                  <Typography mt={2} color="text.secondary">
                    {images.length} image(s) selected
                  </Typography>

                  {images.length > 0 && (
                    <Box
                      sx={{
                        mt: 3,

                        display: "flex",

                        gap: 2,

                        flexWrap: "wrap",

                        justifyContent: "center",
                      }}
                    >
                      {images.map((img, index) => (
                        <Box
                          key={index}
                          component="img"
                          src={URL.createObjectURL(img)}
                          sx={{
                            width: 100,

                            height: 100,

                            objectFit: "cover",

                            borderRadius: 3,

                            border: "3px solid #e8f8ee",

                            boxShadow: "0 8px 20px rgba(11,123,60,.2)",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={product.featured}
                      name="featured"
                      onChange={handleChange}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#0b7b3c",
                        },
                      }}
                    />
                  }
                  label="Featured Product"
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",

                    justifyContent: "center",

                    mt: 3,
                  }}
                >
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: 350,
                      },

                      py: 1.7,

                      borderRadius: 4,

                      fontSize: 18,

                      fontWeight: "900",

                      textTransform: "none",

                      background: "linear-gradient(135deg,#0b7b3c,#22c55e)",

                      boxShadow: "0 12px 30px rgba(11,123,60,.35)",

                      "&:hover": {
                        background: "linear-gradient(135deg,#075c2d,#0b7b3c)",

                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    {loading ? "Saving..." : "Save Product"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddProduct;
