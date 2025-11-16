import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetCategoriesQuery, useDeleteCategoryMutation, useGetProfileQuery, useAddPermissionMutation, useGetPermissionQuery, } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import Category_img from '../../assets/category.png'
import { Icon } from '@iconify/react';


const Category = () => {
    const [modal, setModal] = useState(null);


    const navigate = useNavigate()


    const { data: profile } = useGetProfileQuery()
    const [addPermission] = useAddPermissionMutation()

    const { data: permission } = useGetPermissionQuery(profile?.data?.username)



    const per = permission?.data?.permissions

    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);







    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);





    // --------------------------------dropdown
    const [open, setOpen] = useState(false);
    const modules = ['Category', 'Sub Category', 'Product', 'Color', 'Fabric', 'Media', 'Warehouse', 'Inventory', 'Warehouse Transfer', 'Inventory Log'];
    const actions = ['view', 'add', 'edit', 'delete'];

    const [checkboxState, setCheckboxState] = useState(
        modules.reduce((acc, module) => {
            acc[module] = actions.reduce((aAcc, action) => {
                aAcc[action] = false;
                return aAcc;
            }, {});
            return acc;
        }, {})
    );

    const [headerChecked, setHeaderChecked] = useState(false);

    const toggleHeaderCheckbox = () => {
        const newChecked = !headerChecked;
        const newState = modules.reduce((acc, module) => {
            acc[module] = actions.reduce((aAcc, action) => {
                aAcc[action] = newChecked;
                return aAcc;
            }, {});
            return acc;
        }, {});
        setCheckboxState(newState);
        setHeaderChecked(newChecked);
    };

    const toggleIndividualCheckbox = (module, action) => {
        setCheckboxState(prev => ({
            ...prev,
            [module]: {
                ...prev[module],
                [action]: !prev[module][action],
            },
        }));
    };

    const permissionIds = {
        'Category': { view: 32, add: 29, edit: 30, delete: 31 },
        'Sub Category': { view: 52, add: 49, edit: 50, delete: 51 },
        'Product': { view: 48, add: 45, edit: 46, delete: 47 },
        'Color': { view: 36, add: 33, edit: 34, delete: 35 },
        'Fabric': { view: 40, add: 37, edit: 38, delete: 39 },
        'Media': { view: 60, add: 57, edit: 58, delete: 59 },
        'Warehouse': { view: 92, add: 89, edit: 90, delete: 91 },
        'Inventory': { view: 88, add: 85, edit: 86, delete: 87 },
        'Warehouse Transfer': { view: 100, add: 97, edit: 98, delete: 99 },
        'Inventory Log': { view: 96, add: 93, edit: 94, delete: 95 },
    };

    const buildFormDataWithPermissions = () => {
        const formData = new FormData();

        formData.append('username', profile?.data?.username)

        for (const module in checkboxState) {
            for (const action in checkboxState[module]) {
                const id = permissionIds[module]?.[action];
                if (id) {
                    const key = checkboxState[module][action] ? 'permission_ids' : 'remove_permission_ids';
                    formData.append(key, id);
                }
            }
        }

        return formData;
    };
    const handleSubmit = async () => {
        const formData = buildFormDataWithPermissions();

        try {
            const response = await addPermission(formData).unwrap();
            toast.success("Permissions added successfully!");
            console.log("API response:", response);
        } catch (error) {
            console.error("Error updating permissions:", error);
            toast.error("Failed to update permissions. Please try again.");
        }
    };
    useEffect(() => {
        if (permission?.data?.permissions) {
            const userPermissions = permission.data.permissions.map(p => p.id); // extract IDs

            const updatedState = modules.reduce((acc, module) => {
                acc[module] = actions.reduce((aAcc, action) => {
                    const id = permissionIds[module]?.[action];
                    aAcc[action] = userPermissions.includes(id);
                    return aAcc;
                }, {});
                return acc;
            }, {});
            setCheckboxState(updatedState);
        }
    }, [permission]);

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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Permission"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Permission</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                
                                <li className="text-primary font-medium text-[12px]">All Permission</li>
                            </ol>
                        </nav>


                    </div>

                    <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] flex  gap-4 max-lg:items-center justify-between">

                            {/* <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full lg:w-auto">

                               


                                <div className=" max-sm:w-[250px] w-[458px]">
                                    <fieldset className="relative border border-[#dce7f2] text-[#5E5873] rounded-[6px] h-[40px] mt-2 lg:mt-0">
                                        <input
                                            placeholder="Search here..."
                                            tabIndex="2"
                                            required
                                            type="text"
                                            name="name"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="outline-none shadow-none w-full h-full pr-8 text-sm font-inter font-normal leading-5 bg-transparent focus:bg-white selection:bg-white text-heading ps-[10px] transition-colors duration-200"
                                        />
                                        <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 -translate-y-1/2 text-[#5E5873] text-sm pointer-events-none"></i>
                                    </fieldset>
                                </div> 
                            </div>*/}

                            <div>
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">All Permission List</h3>
                            </div>



                        </div>

                        <div className="min-h-[65vh] over_scroll overflow-x-scroll">
                            <table className="w-full ">
                                <thead className="border-y border-[#ddd]">

                                    <tr className="max-sm:h-[40px] h-[54px] ">
                                        <th className="px-[30px]  max-xl:px-[10px]">
                                            <div className="text-start  text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">
                                                {/* <div className="cursor-pointer flex items-center space-x-2 max-sm:hidden" onClick={toggleHeaderCheckbox} >
                                                    <div
                                                        className={`checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${headerChecked ? 'bg-[#ff6c2f]' : 'border-2 border-[#ece7e7f1]'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`checkmark bg-[#ff6c2f] ${headerChecked ? 'opacity-100' : 'opacity-0'
                                                                } flex items-center justify-center text-white rounded-[3px] transition-opacity`}
                                                        >
                                                            ✔
                                                        </span>
                                                    </div>
                                                </div> */}
                                                Module

                                            </div>
                                        </th>

                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap  max-md:text-[13px] max-sm:px-[10px]">View</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px]  max-sm:px-[10px]">Add</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Update</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Delete</th>
                                    </tr>


                                </thead>
                                <tbody className="">
                                    {modules.map((module, idx) => (
                                        <tr key={idx} className="h-[44px] sm:h-[58px] transition-all duration-200 bg-white hover:bg-[rgba(238,243,249,0.8)] border-b border-[#ddd]">
                                            <td className="text-sm text-[#5E5873] px-[30px] py-[15px]">{module}</td>
                                            {actions.map((action) => (
                                                <td key={action} className="text-center">
                                                    <div className="flex justify-center items-center">
                                                        <div className="cursor-pointer" onClick={() => toggleIndividualCheckbox(module, action)}>
                                                            <div className={`checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${checkboxState[module][action] ? 'bg-[#ff6c2f]' : 'border-2 border-[#ece7e7f1]'}`}>
                                                                <span className={`checkmark bg-[#ff6c2f] ${checkboxState[module][action] ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                                    ✔
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            <div className="mt-4 flex gap-4 pt-[10px] p-[24px]">

                                <button onClick={handleSubmit} className="bg-primary text-white rounded-[0.75rem] ms-auto block text-[14px]  h-[40px] px-[16px] py-[8px]">Submit</button>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>









    )
}
export default Category
