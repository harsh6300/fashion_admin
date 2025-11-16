import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Meen from '../../assets/meen.png'
import Searchdropdown from '../../Componenet/searchdropdown'
import { Link, useNavigate } from 'react-router-dom';

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Or choose another theme

import Multiselect from 'multiselect-react-dropdown';
import { useAddCouponMutation, useAddInventoryMutation, useAddWarehouseMutation, useGetProductQuery, useGetWarehouseQuery } from '../../services/apiSlice';

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


    const { data: product } = useGetProductQuery()
    const { data: warehouse } = useGetWarehouseQuery()
    const [createinvetory] = useAddInventoryMutation()

    let productoption = [];
    if (product?.data) {
        productoption = product?.data?.map((val) => ({
            id: val.product_id,
            name: val.name,
        }));
    }
    let warehouseoption = [];
    if (warehouse?.data) {
        warehouseoption = warehouse?.data?.map((val) => ({
            id: val.warehouse_id,
            name: val.name,
        }));
    }



    const handleSubmit = async () => {
        // Validate required fields first (frontend-side check)
        if (!warehouss || !productss || !Quantity || !reorder_level) {
            toast.error("All required fields must be provided.");
            return
        }

        try {
            const formData = new FormData();


            formData.append("product", productss);
            formData.append("warehouse", warehouss);
            formData.append("quantity", Quantity);
            formData.append("reorder_level", reorder_level);

            const response = await createinvetory(formData).unwrap();

            toast.success("Inventory successfully created!");

            setTimeout(() => {
                navigate("/inventories");
            }, 1000);
        } catch (error) {
            console.error("Inventory submission error:", error);

            const message =
                error?.data?.message || // From Django API: JsonResponse({"message": "..."})
                error?.error ||
                "Failed to create Inventory.";

            toast.error(message);
        }
    };

    const [openDropdown1, setOpenDropdown1] = useState(null); // Track which dropdown is open

    const toggleDropdown1 = (label) => {
        console.log(label);

        setOpenDropdown1((prev) => (prev == label ? null : label));
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
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Inventory Add"} />
                    <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap max-sm:mb-[20px]" >
                        <h4 className="text-[18px] text-gray font-semibold">Inventory Add</h4>
                    </div>

                    <div className=''>

                        <div className=''>
                            <div className='bg-white shadow-[0px_3px_4px_rgba(0,0,0,0.1)] rounded-[0.75rem]  mb-[30px]'>
                                <div className='px-[24px] py-[18px] border-b border-[#eaedf1]'>
                                    <h3 className='text-[#313b5e] font-[600]'>Inventory Information</h3>
                                </div>
                                <div className='p-[24px] gap-[24px] grid max-lg:grid-cols-1 grid-cols-2'>

                                    <div className="">
                                        <label className="text-sm mb-[10px] text-[#313b5e] block" > Product</label>
                                        <Searchdropdown
                                            onToggle={() => toggleDropdown1("product")}
                                            options={productoption.map((val) => val.name)}
                                            isOpen={openDropdown1 == "product"}

                                            setIsOpen={(state) => setOpenDropdown1(state ? "product" : null)}
                                            onSelect={(selectedName) => {

                                                const selected = productoption.find(item => item.name == selectedName);
                                                console.log(selected);
                                                if (selected) {
                                                    setProduct(selected.id); // Store the matching ID in product
                                                }
                                            }}
                                        />


                                    </div>


                                    <div className="">
                                        <label className="text-sm mb-[10px] text-[#313b5e] block" > Warehouse</label>
                                        <Searchdropdown
                                            onToggle={() => toggleDropdown1("warehouse")}
                                            options={warehouseoption.map((val) => val.name)}
                                            isOpen={openDropdown1 == "warehouse"}

                                            setIsOpen={(state) => setOpenDropdown1(state ? "warehouse" : null)}
                                            onSelect={(selectedName) => {
                                                const selected = warehouseoption.find(item => item.name == selectedName);
                                                console.log(selected);

                                                if (selected) {
                                                    setwarehouse(selected.id); // Store the matching ID in product
                                                }
                                            }}
                                        />


                                    </div>
                                    <div className="">
                                        <label className="text-sm mb-[10px] text-[#313b5e] block" >Quantity</label>
                                        <input
                                            type="text"
                                            value={Quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            className="h-[40px] transition-all bg-transparent duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full"
                                        
                                        />
                                    </div>
                                    <div className="">
                                        <label className="text-sm mb-[10px] text-[#313b5e] block" >Reorder Level</label>
                                        <input
                                            type="number"
                                            value={reorder_level}
                                            onChange={(e) => setreorder_level(e.target.value)}
                                            className="h-[40px] transition-all bg-transparent duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full"
                                          
                                        />
                                    </div>


                                </div>


                                <div className='px-[24px] py-[18px] flex justify-end items-center gap-2 border-t border-[#eaedf1]'>
                                    <button onClick={handleSubmit} className="bg-primary text-white rounded-[0.75rem] text-[14px]  h-[40px] px-[16px] py-[8px]">Save Change</button>
                                    <button onClick={() => {
                                        navigate(-1)
                                    }} className="bg-[#bbb] hover:bg-[#a9a9a9] text-white rounded-[0.75rem]  block text-[14px]  h-[40px] px-[16px] py-[8px]">Cancel </button>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default Create_coupone
