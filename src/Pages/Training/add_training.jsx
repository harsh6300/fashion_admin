import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import Searchdropdown from '../../Componenet/searchdropdown'
import DateRangePickerComponent from '../../Componenet/datepickerfilter'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useAddShiftMutation } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const Category = () => {
    const daysInMonth = Array.from({ length: 22 }, (_, i) => i + 1); // You can make this dynamic
    const navigate = useNavigate()
    const [modal, setModal] = useState(null);
    const [list, setlist] = useState('Additions');

    // ✅ Open & Close Modal
    const openlist = (modalId) => setlist(modalId);


    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);



    const [fields, setFields] = useState([
        { label: "", isBreak: "True", start: "", end: "" }
    ]);
    const [openDropdown, setOpenDropdown] = useState({ index: null, type: null });

    const toggleDropdown = (index, type) => {
        setOpenDropdown((prev) =>
            prev.index === index && prev.type === type
                ? { index: null, type: null }
                : { index, type }
        );
    };

    const handleChange = (index, key, value) => {
        const updated = [...fields];
        updated[index][key] = value;
        setFields(updated);
    };

    const addField = () => {
        setFields([...fields, { label: "", isBreak: "True", start: "", end: "", isHalfDay: "" }]);
    };


    const [amount, setamount] = useState('');
    const [name, setname] = useState('');
    const [lateCount, setlateCount] = useState('');
    const [gracePeriod, setgracePeriod] = useState('');
    const [addshift] = useAddShiftMutation();
    const handlesubmit = async () => {
        try {
            // Here you can handle the form submission logic, e.g., sending data to an API
            if (!name || !lateCount || !gracePeriod) {
                toast.error("Please fill in all fields");
                return;
            }
            const formData = new FormData();

            formData.append("name", name);
            formData.append("allowed_late_count", lateCount);
            formData.append("grace_period_minutes", gracePeriod);

            const periods = fields.map(field => ({
                label: field.label,
                is_break: field.isBreak ? "True" : 'False', // Assuming from dropdown string
                is_half_day: field.isHalfDay ? "True" : 'False', // If you have this field
                start_time: field.start,
                end_time: field.end
            }));

            formData.append("periods_json", JSON.stringify(periods));

            await addshift(formData).unwrap();
            toast.success("Shift added successfully");



        } catch (error) {
            toast.error(error?.data?.message || error?.message || "Failed to add shift");
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Shift"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793]  uppercase">Shift</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                
                                <li className="text-primary font-medium text-[12px]">Shift</li>
                            </ol>
                        </nav>


                    </div>



                    <div className="border mt-[30px]   bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">Shift Information</h4>

                        <form action="" className="p-[20px]">
                            <div className='grid grid-cols-1  w-full gap-x-[20px]  gap-[15px]'>
                                <div>
                                    <label className="block text-sm  text-gray font-medium">Name&nbsp;<span className="text-[#F44336] ">*</span></label>
                                    <input type="text"
                                        onChange={(e) => setname(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm  text-gray font-medium">Late Count&nbsp;<span className="text-[#F44336] ">*</span></label>
                                    <input type="text"
                                        onChange={(e) => setlateCount(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm  text-gray font-medium">Grace Period Minutes&nbsp;<span className="text-[#F44336] ">*</span></label>
                                    <input type="text"
                                        onChange={(e) => setgracePeriod(e.target.value)} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={addField}
                                        className=" text-primary px-5 py-2 rounded  text-sm"
                                    >
                                        + Add More
                                    </button>
                                </div>

                                {fields.map((item, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-5 border-b border-[#a5a5a534] pb-[30px] max-md:grid-cols-1 gap-[20px] mb-4"
                                    >
                                        {/* Label */}
                                        <div>
                                            <label className="block text-sm text-gray font-medium">
                                                Label <span className="text-[#F44336]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={item.label}
                                                onChange={(e) => handleChange(index, "label", e.target.value)}
                                                className="mt-[10px] w-full h-[40px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm"
                                            />
                                        </div>

                                        {/* Break using Searchdropdown */}
                                        <Searchdropdown
                                            options={["True", "False"]}
                                            label={`Break ${index + 1}`}
                                            onToggle={() => toggleDropdown(index, "break")}
                                            isOpen={openDropdown.index === index && openDropdown.type === "break"}
                                            setIsOpen={(state) =>
                                                setOpenDropdown(state ? { index, type: "break" } : { index: null, type: null })
                                            }
                                            onSelect={(value) => handleChange(index, "isBreak", value)}
                                        />

                                        <Searchdropdown
                                            options={["True", "False"]}
                                            label={`Half Day ${index + 1}`}
                                            onToggle={() => toggleDropdown(index, "halfday")}
                                            isOpen={openDropdown.index === index && openDropdown.type === "halfday"}
                                            setIsOpen={(state) =>
                                                setOpenDropdown(state ? { index, type: "halfday" } : { index: null, type: null })
                                            }
                                            onSelect={(value) => handleChange(index, "isHalfDay", value)}
                                        />


                                        {/* Start Time */}
                                        <div>
                                            <label className="block text-sm text-gray font-medium">
                                                Start Time <span className="text-[#F44336]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={item.start}
                                                onChange={(e) => handleChange(index, "start", e.target.value)}
                                                className="mt-[10px] w-full h-[40px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm"
                                            />
                                        </div>

                                        {/* End Time */}
                                        <div>
                                            <label className="block text-sm text-gray font-medium">
                                                End Time <span className="text-[#F44336]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={item.end}
                                                onChange={(e) => handleChange(index, "end", e.target.value)}
                                                className="mt-[10px] w-full h-[40px] px-[12px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}





                            </div>


                        </form>


                    </div>

                    <div className="flex justify-end items-center mt-[30px]  bg-[#eef2f7] rounded-[12px]">
                        <div className="p-[17px]  flex flex-row-reverse gap-3 max-sm:ps-0">
                            <div className="flex gap-2 border-t border-[#eaedf1] w-[100%] ">
                                <button onClick={handlesubmit} className="w-[182px]   max-sm:w-[125px] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px]  hover:bg-gray hover:text-white">
                                    Save Change
                                </button>
                                <button onClick={() => {
                                    navigate(-1)
                                }} className="w-[182px]  max-sm:w-[125px] h-[39px] text-white bg-primary  border-[1px] border-primary  rounded-[12px] text-[14px]  hover:text-primary hover:bg-transparent">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>









                </div>



            </div>






        </div>
    )
}
export default Category
