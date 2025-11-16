import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetCategoriesQuery, useDeleteCategoryMutation, useGetProfileQuery, } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckCircle, FaTimesCircle, FaStar, FaExclamationCircle } from 'react-icons/fa';


const Category = () => {
    const daysInMonth = Array.from({ length: 22 }, (_, i) => i + 1); // You can make this dynamic


    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const handleItemChange = (event) => {
        const value = parseInt(event.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Payroll"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793]  uppercase">Payroll</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                
                                <li className="text-primary font-medium text-[12px]">Payroll</li>
                            </ol>
                        </nav>


                    </div>

                    <div className="mt-[30px] mb-[20px] gap-[20px] max-xl:grid-cols-2 max-sm:grid-cols-1 grid grid-cols-4">
                        <div className="border p-[25px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                            <div className="flex items-center gap-5">
                                <div>
                                    <div className="bg-[#fc845f1a] w-[60px] flex items-center justify-center h-[60px] rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24" x="0" y="0" viewBox="0 0 682.667 682.667" xmlSpace="preserve" className=""><g><defs><clipPath id="a" clipPathUnits="userSpaceOnUse"><path d="M0 512h512V0H0Z" fill="#ff6d2e" opacity="1" data-original="#000000"></path></clipPath></defs><g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"><path d="M0 0c-43.446 0-78.667-35.22-78.667-78.667 0-43.446 35.221-78.666 78.667-78.666 43.446 0 78.667 35.22 78.667 78.666C78.667-35.22 43.446 0 0 0Zm220.802-22.53-21.299-17.534c-24.296-20.001-24.296-57.204 0-77.205l21.299-17.534c7.548-6.214 9.497-16.974 4.609-25.441l-42.057-72.845c-4.889-8.467-15.182-12.159-24.337-8.729l-25.835 9.678c-29.469 11.04-61.688-7.561-66.862-38.602l-4.535-27.213c-1.607-9.643-9.951-16.712-19.727-16.712h-84.116c-9.776 0-18.12 7.069-19.727 16.712l-4.536 27.213c-5.173 31.041-37.392 49.642-66.861 38.602l-25.834-9.678c-9.156-3.43-19.449.262-24.338 8.729l-42.057 72.845c-4.888 8.467-2.939 19.227 4.609 25.441l21.3 17.534c24.295 20.001 24.295 57.204 0 77.205l-21.3 17.534c-7.548 6.214-9.497 16.974-4.609 25.441l42.057 72.845c4.889 8.467 15.182 12.159 24.338 8.729l25.834-9.678c29.469-11.04 61.688 7.561 66.861 38.602l4.536 27.213c1.607 9.643 9.951 16.711 19.727 16.711h84.116c9.776 0 18.12-7.068 19.727-16.711l4.535-27.213c5.174-31.041 37.393-49.642 66.862-38.602l25.835 9.678c9.155 3.43 19.448-.262 24.337-8.729l42.057-72.845c4.888-8.467 2.939-19.227-4.609-25.441z" style={{
                                            strokeWidth: 40,
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeMiterlimit: 10,
                                            strokeDasharray: "none",
                                            strokeOpacity: 1,
                                        }}
                                            transform="translate(256 334.666)" fill="none" stroke="#ff6d2e" stroke-width="40" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" opacity="1" className=""></path></g></g></svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[#878a99] font-[700]">Total Employee</h3>
                                    <span className="text-[30px] font-[700]">8450</span>
                                </div>
                            </div>
                        </div>
                        <div className="border p-[25px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                            <div className="flex items-center gap-5">
                                <div>
                                    <div className="bg-[#fc845f1a] w-[60px] flex items-center justify-center h-[60px] rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24" x="0" y="0" viewBox="0 0 100 100" xmlSpace="preserve" className=""><g><path d="M94.142 41.142c2.748 2.393-1.616-1.407 0 0z" fill="#ff6d2e" opacity="1" data-original="#000000" className=""></path><path d="M94.142 41.142c-1.783-1.553-4.111-3.174-4.006-5.78.113-2.78 1.141-5.461 1.5-8.212.331-2.536.128-5.257-1.723-7.2-1.644-1.727-4.066-2.349-6.35-2.674-2.557-.364-5.36-.201-7.807-1.105-2.277-.843-3.126-4.005-3.989-6.021-.911-2.128-1.888-4.359-3.562-6.011-1.919-1.895-4.525-2.406-7.09-1.66-2.927.852-5.382 2.778-8.06 4.16-.986.51-2.145 1.091-3.289.996-1.335-.111-2.618-.863-3.758-1.508-2.582-1.46-5.133-3.355-8.115-3.884-2.581-.458-4.97.521-6.644 2.494-1.54 1.815-2.439 4.081-3.364 6.246-.97 2.274-1.822 4.795-4.454 5.433-4.487 1.089-10.767-.09-13.879 4.185-1.582 2.173-1.468 4.984-1.033 7.508.452 2.616 1.593 5.406 1.335 8.087-.225 2.338-3.056 4.122-4.663 5.536-1.834 1.613-3.762 3.383-4.686 5.702-2.131 5.348 2.902 9.2 6.395 12.323.908.813 1.885 1.668 2.524 2.719.62 1.021.487 2.283.321 3.412-.405 2.76-1.34 5.43-1.493 8.229-.139 2.541.554 5.068 2.664 6.656 1.902 1.432 4.377 1.834 6.685 2.088 1.291.141 2.588.225 3.877.383 1.193.146 2.629.287 3.633 1.018.909.662 1.45 1.846 1.92 2.83.595 1.246 1.1 2.531 1.663 3.789.933 2.088 2.047 4.275 3.922 5.674 2.277 1.699 5.078 1.535 7.598.488 2.783-1.156 5.152-3.123 7.943-4.254 2.624-1.061 4.899.5 7.126 1.822 2.482 1.475 5.18 3.26 8.178 3.26 2.529 0 4.572-1.48 5.967-3.492 1.415-2.041 2.241-4.41 3.256-6.656.494-1.094 1.02-2.295 1.871-3.164.831-.848 2.164-1.055 3.285-1.221 4.466-.668 10.963-.102 13.244-5.016 1.118-2.406.682-5.213.158-7.711-.282-1.352-.625-2.689-.87-4.047-.206-1.145-.485-2.561-.006-3.676.888-2.065 3.276-3.574 4.899-5.027 1.678-1.502 3.387-3.172 4.235-5.303 1.917-4.808-2.065-8.549-5.358-11.416zm.81 9.265c-.469 1.906-2.671 3.437-4.072 4.652.475-.412.875-.762-.021.018-2.006 1.748-4.259 3.605-5.219 6.174-1.069 2.857-.264 6.045.383 8.902.369 1.625 1.752 5.457-.024 6.688-.881.611-2.079.775-3.114.922-1.428.201-2.869.289-4.303.441-2.587.277-5.353.752-7.325 2.592-1.962 1.83-2.969 4.465-3.998 6.879-.654 1.531-1.817 5.387-4.023 5.184-1.222-.113-2.4-.813-3.446-1.402-1.396-.787-2.744-1.654-4.159-2.404-2.634-1.396-5.381-2.18-8.313-1.268-2.911.906-5.354 2.811-8.042 4.186-.86.439-2.172 1.168-3.178.834-1.005-.326-1.633-1.547-2.089-2.41-1.282-2.426-2.071-5.092-3.522-7.432-1.441-2.326-3.478-3.705-6.136-4.305-2.684-.605-5.461-.527-8.156-1.049-.863-.168-2.04-.396-2.596-1.16-.632-.869-.373-2.297-.223-3.27.455-2.963 1.51-5.85 1.505-8.875-.005-2.937-1.426-5.189-3.471-7.186-1.939-1.895-4.527-3.488-5.962-5.832-1.379-2.255 1.388-4.331 2.901-5.668 2.04-1.804 4.365-3.561 5.646-6.027 1.398-2.694.86-5.819.242-8.651-.3-1.371-.647-2.736-.86-4.125-.15-.975-.41-2.402.223-3.271.556-.764 1.733-.992 2.597-1.16 1.398-.271 2.826-.366 4.241-.498 2.601-.241 5.442-.526 7.62-2.11 2.157-1.57 3.29-4.167 4.309-6.544.523-1.221 1.021-2.458 1.643-3.633.456-.863 1.084-2.085 2.089-2.411 1.015-.325 2.309.391 3.177.835 1.422.728 2.765 1.599 4.152 2.389 2.533 1.443 5.3 2.669 8.271 2.056 2.967-.613 5.499-2.471 8.091-3.933 1.046-.59 2.225-1.289 3.447-1.402 1.099-.102 1.797.835 2.318 1.675 2.785 4.479 3.39 10.564 9.183 12.286 1.997.593 4.1.721 6.163.913 1.595.148 4.198.127 5.397 1.396 1.102 1.166.311 3.748.026 5.083-.505 2.373-1.195 4.755-1.19 7.2.008 4.796 3.845 7.479 7.063 10.409 1.058.962 3.166 2.638 2.755 4.312z" fill="#ff6d2e" opacity="1" data-original="#000000" className=""></path><path d="M65.208 36.902 45.993 57.844c-.236.258-.246.43-.549.25l-2.703-1.593-7.634-4.499c-.908-.535-1.776-1.1-2.896-.748-2.059.645-2.324 3.477-.494 4.555l5.786 3.41 6.955 4.098c1.478.871 2.781.564 3.904-.659l10.403-11.341 8.33-9.08 1.754-1.911c2.204-2.402-1.436-5.83-3.641-3.424z" fill="#ff6d2e" opacity="1" data-original="#000000" className=""></path></g></svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[#878a99] font-[700]">Total Paid</h3>
                                    <span className="text-[30px] font-[700]">8450</span>
                                </div>
                            </div>
                        </div>
                        <div className="border p-[25px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                            <div className="flex items-center gap-5">
                                <div>
                                    <div className="bg-[#fc845f1a] w-[60px] flex items-center justify-center h-[60px] rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className=""><g><path d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zm0 240c-57.897 0-105-47.103-105-105S198.103 30 256 30s105 47.103 105 105-47.103 105-105 105zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805zM61.66 482c7.515-85.086 78.351-152 164.34-152h60c85.989 0 156.825 66.914 164.34 152H61.66z" fill="#ff6d2e" opacity="1" data-original="#000000" className=""></path></g></svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[#878a99] font-[700]">Total Unpaid</h3>
                                    <span className="text-[30px] font-[700]">3130</span>
                                </div>
                            </div>
                        </div>
                        <div className="border p-[25px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                            <div className="flex items-center gap-5">
                                <div>
                                    <div className="bg-[#fc845f1a] w-[60px] flex items-center justify-center h-[60px] rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className=""><g><path d="M501.084 295.982h-17.462v-22.126c0-5.57-4.515-10.086-10.086-10.086h-5.964c.709-8.717-4.914-16.938-13.672-19.189l-57.62-14.81 18.561-48.611c5.374-14.076-1.673-29.852-15.761-35.231l-42.49-16.44c-8.143-3.151-16.891-3.956-25.479-2.38-33.716 6.185-89.129 16.352-95.531 17.522a18.305 18.305 0 0 0-10.802 6.327l-37.719 45.523V59.369a12.055 12.055 0 0 0-8.678-11.573l-81.14-23.68h210.377v89.025l24.112-3.15V12.06c0-6.658-5.398-12.056-12.056-12.056-1.709 0-306.832-.027-307.764.05C5.526.58.841 5.946.841 12.06c0 2.958-.057 440.79.104 442.075.613 4.872 4.095 8.755 8.575 10.064l162.107 47.309c7.723 2.257 15.433-3.561 15.433-11.573V250.25a18.165 18.165 0 0 0 7.416-5.339l54.243-65.467 60.479-11.061-40.764 106.762s1.453-3.672-25.712 89.318l-31.614 60.093v56.934h.001c9.305 2.27 19.27-1.977 23.908-10.795l46.438-88.273a21.346 21.346 0 0 0 1.597-3.948l25.689-87.938 5.789 2.21 44.751 70.286-32.169 90.604c-3.94 11.096 1.861 23.286 12.958 27.226 11.036 3.919 23.279-1.841 27.226-12.958l35.651-100.411a21.33 21.33 0 0 0-2.107-18.585l-31.286-49.137 13.584-35.578 28.807 7.405-.263 24.386H394.22c-2.269 0-4.355.759-6.039 2.022l26.713 41.955c6.327 9.937 7.695 22.004 3.754 33.106l-4.437 12.498h86.875c5.569 0 10.083-4.515 10.083-10.083v-69.414c0-5.571-4.515-10.086-10.085-10.086zM152.698 316.97c0 6.658-5.398 12.056-12.056 12.056-6.658 0-12.056-5.398-12.056-12.056v-69.596c0-6.658 5.398-12.056 12.056-12.056 6.658 0 12.056 5.398 12.056 12.056v69.596zm310.755-20.988h-31.6v-12.041h31.6v12.041z" fill="#ff6d2e" opacity="1" data-original="#000000" className=""></path><path d="m315.805 325.767-8.188 28.028v86.777h-37.929l-12.685 24.113h52.405c-.579-5.552.081-11.207 2.005-16.624l20.318-57.222v-40.06l-15.926-25.012zM416.914 50.634c-20.845-7.959-44.195 2.487-52.154 23.332-8.029 21.025 2.701 44.277 23.332 52.154 20.656 7.888 44.136-2.332 52.154-23.332 7.958-20.845-2.487-44.195-23.332-52.154z" fill="#ff6d2e" opacity="1" data-original="#000000" className=""></path></g></svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[#878a99] font-[700]">Total Leave</h3>
                                    <span className="text-[30px] font-[700]">3130</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] py-[15px] flex  gap-4 items-center justify-between">


                            <div>
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">Pay List
                                </h3>

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


                            </div>


                        </div>

                        <div className="overflow-x-scroll over__scroll">
                            <div className="min-w-full w-fit">
                                <table className="w-full ">
                                    <thead className="border-y border-[#ddd]">

                                        <tr className="max-sm:h-[40px] h-[54px] ">
                                            <th className="px-[30px]  max-xl:px-[10px]">
                                                <div className="text-start  text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">

                                                    Emp Name

                                                </div>
                                            </th>

                                            <th className="text-[14px] font-bold text-left text-[#5d7186] sans text-nowrap max-lg:hidden max-md:text-[13px] max-sm:px-[10px]">Designation</th>
                                            <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:hidden max-sm:px-[10px]">From</th>
                                            <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:hidden max-sm:px-[10px]">To</th>
                                            <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:hidden max-sm:px-[10px]">Days</th>
                                            <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:hidden max-sm:px-[10px]">Reason</th>
                                            <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:hidden max-sm:px-[10px]">Applied on</th>
                                            <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Status</th>
                                            <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Action</th>
                                        </tr>


                                    </thead>
                                    <tbody className="">
                                        <tr className="border-t">
                                            {/* Sticky Name Cell */}
                                            <td className="  px-4 py-3 ">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="https://manez-dashboard.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar5.81bf53ea.png&w=750&q=75"
                                                        alt="avatar"
                                                        className="w-[48px] h-[48px] rounded-full"
                                                    />
                                                    <span className="text-[14px] whitespace-nowrap text-[#878a99]">
                                                       John Smith
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="  z-10 px-4 py-3 ">
                                                
                                                    <span className="text-[14px] whitespace-nowrap text-[#878a99]">
                                                       Business Intelligence Analyst
                                                    </span>
                                                
                                            </td>
                                            {/* Scrollable Status Cells */}

                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>


                    </div>








                </div>



            </div>


        </div>
    )
}
export default Category
