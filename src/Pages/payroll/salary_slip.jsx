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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Logo from '../../assets/Logo.png'; // Adjust the path as necessary


const Category = () => {
    const daysInMonth = Array.from({ length: 22 }, (_, i) => i + 1); // You can make this dynamic


    const payslipRef = useRef(null); // Step 1: create ref
    const handleDownloadPDF = () => {
        const input = payslipRef.current;

        // Clone node
        const clonedNode = input.cloneNode(true);

        // Create offscreen container
        const wrapper = document.createElement('div');
        wrapper.style.position = 'fixed';
        wrapper.style.top = '-9999px';
        wrapper.style.left = '-9999px';
        wrapper.style.width = '1200px'; // must match CSS width above
        wrapper.style.backgroundColor = 'white';
        wrapper.style.padding = '20px';
        wrapper.style.boxSizing = 'border-box';
        wrapper.appendChild(clonedNode);

        document.body.appendChild(wrapper);

        html2canvas(clonedNode, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            scrollX: 0,
            scrollY: -window.scrollY,
            windowWidth: 1200,
            windowHeight: clonedNode.scrollHeight,
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate image height to keep aspect ratio
            const imgProps = {
                width: canvas.width,
                height: canvas.height,
            };

            const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);

            const imgWidth = imgProps.width * ratio;
            const imgHeight = imgProps.height * ratio;

            // Add image centered vertically
            const marginY = (pdfHeight - imgHeight) / 2;

            // Add image starting at top left corner (no vertical margin)
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            pdf.save('payslip.pdf');

            // Cleanup
            document.body.removeChild(wrapper);
        });
    };



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

                    <div className=" flex justify-end">
                        <button onClick={handleDownloadPDF} className="h-[40px] bg-[#212529] px-[15px] text-white rounded-[10px] text-sm"> <i className="fa-solid fa-download text-sm me-2"></i> Download</button>
                    </div>

                    <div ref={payslipRef} className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px] p-5">
                        <div className="card-body">
                            <div className="grid md:grid-cols-12 justify-between items-center border-[#E5E7EB] border-b mb-3">
                                <div className="md:col-span-6">
                                    <div className="mb-3">
                                        <div className="mb-2">
                                            <img src={Logo} className="img-fluid" alt="logo" />
                                        </div>
                                        <p className="text-[#6b7280] text-sm">3099 Kennedy Court Framingham, MA 01702</p>
                                    </div>
                                </div>
                                <div className="md:col-span-6">
                                    <div className=" text-end mb-3">
                                        <h5 className=" mb-1 font-[600]">Payslip No <span className="text-primary"> #PS4283</span></h5>
                                        <p className=" text-sm font-[600] text-[#6b7280]">Salary Month : <span className="text-black">October 2024</span> </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-12 border-b border-[#E5E7EB] flex mb-3">
                                <div className="md:col-span-6">
                                    <div className="mb-3">
                                        <p className="text-dark mb-2 font-semibold text-sm">From</p>
                                        <div>
                                            <h4 className="mb-1 text-lg font-semibold">XYZ Technologies</h4>
                                            <p className="mb-1 text-sm  text-[#6b7280]">2077 Chicago Avenue Orosi, CA 93647</p>
                                            <p className="mb-1 text-sm  text-[#6b7280]">Email : <span className="text-black">xyztech@example.com</span></p>
                                            <p className=" text-sm text-[#6b7280]">Phone : <span className="text-black">+1 987 654 3210</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-6">
                                    <div className="mb-3">
                                        <p className="text-dark mb-2 font-semibold text-sm">To</p>
                                        <div>
                                            <h4 className="mb-1 text-lg font-semibold">Anthony Lewis</h4>
                                            <p className="mb-1 text-sm  text-[#6b7280]">Web Designer</p>
                                            <p className="mb-1 text-sm  text-[#6b7280]">Email : <span className="text-black">anthony@example.com</span></p>
                                            <p className="text-sm text-[#6b7280]">Phone : <span className="text-black">+1 458 268 4738</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-center mb-4 font-[600]">Payslip for the moth of October 2024</h5>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-6">
                                    <div className="md:col-span-6">
                                        <div className="list-group mb-3 border border-[#E5E7EB] rounded">
                                            <div className="list-group-item bg-[#f8f9fa] p-4 border-b border-[#E5E7EB]">
                                                <h6 className="text-sm font-[600]">Earnings</h6>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">Basic Salary</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$3000</h6>
                                                </div>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">House Rent Allowance (H.R.A.)</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$1000</h6>
                                                </div>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">Conveyance</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$200</h6>
                                                </div>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">Other Allowance</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$100</h6>
                                                </div>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">Total Earnings</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$4300</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-span-6">
                                        <div className="list-group mb-3 border border-[#E5E7EB] rounded">
                                            <div className="list-group-item bg-[#f8f9fa] p-4 border-b border-[#E5E7EB]">
                                                <h6 className="text-sm font-[600]">Deductions</h6>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">Tax Deducted at Source (T.D.S.)</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$200</h6>
                                                </div>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">Provident Fund</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$300</h6>
                                                </div>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">ESI</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$150</h6>
                                                </div>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">Loan</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$50</h6>
                                                </div>
                                            </div>
                                            <div className="list-group-item px-4 py-2 border-b border-[#E5E7EB]">
                                                <div className="flex items-center justify-between">
                                                    <p className="mb-0 text-sm text-[#6b7280]">Total Earnings</p>
                                                    <h6 className="text-sm text-[#111827] font-semibold">$700</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6b7280] ">Net Salary : <span className="text-gray-9 font-[600]"> $3600(Three thousand six hundred only)</span></p>
                                </div>
                            </div>
                        </div>
                    </div>







                </div>



            </div>


        </div>
    )
}
export default Category
