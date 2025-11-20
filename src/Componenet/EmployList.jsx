import React, { useRef, useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';
import User from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../services/apiSlice'
import { useLocation } from 'react-router-dom';
import { apiSlice } from "../services/apiSlice"; // RTK Query API
import PrefetchLink from './PrefetchLink';

const EmployList = ({ isOpen, setIsOpen }) => {


    // const dispatch = useDispatch()

    // const profile = useSelector((state) => state.userReducer.profile) || [];
    // console.log(profile);

    // // useEffect(() => {

    // //     dispatch(user_profile());

    // // }, [dispatch]);

    // const handleLogout = () => {
    //     Cookies.remove('accessToken'); // Remove the access token
    //     window.location.href = '/'; // Redirect to login page (optional)
    // };
    const { data: user } = useGetProfileQuery();
    const userdata = user?.data || [];

    const sidebarRef = useRef(null);
    const navigate = useNavigate()

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const location = useLocation();
    const activeItemRef = useRef(null);





    const isCategoryPath = ["/category", "/create_category", "/edit_category"].includes(location.pathname);

    const isSubCategoryPath = ["/sub_category", "/create_subcategory", "/edit_sucategory"].includes(location.pathname);

  

    const productPaths = [
        "/product",
        "/create-product",
        "/edit-product",
        "/product-grid",
        "/product-details"
    ];

    const isProductPath = productPaths.some(path => location.pathname.startsWith(path));
    const [isProductOpen, setIsProductOpen] = useState(false);

    useEffect(() => {
        if (isProductPath) {
            setIsProductOpen(true);
        }
    }, [isProductPath]);

    const is_attendnce = [
        "/attendence",
        "/leave_managment",
        "/employee_leave",
        "/attendence_list",
        '/overtime',
        '/leave_settings'
    ]

    const isatte = is_attendnce.some(path => location.pathname.startsWith(path));
    const [isopenatte, setisopenatte] = useState(false);
    useEffect(() => {
        if (isatte) {
            setisopenatte(true);
        }
    }, [isatte]);



    const ise_payroll = [
        "/pay_list",
        "/salary_slip",
        '/payroll_item',
    ]

    const ispay = ise_payroll.some(path => location.pathname.startsWith(path));
    const [isopenpayroll, setisopenpayroll] = useState(false);
    useEffect(() => {
        if (ispay) {
            setisopenpayroll(true);
        }
    }, [ispay]);




    const isBill = [
        "/bill",
        "/create_bill",
        "/edit_bill"
    ].includes(location.pathname);

    const isCouponePath = [
        "/coupon",
        "/create_coupon",
        "/edit_coupon"
    ].includes(location.pathname);

    const isRolePath = [
        "/create-role",
    ].includes(location.pathname);



    const isFabricPath = [
        "/fabric",
        "/create_fabric",
        "/edit_Fabric"
    ].includes(location.pathname);

    const isOrder = [
        "/order",
    ].includes(location.pathname);


    const isReviewPath = [
        "/review",
    ].includes(location.pathname);



    const iscutomersPath = [
        "/customers",
    ].includes(location.pathname);


    const iswrehouse = [
        "/warehouse",
        "/edit_warehouse",
        "/create_warehouse",
    ].includes(location.pathname);

    const isinentories = [
        "/inventories",
        "/create_inventory",
        "/inventory_log_view",
        "/edit_inventory",
    ].includes(location.pathname);
    const iswarehosue_transfer = [
        "/warehouse_transfer",
        "/edit_warehouse_transfer",
        "/Warehouse_transfer_create",
    ].includes(location.pathname);


    const ispermission = [
        "/permission",
    ].includes(location.pathname);

    const isrole = [
        "/role",
        "/create_role",
        "/edit_Role",
    ].includes(location.pathname);

    const isdepartment = [
        "/department",
        "/create_department",
        "/edit_department",
    ].includes(location.pathname);

    const isPosition = [
        "/position",
        "/create_position",
        "/edit_position",
    ].includes(location.pathname);

    const isEmployee = [
        "/employee",
        "/create_employee",
        "/employee_profile",
    ].includes(location.pathname);

    const isholiday = [
        "/holiday",
        "/edit_holiday",
        "/add_holiday",
    ].includes(location.pathname);
    const isInviocePath = [
        "/create-invoice",
    ].includes(location.pathname);
    const ispolicies = [
        "/policies",
    ].includes(location.pathname);
    const iscandidates = [
        "/candidates",
    ].includes(location.pathname);
    const isjob = [
        "/job",
    ].includes(location.pathname);
    const isclient = [
        "/client",
    ].includes(location.pathname);
    const isshift = [
        "/shift",
        "/add_shift",
        "/edit_shift",
    ].includes(location.pathname);
    const isweekend = [
        "/weekend",
        "/add_weekend",
        "/edit_weekend",
    ].includes(location.pathname);
    const isInventories = [
        "/inventories",
    ].includes(location.pathname);

    return (
        <div>
            <div id="overlay111" onClick={() => setIsOpen(false)} className={` ${isOpen ? "block" : "hidden"} fixed inset-0 bg-black bg-opacity-50 z-40 fade-enter`}></div>

            <div id="this_classNamefor_sec_slide" className={`w-[250px] max-2xl:w-[210px] width__left    ${isOpen ? "block z-[50]" : "max-lg:hidden"}  h-full fixed left-0 top-0`}>
                <svg className="absolute close__side_m top-4 right-4 cursor-pointer" onClick={() => setIsOpen(false)} xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20" viewBox="0 0 16 15" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd"
                        d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z"
                        fill="#495567" /></svg>
                <div className="relative h-full flex flex-col justify-between">
                    <div>
                        <div>
                            <div className="">
                                <img src={Logo} className="admin-logo" alt="Logo" />
                            </div>
                            <ul className="" ref={sidebarRef}>

                              
                                <li className="my-2" ref={isCategoryPath ? activeItemRef : null}>
                                    <PrefetchLink className={`admin-li ${isCategoryPath ? "active" : ""}`} to="/category" prefetchActions={apiSlice.endpoints.getCategories.initiate()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 15.998v-6c0-2.828 0-4.242-.879-5.121C19.353 4.109 18.175 4.012 16 4H8c-2.175.012-3.353.109-4.121.877C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122" opacity=".5"></path><path fill="currentColor" d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></path><path fill="currentColor" fillRule="evenodd" d="M6.25 10.5A.75.75 0 0 1 7 9.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M6.25 14a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75m-3.5 3.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75" clipRule="evenodd"></path></svg>
                                        <h6 className="m-0">Category</h6>
                                    </PrefetchLink>
                                </li>
                                <li className="my-2" ref={isSubCategoryPath ? activeItemRef : null} >
                                    <PrefetchLink className={`admin-li ${isSubCategoryPath ? "active" : ""}`} to="/sub_category" prefetchActions={apiSlice.endpoints.getSubCategories.initiate()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 15.998v-6c0-2.828 0-4.242-.879-5.121C19.353 4.109 18.175 4.012 16 4H8c-2.175.012-3.353.109-4.121.877C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122" opacity=".5"></path><path fill="currentColor" d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></path><path fill="currentColor" fillRule="evenodd" d="M6.25 10.5A.75.75 0 0 1 7 9.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M6.25 14a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75m-3.5 3.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75" clipRule="evenodd"></path></svg>
                                        <h6 className="m-0">Sub Category</h6>
                                    </PrefetchLink>
                                </li>
                                <li className="my-2" ref={isFabricPath ? activeItemRef : null}>
                                    <PrefetchLink className={`admin-li ${isFabricPath ? "active" : ""}`} to="/fabric" prefetchActions={apiSlice.endpoints.getFebric.initiate()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 22c-4.418 0-8-3.646-8-8.143c0-4.462 2.553-9.67 6.537-11.531A3.45 3.45 0 0 1 12 2z" clipRule="evenodd"></path><path fill="currentColor" d="M13.463 2.326A3.45 3.45 0 0 0 12 2v7l4.432-4.432c-.863-.947-1.86-1.724-2.97-2.242" opacity=".3"></path><path fill="currentColor" d="M12 9v5.5l6.614-6.614c-.572-1.22-1.308-2.357-2.182-3.318z" opacity=".4"></path><path fill="currentColor" d="m12 19.5l7.811-7.811a15 15 0 0 0-1.197-3.803L12 14.5z" opacity=".6"></path><path fill="currentColor" d="M19.811 11.689L12 19.5V22c4.418 0 8-3.646 8-8.143c0-.71-.064-1.438-.189-2.168" opacity=".7"></path></svg>
                                        <h6 className="m-0">Fabric</h6>
                                    </PrefetchLink>
                                </li>
                              
                           

                                <li className="my-2" ref={isProductPath ? activeItemRef : null}>
                                    <PrefetchLink className={`admin-li ${isProductPath ? "active" : ""}`} to="/product" prefetchActions={apiSlice.endpoints.getProduct.initiate()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 22c-4.418 0-8-3.646-8-8.143c0-4.462 2.553-9.67 6.537-11.531A3.45 3.45 0 0 1 12 2z" clipRule="evenodd"></path><path fill="currentColor" d="M13.463 2.326A3.45 3.45 0 0 0 12 2v7l4.432-4.432c-.863-.947-1.86-1.724-2.97-2.242" opacity=".3"></path><path fill="currentColor" d="M12 9v5.5l6.614-6.614c-.572-1.22-1.308-2.357-2.182-3.318z" opacity=".4"></path><path fill="currentColor" d="m12 19.5l7.811-7.811a15 15 0 0 0-1.197-3.803L12 14.5z" opacity=".6"></path><path fill="currentColor" d="M19.811 11.689L12 19.5V22c4.418 0 8-3.646 8-8.143c0-.71-.064-1.438-.189-2.168" opacity=".7"></path></svg>
                                        <h6 className="m-0">product</h6>
                                    </PrefetchLink>
                                </li>
                                <li className="my-2" ref={iscutomersPath ? activeItemRef : null}>
                                    <PrefetchLink className={`admin-li ${iscutomersPath ? "active" : ""}`} to="/customers" prefetchActions={[
                                        apiSlice.endpoints.getOrder.initiate(),
                                        apiSlice.endpoints.getCart.initiate(),
                                        apiSlice.endpoints.getReview.initiate(),
                                    ]}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.245 2h9.51c1.159 0 1.738 0 2.206.163a3.05 3.05 0 0 1 1.881 1.936C21 4.581 21 5.177 21 6.37v14.004c0 .858-.985 1.314-1.608.744a.946.946 0 0 0-1.284 0l-.483.442a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0l-.483-.442a.946.946 0 0 0-1.284 0c-.623.57-1.608.114-1.608-.744V6.37c0-1.193 0-1.79.158-2.27c.3-.913.995-1.629 1.881-1.937C5.507 2 6.086 2 7.245 2" opacity=".5"></path><path fill="currentColor" d="M7 6.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 10.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 13.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5z"></path></svg>
                                        <h6 className="m-0">Customers</h6>
                                    </PrefetchLink>
                                </li>
                                <li className="my-2" ref={isBill ? activeItemRef : null}>
                                    <PrefetchLink className={`admin-li ${isBill ? "active" : ""}`} to="/bill" prefetchActions={apiSlice.endpoints.getOrder.initiate()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M4.083 11.894c.439-2.34.658-3.511 1.491-4.203C6.408 7 7.598 7 9.98 7h4.04c2.383 0 3.573 0 4.407.691c.833.692 1.052 1.862 1.491 4.203l.75 4c.617 3.292.926 4.938.026 6.022S18.12 23 14.771 23H9.23c-3.349 0-5.024 0-5.923-1.084c-.9-1.084-.591-2.73.026-6.022z" opacity=".5"></path><path fill="currentColor" d="M9.75 5.985a2.25 2.25 0 0 1 4.5 0v1c.566 0 1.062.002 1.5.015V5.985a3.75 3.75 0 1 0-7.5 0V7c.438-.013.934-.015 1.5-.015zm.128 9.765a2.251 2.251 0 0 0 4.245 0a.75.75 0 1 1 1.414.5a3.751 3.751 0 0 1-7.073 0a.75.75 0 0 1 1.414-.5"></path></svg>
                                        <h6 className="m-0">Bill</h6>
                                    </PrefetchLink>
                                </li>
                             
                                <li className="my-2" ref={isOrder ? activeItemRef : null}>
                                    <PrefetchLink className={`admin-li ${isOrder ? "active" : ""}`} to="/order" prefetchActions={apiSlice.endpoints.getOrder.initiate()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M4.083 11.894c.439-2.34.658-3.511 1.491-4.203C6.408 7 7.598 7 9.98 7h4.04c2.383 0 3.573 0 4.407.691c.833.692 1.052 1.862 1.491 4.203l.75 4c.617 3.292.926 4.938.026 6.022S18.12 23 14.771 23H9.23c-3.349 0-5.024 0-5.923-1.084c-.9-1.084-.591-2.73.026-6.022z" opacity=".5"></path><path fill="currentColor" d="M9.75 5.985a2.25 2.25 0 0 1 4.5 0v1c.566 0 1.062.002 1.5.015V5.985a3.75 3.75 0 1 0-7.5 0V7c.438-.013.934-.015 1.5-.015zm.128 9.765a2.251 2.251 0 0 0 4.245 0a.75.75 0 1 1 1.414.5a3.751 3.751 0 0 1-7.073 0a.75.75 0 0 1 1.414-.5"></path></svg>
                                        <h6 className="m-0">Order</h6>
                                    </PrefetchLink>
                                </li>
                             
                                <li className="my-2" ref={isInventories ? activeItemRef : null}>
                                    <PrefetchLink className={`admin-li ${isInventories ? "active" : ""}`} to="/inventories" prefetchActions={apiSlice.endpoints.getProduct.initiate()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="M4.083 11.894c.439-2.34.658-3.511 1.491-4.203C6.408 7 7.598 7 9.98 7h4.04c2.383 0 3.573 0 4.407.691c.833.692 1.052 1.862 1.491 4.203l.75 4c.617 3.292.926 4.938.026 6.022S18.12 23 14.771 23H9.23c-3.349 0-5.024 0-5.923-1.084c-.9-1.084-.591-2.73.026-6.022z" opacity=".5"></path><path fill="currentColor" d="M9.75 5.985a2.25 2.25 0 0 1 4.5 0v1c.566 0 1.062.002 1.5.015V5.985a3.75 3.75 0 1 0-7.5 0V7c.438-.013.934-.015 1.5-.015zm.128 9.765a2.251 2.251 0 0 0 4.245 0a.75.75 0 1 1 1.414.5a3.751 3.751 0 0 1-7.073 0a.75.75 0 0 1 1.414-.5"></path></svg>
                                        <h6 className="m-0">Inventories</h6>
                                    </PrefetchLink>
                                </li>
                             


                              
                            
                               

                            </ul>
                        </div>
                    </div>
                    <div className="className-bottom">


                        <div className="log-out mt-2">
                            <button className="flex items-center justify-center" onClick={() => setShowLogoutModal(true)} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M5.05806 10.4418C4.81398 10.1977 4.81398 9.80197 5.05806 9.5579L6.72473 7.89123C6.9688 7.64715 7.36453 7.64715 7.60861 7.89123C7.85269 8.13531 7.85269 8.53104 7.60861 8.77511L7.00888 9.37484L13 9.37484C13.3452 9.37484 13.625 9.65466 13.625 9.99984C13.625 10.345 13.3452 10.6248 13 10.6248L7.00888 10.6248L7.60861 11.2246C7.85269 11.4686 7.85269 11.8644 7.60861 12.1084C7.36453 12.3525 6.9688 12.3525 6.72473 12.1084L5.05806 10.4418Z" fill="#495567"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.1211 1.0415H13.0459C14.1856 1.04149 15.1042 1.04147 15.8266 1.13861C16.5767 1.23945 17.2083 1.4552 17.7099 1.9568C18.2115 2.45839 18.4272 3.08996 18.5281 3.84005C18.6252 4.56252 18.6252 5.48112 18.6252 6.62078V13.3789C18.6252 14.5186 18.6252 15.4372 18.5281 16.1596C18.4272 16.9097 18.2115 17.5413 17.7099 18.0429C17.2083 18.5445 16.5767 18.7602 15.8266 18.8611C15.1042 18.9582 14.1856 18.9582 13.0459 18.9582H12.1211C10.9815 18.9582 10.0629 18.9582 9.34039 18.8611C8.5903 18.7602 7.95874 18.5445 7.45714 18.0429C7.12469 17.7104 6.91723 17.3202 6.78587 16.8747C5.99307 16.8737 5.33255 16.8649 4.79741 16.793C4.16078 16.7074 3.60883 16.5222 3.16825 16.0816C2.72768 15.641 2.54244 15.0891 2.45685 14.4524C2.37497 13.8434 2.37498 13.072 2.375 12.1279V7.87176C2.37498 6.92775 2.37497 6.15629 2.45685 5.54724C2.54244 4.91062 2.72768 4.35867 3.16825 3.91809C3.60883 3.47751 4.16078 3.29228 4.79741 3.20669C5.33255 3.13474 5.99307 3.12602 6.78587 3.12498C6.91723 2.67952 7.12469 2.28924 7.45714 1.9568C7.95874 1.4552 8.5903 1.23945 9.34039 1.13861C10.0629 1.04147 10.9815 1.04149 12.1211 1.0415ZM6.54331 14.17C6.5463 14.7071 6.55516 15.1909 6.5857 15.6241C5.8903 15.6214 5.37333 15.6092 4.96397 15.5541C4.46595 15.4872 4.22175 15.3673 4.05214 15.1977C3.88252 15.0281 3.76266 14.7839 3.6957 14.2859C3.62633 13.7699 3.625 13.0829 3.625 12.0832V7.91651C3.625 6.91674 3.62633 6.2298 3.6957 5.7138C3.76266 5.21579 3.88252 4.97159 4.05214 4.80197C4.22175 4.63236 4.46595 4.5125 4.96397 4.44554C5.37333 4.3905 5.8903 4.37829 6.5857 4.3756C6.55516 4.80878 6.5463 5.29258 6.54331 5.82969C6.54138 6.17487 6.81964 6.45624 7.16482 6.45816C7.50999 6.46008 7.79136 6.18182 7.79329 5.83665C7.79836 4.9254 7.82202 4.2795 7.91207 3.78929C7.99883 3.31695 8.13814 3.04356 8.34102 2.84068C8.57166 2.61004 8.89547 2.45967 9.50695 2.37746C10.1364 2.29283 10.9707 2.29151 12.1668 2.29151H13.0002C14.1964 2.29151 15.0306 2.29283 15.6601 2.37746C16.2716 2.45967 16.5954 2.61004 16.826 2.84068C17.0566 3.07132 17.207 3.39513 17.2892 4.00661C17.3739 4.63606 17.3752 5.47032 17.3752 6.6665V13.3332C17.3752 14.5294 17.3739 15.3636 17.2892 15.9931C17.207 16.6046 17.0566 16.9284 16.826 17.159C16.5954 17.3896 16.2716 17.54 15.6601 17.6222C15.0306 17.7068 14.1964 17.7082 13.0002 17.7082H12.1668C10.9707 17.7082 10.1364 17.7068 9.50695 17.6222C8.89547 17.54 8.57166 17.3896 8.34102 17.159C8.13814 16.9561 7.99883 16.6827 7.91207 16.2104C7.82202 15.7202 7.79836 15.0743 7.79329 14.163C7.79136 13.8179 7.50999 13.5396 7.16482 13.5415C6.81964 13.5434 6.54138 13.8248 6.54331 14.17Z" fill="#495567"></path>
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                <div className="bg-white">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-medium text-gray">Logout</h3>
                                        <div onClick={() => setShowLogoutModal(false)}>
                                            <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="pt-[14px] text-[#8492A6]">Are you sure you want to logout?</p>
                                </div>
                                <div className="pt-[30px] flex flex-row-reverse gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            localStorage.removeItem("dresstoken");
                                            navigate("/");
                                            setTimeout(() => {
                                                window.location.reload();
                                            });
                                        }}
                                        className="inline-flex h-[35px] sm:h-[40px] w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center justify-center py-2 text-sm font-semibold text-white shadow-xs sm:ml-3"
                                    >
                                        Logout
                                    </button>
                                    <button
                                        type="button"
                                        className=" bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] rounded-md border-0 inline-flex justify-center items-center py-2 text-sm font-semibold shadow-xs sm:mt-0"
                                        onClick={() => setShowLogoutModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default EmployList
