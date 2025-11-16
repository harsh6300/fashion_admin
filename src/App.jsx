import React from 'react'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignupPage from './Pages/Signup';
import Category from './Pages/Category/category';
import Edit_category from './Pages/Category/Edit_Category';
import Product from './Pages/Product/Product';
import Product_grid from './Pages/Product/Product_grid';
import Invioce_details from './Pages/Invoice/Invoice_details';
import Create_Invoice from './Pages/Invoice/Create_invoice';
import Create_category from './Pages/Category/Create_category';
import Create_product from './Pages/Product/Create_product';
import Edit_product from './Pages/Product/Edit_Product';

import Sub_Category from './Pages/SubCategory/Sub_category';
import Create_Subcategory from './Pages/SubCategory/Create_SubCategory';
import Edit_SubCategory from './Pages/SubCategory/Edit_SubCategory';

import Create_febric from './Pages/Febric/create_fabric';
import Edit_fabric from './Pages/Febric/Edit_Fabric';
import Fabric from './Pages/Febric/febric';
import Bluk_import_Product from './Pages/Product/Bluk_import_product';

import Profile from './Pages/User';
import Inventories from './Pages/inventories/inventories';
import Inventory_create from './Pages/inventories/inventory_create';
import Inventory_edit from './Pages/inventories/inventory_edit';
import Inventories_log from './Pages/inventory_log/inventories_log';
import Inventory_log_create from './Pages/inventory_log/inventory_log_create';
import Inventory_log_view from './Pages/inventories/inventory_log_view';

import Pay_list from './Pages/payroll/pay_list';
import Salary_slip from './Pages/payroll/salary_slip';
import Payroll_item from './Pages/payroll/payroll_item';
import Customers from './Pages/customers/customers';
import Create_customer from './Pages/customers/Create_customer';
import Edit_customer from './Pages/customers/Edit_customer';

import Bill from './Pages/Bill/bill';
import Create_bill from './Pages/Bill/Create_bill';
import Edit_bill from './Pages/Bill/Edit_bill';

// -----------------------------------





const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("dresstoken");

  return token ? element : <Navigate to="/" replace />;
};

const App = () => {
  const token = localStorage.getItem("dresstoken");


  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
      

        {/* Categroy */}
        <Route path="/category" element={<PrivateRoute element={<Category />} />} />
        <Route path="/create_category" element={<PrivateRoute element={<Create_category />} />} />
        <Route path="/edit_category" element={<PrivateRoute element={<Edit_category />} />} />

        {/* subCategroy */}
        <Route path="/sub_category" element={<PrivateRoute element={<Sub_Category />} />} />
        <Route path="/create_subcategory" element={<PrivateRoute element={<Create_Subcategory />} />} />
        <Route path="/edit_sucategory" element={<PrivateRoute element={<Edit_SubCategory />} />} />

        {/* Product */}
        <Route path="/product" element={<Product />} />
        <Route path="/create-product" element={<Create_product />} />
        <Route path="/edit-product" element={<Edit_product />} />
        <Route path="/product-grid" element={<Product_grid />} />
        <Route path="/bulk_import_product" element={<Bluk_import_Product />} />

        {/* Order */}

      

        {/* Coupone */}
        {/* <Route path="/create-coupone" element={<Create_coupone />} /> */}

     

        {/* Invioce */}
        <Route path="/invoice-details" element={<Invioce_details />} />
        <Route path="/create-invoice" element={<Create_Invoice />} />


        {/* Fabric */}
        <Route path="/fabric" element={<Fabric />} />
        <Route path="/create_fabric" element={<Create_febric />} />
        <Route path="/edit_Fabric" element={<Edit_fabric />} />


 

        <Route path="/profile" element={<Profile />} />


     
      
        <Route path="/inventories" element={<Inventories />} />
        <Route path="/create_inventory" element={<Inventory_create />} />
        <Route path="/edit_inventory" element={<Inventory_edit />} />

      

        <Route path="/inventories_log" element={<Inventories_log />} />
        <Route path="/Create_inventory_log" element={<Inventory_log_create />} />
        <Route path="/inventory_log_view" element={<Inventory_log_view />} />

      









        <Route path="/pay_list" element={<Pay_list />} />
        <Route path="/salary_slip" element={<Salary_slip />} />
        <Route path="/payroll_item" element={<Payroll_item />} />


        <Route path="/customers" element={<Customers />} />
        <Route path="/create_customer" element={<Create_customer />} />
        <Route path="/edit_customer" element={<Edit_customer />} />

        <Route path="/bill" element={<Bill />} />
        <Route path="/create_bill" element={<Create_bill />} />
        <Route path="/edit_bill" element={<Edit_bill />} />

        {/* email:john@example.com */}
        {/* password:password123 */}

      </Routes>
    </BrowserRouter>
  )
}

export default App;



// onClick={() =>
//   navigate("/create_review", {
//       state: {
//           order_id: orderId,  // Pass order_id
//           product_id: item.product.product_id  // Pass product_id
//       }
//   })

// }