import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useDeleteCategoryMutation, useGetProfileQuery, useGetBillQuery, useDeleteBillMutation, } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import Category_img from '../../assets/category.png'
import { Icon } from '@iconify/react';


const Category = () => {
    const [modal, setModal] = useState(null);



    const navigate = useNavigate()


    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);

    // ✅ Fetch categories using RTK Query
    const { data: Bills } = useGetBillQuery();
    const [deletebillid] = useDeleteBillMutation();
    const Bills1 = Bills?.bills || [];





    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);


    const [deletebill, setDeletebill] = useState(null);
    // ✅ Handle Delete Category
    const handledeletebill = async () => {
        try {
            const formdata = new FormData()

            formdata.append('bill_id', deletebill)

            await deletebillid(formdata).unwrap();
            toast.success("Bill deleted successfully!");
            closeModal();
        } catch (error) {
            toast.error(error.data?.message || "Failed to delete bill");
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

    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const filteredData = Bills1



    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    const displayedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    console.log(displayedData);


    const handleItemChange = (event) => {
        const value = parseInt(event.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };



    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            setSelectedImage(URL.createObjectURL(file));
            setCategory((prev) => ({ ...prev, file })); // Store the file object
        }
    };
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




    const [checkedItems, setCheckedItems] = useState({});

    const toggleCheckbox = (id) => {
        setCheckedItems((prev) => {
            const updated = { ...prev, [id]: !prev[id] };

            // Update header checkbox state
            const allChecked = categories1.every(item => updated[item.category_id]);
            setHeaderChecked(allChecked);

            return updated;
        });
    };

    const [headerChecked, setHeaderChecked] = useState(false);

    const toggleHeaderCheckbox = () => {
        const newCheckedState = !headerChecked;
        setCheckedItems(Array(displayedData.length).fill(newCheckedState));
        setHeaderChecked(newCheckedState);
    };


    // --------------------------------dropdown
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Bills"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Bills</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">


                                <li className="text-primary font-medium text-[12px]">All Bills</li>
                            </ol>
                        </nav>


                    </div>

                    <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] flex  gap-4 items-center justify-between">


                            <div>
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">All Bills List</h3>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 max-md:hidden">
                                    <span className="text-[#95989d] text-[12px]">Showing</span>
                                    <select
                                        onChange={handleItemChange}
                                        value={itemsPerPage}
                                        className="border-[#dce7f2] text-[#5E5873] rounded-[6px] text-sm border h-[35px] ps-[5px] pe-[10px]"
                                    >
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                    </select>
                                    <span className="text-[#95989d] text-[12px]">Entries</span>
                                </div>
                                <div>
                                    <Link to="/create_bill">
                                        <button className="bg-[#ff6c2f] text-white text-[12.6px] rounded-[8px] py-[5.56px] px-[12px]">Add Bill</button>
                                    </Link>
                                </div>
                                <div>

                                    <div className="relative inline-block text-left max-sm:hidden" ref={dropdownRef}>
                                        <button
                                            onClick={() => setOpen(!open)}
                                            className="bg-[#eef2f7] text-[#5d7186] text-[12.6px] rounded-[8px] py-[6px] px-[12px] hover:bg-[#dce3ec] transition-colors"
                                        >
                                            This Month
                                        </button>

                                        {open && (
                                            <div className="absolute right-0 mt-2 w-40 bg-[#eef2f7] border border-[#ddd] rounded-[8px] shadow-md z-10">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-[#5d7186] hover:bg-[#dce3ec] transition-colors"
                                                >
                                                    Download
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-[#5d7186] hover:bg-[#dce3ec] transition-colors"
                                                >
                                                    Export
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-[#5d7186] hover:bg-[#dce3ec] transition-colors"
                                                >
                                                    Import
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="min-h-[65vh] overflow-x-auto">
                            <table className="w-full ">
                                <thead className="border-y border-[#ddd]">

                                    <tr className="max-sm:h-[40px] h-[54px] ">
                                        <th className="px-[30px]  max-xl:px-[10px]">
                                            <div className="text-start  text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">

                                                Bill No

                                            </div>
                                        </th>

                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px]  max-sm:px-[10px]">Name</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Dis. Amount</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">GST Amount</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Mode</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Action</th>
                                    </tr>


                                </thead>
                                <tbody className="">
                                    {displayedData.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="h-[44px] sm:h-[58px] transition-all duration-200 bg-white hover:bg-[rgba(238,243,249,0.8)] border-b border-[#ddd]" onClick={() => navigate("/edit_bill", { state: { bill_id: item } })}
                                        >
                                            <td className="text-sm text-[#5E5873]  px-[30px]  max-xl:px-[10px] max-sm:px-[5px] text-nowrap max-md:text-[12px] ">





                                                    {item.bill_number}


                                            </td>


                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] text-nowrap max-md:text-[12px] ">
                                                {item?.customer?.name}
                                            </td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:text-[12px]">
                                                {item?.discount_amount}
                                            </td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:text-[12px]">
                                                {item?.gst_amount}
                                            </td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:text-[12px]">
                                                {item?.payment_mode}
                                            </td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px] max-xl:px-[10px] max-sm:px-[5px]">
                                                <div className="flex gap-2 justify-center max-md:gap-1 max-sm:gap-0">
                                                    {/* <button className="w-[44px] h-[32px] max-md:h-[25px] max-md:w-[30px] bg-[#ff6c2f1a] flex justify-center items-center text-primary rounded-[0.5rem] hover:bg-primary max-md:hidden hover:text-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                            <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                <path strokeLinecap="round" d="M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821"></path>
                                                                <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"></path>
                                                            </g>
                                                        </svg>
                                                    </button> */}
                                                    <button className="w-[44px] h-[32px] max-md:h-[35px] max-md:w-[35px] max-sm:hidden bg-[#ff6c2f1a] flex justify-center items-center text-primary rounded-[0.5rem] hover:bg-primary hover:text-white">
                                                        <Icon icon="solar:pen-2-broken" className="align-middle h-[1.3em] w-[1.3em]" />
                                                    </button>
                                                    <button onClick={(e) => {
                                                        openModal('modal3')
                                                        e.stopPropagation(); // Prevent row click event
                                                        setDeletebill(item)
                                                    }} className="w-[44px] h-[32px] max-md:h-[35px] max-md:w-[35px] bg-[#ff6c2f1a] flex justify-center items-center text-primary hover:bg-primary hover:text-white rounded-[0.5rem]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M20.5 6h-17m5.67-2a3.001 3.001 0 0 1 5.66 0m3.544 11.4c-.177 2.654-.266 3.981-1.131 4.79s-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79l-.46-6.9m13.666 0l-.2 3"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                        {Bills1.length > itemsPerPage && (
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
                                        <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this user?</p>


                                    </div>
                                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                        <button type="button" onClick={handledeletebill} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
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
export default Category
