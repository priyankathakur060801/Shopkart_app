import { useEffect, useState } from "react";
import { downloadInvoice } from "../services/invoiceService";
import DownloadIcon from "@mui/icons-material/Download";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Navbar from "../components/Navbar";

import { getMyOrders } from "../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f7fff9",
          px: { xs: 2, md: 5 },
          py: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                color: "#0b7b3c",
              }}
            >
              My Orders
            </Typography>

            <Typography
              sx={{
                color: "#666",
                mt: 1,
              }}
            >
              Track all your purchases and download invoices.
            </Typography>
          </Box>

          <Chip
            label={`${orders.length} Orders`}
            sx={{
              bgcolor: "#0b7b3c",
              color: "white",
              fontWeight: "bold",
              px: 1,
            }}
          />
        </Box>

        {orders.length === 0 ? (
          <Typography>No Orders Found</Typography>
        ) : (
          orders.map((order) => (
            <Card
              key={order._id}
              sx={{
                mb: 4,
                borderRadius: 5,
                border: "2px solid #0b7b3c",
                boxShadow: "0 15px 35px rgba(11,123,60,.10)",
                transition: ".35s",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 18px 40px rgba(11,123,60,.22)",
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      color: "#0b7b3c",
                    }}
                  >
                    Order ID:
                    {order._id.slice(-8)}
                  </Typography>

                  <Chip
                    label={order.orderStatus}
                    sx={{
                      bgcolor:
                        order.orderStatus === "Delivered"
                          ? "#0b7b3c"
                          : "#ff9800",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </Box>

                <Divider />

                {order.items.map((item) => (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#f8fff9",
                      borderRadius: 3,
                      p: 2,
                      mt: 2,
                    }}
                  >
                    <Typography>
                      {item.name}x {item.quantity}
                    </Typography>

                    <Typography fontWeight="bold">
                      ₹{item.price * item.quantity}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Typography
                  sx={{
                    mt: 2,
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#0b7b3c",
                  }}
                >
                  Total Amount: ₹{order.totalAmount}
                </Typography>

                <Typography mt={1} color="text.secondary">
                  Payment: {order.paymentStatus}
                </Typography>

                <Typography color="text.secondary">
                  Date:
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>

                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleOpen(order)}
                    sx={{
                      borderColor: "#0b7b3c",
                      color: "#0b7b3c",
                      borderRadius: 3,
                      px: 3,

                      "&:hover": {
                        bgcolor: "#f0fff4",
                        borderColor: "#0b7b3c",
                      },
                    }}
                  >
                    View Details
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => downloadInvoice(order._id)}
                    sx={{
                      bgcolor: "#0b7b3c",
                      borderRadius: 3,
                      px: 3,

                      "&:hover": {
                        bgcolor: "#08642f",
                      },
                    }}
                  >
                    Download Invoice
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 5,
              overflow: "hidden",
              border: "2px solid #0b7b3c",
            },
          }}
        >
          <DialogTitle
            sx={{
              bgcolor: "#0b7b3c",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Order Details
          </DialogTitle>

          <DialogContent
            dividers
            sx={{
              bgcolor: "#f7fff9",
              p: 3,
            }}
          >
            {selectedOrder && (
              <>
                {/* Shipping Address */}
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: 4,
                    p: 3,
                    mb: 3,
                    border: "1px solid #0b7b3c",
                    boxShadow: "0 8px 20px rgba(11,123,60,.08)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: "#0b7b3c",
                      mb: 2,
                    }}
                  >
                    🚚 Shipping Address
                  </Typography>

                  <Box display="grid" gap={1}>
                    <Typography>
                      <b>Name:</b> {selectedOrder.shippingAddress.name}
                    </Typography>

                    <Typography>
                      <b>Phone:</b> {selectedOrder.shippingAddress.phone}
                    </Typography>

                    <Typography>
                      <b>Address:</b> {selectedOrder.shippingAddress.address}
                    </Typography>

                    <Typography>
                      <b>City:</b> {selectedOrder.shippingAddress.city}
                    </Typography>

                    <Typography>
                      <b>State:</b> {selectedOrder.shippingAddress.state}
                    </Typography>

                    <Typography>
                      <b>Pincode:</b> {selectedOrder.shippingAddress.pincode}
                    </Typography>
                  </Box>
                </Box>

                {/* Payment Details */}
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: 4,
                    p: 3,
                    mb: 3,
                    border: "1px solid #0b7b3c",
                    boxShadow: "0 8px 20px rgba(11,123,60,.08)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: "#0b7b3c",
                      mb: 2,
                    }}
                  >
                    💳 Payment Details
                  </Typography>

                  <Box display="grid" gap={1}>
                    <Typography>
                      <b>Payment Method:</b> {selectedOrder.paymentMethod}
                    </Typography>

                    <Typography>
                      <b>Payment Status:</b>{" "}
                      <Chip
                        label={selectedOrder.paymentStatus}
                        size="small"
                        sx={{
                          bgcolor: "#0b7b3c",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Typography>

                    <Typography>
                      <b>Order Status:</b> {selectedOrder.orderStatus}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: "#0b7b3c",
                      }}
                    >
                      Total Amount: ₹{selectedOrder.totalAmount}
                    </Typography>
                  </Box>
                </Box>

                {/* Products */}
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: 4,
                    p: 3,
                    border: "1px solid #0b7b3c",
                    boxShadow: "0 8px 20px rgba(11,123,60,.08)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: "#0b7b3c",
                      mb: 2,
                    }}
                  >
                    🛒 Products
                  </Typography>

                  {selectedOrder.items.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "#f7fff9",
                        p: 2,
                        borderRadius: 3,
                        mb: 1,
                      }}
                    >
                      <Typography fontWeight="500">
                        {item.name}
                        {" × "}
                        {item.quantity}
                      </Typography>

                      <Typography fontWeight="bold" color="#0b7b3c">
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                bgcolor: "#0b7b3c",

                "&:hover": {
                  bgcolor: "#08642f",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default MyOrders;
