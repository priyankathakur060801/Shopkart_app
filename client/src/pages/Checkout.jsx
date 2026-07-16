import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";
import { createPayment, verifyPayment } from "../services/paymentService";

import { getCart } from "../services/cartService";

function Checkout() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data.cart);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    try {
      const payment = await createPayment(total);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: payment.order.amount,

        currency: payment.order.currency,

        name: "ShopKart",

        description: "Order Payment",

        order_id: payment.order.id,

        handler: async function (response) {
          console.log(response);

         await verifyPayment({
           razorpay_order_id: response.razorpay_order_id,
           razorpay_payment_id: response.razorpay_payment_id,
           razorpay_signature: response.razorpay_signature,
           shippingAddress: shipping,
         });
          alert("Order Placed Successfully");

          // Clear local checkout state if needed

          navigate("/my-orders");
        },

        prefill: {
          name: shipping.name,

          contact: shipping.phone,
        },

        theme: {
          color: "#1976d2",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert("Payment Failed");
    }
  };

  if (!cart) {
    return (
      <>
        <Navbar />
        <Typography textAlign="center" mt={5}>
          Loading Checkout...
        </Typography>
      </>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

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
          Checkout
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            md: "2fr 1fr",
          }}
          gap={4}
        >
          {/* Shipping Form */}

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={3}>
                Shipping Details
              </Typography>

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                margin="normal"
                value={shipping.name}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                margin="normal"
                value={shipping.phone}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Address"
                name="address"
                margin="normal"
                multiline
                rows={3}
                value={shipping.address}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="City"
                name="city"
                margin="normal"
                value={shipping.city}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="State"
                name="state"
                margin="normal"
                value={shipping.state}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                margin="normal"
                value={shipping.pincode}
                onChange={handleChange}
              />
            </CardContent>
          </Card>

          {/* Order Summary */}

          <Card
            sx={{
              borderRadius: 4,
              height: "fit-content",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={3}>
                Order Summary
              </Typography>

              {cart.items.map((item) => (
                <Box
                  key={item.product._id}
                  display="flex"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography>
                    {item.product.name}x {item.quantity}
                  </Typography>

                  <Typography fontWeight="bold">
                    ₹{item.product.price * item.quantity}
                  </Typography>
                </Box>
              ))}

              <hr />

              <Typography variant="h5" fontWeight="bold" mt={2}>
                Total ₹{total}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  borderRadius: 3,
                }}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
