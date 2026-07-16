import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  IconButton,
  Badge,
} from "@mui/material";

import {
  Home,
  ShoppingCart,
  Login,
  PersonAdd,
  Dashboard,
  Logout,
  KeyboardArrowDown,
  Person,
  ReceiptLong,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showUser, setShowUser] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(15,23,42,0.9)",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        {/* Logo */}

        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "white",
            flexGrow: 1,
          }}
        >
          <ShoppingCart sx={{ fontSize: 32, color: "#38bdf8" }} />

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              letterSpacing: 1,
            }}
          >
            ShopKart
          </Typography>
        </Box>
        {isAuthenticated ? (
          <>
            {/* Desktop Navbar */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                component={Link}
                to="/"
                startIcon={<Home />}
                sx={{
                  color: "white",
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/my-orders"
                startIcon={<ReceiptLong />}
                sx={{
                  color: "white",
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                My Orders
              </Button>

              <Button
                component={Link}
                to="/cart"
                startIcon={<ShoppingCart />}
                sx={{ color: "white", textTransform: "none" }}
              >
                Cart
              </Button>

              {/* <Button
                component={Link}
                to="/profile"
                startIcon={<Person />}
                sx={{ color: "white", textTransform: "none" }}
              >
                Profile
              </Button> */}

              {user?.role === "admin" && (
                <Button
                  component={Link}
                  to="/admin"
                  startIcon={<Dashboard />}
                  sx={{ color: "white", textTransform: "none" }}
                >
                  Dashboard
                </Button>
              )}

              <Button
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ textTransform: "none" }}
              >
                Logout
              </Button>

              <Box
                onClick={() => setShowUser(!showUser)}
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  cursor: "pointer",
                  ml: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#2563eb",
                    width: 40,
                    height: 40,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>

                {/* {showUser && ( */}
                <Box
                  sx={{
                    ml: 1.5,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {user?.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 13,
                      lineHeight: 1.2,
                    }}
                  >
                    {user?.email}
                  </Typography>
                </Box>
                {/* )} */}
              </Box>
            </Box>

            {/* Mobile Dropdown */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <Button
                onClick={handleClick}
                sx={{
                  color: "white",
                  textTransform: "none",
                  borderRadius: 3,
                  px: 1,
                }}
                endIcon={<KeyboardArrowDown />}
              >
                <Avatar
                  sx={{
                    bgcolor: "#2563eb",
                    width: 38,
                    height: 38,
                    mr: 1,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    width: 240,
                    mt: 1,
                    borderRadius: 3,
                  },
                }}
              >
                <Box px={2} py={2} textAlign="center">
                  <Typography fontWeight="bold">{user?.name}</Typography>
                  <Typography fontSize={13}>{user?.email}</Typography>
                </Box>

                <Divider />

                <MenuItem component={Link} to="/" onClick={handleClose}>
                  Home
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/my-orders"
                  onClick={handleClose}
                >
                  My Orders
                </MenuItem>

                <MenuItem component={Link} to="/cart" onClick={handleClose}>
                  Cart
                </MenuItem>

                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                  Profile
                </MenuItem>

                {user?.role === "admin" && (
                  <MenuItem component={Link} to="/admin" onClick={handleClose}>
                    Dashboard
                  </MenuItem>
                )}

                <Divider />

                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </>
        ) : (
          <Box display="flex" gap={2}>
            <Button
              component={Link}
              to="/login"
              startIcon={<Login />}
              sx={{
                color: "white",
                borderRadius: 3,
              }}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              startIcon={<PersonAdd />}
              sx={{
                borderRadius: 3,
                background: "linear-gradient(90deg,#2563eb,#06b6d4)",

                "&:hover": {
                  background: "linear-gradient(90deg,#1d4ed8,#0891b2)",
                },
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
