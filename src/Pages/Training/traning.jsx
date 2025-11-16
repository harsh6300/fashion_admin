import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import Searchdropdown from '../../Componenet/searchdropdown'
import DateRangePickerComponent from '../../Componenet/datepickerfilter'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetCategoriesQuery, useDeleteCategoryMutation, useGetProfileQuery, } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const Category = () => {
    const daysInMonth = Array.from({ length: 22 }, (_, i) => i + 1); // You can make this dynamic

    const [modal, setModal] = useState(null);
    const [list, setlist] = useState('Additions');

    // ✅ Open & Close Modal
    const openlist = (modalId) => setlist(modalId);

    const navigate = useNavigate()

    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const handleItemChange = (event) => {
        const value = parseInt(event.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const [openDropdown1, setOpenDropdown1] = useState(null); // Track which dropdown is open

    const toggleDropdown1 = (label) => {
        setOpenDropdown1((prev) => (prev == label ? null : label));
    };
    const [status, setStatus] = useState('')
    const [name, setname] = useState('')
    const [type, setType] = useState('');
    const [amount, setamount] = useState('');
    const [category, setCategory] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]); // Only one file shown
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Training"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793]  uppercase">Training</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                
                                <li className="text-primary font-medium text-[12px]">Training</li>
                            </ol>
                        </nav>


                    </div>



                    <div className="border mt-[30px]  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] py-[15px] flex  gap-4 items-center justify-between flex-wrap">


                            <div>
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans"> Training List
                                </h3>

                            </div>
                            <div className="flex gap-2 items-center">
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
                                    <DateRangePickerComponent />
                                </div>
                                <div>

                                    <button onClick={() => {
                                       navigate('/add_Training')
                                    }} className="bg-primary text-white text-[12.6px] rounded-[8px] py-[6px] px-[12px]  transition-colors ">Add Training</button>
                                </div>


                            </div>


                        </div>

                        <div className="overflow-x-scroll over__scroll">
                            <div className="min-w-full w-fit">


                                <table className="w-full ">
                                    <thead className="border-y border-[#ddd]">

                                        <tr className="max-sm:h-[40px] h-[54px] ">
                                            <th className="px-[30px]  max-xl:px-[10px]">
                                                <div className="text-start  text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">

                                                    Name

                                                </div>
                                            </th>

                                            <th className="text-[14px] font-bold text-left text-[#5d7186] sans text-nowrap  max-md:text-[13px] max-sm:px-[10px]">
                                                Department </th>
                                            <th className="text-[14px] font-bold text-left text-[#5d7186] sans text-nowrap max-sm:hidden max-md:text-[13px] max-sm:px-[10px]">Description</th>
                                            <th className="text-[14px] font-bold text-left text-[#5d7186] sans text-nowrap max-sm:hidden max-md:text-[13px] max-sm:px-[10px]">Created Date</th>


                                            <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Action</th>
                                        </tr>


                                    </thead>
                                    <tbody className="">
                                        <tr className="border-t">
                                            {/* Sticky Name Cell */}
                                            <td className="  px-[30px] py-3 max-xl:px-[10px]">
                                                <div className="flex items-center gap-2">

                                                    <span className="text-[14px] whitespace-nowrap text-[#878a99]">
                                                        John Smith
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="  z-10 px-[20px]   max-sm:px-[10px] py-3 ">

                                                <span className="text-[14px] whitespace-nowrap text-[#878a99]">
                                                    Business Intelligence Analyst
                                                </span>

                                            </td>
                                            <td className=" max-sm:hidden z-10 px-[20px] max-sm:px-[10px] py-3 ">

                                                <span className="text-[14px] whitespace-nowrap text-[#878a99]">
                                                    Guidelines regarding employee absences from work
                                                </span>

                                            </td>
                                            <td className=" max-sm:hidden z-10 px-[20px] max-sm:px-[10px] py-3 ">

                                                <span className="text-[14px] whitespace-nowrap text-[#878a99]">
                                                    14/01/2024
                                                </span>

                                            </td>
                                            <td className="  px-[20px] max-sm:px-[10px] py-3 ">

                                                <a

                                                    data-modal-target="schedule_timing"
                                                    data-modal-toggle="schedule_timing"
                                                    onClick={() => openModal('modal4')}
                                                    className="flex cursor-pointer items-center justify-center bg-dark text-sm font-medium py-2 rounded text-white px-2 hover:text-primary "
                                                >
                                                    Schedule Timing
                                                </a>

                                            </td>
                                        </tr>
                                    </tbody>

                                </table>


                            </div>
                        </div>


                    </div>








                </div>



            </div>


            {modal === 'modal3' && (
                <div className="relative z-10 modal" id="modal1" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" id="overlay"></div>

                    <div className="fixed inset-0 z-10 w-screen 
 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform    p-[30px] rounded-[30px] bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-2xl">
                                <div className="bg-white ">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-medium text-gray">Add Shift </h3>
                                        <div>
                                            <svg onClick={() => closeModal()} className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="pt-[14px] text-[#8492A6]">Required fields are marked with&nbsp;<span className="text-[#F44336] ">*</span></p>

                                    <form action="" className="mt-[30px] ">
                                        <div className='grid grid-cols-1  w-full gap-x-[20px]  gap-[15px]'>
                                            <div>
                                                <label className="block text-sm  text-gray font-medium">Name&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                <input type="text"
                                                    onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                            </div>
                                            <div className="grid grid-cols-2 border-b border-[#a5a5a5] pb-[20px] max-md:grid-cols-1 gap-[20px]">
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">Lable&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>

                                                <Searchdropdown
                                                    options={['True', "False"]}
                                                    label="Break "
                                                    onToggle={() => toggleDropdown1("Break ")} // Pass 'Category' to toggle it
                                                    isOpen={openDropdown1 === "Break "} // Check if this dropdown is open
                                                    setIsOpen={(state) => setOpenDropdown1(state ? "Break " : null)}
                                                    onSelect={(e) => setType(e)}
                                                />
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">Start Time&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">End Time&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 border-b border-[#a5a5a5] pb-[20px] max-md:grid-cols-1 gap-[20px]">
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">Lable&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>

                                                <Searchdropdown
                                                    options={['True', "False"]}
                                                    label="Break "
                                                    onToggle={() => toggleDropdown1("Break ")} // Pass 'Category' to toggle it
                                                    isOpen={openDropdown1 === "Break "} // Check if this dropdown is open
                                                    setIsOpen={(state) => setOpenDropdown1(state ? "Break " : null)}
                                                    onSelect={(e) => setType(e)}
                                                />
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">Start Time&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">End Time&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 border-b border-[#a5a5a5] pb-[20px] max-md:grid-cols-1 gap-[20px]">
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">Lable&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>

                                                <Searchdropdown
                                                    options={['True', "False"]}
                                                    label="Break "
                                                    onToggle={() => toggleDropdown1("Break ")} // Pass 'Category' to toggle it
                                                    isOpen={openDropdown1 === "Break "} // Check if this dropdown is open
                                                    setIsOpen={(state) => setOpenDropdown1(state ? "Break " : null)}
                                                    onSelect={(e) => setType(e)}
                                                />
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">Start Time&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">End Time&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                            </div>
                                            




                                        </div>


                                    </form>

                                </div>
                                <div className=" pt-[30px] flex flex-row-reverse  gap-3">
                                    <button type="button" className="inline-flex  items-center justify-center h-[35px] sm:h-[40px]  shadow-[0px_8px_20px_1px_#3DB0F733] rounded-md bg-primary    w-[154px] py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Add Shift </button>
                                    <button type="button" onClick={() => closeModal()} className=" text-primary items-center closeModal h-[35px] sm:h-[40px]  inline-flex  justify-center rounded-md bg-white    py-2 w-[114px] text-sm font-semibold  ring-1 shadow-xs ring-primary ring-inset hover:bg-gray-50 sm:mt-0 ">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {modal === 'modal4' && (
                <div className="relative z-10 modal" id="modal1" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" id="overlay"></div>

                    <div className="fixed inset-0 z-10 w-screen 
 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform    p-[30px] rounded-[30px] bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-2xl">
                                <div className="bg-white ">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-medium text-gray">Add Shift Period</h3>
                                        <div>
                                            <svg onClick={() => closeModal()} className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="pt-[14px] text-[#8492A6]">Required fields are marked with&nbsp;<span className="text-[#F44336] ">*</span></p>

                                    <form action="" className="mt-[30px] ">
                                        <div className='grid grid-cols-1  w-full gap-x-[20px]  gap-[15px]'>
                                            <div>
                                                <label className="block text-sm  text-gray font-medium">Label&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                <input type="text"
                                                    onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                            </div>
                                            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px]">

                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">Start Time&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm  text-gray font-medium">End Time&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                    <input type="text"
                                                        onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px]">

                                                <Searchdropdown
                                                    options={['True', "False"]}
                                                    label="Break "
                                                    onToggle={() => toggleDropdown1("Break ")} // Pass 'Category' to toggle it
                                                    isOpen={openDropdown1 === "Break "} // Check if this dropdown is open
                                                    setIsOpen={(state) => setOpenDropdown1(state ? "Break " : null)}
                                                    onSelect={(e) => setType(e)}
                                                />
                                                <Searchdropdown
                                                    options={['True', "False"]}
                                                    label="Half Day "
                                                    onToggle={() => toggleDropdown1("Half Day ")} // Pass 'Category' to toggle it
                                                    isOpen={openDropdown1 === "Half Day "} // Check if this dropdown is open
                                                    setIsOpen={(state) => setOpenDropdown1(state ? "Half Day " : null)}
                                                    onSelect={(e) => setType(e)}
                                                />
                                            </div>




                                        </div>


                                    </form>

                                </div>
                                <div className=" pt-[30px] flex flex-row-reverse  gap-3">
                                    <button type="button" className="inline-flex  items-center justify-center h-[35px] sm:h-[40px]  shadow-[0px_8px_20px_1px_#3DB0F733] rounded-md bg-primary    w-[154px] py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Add Shift Period</button>
                                    <button type="button" onClick={() => closeModal()} className=" text-primary items-center closeModal h-[35px] sm:h-[40px]  inline-flex  justify-center rounded-md bg-white    py-2 w-[114px] text-sm font-semibold  ring-1 shadow-xs ring-primary ring-inset hover:bg-gray-50 sm:mt-0 ">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}




        </div>
    )
}
export default Category
