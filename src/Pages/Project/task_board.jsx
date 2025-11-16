import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import Drag_drop from '../../Componenet/drag_and_drop_project'
import { ToastContainer, toast } from "react-toastify";
import { useGetCategoriesQuery, useDeleteCategoryMutation, useGetProfileQuery, } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import Category_img from '../../assets/category.png'
import { Icon } from '@iconify/react';


const Category = () => {
    const [modal, setModal] = useState(null);
    const [category, setCategory] = useState({
        name: "",
        description: "",
        is_active: "",
        is_home: "",
        category_type: "",
        category_img: "",
        category_id: ""
    });


    const navigate = useNavigate()


    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);

    // ✅ Fetch categories using RTK Query
    const { data: categories } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();
    const categories1 = categories?.data || [];





    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);


    const [deletcategory, setDeletcategory] = useState(null);
    // ✅ Handle Delete Category
    const handleDeleteCategory = async () => {
        try {
            const formdata = new FormData()

            formdata.append('category_id', deletcategory)

            await deleteCategory(formdata).unwrap();
            toast.success("Category deleted successfully!");
            closeModal();
        } catch (error) {
            toast.error(error.data?.message || "Failed to delete category");
        }
    };

    // ✅ Dropdown Handling
    const toggleDropdown = (index) => setOpenDropdown(openDropdown === index ? null : index);
    const handleClickOutside = (event) => {
        dropdownRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                setOpenDropdown((prev) => (prev === index ? null : prev));
            }
        });
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const filteredData = categories1?.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    const displayedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );



    const handleItemChange = (event) => {
        const value = parseInt(event.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const edit_category11 = (category) => {

        let user_category = data.find((val) => val.category_id == category)
        setCategory(user_category)
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            setSelectedImage(URL.createObjectURL(file));
            setCategory((prev) => ({ ...prev, file })); // Store the file object
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal1 = () => {
        setIsModalOpen(false);
        setModalImage("");
    };

    const { data: user } = useGetProfileQuery();
    const userdata = user?.data || [];



    const [checkedItems, setCheckedItems] = useState({});

    const toggleCheckbox = (id) => {
        setCheckedItems((prev) => {
            const updated = { ...prev, [id]: !prev[id] };

            // Update header checkbox state
            const allChecked = categories1.every(item => updated[item.category_id]);
            setHeaderChecked(allChecked);

            return updated;
        });
    };

    const [headerChecked, setHeaderChecked] = useState(false);

    const toggleHeaderCheckbox = () => {
        const newCheckedState = !headerChecked;
        setCheckedItems(Array(displayedData.length).fill(newCheckedState));
        setHeaderChecked(newCheckedState);
    };


    // --------------------------------dropdown
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const [accordion, setaccordion] = useState('overview')
    const [task, settask] = useState(false)
    const [documents, setdocuments] = useState(false)
    const [notes, setnotes] = useState(false)
    const [invoice, setinvoice] = useState(false)
    const [project_acco, setproject_acco] = useState(false)


    const [isOpen1, setIsOpen1] = useState(false);
    const dropdownRef1 = useRef();
    const buttonRef = useRef();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef1.current &&
                !dropdownRef1.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen1(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Task"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Task</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                
                                <li className="text-primary font-medium text-[12px]">All Task</li>
                            </ol>
                        </nav>


                    </div>
                    <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                        <div className="card-header p-4 flex items-center justify-between flex-wrap gap-x-3">
                            <h4 className="text-lg font-semibold">Hospital Administration</h4>
                            <div className="flex items-center text-sm flex-wrap gap-x-3">
                                <div className="flex -space-x-2 rtl:space-x-reverse">
                                    <img
                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-19.jpg"
                                        alt=""
                                    />
                                    <img
                                        className="size-6 border border-white rounded-full  hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-29.jpg"
                                        alt=""
                                    />
                                    <img
                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-16.jpg"
                                        alt=""
                                    />
                                    <a
                                        className="flex items-center justify-center size-6 text-xs font-medium text-white bg-primary border border-white rounded-full hover:bg-primary shrink-0 hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                        href="#"
                                    >
                                        +1
                                    </a>
                                </div>
                                <div className="flex items-center me-3">
                                    <p className="mb-0 me-3 pe-3 text-gray-500 border-r fs-14">
                                        Total Task : <span className="text-dark"> 55 </span>
                                    </p>
                                    <p className="mb-0 me-3 pe-3 text-gray-500 border-r fs-14">
                                        Pending : <span className="text-dark"> 15 </span>
                                    </p>
                                    <p className="mb-0 fs-14 text-gray-500">
                                        Completed : <span className="text-dark"> 40 </span>
                                    </p>
                                </div>
                                <div className="input-icon-start relative">
                                    <span className="absolute top-0 bottom-0 left-0 flex items-center justify-center min-w-[2.5rem] text-gray-400 pointer-events-none text-[1.2em]">
                                        <i className="ti ti-search" />
                                    </span>
                                    <input
                                        type="text"
                                        className="block flex-1 border border-borderColor bg-white rounded-[5px] py-1.5 pl-8 pr-12 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:border-borderColor h-[38px] text-sm"
                                        placeholder="Search Project"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-4 text-sm">
                            <div className="grid grid-cols-1 xxl:grid-cols-12  gap-x-6">
                                <div className="xl:col-span-4 md:col-span-4 ">
                                    <div className="flex items-center flex-wrap gap-x-3 mb-3">
                                        <h6 className="me-2 font-semibold">Priority</h6>
                                        <ul
                                            className="border flex p-1 rounded bg-light  text-sm font-medium items-center"
                                            id="default-styled-tab"
                                            data-tabs-toggle="#default-styled-tab-content"
                                            data-tabs-active-classes="text-dark bg-white shadow-xs"
                                            data-tabs-inactive-classes="text-default hover:bg-dark-transparent bg-transparent hover:text-dark"
                                            role="tablist"
                                        >
                                            <li className="me-2 transition-transform" role="presentation">
                                                <button
                                                    className="px-2 py-1 text-[12px] rounded flex items-center justify-center w-auto text-dark bg-white shadow-xs"
                                                    id="basic-tab"
                                                    data-tabs-target="#basic"
                                                    type="button"
                                                    role="tab"
                                                    aria-selected="true"
                                                >
                                                    All
                                                </button>
                                            </li>
                                            <li className="me-2 transition-transform" role="presentation">
                                                <button
                                                    className="px-2 py-1 text-[12px] rounded flex items-center justify-center w-auto text-default hover:bg-dark-transparent bg-transparent hover:text-dark"
                                                    id="dashboard-styled-tab"
                                                    data-tabs-target="#styled-dashboard"
                                                    type="button"
                                                    role="tab"
                                                    aria-selected="false"
                                                >
                                                    High
                                                </button>
                                            </li>
                                            <li className="me-2 transition-transform" role="presentation">
                                                <button
                                                    className="px-2 py-1 text-[12px] rounded flex items-center justify-center w-auto text-default hover:bg-dark-transparent bg-transparent hover:text-dark"
                                                    id="settings-styled-tab"
                                                    data-tabs-target="#styled-settings"
                                                    type="button"
                                                    role="tab"
                                                    aria-selected="false"
                                                >
                                                    Medium
                                                </button>
                                            </li>
                                            <li className="transition-transform" role="presentation">
                                                <button
                                                    className="px-2 py-1 text-[12px] rounded flex items-center justify-center w-auto text-default hover:bg-dark-transparent bg-transparent hover:text-dark"
                                                    id="contacts-styled-tab"
                                                    data-tabs-target="#styled-contacts"
                                                    type="button"
                                                    role="tab"
                                                    aria-selected="false"
                                                >
                                                    Low
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="xl:col-span-8 md:col-span-8 ">
                                    <div className="flex items-center justify-end flex-wrap gap-x-2 mb-3">
                                        <div>
                                            <a
                                                href="javascript:void(0);"
                                                className="border rounded p-2 bg-white inline-flex items-center focus:bg-primary focus:border-primary focus:text-white text-gray-900"
                                                data-dropdown-toggle="client-dropdown"
                                            >
                                                Client
                                                <i className="ti ti-chevron-down ml-1" />
                                            </a>
                                            <ul
                                                id="client-dropdown"
                                                className="p-4 border rounded bg-white shadow-lg w-40 z-[1] hidden"
                                                style={{
                                                    position: "absolute",
                                                    inset: "0px auto auto 0px",
                                                    margin: 0,
                                                    transform: "translate(1266px, 288px)"
                                                }}
                                                aria-hidden="true"
                                                data-popper-placement="bottom"
                                            >
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Clients
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Sophie
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Cameron
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Doris
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 end-2 flex items-center pointer-events-none">
                                                    <i className="ti ti-calendar text-gray-600 text-base leading-normal" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Created Date"
                                                    className="flatpickr-input flat-datepickr bg-white border-borderColor text-gray-900 text-sm rounded-input block w-[125px] py-2 px-2.5 h-[38px] placeholder:text-gray-400"
                                                    readOnly="readonly"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 end-2 flex items-center pointer-events-none">
                                                    <i className="ti ti-calendar text-gray-600 text-base leading-normal" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Due Date"
                                                    className="flatpickr-input flat-datepickr bg-white border-borderColor text-gray-900 text-sm rounded-input block w-[125px] py-2 px-2.5 h-[38px] placeholder:text-gray-400"
                                                    readOnly="readonly"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <a
                                                href="javascript:void(0);"
                                                className="border rounded p-2 bg-white inline-flex items-center focus:bg-primary focus:border-primary focus:text-white text-gray-900"
                                                data-dropdown-toggle="status-dropdown"
                                            >
                                                Select Status
                                                <i className="ti ti-chevron-down ml-1" />
                                            </a>
                                            <ul
                                                id="status-dropdown"
                                                className="p-4 border rounded bg-white shadow-lg w-40 z-[1] hidden"
                                                style={{
                                                    position: "absolute",
                                                    inset: "0px auto auto 0px",
                                                    margin: 0,
                                                    transform: "translate(1635px, 288px)"
                                                }}
                                                aria-hidden="true"
                                                data-popper-placement="bottom"
                                            >
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Inprogress
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        On-hold
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Completed
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <a
                                                href="javascript:void(0);"
                                                className="border rounded p-2 bg-white inline-flex items-center focus:bg-primary focus:border-primary focus:text-white text-gray-900"
                                                data-dropdown-toggle="days-dropdown"
                                            >
                                                Sort By : Created Date
                                                <i className="ti ti-chevron-down ml-1" />
                                            </a>
                                            <ul
                                                id="days-dropdown"
                                                className="p-4 border rounded bg-white shadow-lg w-40 z-[1] hidden"
                                                style={{
                                                    position: "absolute",
                                                    inset: "0px auto auto 0px",
                                                    margin: 0,
                                                    transform: "translate(1788px, 288px)"
                                                }}
                                                aria-hidden="true"
                                                data-popper-placement="bottom"
                                            >
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Created Date
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Last 7 Days
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Due Date
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-12">
                                    <div id="default-styled-tab-content">
                                        <div className="" id="basic" role="tabpanel">
                                            <div className="flex overflow-x-auto items-start pb-4 min-w-[265px] ">
                                             
                                                <Drag_drop />    
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>














                </div>
            </div>








        </div >
    )
}
export default Category
