import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import toast from "react-hot-toast";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import loginImage from "../assets/login.png";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

      login(data.user);

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb,#06b6d4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,

        "@keyframes float": {
          "0%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-15px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={20}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {/* Left Side */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              background: "linear-gradient(135deg,#2563eb,#06b6d4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              p: 5,
            }}
          >
            <Box
              component="img"
              src={loginImage}
              alt="Login"
              sx={{
                width: "100%",
                maxWidth: 380,
                animation: "float 4s ease-in-out infinite",
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
              mt={4}
              textAlign="center"
            >
              Welcome Back
            </Typography>

            <Typography mt={2} textAlign="center" sx={{ opacity: 0.9 }}>
              Login to continue shopping with ShopKart.
            </Typography>
          </Box>

          {/* Right Side */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              bgcolor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                maxWidth: 400,
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                textAlign="center"
                mb={1}
              >
                Login
              </Typography>

              <Typography textAlign="center" color="text.secondary" mb={4}>
                Sign in to your account
              </Typography>

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: 16,
                  fontWeight: "bold",
                  textTransform: "none",
                  background: "linear-gradient(90deg,#2563eb,#06b6d4)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#1d4ed8,#0891b2)",
                  },
                }}
              >
                {loading ? "Please Wait..." : "Login"}
              </Button>

              <Typography mt={3} textAlign="center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
