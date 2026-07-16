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

import registerImage from "../assets/login.png";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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

      const { data } = await api.post("/auth/register", formData);

      login(data.user);

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
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
              src={registerImage}
              alt="Register"
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
              Join ShopKart
            </Typography>

            <Typography mt={2} textAlign="center" sx={{ opacity: 0.9 }}>
              Create your account and enjoy a smarter shopping experience.
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
                Register
              </Typography>

              <Typography textAlign="center" color="text.secondary" mb={4}>
                Create your new account
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                name="name"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                name="email"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                name="password"
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
                {loading ? "Please Wait..." : "Create Account"}
              </Button>

              <Typography mt={3} textAlign="center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;
