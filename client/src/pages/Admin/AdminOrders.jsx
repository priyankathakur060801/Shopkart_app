import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import Navbar from "../../components/Navbar";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/adminOrderService";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      loadOrders();
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
          bgcolor: "#f5f7fb",
          p: { xs: 2, md: 8 },
        }}
      >
        <Typography variant="h3" fontWeight="bold" mb={4}>
          Manage Orders
        </Typography>

        {orders.map((order) => (
          <Card
            key={order._id}
            sx={{
              mb: 3,
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {order.user?.name}
                  </Typography>

                  <Typography color="text.secondary">
                    {order.user?.email}
                  </Typography>
                </Box>

                <Chip
                  label={order.orderStatus}
                  color={
                    order.orderStatus === "Delivered" ? "success" : "warning"
                  }
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography fontWeight="bold">Products</Typography>

              {order.items.map((item) => (
                <Box
                  key={item.product}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  mt={2}
                >
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    width="60"
                    height="60"
                    style={{
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />

                  <Box>
                    <Typography>{item.name}</Typography>

                    <Typography>
                      ₹{item.price} × {item.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography fontWeight="bold">
                Total Amount: ₹{order.totalAmount}
              </Typography>

              <Typography mt={1}>
                Payment:
                {order.paymentStatus}
              </Typography>

              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() => {
                  setSelectedOrder(order);

                  setOpen(true);
                }}
              >
                View Details
              </Button>

              <Box display="flex" gap={2} mt={2}>
                <Select
                  size="small"
                  value={order.orderStatus}
                  onChange={(e) => changeStatus(order._id, e.target.value)}
                >
                  <MenuItem value="Processing">Processing</MenuItem>

                  <MenuItem value="Shipped">Shipped</MenuItem>

                  <MenuItem value="Delivered">Delivered</MenuItem>

                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Order Details Dialog */}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Order Details</DialogTitle>

        <DialogContent>
          {selectedOrder && (
            <>
              <Typography>
                Customer:
                {selectedOrder.user.name}
              </Typography>

              <Typography>
                Phone:
                {selectedOrder.shippingAddress.phone}
              </Typography>

              <Typography>
                Address:
                {selectedOrder.shippingAddress.address},
                {selectedOrder.shippingAddress.city},
                {selectedOrder.shippingAddress.state}
              </Typography>

              <Typography mt={2}>
                Pincode:
                {selectedOrder.shippingAddress.pincode}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminOrders;
