import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Or choose another theme




const Create_Invoice = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [date, setDate] = useState(new Date());
    const [value, setValue] = useState(1);

    const increment = () => setValue((prev) => Math.min(prev + 1, 100));
    const decrement = () => setValue((prev) => Math.max(prev - 1, 0));
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Order Cart"} />
                    <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap max-sm:mb-[20px]" >
                        <h4 className="text-[1.125rem] uppercase text-gray font-semibold">
                            Invoices Create</h4>
                    </div>

                    <div className='w-[83%] max-lg:w-full mx-auto rounded-[0.75rem]  p-[24px] bg-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]'>
                        <div className='flex-wrap flex justify-between border-b pb-[24px] border-[#eaedf1] mb-[36px]'>
                            <div className='w-full lg:w-[40%]'>
                                <div className=' border w-[50%] bg-[#fcfcfd] border-dashed border-primary p-[12px] rounded-[0.75rem]'>
                                    <img src="https://techzaa.in/larkon/admin/assets/images/logo-dark.png" className='h-[24px]' alt="" />
                                </div>
                                <div className='mt-[4.5rem] mb-[24px]'>
                                    <div className=''>
                                        <label className='text-sm mb-[7px] text-[#313b5e] block' htmlFor="">Sender Name</label>
                                        <input type="text" className='h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full' placeholder='First Name' />
                                    </div>
                                </div>
                                <div className=' mb-[24px]'>
                                    <div className=''>
                                        <label className='text-sm mb-[7px] text-[#313b5e] block' htmlFor="">Sender Full Address</label>
                                        <textarea className='h-[85px] py-[9px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full' placeholder='Enter Address' ></textarea>
                                    </div>
                                </div>
                                <div className='mb-[24px]'>
                                    <div className=''>
                                        <label className='text-sm mb-[7px] text-[#313b5e] block' htmlFor="">Phone number</label>
                                        <input type="number" className='h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full' placeholder='Number' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full lg:w-[40%]'>
                                <div className='mb-[24px]'>
                                    <div className=''>
                                        <label className='text-sm mb-[7px] text-[#313b5e] block' htmlFor="">Invoice Number :</label>
                                        <input type="text" className='h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full' value={'#INV-0758267/90'} placeholder='Invoice Number' />
                                    </div>
                                </div>
                                <div className='mb-[24px]'>
                                    <div className=''>
                                        <label className='text-sm mb-[7px] text-[#313b5e] block' htmlFor="">Issue Date :</label>
                                        <Flatpickr
                                            value={date}
                                            onChange={([selectedDate]) => setDate(selectedDate)}
                                            options={{
                                                dateFormat: "Y-m-d", // Customize as needed
                                            }}
                                            className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full"
                                            placeholder="Select date"
                                        />
                                    </div>
                                </div>
                                <div className='mb-[24px]'>
                                    <div className=''>
                                        <label className='text-sm mb-[7px] text-[#313b5e] block' htmlFor="">Due Date :</label>
                                        <Flatpickr
                                            value={date}
                                            onChange={([selectedDate]) => setDate(selectedDate)}
                                            options={{
                                                dateFormat: "Y-m-d", // Customize as needed
                                            }}
                                            className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full"
                                            placeholder="Select date"
                                        />
                                    </div>
                                </div>
                                <div className='mb-[24px]'>
                                    <div className=''>
                                        <label className='text-sm mb-[7px] text-[#313b5e] block' htmlFor="">Amount :</label>
                                        <div className='flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full'>
                                            <span className='px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]'><i className="fa-solid fa-dollar-sign text-lg text-[#313b5e]"></i></span>
                                            <input type="number" className='w-full px-[16px]' placeholder="00" />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-[24px]'>
                                    <div className=''>
                                        <label className='text-sm mb-[7px] text-[#313b5e] block' htmlFor="">Status :</label>
                                        <select name="" className='h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full' id="">
                                            <option value="">Paid</option>
                                            <option value="">Unpaid</option>
                                            <option value="">Partial</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex-wrap flex justify-between'>
                            <div className='w-full lg:w-[40%]'>
                                <h2 className='mb-[1.5rem] text-[1.125rem] text-[#313b5e] font-[600]'>Issue From :</h2>

                                <div className="mb-[0.75rem]">
                                    <input type="text" className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" placeholder="First Name" />
                                </div>
                                <div className="mb-[0.75rem]">
                                    <textarea className="h-[85px] py-[9px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" placeholder="Enter Address"></textarea>
                                </div>
                                <div className="mb-[0.75rem]">
                                    <input type="number" className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" placeholder="Number" />
                                </div>
                                <div className="mb-[0.75rem]">
                                    <input type="text" className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" placeholder="Email Address" />
                                </div>
                            </div>
                            <div className='w-full lg:w-[40%]'>
                                <h2 className='mb-[1.5rem] text-[1.125rem] text-[#313b5e] font-[600]'>Issue For :</h2>

                                <div className="mb-[0.75rem]">
                                    <input type="text" className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" placeholder="First Name" />
                                </div>
                                <div className="mb-[0.75rem]">
                                    <textarea className="h-[85px] py-[9px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" placeholder="Enter Address"></textarea>
                                </div>
                                <div className="mb-[0.75rem]">
                                    <input type="number" className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" placeholder="Number" />
                                </div>
                                <div className="mb-[0.75rem]">
                                    <input type="text" className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" placeholder="Email Address" />
                                </div>
                            </div>
                        </div>


                        <div className='mt-[2.25rem] w-full '>
                            <div className='overflow-x-scroll over__scroll'>
                            <table className='w-full  rounded-[0.85rem] '>
                                <thead className='bg-[#eef2f780] '>
                                    <tr>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm text-start'>Product Name</th>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm text-start'>Quantity</th>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm text-start'>Price</th>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm text-start'>Tax</th>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm text-start'>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className=''>
                                        <td className='p-[0.75rem] border-b border-[#eaedf1]'>
                                            <div className='flex gap-[1.5rem] '>
                                                <div>
                                                    <div className='w-[48px] h-[48px] bg-[#eef2f780] rounded-[0.75rem]'></div>
                                                </div>
                                                <div>
                                                    <div className="mb-[1.5rem]">
                                                        <input type="text" className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full  min-w-[100px]" placeholder="Product Name" />
                                                    </div>
                                                    <div className="mb-[1.5rem]">
                                                        <input type="text" className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full  min-w-[100px]" placeholder="Product Size" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='p-[0.75rem] border-b border-[#eaedf1]'>
                                            <div>

                                                <div className="inline-flex p-[6px] rounded-[0.75rem] text-[14px] border border-[#eaedf1]">
                                                    <button
                                                        type="button"
                                                        onClick={decrement}
                                                        className="h-[22px] px-[6px] text-[#313b5e] text-[20px] bg-[rgb(238,242,247)] rounded-[0.5rem] leading-[22px]"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="text-center border-0 w-[40px]"
                                                        value={value}
                                                        readOnly
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={increment}
                                                        className="h-[22px] px-[6px] text-[#313b5e] text-[20px] bg-[rgb(238,242,247)] rounded-[0.5rem] leading-[22px]"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='p-[0.75rem] border-b border-[#eaedf1]'>
                                            <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full">
                                                <span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]">
                                                    <i className="fa-solid fa-dollar-sign text-lg text-[#313b5e]"></i>
                                                </span>
                                                <input type="number" className="w-full px-[16px] min-w-[100px]" placeholder="00" />
                                            </div>
                                        </td>
                                        <td className='p-[0.75rem] border-b border-[#eaedf1]'>
                                            <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full">
                                                <span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]">
                                                    <i className="fa-solid fa-dollar-sign text-lg text-[#313b5e]"></i>
                                                </span>
                                                <input type="number" className="w-full px-[16px] min-w-[100px]" placeholder="00" />
                                            </div>
                                        </td>
                                        <td className='p-[0.75rem] border-b border-[#eaedf1]'>
                                            <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full">
                                                <span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]">
                                                    <i className="fa-solid fa-dollar-sign text-lg text-[#313b5e]"></i>
                                                </span>
                                                <input type="number" className="w-full px-[16px] min-w-[100px]" placeholder="00" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div className='mt-[24px]'>
                                <div className='flex justify-end'>
                                    <div className='flex flex-wrap items-center justify-end gap-[5px]'>
                                        <button className="bg-primary text-white rounded-[0.75rem] text-[14px]  h-[40px] px-[16px] py-[8px]">Clear Product</button>
                                        <button className="bg-transparent text-primary rounded-[0.75rem] border border-primary  text-[14px] h-[40px] px-[16px] py-[8px] ">Add More</button>
                                    </div>
                                </div>

                            </div>
                            <div className='flex-wrap flex justify-end'>
                                <div className='lg:w-[33.33%] w-full mt-[10px]'>
                                    <div className="mb-[1.5rem]">
                                        <label className="text-sm mb-[7px] text-[#313b5e] block" for="">Sub Total :</label>
                                        <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full"><span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]">
                                            <i className="fa-solid fa-dollar-sign text-lg text-[#313b5e]"></i>
                                        </span>
                                            <input type="number" className="w-full px-[16px]" placeholder="00" /></div>
                                    </div>
                                    <div className="mb-[1.5rem]">
                                        <label className="text-sm mb-[7px] text-[#313b5e] block" for="">Discount :</label>
                                        <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full"><span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]">
                                            <i className="fa-solid fa-dollar-sign text-lg text-[#313b5e]"></i>
                                        </span>
                                            <input type="number" className="w-full px-[16px]" placeholder="00" /></div>
                                    </div>
                                    <div className="mb-[1.5rem]">
                                        <label className="text-sm mb-[7px] text-[#313b5e] block" for="">Estimated Tax (15.5%) :</label>
                                        <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full"><span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]">
                                            <i className="fa-solid fa-dollar-sign text-lg text-[#313b5e]"></i>
                                        </span>
                                            <input type="number" className="w-full px-[16px]" placeholder="00" /></div>
                                    </div>
                                    <hr  className='border-[#eaedf1] mb-[1.5rem]'/>
                                    <div className="mb-[1.5rem]">
                                        <label className="text-sm mb-[7px] text-[#313b5e] block" for="">Grand Amount :</label>
                                        <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full"><span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]">
                                            <i className="fa-solid fa-dollar-sign text-lg text-[#313b5e]"></i>
                                        </span>
                                            <input type="number" className="w-full px-[16px]" placeholder="00" /></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='mt-[24px] flex items-center gap-[12px] p-[12px] mb-[20px] bg-[#fcdfdf] rounded-[0.75rem]'>
                                        <div>
                                            <div className='bg-[#ef5f5f] w-[36px] h-[36px] rounded-[0.75rem] flex items-center justify-center'>
                                                <i className="fa-solid fa-circle-info text-white"></i>
                                            </div>
                                            
                                        </div>
                                        <p className='text-[14px] text-[#602626]'>All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Create_Invoice
