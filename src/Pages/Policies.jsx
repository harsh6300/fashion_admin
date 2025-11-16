import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import Searchdropdown from '../Componenet/searchdropdown'
import DateRangePickerComponent from '../Componenet/datepickerfilter'
import SubHeader from '../Componenet/sub_header'
import Dropdown from '../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetCategoriesQuery, useDeleteCategoryMutation, useGetProfileQuery, } from "../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const Category = () => {
    const daysInMonth = Array.from({ length: 22 }, (_, i) => i + 1); // You can make this dynamic

    const [modal, setModal] = useState(null);
    const [list, setlist] = useState('Additions');

    // ✅ Open & Close Modal
    const openlist = (modalId) => setlist(modalId);


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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Policies"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793]  uppercase">Policies</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                
                                <li className="text-primary font-medium text-[12px]">Policies</li>
                            </ol>
                        </nav>


                    </div>



                    <div className="border mt-[30px]  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] py-[15px] flex  gap-4 items-center justify-between flex-wrap">


                            <div>
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans"> Policies List
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
                                        openModal('modal4');
                                    }} className="bg-primary text-white text-[12.6px] rounded-[8px] py-[6px] px-[12px]  transition-colors ">Add Policy</button>
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
                                        </tr>
                                    </tbody>

                                </table>


                            </div>
                        </div>


                    </div>








                </div>



            </div>


            {modal === 'modal4' && (
                <div className="relative z-10 modal" id="modal1" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" id="overlay"></div>

                    <div className="fixed inset-0 z-10 w-screen 
 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform    p-[30px] rounded-[30px] bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-2xl">
                                <div className="bg-white ">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-medium text-gray">Add Overtime</h3>
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
                                                <label className="block text-sm  text-gray font-medium">Policy Name&nbsp;<span className="text-[#F44336] ">*</span></label>
                                                <input type="text"
                                                    onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm  text-gray font-medium">Appraisal Date &nbsp;<span className="text-[#F44336] ">*</span></label>
                                                <textarea
                                                    onChange={(e) => setamount(e.target.value)} className="mt-[10px] w-[100%]  h-[45px] sm:h-[80px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" ></textarea>
                                            </div>
                                            <div>

                                                <Searchdropdown
                                                    options={['All Department', 'Finance', 'Marketing', 'Devlopment']}
                                                    label="Department "
                                                    onToggle={() => toggleDropdown1("Department ")} // Pass 'Category' to toggle it
                                                    isOpen={openDropdown1 === "Department "} // Check if this dropdown is open
                                                    setIsOpen={(state) => setOpenDropdown1(state ? "Department " : null)}
                                                    onSelect={(e) => setType(e)}
                                                />
                                            </div>

                                     
                                            <div>
                                                <label className="block text-sm mb-[10px] text-gray font-medium">
                                                    Upload Policy &nbsp;
                                                    <span className="text-[#F44336]">*</span>
                                                </label>

                                                <div className="policy-upload flex-column items-center border-2 border-dashed border-[#e5e7eb] p-5">
                                                    <div className="policy-upload-bg mb-2 flex items-center justify-center w-[40px] h-[40px] bg-[#fef1eb] m-auto rounded-[40px]">
                                                        <span className="text-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <g clip-path="url(#clip0_2769_106642)">
                                                                    <path d="M5 19L7.757 11.649C7.82844 11.4584 7.95632 11.2942 8.12357 11.1782C8.29082 11.0623 8.48948 11.0001 8.693 11H21M5 19H19.026C19.4913 18.9999 19.942 18.8375 20.3004 18.5409C20.6589 18.2443 20.9028 17.832 20.99 17.375L21.986 12.164C22.0098 12.0208 22.0022 11.8741 21.9636 11.7342C21.925 11.5943 21.8564 11.4644 21.7626 11.3536C21.6688 11.2429 21.5519 11.1539 21.4203 11.0928C21.2886 11.0317 21.1452 11.0001 21 11M5 19C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H9L12 7H19C19.5304 7 20.0391 7.21071 20.4142 7.58579C20.7893 7.96086 21 8.46957 21 9V11" stroke="#F26522" strokeLinecap="round" stroke-linejoin="round" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_2769_106642">
                                                                        <rect width="24" height="24" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </span>
                                                    </div>

                                                    <h6 className="fs-12 fw-normal mb-2 text-sm font-normal flex items-center justify-center">
                                                        Drag and drop your file
                                                    </h6>

                                                    <div className="profile-uploader flex items-center justify-center">
                                                        <div className="flex items-center gap-2 rounded-[5px] bg-primary border border-primary text-white text-center hover:bg-primary-900 hover:text-white text-xs leading-normal relative py-1 px-2 me-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="12" height="12" x="0" y="0" viewBox="0 0 64 64" xmlSpace="preserve" className=""><g><g data-name="Layer 51"><path d="M57.47 38.6a2 2 0 0 0-2 2v6.83a6.07 6.07 0 0 1-6.07 6.07H14.6a6.07 6.07 0 0 1-6.07-6.07V40.6a2 2 0 1 0-4 0v6.83A10.08 10.08 0 0 0 14.6 57.5h34.8a10.08 10.08 0 0 0 10.07-10.07V40.6a2 2 0 0 0-2-2z" fill="#ffffff" opacity="1" data-original="#000000" className=""></path><path d="m22 21.3 8-8V43a2 2 0 0 0 4 0V13.33l8 8a2 2 0 0 0 2.83-2.83L33.42 7.09a2.16 2.16 0 0 0-1-.55 2.06 2.06 0 0 0-1.81.55L19.2 18.47A2 2 0 0 0 22 21.3z" fill="#ffffff" opacity="1" data-original="#000000" className=""></path></g></g></svg>
                                                            Upload
                                                            <input
                                                                type="file"
                                                                className="w-full h-full absolute top-0 left-0 opacity-0"
                                                                onChange={handleFileChange}
                                                                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Show selected file name */}
                                                    {selectedFile && (
                                                        <div className="mt-3 text-sm text-gray-600 text-center">
                                                            Selected file: <strong>{selectedFile.name}</strong>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>




                                        </div>


                                    </form>

                                </div>
                                <div className=" pt-[30px] flex flex-row-reverse  gap-3">
                                    <button type="button" className="inline-flex  items-center justify-center h-[35px] sm:h-[40px]  shadow-[0px_8px_20px_1px_#3DB0F733] rounded-md bg-primary    w-[154px] py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Add Policy</button>
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
