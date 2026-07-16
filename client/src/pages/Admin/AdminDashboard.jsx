import { Box, Typography, Grid, Paper } from "@mui/material";
import Swal from "sweetalert2";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import {
  People,
  Inventory,
  ShoppingCart,
  CurrencyRupee,
} from "@mui/icons-material";
import { Select, MenuItem, Button } from "@mui/material";

import Navbar from "../../components/Navbar";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
const [dashboard, setDashboard] = useState({
  totalUsers: 0,
  totalProducts: 0,
  totalOrders: 0,
  revenue: 0,
});  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  useEffect(() => {
    getDashboardData();
  }, []);

const getDashboardData = async () => {
  try {
    const { data } = await api.get("/admin/dashboard");

    if (data.success) {
      setDashboard({
        totalUsers: data.totalUsers,

        totalProducts: data.totalProducts,

        totalOrders: data.totalOrders,

        revenue: data.revenue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

  const getUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");

      if (data.success) {
        setUsers(data.users);
        setShowUsers(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserRole = async (id, role) => {
    try {
      const { data } = await api.put(`/admin/users/${id}`, {
        role,
      });

      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User role updated successfully.",
          confirmButtonColor: "#0b7b3c",
          timer: 1800,
          showConfirmButton: false,
        });

        getUsers();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to update user role.",
        confirmButtonColor: "#d32f2f",
      });
    }
  };
  const cards = [
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: <People sx={{ fontSize: 40 }} />,
      color: "#1976d2",
    },
    {
      title: "Products",
      value: dashboard.totalProducts,
      icon: <Inventory sx={{ fontSize: 40 }} />,
      color: "#2e7d32",
    },
    {
      title: "Orders",
      value: dashboard.totalOrders,
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: "#ed6c02",
    },
    {
      title: "Revenue",
      value: `${dashboard.revenue}`,
      icon: <CurrencyRupee sx={{ fontSize: 40 }} />,
      color: "#9c27b0",
    },
  ];

 return (
   <>
     <Navbar />

     <Box
       sx={{
         minHeight: "100vh",
         bgcolor: "#f6fff8",
         p: {
           xs: 2,
           md: 5,
         },
       }}
     >
       {/* Header */}

       <Box
         sx={{
           mb: 5,
           p: 4,
           borderRadius: 5,
           background: "linear-gradient(135deg,#0b7b3c,#22c55e)",
           color: "white",
           boxShadow: "0 15px 35px rgba(11,123,60,.25)",
         }}
       >
         <Typography variant="h4" fontWeight="900">
           Welcome, {user?.name} 👋
         </Typography>

         <Typography
           sx={{
             mt: 1,
             opacity: 0.9,
           }}
           fontSize={18}
         >
           Manage your ShopKart store from here
         </Typography>
       </Box>

       {/* Dashboard Cards */}

       <Grid
         container
         spacing={3}
         sx={{
           maxWidth: "1200px",
           margin: "auto",
         }}
       >
         {cards.map((card) => (
           <Grid
             key={card.title}
             size={{
               xs: 12,
               sm: 6,
               md: 3,
             }}
           >
             <Paper
               onClick={() => {
                 if (card.title === "Total Users") {
                   getUsers();
                 }

                 if (card.title === "Products") {
                   navigate("/admin/products");
                 }

                 if (card.title === "Orders") {
                   navigate("/admin/orders");
                 }
               }}
               sx={{
                 p: 3,

                 height: 150,

                 borderRadius: 5,

                 cursor: "pointer",

                 display: "flex",

                 justifyContent: "space-between",

                 alignItems: "center",

                 background: "#ffffff",

                 border: "1px solid #d8f3e2",

                 boxShadow: "0 10px 30px rgba(0,0,0,.08)",

                 transition: "0.3s",

                 "&:hover": {
                   transform: "translateY(-8px)",

                   boxShadow: "0 20px 45px rgba(11,123,60,.2)",
                 },
               }}
             >
               <Box>
                 <Typography color="text.secondary" fontWeight="600">
                   {card.title}
                 </Typography>

                 <Typography
                   variant="h3"
                   fontWeight="900"
                   sx={{
                     mt: 1,
                     color: "#0b7b3c",
                   }}
                 >
                   {card.value}
                 </Typography>
               </Box>

               <Box
                 sx={{
                   width: 70,

                   height: 70,

                   borderRadius: "50%",

                   display: "flex",

                   alignItems: "center",

                   justifyContent: "center",

                   background: "#e8f8ee",

                   color: card.color,
                 }}
               >
                 {card.icon}
               </Box>
             </Paper>
           </Grid>
         ))}
       </Grid>

       {/* Users Table */}

       {showUsers && (
         <Paper
           sx={{
             mt: 6,

             borderRadius: 5,

             overflow: "hidden",

             boxShadow: "0 15px 40px rgba(0,0,0,.1)",
           }}
         >
           <Box
             sx={{
               p: 3,

               background: "#0b7b3c",

               color: "white",
             }}
           >
             <Typography variant="h5" fontWeight="900">
               Registered Users
             </Typography>
           </Box>

           <TableContainer>
             <Table>
               <TableHead>
                 <TableRow
                   sx={{
                     background: "#e8f8ee",
                   }}
                 >
                   <TableCell>
                     <b>ID</b>
                   </TableCell>

                   <TableCell>
                     <b>Name</b>
                   </TableCell>

                   <TableCell>
                     <b>Email</b>
                   </TableCell>

                   <TableCell>
                     <b>Role</b>
                   </TableCell>

                   <TableCell>
                     <b>Created</b>
                   </TableCell>

                   <TableCell>
                     <b>Action</b>
                   </TableCell>
                 </TableRow>
               </TableHead>

               <TableBody>
                 {users.map((user) => (
                   <TableRow
                     key={user._id}
                     hover
                     sx={{
                       "&:hover": {
                         background: "#f6fff8",
                       },
                     }}
                   >
                     <TableCell>{user._id.substring(0, 8)}...</TableCell>

                     <TableCell fontWeight="600">{user.name}</TableCell>

                     <TableCell>{user.email}</TableCell>

                     <TableCell>
                       <Select
                         size="small"
                         value={user.role}
                         onChange={(e) => {
                           const updatedUsers = users.map((u) =>
                             u._id === user._id
                               ? { ...u, role: e.target.value }
                               : u,
                           );

                           setUsers(updatedUsers);
                         }}
                         sx={{
                           minWidth: 120,
                         }}
                       >
                         <MenuItem value="user">User</MenuItem>
                         <MenuItem value="admin">Admin</MenuItem>
                       </Select>
                     </TableCell>

                     <TableCell>
                       {new Date(user.createdAt).toLocaleDateString()}
                     </TableCell>
                     <TableCell>
                       <Button
                         variant="contained"
                         size="small"
                         onClick={() => updateUserRole(user._id, user.role)}
                         sx={{
                           bgcolor: "#0b7b3c",
                           "&:hover": {
                             bgcolor: "#08612f",
                           },
                         }}
                       >
                         Save
                       </Button>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
         </Paper>
       )}
     </Box>
   </>
 );
}

export default AdminDashboard;
