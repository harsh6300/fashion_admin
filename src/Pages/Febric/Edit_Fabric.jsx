import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Meen from '../../assets/meen.png'
import Searchdropdown from '../../Componenet/searchdropdown'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Multiselect from 'multiselect-react-dropdown';
import { useEditColorMutation, useEditFebricMutation, useGetColorQuery, useGetFebricQuery } from '../../services/apiSlice';

const Edit_fabric = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const location = useLocation();
    const fabric_id = location.state?.fabric_id;
    const { data: color } = useGetFebricQuery();
    const colorData = color?.data?.find((item) => item.fabric_id === fabric_id);

  
    const [colorName, setColorName] = useState('');
    const [userStatus, setUserStatus] = useState('Active');

    // Update state when colorData is fetched
    useEffect(() => {
        if (colorData) {
            setColorName(colorData.name || '');
            setUserStatus(colorData.is_active ? 'Active' : 'Inactive');
        }
    }, [colorData]);

    const [editColor] = useEditFebricMutation(); // Assuming you have a mutation for adding color
    const navigate = useNavigate();
    const handlesubmit = async () => {
        try {
            const formData = new FormData();

            formData.append('fabric_id', location.state?.fabric_id);
            formData.append('name', colorName);
            formData.append('is_active', userStatus === 'Active' ? 'True' : 'False');



            const response = await editColor({ formData }).unwrap();
            toast.success("Fabric successfully updated!");

            setTimeout(() => {
                navigate("/fabric");
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
            <ToastContainer
                position="top-center"
                autoClose={1500}
            />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Fabric Edit"} />
                    <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap max-sm:mb-[20px]" >
                        <h4 className="text-[18px] text-gray font-semibold">Fabric Edit</h4>
                    </div>

                    <div className='bg-white shadow-[0px_3px_4px_rgba(0,0,0,0.1)] rounded-[0.75rem]  mb-[30px]'>
                        <div className='px-[24px] py-[18px] border-b border-[#eaedf1]'>
                            <h3 className='text-[#313b5e] font-[600]'>Fabric Information</h3>
                        </div>
                        <div className='p-[24px] grid  grid-cols-1 lg:grid-cols-2 gap-[20px]'>
                            <div className="">
                                <label className="text-sm mb-[10px] text-[#313b5e] block" > Name</label>
                                <input type="text"
                                    value={colorName}
                                    onChange={(e) => setColorName(e.target.value)}
                                    className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full"  />
                            </div>

                            <div></div>


                            <div>
                                <label className="text-sm mb-[10px] text-[#313b5e] block" > Status</label>
                                <div className=" flex gap-4">
                                    {/* Active Checkbox */}
                                    <label className="flex items-center space-x-2 text-[13px]">
                                        <input
                                            type="radio"
                                            className="appearance-none cursor-pointer relative h-4 w-4 border-[1px] border-[#d8dfe7] rounded-[100%] checked:bg-primary checked:border-primary before:content-[''] before:absolute before:inset-[3px] before:rounded-[100%] before:bg-white checked:before:bg-white focus:outline-none"
                                            name='name'
                                            readOnly
                                            checked={userStatus === 'Active'}
                                            onChange={() => setUserStatus('Active')}
                                        />
                                        <span className="text-gray cursor-pointer">Active</span>
                                    </label>

                                    {/* Inactive Checkbox */}
                                    <label className="flex items-center space-x-2 text-[13px]">
                                        <input
                                            type="radio"
                                            className="appearance-none cursor-pointer relative h-4 w-4 border-[1px] border-[#d8dfe7] rounded-[100%] checked:bg-primary checked:border-primary before:content-[''] before:absolute before:inset-[3px] before:rounded-[100%] before:bg-white checked:before:bg-white focus:outline-none"
                                            name='name'
                                            readOnly
                                            checked={userStatus === 'Inactive'}
                                            onChange={() => setUserStatus('Inactive')}
                                        />
                                        <span className="text-gray cursor-pointer">Inactive</span>
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className='px-[24px] py-[18px] flex items-center justify-end gap-2 border-t border-[#eaedf1]'>
                            <button onClick={handlesubmit} className="bg-primary text-white rounded-[0.75rem] ms-auto block text-[14px]  h-[40px] px-[16px] py-[8px]">Save Change</button>
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

export default Edit_fabric
