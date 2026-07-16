import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Button } from "@mui/material";

import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/userProductService";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
     const data = await getAllProducts();
     setProducts(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
const banners = [
  {
    title: "Welcome To ShopKart",
    subtitle: "Discover amazing products at unbeatable prices.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900",
  },
  {
    title: "Mega Sale Up To 70% OFF",
    subtitle: "Electronics, Fashion & More.",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900",
  },
  {
    title: "Fast & Secure Shopping",
    subtitle: "Easy Ordering | Secure Payment | Quick Delivery",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900",
  },
];
  return (
    <>
      <Navbar />

      <Box sx={{ bgcolor: "#0b7b3c" }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: { xs: 350, md: 470 },
                  px: { xs: 4, md: 10 },
                  bgcolor: "#0b7b3c",
                  color: "white",
                }}
              >
                <Box sx={{ maxWidth: 550 }}>
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{
                      fontSize: {
                        xs: "2.2rem",
                        md: "3.8rem",
                      },
                    }}
                  >
                    {banner.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: {
                        xs: 16,
                        md: 22,
                      },
                      opacity: 0.9,
                    }}
                  >
                    {banner.subtitle}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 4,
                      bgcolor: "white",
                      color: "#0b7b3c",
                      fontWeight: "bold",
                      px: 5,
                      py: 1.5,
                      borderRadius: 3,

                      "&:hover": {
                        bgcolor: "#f3f4f6",
                      },
                    }}
                  >
                    Shop Now
                  </Button>
                </Box>

                <Box
                  component="img"
                  src={banner.image}
                  alt={banner.title}
                  sx={{
                    display: { xs: "none", md: "block" },
                    width: 520,
                    height: 320,
                    objectFit: "cover",
                    borderRadius: 4,
                    boxShadow: "0 20px 40px rgba(0,0,0,.35)",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box
        sx={{
          mt: 5,
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 5,
          }}
        >
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            sx={{
              width: { xs: "100%", md: "60%" },

              "& .MuiOutlinedInput-root": {
                borderRadius: "40px",
                bgcolor: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",

                "& fieldset": {
                  borderColor: "#0b7b3c",
                  borderWidth: 2,
                },

                "&:hover fieldset": {
                  borderColor: "#0b7b3c",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#0b7b3c",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#0b7b3c" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            mt: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#0b7b3c",
                lineHeight: 1.2,
              }}
            >
              Latest Products
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mt: 0.5,
              }}
            >
              Explore our newest arrivals and best-selling products.
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "#0b7b3c",
              color: "white",
              px: 3,
              py: 1,
              borderRadius: "30px",
              fontWeight: 600,
              boxShadow: "0 8px 20px rgba(11,123,60,0.25)",
            }}
          >
            {filteredProducts.length} Products
          </Box>
        </Box>
        {loading ? (
          <Box textAlign="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid
                key={product._id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default Home;
