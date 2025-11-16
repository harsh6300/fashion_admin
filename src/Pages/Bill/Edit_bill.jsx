import React, { useState, useEffect, useRef, useCallback } from "react";
import User_side_menu from '../../Componenet/user_side_menu';
import { useNavigate, Link, useLocation } from "react-router-dom";
import EmployList from '../../Componenet/EmployList';
import SubHeader from '../../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Category_img from '../../assets/category.png';
import Searchdropdown from "../../Componenet/searchdropdown";
import { useAddBillMutation, useEditBillMutation, useGetCategoriesQuery, useGetCustomersQuery } from "../../services/apiSlice";
import BillingForm from '../../Componenet/bill/BillingForm'

const Edit_bill = () => {

    const location = useLocation()
    console.log(location);

    const [existingBillItems, setexistingBillItems] = useState(location?.state?.bill_id?.items)


    let Customeroption = [];
    const { data: customer } = useGetCustomersQuery();
    if (customer?.data) {
        Customeroption = customer?.data.map((val) => ({
            id: val.customer_id,
            name: val.name,
        }));
    }


    const [modal, setModal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [replaceIndex, setReplaceIndex] = useState(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dropdownRefs = useRef([]);
    const [previewImage, setPreviewImage] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility


    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];

        // Revoke old preview if it exists
        if (images[0]?.preview) {
            URL.revokeObjectURL(images[0].preview);
        }

        const preview = URL.createObjectURL(file);
        const fileWithPreview = Object.assign(file, { preview });

        setImages([fileWithPreview]);
        setSelectedImage(preview); // Update selected image
    }, [images]);


    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [images]);




    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, []);



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

    const triggerFileDialog = (index = null) => {
        if (index !== null) {
            setReplaceIndex(index); // Set the index for replacing an image
        } else {
            setReplaceIndex(null);  // Reset replaceIndex if not passed
        }
        setIsModalOpen(true);  // Open modal for file selection
    };




    const removeImage = (index) => {
        setImages(prev => {
            const removed = prev[index];
            const updated = prev.filter((_, i) => i !== index);

            // Update selectedImage before revoking
            if (removed.preview === selectedImage) {
                setSelectedImage(updated[0]?.preview || null);
            }

            // Revoke only the removed image URL
            URL.revokeObjectURL(removed.preview);
            return updated;
        });
    };


    useEffect(() => {
        if (!selectedImage && images.length > 0) {
            setSelectedImage(images[0].preview);
        }
    }, [images, selectedImage]);



    // serching dropdown
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownSelect = (field, value) => {
        setCategory((prev) => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    const [modecash, setmodecash] = useState(false);
    const [modeonline, setmodeonline] = useState(false);

    const [statusActive, setStatusActive] = useState(false);
    const [statusInactive, setStatusInactive] = useState(false);
    const togglemodecash = () => {
        setmodecash(true);
        setmodeonline(false);
    };

    const togglemodeonline = () => {
        setmodecash(false);
        setmodeonline(true);
    };

    const toggleStatusActive = () => {
        setStatusActive(true);
        setStatusInactive(false);
    };

    const toggleStatusInactive = () => {
        setStatusActive(false);
        setStatusInactive(true);
    };
    const [form, setForm] = useState({
        payment_mode: "",
        discount_amount: "",
        customer_id: "",
    });

    useEffect(() => {
        if (location?.state?.bill_id) {
            setForm({
                payment_mode: location?.state?.bill_id?.payment_mode,
                discount_amount: location?.state?.bill_id?.discount_amount,
                customer_id: location?.state?.bill_id?.customer?.customer_id,
            })
            if(location?.state?.bill_id?.payment_mode == 'CASH'){
                setmodecash(true)
            }
        }

    },[])
    const [editbill] = useEditBillMutation();
    const [selectedItem, setSelectedItem] = useState(null);

    const handleChildChange = (data) => {
        setSelectedItem(data);
    };
    const handlesubmit = async () => {

        try {
            const formData = new FormData();
            formData.append("discount_amount", form.discount_amount);
            formData.append("customer_id", form.customer_id);
            formData.append("payment_mode", modecash ? "CASH" : "ONLINE");
            console.log(selectedItem);

            formData.append("items", [JSON.stringify(selectedItem)]);


            const response = await editbill(formData).unwrap();

            toast.success("Bill successfully add!");


            setTimeout(() => {
                navigate("/bill");
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
    const [openDropdown1, setOpenDropdown1] = useState(null); // Track which dropdown is open

    const toggleDropdown1 = (label) => {
        setOpenDropdown1((prev) => (prev == label ? null : label));
    };
    const handlecustmeroption = (value) => {
        const selectedCustomer = Customeroption.find((cat) => cat.name === value);
        setForm({
            ...form,
            customer_id: selectedCustomer?.id,
        });
    };

    const handleCustomerToggle = () => {
        toggleDropdown1("Customer");
    };


    return (
        <div>
            <ToastContainer position="top-center" autoClose={1500} />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader pageName={"Bill  Add"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase">Bill  Add</h3>
                        <div className="flex justify-end items-center max-lg:justify-start">
                            <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb">
                                <ol className="flex flex-wrap items-center">

                                    <li className="flex items-center">
                                        <Link to="/dashboard" className="hover:text-primary font-[12px] text-[#575864]">Bill </Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="text-primary font-medium text-[12px]">New Bill </li>
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
                                    <div className="mb-4">
                                        <Searchdropdown
                                            label="Customer"
                                            onToggle={handleCustomerToggle}
                                            options={Customeroption.map((v) => v.name)}
                                            value={Customeroption.find((c) => c.id === form.customer_id)?.name || ""}
                                            isOpen={openDropdown1 === "Customer"}
                                            onSelect={handlecustmeroption}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray">Discount Amount</label>
                                        <input
                                            type="number"
                                            value={form.discount_amount}
                                            onChange={(e) => setForm({ ...form, discount_amount: e.target.value })}
                                            className="mt-[5px] w-full bg-transparent h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"

                                        />
                                    </div>




                                    <div className="mb-4 ">
                                        <label className="block text-sm font-medium text-gray mb-3">Mode </label>
                                        <div className="cursor-pointer flex items-center  max-sm:hidden">
                                            <div onClick={togglemodecash}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${modecash ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${modecash ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">CASH</span>

                                            <div onClick={togglemodeonline}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${modeonline ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${modeonline ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">ONLINE</span>
                                        </div>

                                    </div>

                                    <BillingForm productitem={handleChildChange} initialItems={existingBillItems} />

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

export default Edit_bill;
