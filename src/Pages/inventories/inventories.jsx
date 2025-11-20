import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import { ToastContainer, toast } from "react-toastify";
import { useGetProductQuery, useDeleteProductMutation, useAddInventoryMutation } from "../../services/apiSlice";
import { Link } from "react-router-dom";
import Category_img from '../../assets/category.png'
import { Icon } from '@iconify/react';

const Product = () => {

    const [form, setForm] = useState({
        product_id: '',
        variant_id: '',
        change_type: '',
        quantity_changed: '',
        reorder_level: '',
        reason: '',

    });


    // ✅ Fetch categories using RTK Query
    const { data: product } = useGetProductQuery();
    const [deleteProductId] = useDeleteProductMutation();
    const productdata = product?.data || [];
    console.log(productdata);


    const [modal, setModal] = useState(null);


    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);


    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);



    const [deleteProduct, setDeletProduct] = useState(null);

    const handleDeleteCategory = async () => {
        try {

            const formdata = new FormData()

            formdata.append('product_id', deleteProduct)

            await deleteProductId(formdata).unwrap();
            toast.success("Product deleted successfully!");
            closeModal();
        } catch (error) {
            toast.error(error.data?.message || "Failed to delete category");
        }
    };

    // ✅ Dropdown Handling
    const toggleDropdown = (index) => setOpenDropdown(openDropdown === index ? null : index);
    const handleClickOutside = (event) => {
        dropdownRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                setOpenDropdown((prev) => (prev === index ? null : prev));
            }
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil((productdata?.length || 0) / itemsPerPage);
    // const displayedData = data ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const filteredData = productdata?.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleItemChange = (event) => {
        const value = parseInt(event.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };


    const [selectedImage, setSelectedImage] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal1 = () => {
        setIsModalOpen(false);
        setModalImage("");
    };

    const navigate = useNavigate()

    // ----------------------------
    const [checkedItems, setCheckedItems] = useState({});

    const toggleCheckbox = (id) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const [headerChecked, setHeaderChecked] = useState(false);

    const toggleHeaderCheckbox = () => {
        const newCheckedState = !headerChecked;
        setCheckedItems(Array(displayedData.length).fill(newCheckedState));
        setHeaderChecked(newCheckedState);
    };



    // ------------------------------fropdown
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const [addInventories] = useAddInventoryMutation(); // Assuming you have a mutation for adding color


    const [openIndex, setOpenIndex] = useState(null);
    const handlesubmit = async () => {
        try {
            const formData = new FormData();

            formData.append('product_id', form?.product_id);
            formData.append('variant_id', form?.variant_id);
            formData.append('change_type', form?.change_type);
            formData.append('quantity_changed', form?.quantity_changed);
            formData.append('reorder_level', form?.reorder_level);
            formData.append('reason', form?.reason);



            const response = await addInventories(formData).unwrap();

            toast.success("Inventori successfully add!");

            closeModal()



        } catch (error) {
            const errorMessage =
                error?.data?.message ||         // RTK Query error format
                error?.detail ||         // RTK Query error format
                error?.data?.detail ||         // RTK Query error format
                error?.error ||                 // RTK fallback error message (e.g., network error)
                error?.message ||               // JS error object message
                "Something went wrong!";
        }
    };


    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
            />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                {/* <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} /> */}
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Product"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase ">Product</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">


                                <li className="text-primary font-medium text-[12px]">All Product</li>
                            </ol>
                        </nav>


                    </div>

                    <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] flex  gap-4 items-center justify-between">

                            {/* <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full lg:w-auto">

                           


                            <div className=" max-sm:w-[250px] w-[458px]">
                                <fieldset className="relative border border-[#dce7f2] text-[#5E5873] rounded-[6px] h-[40px] mt-2 lg:mt-0">
                                    <input
                                        placeholder="Search here..."
                                        tabIndex="2"
                                        required
                                        type="text"
                                        name="name"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="outline-none shadow-none w-full h-full pr-8 text-sm font-inter font-normal leading-5 bg-transparent focus:bg-white selection:bg-white text-heading ps-[10px] transition-colors duration-200"
                                    />
                                    <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 -translate-y-1/2 text-[#5E5873] text-sm pointer-events-none"></i>
                                </fieldset>
                            </div> 
                        </div>*/}

                            <div>
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">All Product List</h3>
                            </div>
                          


                        </div>

                        <div className="min-h-[65vh] ">
                            <table className="w-full">
                                <thead className="border-y border-[#ddd]">
                                    <tr className="max-sm:h-[40px] h-[54px]">
                                        <th className="px-[30px] max-xl:px-[10px]">
                                            <div className="text-start text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">
                                                Product Name & Size
                                            </div>
                                        </th>

                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-lg:hidden">
                                            Discount Price
                                        </th>

                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap">
                                            Price
                                        </th>

                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:hidden">
                                            Slug
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {displayedData.map((item, index) => (
                                        <>
                                            {/* MAIN PRODUCT ROW */}
                                            <tr
                                                key={index}
                                                className="h-[44px] sm:h-[58px] bg-white hover:bg-[rgba(238,243,249,0.8)] border-b border-[#ddd] cursor-pointer"
                                                onClick={() =>
                                                    setOpenIndex(openIndex === index ? null : index)
                                                }
                                            >
                                                <td className="text-sm text-[#5E5873] flex px-[30px] max-xl:px-[10px] max-sm:px-[5px] items-center gap-2 my-[15px]">
                                                    <div>
                                                        <h1 className="text-[#313b5e]">{item.name}</h1>
                                                    </div>
                                                </td>

                                                <td className="text-sm text-[#5E5873] text-center max-lg:hidden px-[30px]">
                                                    {item.discount_price}
                                                </td>

                                                <td className="text-sm text-[#5E5873] text-center px-[30px]">
                                                    {item.price}
                                                </td>

                                                <td className="text-sm text-[#5E5873] text-center px-[30px] py-[15px] flex justify-center items-center">
                                                    <svg
                                                        className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"
                                                            }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        fill="#000"
                                                        viewBox="0 0 30.727 30.727"
                                                    >
                                                        <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536
                                        c0.977-0.977,2.559-0.976,3.536,0l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0
                                        C30.971,7.624,30.971,9.206,29.994,10.183z" />
                                                    </svg>
                                                </td>
                                            </tr>

                                            {/* SUB VARIANT TABLE */}
                                            {openIndex === index && (
                                                <tr>
                                                    <td colSpan="4" className="bg-[#f9fbfd] p-0">
                                                        <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-[500px] px-5 py-3">

                                                            <table className="w-full border border-[#ddd] mb-2 rounded">
                                                                <thead className="bg-gray-100 border-b border-[#ddd]">
                                                                    <tr>
                                                                        <th className="p-2 text-left text-sm font-semibold">Color</th>
                                                                        <th className="p-2 text-left text-sm font-semibold">Size</th>
                                                                        <th className="p-2 text-left text-sm font-semibold">Stock</th>
                                                                        <th className="p-2 text-center text-sm font-semibold">Action</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                    {item.variants?.map((variant) => (
                                                                        <tr
                                                                            key={variant.variant_id}
                                                                            className="border-b hover:bg-gray-50"
                                                                        >
                                                                            <td className="p-2 text-sm">{variant.color}</td>
                                                                            <td className="p-2 text-sm">{variant.size}</td>
                                                                            <td className="p-2 text-sm">{variant.stock}</td>

                                                                            <td className="p-2 text-center">
                                                                                <button
                                                                                    className="bg-[#ff6c2f] text-white text-sm px-4 py-1 rounded hover:bg-[#ff4d00]"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        setForm({
                                                                                            product_id: item?.product_id,
                                                                                            variant_id: variant?.variant_id
                                                                                        })
                                                                                        openModal('modal1')
                                                                                    }}
                                                                                >
                                                                                    Add
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>

                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {productdata.length > itemsPerPage && (
                            <div className="flex items-center max-md:justify-center justify-end my-[20px] mx-[30px]  rounded-[8px] ">
                                {/* Previous Button */}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`h-[32px] md:h-[38px] bg-[#ff6c2f1a] flex items-center justify-center border-[1px] text-[14px] border-[#eaedf1] px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    Previous
                                </button>

                                {/* Pagination */}
                                <ul className="flex h-[32px] md:h-[38px] text-[14px]   border-[#eaedf1]">
                                    {currentPage > 2 && (
                                        <>
                                            <li
                                                onClick={() => setCurrentPage(1)}
                                                className="h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold cursor-pointer text-[#5d7186] hover:bg-[#ff6c2f1a]"
                                            >
                                                1
                                            </li>
                                            <li className="h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold text-[#5d7186]">
                                                ...
                                            </li>
                                        </>
                                    )}

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        if (page >= currentPage - 2 && page <= currentPage + 2) {
                                            return (
                                                <li
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold transition-all duration-200 ${currentPage === page ? "bg-[#ff6c2f] text-white" : "bg-transparent text-[#5d7186] cursor-pointer hover:bg-[#ff6c2f1a]"}`}
                                                >
                                                    {page}
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}

                                    {currentPage < totalPages - 2 && (
                                        <>
                                            <li className="h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold text-[#5d7186]">
                                                ...
                                            </li>
                                            <li
                                                onClick={() => setCurrentPage(totalPages)}
                                                className="h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold cursor-pointer text-[#5d7186] hover:bg-[#ff6c2f1a]"
                                            >
                                                {totalPages}
                                            </li>
                                        </>
                                    )}
                                </ul>

                                {/* Next Button */}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`h-[32px] md:h-[38px] bg-[#ff6c2f1a] border-[1px] border-[#eaedf1] flex items-center text-[14px] justify-center px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    Next
                                </button>
                            </div>

                        )}


                    </div>
                </div>
            </div>





            {
                modal === 'modal1' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden py-[30px]  rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                    <div className="bg-white ">
                                        <div className="flex items-center border-b pb-[10px] px-[30px] justify-between">
                                            <h3 className="text-xl font-medium text-gray">Add Inventories</h3>
                                            <div onClick={closeModal}>
                                                <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                </svg>
                                            </div>
                                        </div>
                                        {/* <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this product?</p> */}
                                        <div className="px-[30px] grid grid-cols-1 gap-3">

                                            <div className="mt-5">
                                                <label className="text-sm mb-[10px] text-[#313b5e] block" > Type</label>
                                                <input type="text"
                                                    value={form.change_type}
                                                    onChange={(e) => setForm({ ...form, change_type: e.target.value })}
                                                    className="h-[40px] bg-transparent transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" />
                                            </div>
                                            <div className="">
                                                <label className="text-sm mb-[10px] text-[#313b5e] block" > Quantity</label>
                                                <input type="number"
                                                    value={form.quantity_changed}
                                                    onChange={(e) => setForm({ ...form, quantity_changed: e.target.value })}
                                                    className="h-[40px] bg-transparent transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" />
                                            </div>
                                            <div className="">
                                                <label className="text-sm mb-[10px] text-[#313b5e] block" > Reorder Level</label>
                                                <input type="number"
                                                    value={form.reorder_level}
                                                    onChange={(e) => setForm({ ...form, reorder_level: e.target.value })}
                                                    className="h-[40px] bg-transparent transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" />
                                            </div>
                                            <div className="">
                                                <label className="text-sm mb-[10px] text-[#313b5e] block" > Reason</label>
                                                <textarea type="text"
                                                    value={form.reason}
                                                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                                                    className="h-[80px] bg-transparent transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="  p-[30px] pb-0 flex flex-row-reverse gap-3 ">
                                        <button type="button" onClick={handlesubmit} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#ff6c2f] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Add</button>
                                        <button type="button" className=" bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                modal === 'modal3' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                    <div className="bg-white ">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-medium text-gray">Delete</h3>
                                            <div onClick={closeModal}>
                                                <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this product?</p>


                                    </div>
                                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                        <button type="button" onClick={handleDeleteCategory} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
                                        <button type="button" className=" bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {isModalOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={closeModal}
                >
                    <div className="">
                        <img
                            src={modalImage}
                            alt="Zoomed"
                            className="w-auto h-auto max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
                        />
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-xl"
                            onClick={closeModal1}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}


        </div>
    )
}
export default Product
