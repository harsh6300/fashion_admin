import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Meen from '../../assets/meen.png'
import Searchdropdown from '../../Componenet/searchdropdown'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Or choose another theme

import Multiselect from 'multiselect-react-dropdown';
import { useAddWarehouseMutation, useEditInventoryMutation, useEditWarehouseMutation, useGetInventoriesQuery, useGetWarehouseQuery } from '../../services/apiSlice';

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
    const [location, setlocation] = useState("");
    const [quantity, setquantity] = useState("");
    const [reorder_level, setreorder_level] = useState("");

    const { data: inventory } = useGetInventoriesQuery()
    console.log(inventory);

    const pathname = useLocation()
    console.log(pathname.state.inventory_id);

    const inven = inventory?.data?.find((val) => val.inventory_id == pathname.state.inventory_id)

    useEffect(() => {
        if (inven) {
            setquantity(inven.quantity || "");
            setreorder_level(inven.reorder_level || "");
        }
    }, [inven]);
    const [editinventory] = useEditInventoryMutation()
    const handleSubmit = async () => {
        // Validate required fields first (frontend-side check)
        if (!quantity || !reorder_level) {
            toast.error("All required fields must be provided.");
            return;
        }


        try {
            const formData = new FormData();


            formData.append("inventory_id", pathname.state.inventory_id);

            formData.append("quantity", quantity);
            formData.append("reorder_level", reorder_level);

            const response = await editinventory({ formData }).unwrap();

            toast.success("inventory successfully Updated!");

            setTimeout(() => {
                navigate("/inventories");
            }, 1000);
        } catch (error) {
            console.error("inventory submission error:", error);

            const message =
                error?.data?.message || // From Django API: JsonResponse({"message": "..."})
                error?.error ||
                "Failed to Update inventory.";

            toast.error(message);
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
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Warehouse Add"} />
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
                                        <label className="text-sm mb-[10px] text-[#313b5e] block" >Quantity</label>
                                        <input
                                            type="text"
                                            value={quantity}
                                            onChange={(e) => setquantity(e.target.value)}
                                            className="h-[40px] bg-transparent transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full"
                                        
                                        />
                                    </div>
                                    <div className="">
                                        <label className="text-sm mb-[10px] text-[#313b5e] block" >Reorder Level</label>
                                        <input
                                            type="number"
                                            value={reorder_level}
                                            onChange={(e) => setreorder_level(e.target.value)}
                                            className="h-[40px] bg-transparent transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full"
                                           
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
