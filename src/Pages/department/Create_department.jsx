
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Searchdropdown from '../../Componenet/searchdropdown'
import { Link, useNavigate } from 'react-router-dom';


import Multiselect from 'multiselect-react-dropdown';
import { useAddDepartmentMutation, useAddRoleMutation } from '../../services/apiSlice';

const Create_role = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [value, setValue] = useState('');
    const [name, setname] = useState('')
    const [status, setStatus] = useState('')
    const [openDropdown1, setOpenDropdown1] = useState(null); // Track which dropdown is open
    const navigate = useNavigate()
    const toggleDropdown1 = (label) => {
        console.log(label);

        setOpenDropdown1((prev) => (prev == label ? null : label));
    };


    const [adddepartment] = useAddDepartmentMutation()

    const handleSubmit = async () => {
        try {
            if (!value || !name || !status) {
                toast.error("All required fields must be provided.");
                return
            }
            const formData = new FormData();


            formData.append("name", value);
            formData.append("description", name);
            formData.append("is_active", status == 'active' ? 'True' : 'False');


            const response = await adddepartment(formData).unwrap();
            toast.success("Role added successfully!");
            console.log("API response:", response);

            setTimeout(() => {
                navigate('/department');
            }, 1000); // 1 second delay
        } catch (error) {
            console.error("Error add Role:", error);
            toast.error("Failed to add Role. Please try again.");
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Department Add"} />
                    <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap max-sm:mb-[20px]" >
                        <h4 className="text-[18px] text-gray font-semibold">Department Add</h4>
                    </div>

                    <div className='bg-white shadow-[0px_3px_4px_rgba(0,0,0,0.1)] rounded-[0.75rem]  mb-[30px]'>
                        <div className='px-[24px] py-[18px] border-b border-[#eaedf1]'>
                            <h3 className='text-[#313b5e] font-[600]'>Department Information</h3>
                        </div>
                        <div className='p-[24px] grid  grid-cols-1 lg:grid-cols-2 gap-[20px]'>
                            <div className="">
                                <label className="text-sm mb-[7px] text-[#313b5e] block" > Name</label>
                                <Searchdropdown
                                    options={[
                                        "It ",
                                        "Bca",
                                        "Menichal",
                                        "General",
                                    ]}
                                    isOpen={openDropdown1 == "product"}
                                    value="Role Name"
                                    setIsOpen={(state) => setOpenDropdown1(state ? "product" : null)}
                                    onToggle={() => toggleDropdown1("product")}
                                    onSelect={(selectedName) => setValue(selectedName)}
                                />
                            </div>
                            <div className="">
                                <label className="text-sm mb-[10px] text-[#313b5e] block" >Description</label>
                                <input
                                    onChange={(e) => setname(e.target.value)}
                                    type="text" className="h-[40px] bg-transparent transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" placeholder="Description" />
                            </div>



                            <div>
                                <label className="text-sm mb-[10px] text-[#313b5e] block"> Status</label>
                                <div className="flex gap-4">
                                    {/* Active Radio */}
                                    <label className="flex items-center space-x-2 text-[13px]">
                                        <input
                                            type="radio"
                                            className="appearance-none cursor-pointer relative h-4 w-4 border-[1px] border-[#d8dfe7] rounded-[100%] 
                    checked:bg-primary checked:border-primary 
                    before:content-[''] before:absolute before:inset-[3px] before:rounded-[100%] before:bg-white 
                    checked:before:bg-white focus:outline-none"
                                            name="status"
                                            value="active"
                                            checked={status === 'active'}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        <span className="text-gray cursor-pointer">Active</span>
                                    </label>

                                    {/* Inactive Radio */}
                                    <label className="flex items-center space-x-2 text-[13px]">
                                        <input
                                            type="radio"
                                            className="appearance-none cursor-pointer relative h-4 w-4 border-[1px] border-[#d8dfe7] rounded-[100%] 
                    checked:bg-primary checked:border-primary 
                    before:content-[''] before:absolute before:inset-[3px] before:rounded-[100%] before:bg-white 
                    checked:before:bg-white focus:outline-none"
                                            name="status"
                                            value="inactive"
                                            checked={status === 'inactive'}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        <span className="text-gray cursor-pointer">Inactive</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='px-[24px] py-[18px] flex justify-end items-center gap-2 border-t border-[#eaedf1]'>
                            <button onClick={handleSubmit} className="bg-primary text-white rounded-[0.75rem] text-[14px]  h-[40px] px-[16px] py-[8px]">Save Change</button>
                            <button onClick={()=>{
                                navigate(-1)
                            }} className="bg-[#bbb] hover:bg-[#a9a9a9] text-white rounded-[0.75rem]  block text-[14px]  h-[40px] px-[16px] py-[8px]">Cancel </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Create_role
