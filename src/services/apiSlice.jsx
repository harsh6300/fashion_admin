import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, clearToken } from "./authtoken"; // Import Redux actions

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.token;
      if (token && endpoint !== "loginUser" && endpoint !== "registerUser") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //regietr user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'register/',
        method: 'POST',
        body: userData,
      }),
    }),

    // ✅ Login
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "login/",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access) {
            dispatch(setToken(data.access)); // ✅ Store token in Redux
          }
        } catch (error) {
          console.error("Login Failed:", error);
        }
      },
    }),

    getProfile: builder.query({
      query: () => "profile/",
      providesTags: ["Profile"], // ✅ Add tag for automatic refetch
    }),

    // ✅ Fetch Categories
    getCategories: builder.query({
      query: (keyword) => {
        if (keyword) {
          return `view-categories/?category_id=${encodeURIComponent(keyword)}`;
        }
        return 'view-categories/';
      },
      providesTags: ["Category"],
    }),


    // ✅ Add Category
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "add-category/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"], // ✅ Auto refetch categories
    }),

    // ✅ Edit Category
    editCategory: builder.mutation({
      query: ({ formData }) => {

        return {
          url: `update-category/`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Category"],
    }),


    // ✅ Delete Category
    deleteCategory: builder.mutation({
      query: (formdata) => ({
        url: `delete-category/`,
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Category"],
    }),



    // add Subcategory
    addSubCategory: builder.mutation({
      query: (formData) => ({
        url: "add-subcategory/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["SubCategory"], // ✅ Auto refetch categories
    }),

    // getSub category
    getSubCategories: builder.query({
      query: () => 'view-subcategories/', // 👈 Your "view" endpoint
      providesTags: ['SubCategory'],
    }),

    editSubCategory: builder.mutation({
      query: ({ formData }) => ({
        url: `update-subcategory/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (formData) => ({
        url: `delete-subcategory/`,
        method: "DELETE",
        body: formData,
      }),
      invalidatesTags: ["SubCategory"],
    }),



    addProduct: builder.mutation({
      query: (formData) => ({
        url: "add-product/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"], // ✅ Auto refetch categories
    }),

    getProduct: builder.query({
      query: (productId) => productId
        ? `view-products/?product_id=${productId}` // If productId is passed, use it as a query parameter
        : "view-products/", // Otherwise, get all products
      providesTags: ["Product"],
    }),

    editProduct: builder.mutation({
      query: ({ formData }) => ({
        url: `update-product/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (formData) => ({
        url: `delete-product/`,
        method: "DELETE",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    addFebric: builder.mutation({
      query: (formData) => ({
        url: "add-fabric/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Febric"],
    }),

    getFebric: builder.query({
      query: (keyword) => {
        if (keyword) {
          return `view-fabrics/?fabric_id=${encodeURIComponent(keyword)}`;
        }
        return 'view-fabrics/';
      },
      providesTags: ["Febric"], // ✅ Add tag for automatic refetch
    }),

    editFebric: builder.mutation({
      query: ({ formData }) => {

        return {
          url: `update-fabric/`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Febric"],
    }),

    deleteFebric: builder.mutation({
      query: (formdata) => ({
        url: `delete-fabric/`,
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Febric"],
    }),



    addColor: builder.mutation({
      query: (formData) => ({
        url: "add-color/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Color"],
    }),

    getColor: builder.query({
      query: () => "view-colors/",
      providesTags: ["Color"], // ✅ Add tag for automatic refetch
    }),

    editColor: builder.mutation({
      query: ({ formData }) => {

        return {
          url: `update-color/`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Color"],
    }),
    deleteColor: builder.mutation({
      query: (formdata) => ({
        url: `delete-color/`,
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Color"],
    }),





    getProductMedia: builder.query({
      query: (keyword) => {
        if (keyword) {
          return `view-product-media/?product_id=${encodeURIComponent(keyword)}`;
        }
        return 'view-product-media/';
      },
      providesTags: ["media"], // ✅ Add tag for automatic refetch
    }),

    editProduct_Media: builder.mutation({
      query: ({ formData }) => {

        return {
          url: `update-product-media/`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["media"],
    }),
    deleteProductMedia: builder.mutation({
      query: (formdata) => ({
        url: `delete-product-media/`,
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["media"],
    }),



    getOrder: builder.query({
      query: (keyword) => {
        if (keyword) {
          return `view-order/?order_id=${encodeURIComponent(keyword)}`;
        }
        return 'view-order/';
      },
      providesTags: ["Order"], // ✅ Add tag for automatic refetch
    }),

    addBulkProduct: builder.mutation({
      query: (formData) => ({
        url: "add-fabric/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Febric"],
    }),

    getAddress: builder.query({
      query: (keyword) => {
        if (keyword) {
          return `view-addresses/?address_id=${keyword}`;
        }
        return 'view-addresses/';
      },
      providesTags: ["address"], // ✅ Add tag for automatic refetch
    }),



    addRating: builder.mutation({
      query: ({ formData }) => ({
        url: 'add-rating/',
        method: 'POST',
        body: formData,

      }),
      invalidatesTags: ['Rating'],
    }),




    addCoupon: builder.mutation({
      query: (formData) => ({
        url: "add-coupon/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Coupon"],
    }),

    getCoupon: builder.query({
      query: (keyword) => {
        return 'view-coupons/';
      },
      providesTags: ["Coupon"], // ✅ Add tag for automatic refetch
    }),

    deleteCoupon: builder.mutation({
      query: (formdata) => ({
        url: "delete-coupon/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Coupon"],
    }),

    editCoupon: builder.mutation({
      query: ({ formData }) => {

        return {
          url: "update-coupon/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Coupon"],
    }),

    getCoupon: builder.query({
      query: (keyword) => {
        return 'view-coupons/';
      },
      providesTags: ["Coupon"], // ✅ Add tag for automatic refetch
    }),


    // getReview: builder.query({

    //   query: () => "view-ratings/",
    //   providesTags: ["Rating"], // ✅ Add tag for automatic refetch
    // }),

    getReview: builder.query({
      query: () => "view-ratings/",
      providesTags: ["Review"],
    }),

    addCart: builder.mutation({
      query: (formData) => ({
        url: "add-cart/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Cart"],
    }),

    getCart: builder.query({
      query: () => "view-cart/",
      providesTags: ["Cart"],
    }),

    getWarehouse: builder.query({
      query: () => "view-warehouses/",
      providesTags: ["Warehouse"],
    }),


    deleteWarehouse: builder.mutation({
      query: (formdata) => ({
        url: "delete-warehouse/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Warehouse"],
    }),
    addWarehouse: builder.mutation({
      query: (formData) => ({
        url: "add-warehouse/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Warehouse"],
    }),

    editWarehouse: builder.mutation({
      query: ({ formData }) => {

        return {
          url: "update-warehouse/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Warehouse"],
    }),

    getInventories: builder.query({
      query: () => "view-inventories/",
      providesTags: ["Inventories"],
    }),

    deleteInventories: builder.mutation({
      query: (formdata) => ({
        url: "delete-inventory/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Inventories"],
    }),
    addInventory: builder.mutation({
      query: (formData) => ({
        url: "add-inventory/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Inventories"],
    }),

    editInventory: builder.mutation({
      query: ({ formData }) => {

        return {
          url: "update-inventory/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Inventories"],
    }),

    getWarehouseTransfer: builder.query({
      query: () => "view-transfers/",
      providesTags: ["warehouse_transfer"],
    }),
    deleteWarehouseTransafer: builder.mutation({
      query: (formdata) => ({
        url: "delete-transfer/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["warehouse_transfer"],
    }),
    addWarehouseTransfer: builder.mutation({
      query: (formData) => ({
        url: "add-transfer/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["warehouse_transfer"],
    }),

    editWarehouseTransfer: builder.mutation({
      query: ({ formData }) => {

        return {
          url: "update-transfer/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["warehouse_transfer"],
    }),


    getInventoylog: builder.query({
      query: () => "view-inventory-logs/",
      providesTags: ["inventory_log"],
    }),

    deleteInventorylog: builder.mutation({
      query: (formdata) => ({
        url: "delete-inventory-log/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["inventory_log"],
    }),

    addInventoryLog: builder.mutation({
      query: (formData) => ({
        url: "add-inventory-log/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Inventories"],
    }),


    addPermission: builder.mutation({
      query: (formData) => ({
        url: "add-permission/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Permission"],
    }),

    getPermission: builder.query({
      query: (key) => `get-permissions/?username=${key}`,
      providesTags: ["Permission"],
    }),


    getRole: builder.query({
      query: () => `view-roles/`,
      providesTags: ["Role"],
    }),

    addRole: builder.mutation({
      query: (formData) => ({
        url: "add-role/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Role"],
    }),

    deleteRole: builder.mutation({
      query: (formdata) => ({
        url: "delete-role/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Role"],
    }),

    editRole: builder.mutation({
      query: ({ formData }) => {

        return {
          url: "update-role/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Role"],
    }),

    getPosition: builder.query({
      query: () => `view-positions/`,
      providesTags: ["Position"],
    }),

    addPosition: builder.mutation({
      query: (formData) => ({
        url: "add-position/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Position"],
    }),

    deletePosition: builder.mutation({
      query: (formdata) => ({
        url: "delete-position/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Position"],
    }),

    editPosition: builder.mutation({
      query: ({ formData }) => {

        return {
          url: "update-position/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Position"],
    }),


    getDepartment: builder.query({
      query: () => `view-departments/`,
      providesTags: ["Department"],
    }),

    addDepartment: builder.mutation({
      query: (formData) => ({
        url: "add-department/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Department"],
    }),

    editDepartment: builder.mutation({
      query: ({ formData }) => {

        return {
          url: "update-department/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Department"],
    }),


    deleteDepartment: builder.mutation({
      query: (formdata) => ({
        url: "delete-department/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Department"],
    }),


    getEmployee: builder.query({
      query: () => `view-employees/`,
      providesTags: ["Employee"],
    }),

    addEmployee: builder.mutation({
      query: (formData) => ({
        url: "add-employee/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Employee"],
    }),


    editEmployee: builder.mutation({
      query: ({ formData }) => {
        return {
          url: "update-employee/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Employee"],
    }),

    deleteEmployee: builder.mutation({
      query: (formdata) => ({
        url: "delete-employee/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Employee"],
    }),

    addEmergency: builder.mutation({
      query: (formData) => ({
        url: "add-emergency/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Emergency"],
    }),

    getEmergency: builder.query({
      query: () => `view-emergency/`,
      providesTags: ["Emergency"],
    }),

    editEmergency: builder.mutation({
      query: ({ formData }) => {
        return {
          url: "update-emergency/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Emergency"],
    }),
    deleteEmergency: builder.mutation({
      query: (formdata) => ({
        url: "delete-emergency/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Emergency"],
    }),

    addEmploymentHistory: builder.mutation({
      query: (formData) => ({
        url: 'add-employment-history/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["EmploymentHistory"],
    }),


    getEmploymentHistory: builder.query({
      query: () => `view-employment-history/`,
      providesTags: ["EmploymentHistory"],
    }),

    editEmploymentHistory: builder.mutation({
      query: ({ formData }) => {
        return {
          url: "update-employment-history/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["EmploymentHistory"],
    }),
    deleteEmploymentHistory: builder.mutation({
      query: (formdata) => ({
        url: "delete-employment-history/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["EmploymentHistory"],
    }),


    addEducation: builder.mutation({
      query: (formData) => ({
        url: 'add-education/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Education"],
    }),


    getEducation: builder.query({
      query: () => `view-education/`,
      providesTags: ["Education"],
    }),
    deleteEducation: builder.mutation({
      query: (formdata) => ({
        url: "delete-education/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Education"],
    }),
    editEducation: builder.mutation({
      query: ({ formData }) => {
        return {
          url: "update-education/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Education"],
    }),

    addDocument: builder.mutation({
      query: (formData) => ({
        url: 'add-document/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Document"],
    }),
    getDocument: builder.query({
      query: () => `view-documents/`,
      providesTags: ["Document"],
    }),
    deleteDocument: builder.mutation({
      query: (formdata) => ({
        url: "delete-document/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Document"],
    }),
    editDocument: builder.mutation({
      query: (formData) => {
        return {
          url: "update-document/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Document"],
    }),

    getHolidays: builder.query({
      query: () => `view-holidays/`,
      providesTags: ["Holidays"],
    }),

    addHolidays: builder.mutation({
      query: (formData) => ({
        url: 'add-holiday/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Holidays"],
    }),

    editHolidays: builder.mutation({
      query: (formData) => {
        return {
          url: "update-holiday/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Holidays"],
    }),

    deleteHolidays: builder.mutation({
      query: (formdata) => ({
        url: "delete-holiday/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Holidays"],
    }),

    addWishlist: builder.mutation({
      query: (formData) => ({
        url: 'add-wishlist/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Wishlist", 'Product'],
    }),

    getWishlist: builder.query({
      query: () => `view-wishlist/`,
      providesTags: ["Wishlist"],
    }),




    addShift: builder.mutation({
      query: (formData) => ({
        url: 'add-shift/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
    }),
    getAttendances: builder.query({
      query: ({ employee_id, date, status } = {}) => {
        const params = new URLSearchParams();

        if (employee_id) params.append("employee_id", employee_id);
        if (date) params.append("date", date);
        if (status) params.append("status", status);

        const queryString = params.toString();
        return `view-attendances/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Attendances"],
    }),
    getRooms: builder.query({
      query: ({ employee_id, date, status } = {}) => {
        const params = new URLSearchParams();

        if (employee_id) params.append("employee_id", employee_id);
        if (date) params.append("date", date);
        if (status) params.append("status", status);

        const queryString = params.toString();
        return `view-rooms/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Rooms"],
    }),
    getMessages: builder.query({
      query: ({ room_id, date, status } = {}) => {
        const params = new URLSearchParams();

        if (room_id) params.append("room_id", room_id);
        if (date) params.append("date", date);
        if (status) params.append("status", status);

        const queryString = params.toString();
        return `view-messages/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Messages"],
    }),

    addMessage: builder.mutation({
      query: (formData) => ({
        url: 'add-message/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Messages"],
    }),

    getCustomers: builder.query({
      query: ({ room_id, date, status } = {}) => {
        const params = new URLSearchParams();

        if (room_id) params.append("room_id", room_id);
        if (date) params.append("date", date);
        if (status) params.append("status", status);

        const queryString = params.toString();
        return `view-customers/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Customers"],
    }),
    addCustomer: builder.mutation({
      query: (formData) => ({
        url: 'add-customer/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Customers"],
    }),
    editCustomer: builder.mutation({
      query: (formData) => {
        return {
          url: "update-customer/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: builder.mutation({
      query: (formdata) => ({
        url: "delete-customer/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Customers"],
    }),






    getVariant: builder.query({
      query: ({ product_id, date, status } = {}) => {
        const params = new URLSearchParams();

        if (product_id) params.append("product_id", product_id);
        if (date) params.append("date", date);
        if (status) params.append("status", status);

        const queryString = params.toString();
        return `view-product-variants/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Variant"],
    }),
    addVariant: builder.mutation({
      query: (formData) => ({
        url: 'add-product-variant/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Variant"],
    }),
    editVariant: builder.mutation({
      query: (formData) => {
        return {
          url: "update-product-variant/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Variant"],
    }),
    deleteVariant: builder.mutation({
      query: (formdata) => ({
        url: "delete-product-variant/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Variant"],
    }),
    

    getBill: builder.query({
      query: ({ room_id, date, status } = {}) => {
        const params = new URLSearchParams();

        if (room_id) params.append("room_id", room_id);
        if (date) params.append("date", date);
        if (status) params.append("status", status);

        const queryString = params.toString();
        return `view-bills/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Bill"],
    }),
    addBill: builder.mutation({
      query: (formData) => ({
        url: 'create-bill/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Bill"],
    }),
    editBill: builder.mutation({
      query: (formData) => {
        return {
          url: "update-bill/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Bill"],
    }),
    deleteBill: builder.mutation({
      query: (formdata) => ({
        url: "delete-bill/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Bill"],
    }),
 getOrder: builder.query({
      query: ({ room_id, date, status } = {}) => {
        const params = new URLSearchParams();

        if (room_id) params.append("room_id", room_id);
        if (date) params.append("date", date);
        if (status) params.append("status", status);

        const queryString = params.toString();
        return `view-order/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Order"],
    }),


  }),
});


// Export hooks for components
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,


  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,

  useAddSubCategoryMutation,
  useGetSubCategoriesQuery,
  useEditSubCategoryMutation,
  useDeleteSubCategoryMutation,

  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,

  useEditProduct_MediaMutation,
  useDeleteProductMediaMutation,
  useGetProductMediaQuery,

  useAddColorMutation,
  useGetColorQuery,
  useEditColorMutation,
  useDeleteColorMutation,

  useAddFebricMutation,
  useGetFebricQuery,
  useEditFebricMutation,
  useDeleteFebricMutation,

  useAddBulkProductMutation,
  useGetAddressQuery,

  useAddRatingMutation,
  useGetReviewQuery,


  useAddCouponMutation,
  useGetCouponQuery,
  useDeleteCouponMutation,
  useEditCouponMutation,

  useAddCartMutation,
  useGetCartQuery,

  useGetWarehouseQuery,
  useDeleteWarehouseMutation,
  useAddWarehouseMutation,
  useEditWarehouseMutation,

  useGetInventoriesQuery,
  useDeleteInventoriesMutation,
  useAddInventoryMutation,
  useEditInventoryMutation,

  useGetWarehouseTransferQuery,
  useDeleteWarehouseTransaferMutation,
  useAddWarehouseTransferMutation,
  useEditWarehouseTransferMutation,

  useGetInventoylogQuery,
  useDeleteInventorylogMutation,
  useAddInventoryLogMutation,

  useAddPermissionMutation,
  useGetPermissionQuery,

  useGetRoleQuery,
  useAddRoleMutation,
  useDeleteRoleMutation,
  useEditRoleMutation,


  useGetPositionQuery,
  useAddPositionMutation,
  useDeletePositionMutation,
  useEditPositionMutation,


  useGetDepartmentQuery,
  useAddDepartmentMutation,
  useEditDepartmentMutation,
  useDeleteDepartmentMutation,

  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useDeleteEmployeeMutation,

  useAddEmergencyMutation,
  useGetEmergencyQuery,
  useEditEmergencyMutation,
  useDeleteEmergencyMutation,

  useAddEmploymentHistoryMutation,
  useGetEmploymentHistoryQuery,
  useEditEmploymentHistoryMutation,
  useDeleteEmploymentHistoryMutation,


  useAddEducationMutation,
  useGetEducationQuery,
  useEditEducationMutation,
  useDeleteEducationMutation,


  useAddDocumentMutation,
  useGetDocumentQuery,
  useEditDocumentMutation,
  useDeleteDocumentMutation,

  useGetHolidaysQuery,
  useAddHolidaysMutation,
  useEditHolidaysMutation,
  useDeleteHolidaysMutation,

  useAddWishlistMutation,
  useGetWishlistQuery,

  useAddShiftMutation,
  useGetAttendancesQuery,

  // -----------------------------
  useAddCustomerMutation,
  useGetCustomersQuery,
  useEditCustomerMutation,
  useDeleteCustomerMutation,

  useAddVariantMutation,
  useGetVariantQuery,
  useEditVariantMutation,
  useDeleteVariantMutation,

  useAddBillMutation,
  useGetBillQuery,
  useEditBillMutation,
  useDeleteBillMutation,
  
  useGetOrderQuery,

} = apiSlice;
