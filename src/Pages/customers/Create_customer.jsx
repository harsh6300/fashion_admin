import React, { useState, useEffect, useRef, useCallback } from "react";
import User_side_menu from '../../Componenet/user_side_menu';
import { useNavigate, Link } from "react-router-dom";
import EmployList from '../../Componenet/EmployList';
import SubHeader from '../../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Category_img from '../../assets/category.png';
import Dropdown from "../../Componenet/dropdown";
import { useAddCategoryMutation, useAddCustomerMutation } from "../../services/apiSlice";

const Create_customer = () => {


    const [category, setCategory] = useState({ component: '' });



    const [modal, setModal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [replaceIndex, setReplaceIndex] = useState(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dropdownRefs = useRef([]);
   

    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [images]);







    const handleClickOutside = (event) => {
        dropdownRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                setModal(prev => prev === index ? null : prev);
            }
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);






  
   
    const [form, setForm] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
    });
    const [addCustomer] = useAddCustomerMutation();

    const handlesubmit = async () => {

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("address", form.address);
            formData.append("email", form.email);
            formData.append("phone", form.phone);

         
            const response = await addCustomer(formData).unwrap();

            toast.success("Customer successfully add!");


            setTimeout(() => {
                navigate("/customers");
            }, 1000);


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
            <ToastContainer position="top-center" autoClose={1500} />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader pageName={"Customer Add"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase">Customer Add</h3>
                        <div className="flex justify-end items-center max-lg:justify-start">
                            <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb">
                                <ol className="flex flex-wrap items-center">
                                   
                                    <li className="flex items-center">
                                        <Link to="/dashboard" className="hover:text-primary font-[12px] text-[#575864]">Customer</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="text-primary font-medium text-[12px]">New Customer</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="flex gap-8 max-lg:block">
                        {/* Left Panel */}
                    
                        {/* Right Panel */}
                        <div className="w-[100%] max-2xl:w-[60%] max-lg:w-[100%]  rounded-xl  max-lg:mt-[24px]">
                            {/* <div className="w-[100%]  rounded-xl  max-lg:mt-[24px]"> */}
                   

                            <div className="mb-[24px]     bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">General Information</h4>
                                <div className="px-[24px] py-[18px] max-sm:p-[10px]  max-lg:px-[18px] ">
                                    <div className="mb-4 flex gap-5 max-sm:block">
                                        <div className="w-[100%] max-sm:mb-4">
                                            <label className="block text-sm font-medium text-gray"> Name</label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
                                                    setForm({ ...form, name: value });
                                                }}
                                                placeholder="Enter Name"
                                                className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4 flex gap-5 max-sm:block">
                                        <div className="w-[100%] max-sm:mb-4">
                                            <label className="block text-sm font-medium text-gray"> Email</label>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
                                                    setForm({ ...form, email: value });
                                                }}
                                                placeholder="Enter Email"
                                                className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4 flex gap-5 max-sm:block">
                                        <div className="w-[100%] max-sm:mb-4">
                                            <label className="block text-sm font-medium text-gray"> Name</label>
                                            <input
                                                type="text"
                                                value={form.phone}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
                                                    setForm({ ...form, phone: value });
                                                }}
                                                placeholder="Enter Phone"
                                                className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4 flex gap-5 max-sm:block">
                                        <div className="w-[100%] max-sm:mb-4">
                                            <label className="block text-sm font-medium text-gray"> Address</label>
                                            <input
                                                type="text"
                                                value={form.address}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
                                                    setForm({ ...form, address: value });
                                                }}
                                                placeholder="Enter Title"
                                                className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                            />
                                        </div>
                                    </div>



                                  
                                  
                                </div>
                            </div>





                            <div className="flex justify-end items-center  bg-[#eef2f7] rounded-[12px]" >
                                <div className="p-[17px]  flex flex-row-reverse gap-3 max-sm:ps-0">

                                    <div className="flex gap-2 border-t border-[#eaedf1] w-[100%] ">
                                        <button onClick={handlesubmit} className="w-[182px]   max-sm:w-[125px] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white">Save Change</button>
                                        <button onClick={() => {
                                            navigate(-1)
                                        }} className="w-[182px]  max-sm:w-[125px] h-[39px] text-white bg-primary  border-[1px] border-primary  rounded-[12px] text-[14px] mt-[12px] hover:text-primary hover:bg-transparent">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create_customer;
