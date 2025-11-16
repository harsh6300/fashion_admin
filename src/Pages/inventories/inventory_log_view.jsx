import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Meen from '../../assets/meen.png'
import Searchdropdown from '../../Componenet/searchdropdown'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Or choose another theme
import { Icon } from '@iconify/react';
import Multiselect from 'multiselect-react-dropdown';
import { useAddCouponMutation, useAddInventoryMutation, useDeleteInventoriesMutation, useGetInventoriesQuery, useGetInventoylogQuery, useGetProductQuery, useGetWarehouseQuery } from '../../services/apiSlice';

const Create_coupone = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [value, setValue] = useState(1);
    const increment = () => setValue((prev) => Math.min(prev + 1, 100));
    const decrement = () => setValue((prev) => Math.max(prev - 1, 0));
    const [role, setRole] = useState(""); // selected value
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // control dropdown open/close
    const navigate = useNavigate();
    const [Type, setType] = useState("percentage");
    const [name, setname] = useState("");
    const [warehouss, setwarehouse] = useState("");
    const [productss, setProduct] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [reorder_level, setreorder_level] = useState("");

    const location = useLocation()
    const { data: inventor } = useGetInventoylogQuery()

    const [openDropdown1, setOpenDropdown1] = useState(null); // Track which dropdown is open

    const toggleDropdown1 = (label) => {
        console.log(label);

        setOpenDropdown1((prev) => (prev == label ? null : label));
    };
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const { data: categories } = useGetInventoriesQuery();
    const categories1 = categories?.data || [];
    const log = inventor?.data

    const filter_data = log?.filter((val) => val.inventory == location.state.inventory_id)
    console.log(filter_data);
    const [deleteCategory] = useDeleteInventoriesMutation();


    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const filteredData = filter_data?.filter(item =>
        Object.values(item).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    const displayedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const handleItemChange = (event) => {
        const value = parseInt(event.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };
function formatDateToYYMMDD(isoString) {
  const date = new Date(isoString);
  const yy = String(date.getFullYear()).slice(2); // e.g., "25"
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // e.g., "05"
  const dd = String(date.getDate()).padStart(2, '0'); // e.g., "14"

  return `${yy}-${mm}-${dd}`; // e.g., "25-05-14"
}

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
            />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Inventory Log"} />
                    <div className="flex justify-between gap-[10px] mb-[30px] flex-wrap max-sm:mb-[20px]" >
                      <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> inventories Log</h3> 
                    </div>

               
                    <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] flex  gap-4 max-lg:items-center justify-between">

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
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">Log Information</h3>
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

                        <div className="min-h-[65vh] ">
                            <table className="w-full ">
                                <thead className="border-y border-[#ddd]">

                                    <tr className="max-sm:h-[40px] h-[54px] ">


                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap  max-md:text-[13px] max-sm:px-[10px]">Inventory</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Quantity</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-lg:hidden  max-sm:px-[10px]">Reason</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-lg:hidden max-sm:px-[10px]">Type</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Date</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Action</th>
                                    </tr>


                                </thead>
                                <tbody className="">
                                    {displayedData?.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="h-[44px] sm:h-[58px] transition-all duration-200 bg-white  border-b border-[#ddd]" onClick={(e) => {
                                               
                                            }} 
                                        >

                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  max-md:text-[12px]">{item.inventory}</td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  max-md:text-[12px]">{item.quantity_changed}</td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  max-md:text-[12px]">{item.reason}</td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  max-md:text-[12px]">{item.change_type}</td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  max-md:text-[12px]">{formatDateToYYMMDD(item.created_at)}</td>
                                          

                                            <td className="text-sm text-[#5E5873] text-center px-[30px] max-xl:px-[10px] max-sm:px-[5px]">
                                                <div className="flex gap-2 justify-center max-md:gap-1 max-sm:gap-0">
                                                    <button className="w-[44px] h-[32px] max-md:h-[35px] max-md:w-[35px] max-sm:hidden bg-[#ff6c2f1a] flex justify-center items-center text-primary rounded-[0.5rem] hover:bg-primary hover:text-white" onClick={(e) => {
                                                        e.stopPropagation();
                                                       
                                                    }}>
                                                        <Icon icon="solar:pen-2-broken" className="align-middle h-[1.3em] w-[1.3em]" />
                                                    </button>
                                                    <button className="w-[44px] h-[32px] max-md:h-[35px] max-md:w-[35px] bg-[#ff6c2f1a] flex justify-center items-center text-primary hover:bg-primary hover:text-white rounded-[0.5rem]" onClick={(e) => {
                                                        e.stopPropagation();
                                                        // openModal('modal3')
                                                        setDeletcategory(item?.inventory_id);
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M20.5 6h-17m5.67-2a3.001 3.001 0 0 1 5.66 0m3.544 11.4c-.177 2.654-.266 3.981-1.131 4.79s-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79l-.46-6.9m13.666 0l-.2 3"></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="w-[54px] h-[32px] max-md:h-[35px] max-md:w-[35px] bg-[#3b82f61a] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white flex justify-center items-center rounded-[0.5rem]"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // openModal('modal4');
                                                            setSelectedInventory(item?.inventory_id);
                                                        }}
                                                    >
                                                        Entry
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                        {categories1.length > itemsPerPage && (
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
        </div >
    )
}

export default Create_coupone
