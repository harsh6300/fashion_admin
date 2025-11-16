import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Project Details"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Project Details</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                
                                <li className="text-primary font-medium text-[12px]">All Project Details</li>
                            </ol>
                        </nav>


                    </div>



                    <div className="grid xl:grid-cols-12 text-sm md:grid-cols-12 gap-x-3 mb-1">
                        <div className="xl:col-span-4">
                            <div>
                                <div className="card flex-1 w-full border border-borderColor rounded-[5px] shadow-xs bg-white mb-4">
                                    <div className="card-body p-5">
                                        <div className="flex items-center pb-3 mb-3 border-b">
                                            <a href="task-details.html" className="flex-shrink-0 me-2">
                                                <img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/social/project-01.svg" alt="Img" />
                                            </a>
                                            <div>
                                                <h6 className="mb-1 font-semibold">
                                                    <a href="task-details.html">Hospital Administration</a>
                                                </h6>
                                                <div className="flex items-center text-gray-500">
                                                    <span>8 tasks</span>
                                                    <span className="mx-1">
                                                        <i className="ti ti-point-filled text-primary" />
                                                    </span>
                                                    <span>15 &nbsp;Completed</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid xl:grid-cols-12 md:grid-cols-12 gap-x-3 mb-1">
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Deadline</span>
                                                    <p className="text-dark">31 July 2025</p>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Value</span>
                                                    <p className="text-dark">$549987</p>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Project Lead</span>
                                                    <h6 className="font-normal flex items-center">
                                                        <img
                                                            className="avatar avatar-xs rounded-full me-1"
                                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-01.jpg"
                                                            alt="Img"
                                                        />
                                                        Leona
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-light p-2">
                                            <div className="grid grid-cols-12 items-center">
                                                <div className="xl:col-span-6">
                                                    <span className="font-semibold flex items-center text-gray-500 ">
                                                        <i className="ti ti-clock text-primary me-2" />
                                                        Total 565 Hrs
                                                    </span>
                                                </div>
                                                <div className="xl:col-span-6">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <small className="text-dark">54% Completed</small>
                                                        </div>
                                                        <div className="progress  progress-xs" style={{ height: 5 }}>
                                                            <div
                                                                className="progress-bar bg-info"
                                                                role="progressbar"
                                                                style={{ width: "54%", height: 5 }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card flex-1 w-full border border-borderColor rounded-[5px] shadow-xs bg-white mb-4">
                                    <div className="card-body p-5">
                                        <div className="flex items-center pb-3 mb-3 border-b">
                                            <a href="task-details.html" className="flex-shrink-0 me-2">
                                                <img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/social/project-02.svg" alt="Img" />
                                            </a>
                                            <div>
                                                <h6 className="mb-1 font-semibold">
                                                    <a href="task-details.html">Educational Platform </a>
                                                </h6>
                                                <div className="flex items-center text-gray-500">
                                                    <span>22 tasks</span>
                                                    <span className="mx-1">
                                                        <i className="ti ti-point-filled text-primary" />
                                                    </span>
                                                    <span>15 Completed</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid xl:grid-cols-12 md:grid-cols-12 gap-x-3 mb-1">
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Deadline</span>
                                                    <p className="text-dark">20 Aug 2025</p>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Value</span>
                                                    <p className="text-dark">$549987</p>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Project Lead</span>
                                                    <h6 className="font-normal flex items-center">
                                                        <img
                                                            className="avatar avatar-xs rounded-full me-1"
                                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-06.jpg"
                                                            alt="Img"
                                                        />
                                                        Harvey Smith
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-light p-2">
                                            <div className="grid grid-cols-12 items-center">
                                                <div className="xl:col-span-6">
                                                    <span className="font-semibold flex items-center text-gray-500 ">
                                                        <i className="ti ti-clock text-primary me-2" />
                                                        Total 700 Hrs
                                                    </span>
                                                </div>
                                                <div className="xl:col-span-6">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <small className="text-dark">89% Completed</small>
                                                        </div>
                                                        <div className="progress  progress-xs" style={{ height: 5 }}>
                                                            <div
                                                                className="progress-bar bg-success"
                                                                role="progressbar"
                                                                style={{ width: "75%", height: 5 }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card flex-1 w-full border border-borderColor rounded-[5px] shadow-xs bg-white mb-4">
                                    <div className="card-body p-5">
                                        <div className="flex items-center pb-3 mb-3 border-b">
                                            <a href="task-details.html" className="flex-shrink-0 me-2">
                                                <img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/social/project-04.svg" alt="Img" />
                                            </a>
                                            <div>
                                                <h6 className="mb-1 font-semibold">
                                                    <a href="task-details.html">Chat &amp; Call Mobile App</a>
                                                </h6>
                                                <div className="flex items-center text-gray-500">
                                                    <span>20 tasks</span>
                                                    <span className="mx-1">
                                                        <i className="ti ti-point-filled text-primary" />
                                                    </span>
                                                    <span>10 Completed</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid xl:grid-cols-12 md:grid-cols-12 gap-x-3 mb-1">
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Deadline</span>
                                                    <p className="text-dark">18 Oct 2025</p>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Value</span>
                                                    <p className="text-dark">$345987</p>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Project Lead</span>
                                                    <h6 className="font-normal flex items-center">
                                                        <img
                                                            className="avatar avatar-xs rounded-full me-1"
                                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-27.jpg"
                                                            alt="Img"
                                                        />
                                                        Stephan Peralt
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-light p-2">
                                            <div className="grid grid-cols-12 items-center">
                                                <div className="xl:col-span-6">
                                                    <span className="font-semibold flex items-center text-gray-500 ">
                                                        <i className="ti ti-clock text-primary me-2" />
                                                        Total 700 Hrs
                                                    </span>
                                                </div>
                                                <div className="xl:col-span-6">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <small className="text-dark">61% Completed</small>
                                                        </div>
                                                        <div className="progress  progress-xs" style={{ height: 5 }}>
                                                            <div
                                                                className="progress-bar bg-purple"
                                                                role="progressbar"
                                                                style={{ width: "61%", height: 5 }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card flex-1 w-full border border-borderColor rounded-[5px] shadow-xs bg-white">
                                    <div className="card-body p-5">
                                        <div className="flex items-center pb-3 mb-3 border-b">
                                            <a href="task-details.html" className="flex-shrink-0 me-2">
                                                <img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/social/project-05.svg" alt="Img" />
                                            </a>
                                            <div>
                                                <h6 className="mb-1 font-semibold">
                                                    <a href="task-details.html">Travel Planning Website</a>
                                                </h6>
                                                <div className="flex items-center text-gray-500">
                                                    <span>18 tasks</span>
                                                    <span className="mx-1">
                                                        <i className="ti ti-point-filled text-primary" />
                                                    </span>
                                                    <span>12 Completed</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid xl:grid-cols-12 md:grid-cols-12 gap-x-3 mb-1">
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Deadline</span>
                                                    <p className="text-dark">23 Nov 2025</p>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Value</span>
                                                    <p className="text-dark">$563987</p>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4">
                                                <div className="mb-3">
                                                    <span className="mb-1 block text-gray-500">Project Lead</span>
                                                    <h6 className="font-normal flex items-center">
                                                        <img
                                                            className="avatar avatar-xs rounded-full me-1"
                                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-23.jpg"
                                                            alt="Img"
                                                        />
                                                        Doglas Martini
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-light p-2">
                                            <div className="grid grid-cols-12 items-center">
                                                <div className="xl:col-span-6">
                                                    <span className="font-semibold flex items-center text-gray-500 ">
                                                        <i className="ti ti-clock text-primary me-2" />
                                                        Total 700 Hrs
                                                    </span>
                                                </div>
                                                <div className="xl:col-span-6">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <small className="text-dark">21% Completed</small>
                                                        </div>
                                                        <div className="progress  progress-xs" style={{ height: 5 }}>
                                                            <div
                                                                className="progress-bar bg-danger"
                                                                role="progressbar"
                                                                style={{ width: "21%", height: 5 }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-8">
                            <div className="grid xl:grid-cols-12 md:grid-cols-12 gap-x-3 mb-1">
                                <div className="xl:col-span-5">
                                    <div className="flex items-center flex-wrap gap-y-3 mb-3">
                                        <h6 className="me-2 font-semibold">Priority</h6>
                                        <ul
                                            className="border flex p-1 rounded   text-sm font-medium items-center"
                                            id="pills-tab"
                                            data-tabs-toggle="#pills-tab"
                                            data-tabs-active-classes="text-dark bg-white shadow-xs"
                                            data-tabs-inactive-classes="text-default hover:bg-dark-transparent bg-transparent hover:text-dark"
                                            role="tablist"
                                        >
                                            <li className="me-2 transition-transform" role="presentation">
                                                <button
                                                    className="px-2 py-1 text-[12px] rounded flex items-center justify-center w-auto text-dark bg-white shadow-xs"
                                                    id="pills-home-tab"
                                                    data-tabs-target="#pills-home"
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
                                                    id="pills-contact-tab"
                                                    data-tabs-target="#pills-contact"
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
                                                    id="pills-medium-tab"
                                                    data-tabs-target="#pills-medium"
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
                                                    id="pills-low-tab"
                                                    data-tabs-target="#pills-low"
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
                               
                            </div>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="" id="pills-home" role="tabpanel">
                                    <div className="card flex-1 w-full border border-borderColor rounded-[5px] shadow-xs mb-4 bg-white">
                                        <div className="card-body p-5">
                                            <h5 className="mb-3 text-[16px] font-semibold">Hospital Administration</h5>
                                            <div className="bg-light p-2 rounded">
                                                <span className="block mb-1 text-gray-500">Tasks Done</span>
                                                <h4 className="mb-2 font-semibold text-lg">41 / 43</h4>
                                                <div className="progress progress-xs mb-2" style={{ height: 5 }}>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        style={{ width: "84%", height: 5 }}
                                                    />
                                                </div>
                                                <p className="text-gray-500">84% Completed</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end mb-3 pb-3 border-b">
                                        <div className="dropdown">
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-toggle border rounded bg-white py-2 px-3 btn btn-white inline-flex items-center p-0 text-dark"
                                                data-dropdown-toggle="export-dropdown4"
                                            >
                                                <i className="ti ti-file-export me-1" /> Mark All as Completed
                                            </a>
                                            <ul
                                                id="export-dropdown4"
                                                className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                                data-popper-placement="bottom"
                                                style={{
                                                    position: "absolute",
                                                    inset: "0px auto auto 0px",
                                                    margin: 0,
                                                    transform: "translate(1798px, 458px)"
                                                }}
                                            >
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        All Tags
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Internal
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Projects
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Meetings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Reminder
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Research
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="list-group rounded-none pb-2">
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2 todo-strike-content">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 flex items-center rating-select">
                                                            <i className="ti ti-star-filled filled" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Finalize project proposal
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan 2025
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-success text-white me-1">
                                                            Projects
                                                        </span>
                                                        <span className="bg-pink-100 text-pink rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Onhold
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-13.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-14.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-15.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown13"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown13"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(1867px, 522px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2 todo-strike-content">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select d-flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Submit to supervisor by EOD
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            25 May 2024
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-danger text-white me-1">
                                                            Internal
                                                        </span>
                                                        <span className="bg-purple-100 text-purple rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Inprogress
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-20.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-21.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-22.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown2"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown2"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(1867px, 588px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2 todo-strike-content">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                                defaultChecked=""
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Prepare presentation slides
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan 2025
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-secondary text-white me-1">
                                                            Reminder
                                                        </span>
                                                        <span className="bg-secondary-100 text-secondary rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Pending
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-23.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-24.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-25.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown3"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown3"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(1867px, 654px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Check and respond to emails
                                                            </h4>
                                                        </div>
                                                        <span className="badge bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            Tomorrow
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span
                                                            className="py-1 px-2 rounded text-xs leading-none font-semibold bg-secondary text-white me-1"
                                                            z=""
                                                        >
                                                            Reminder
                                                        </span>
                                                        <span className="bg-success-100 text-success rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Completed
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-28.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-29.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-24.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown4"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown4"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-placement="top"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "auto auto 0px 0px",
                                                                        margin: 0,
                                                                        transform: "translate(1867px, 6px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Patient and Doctor video conferencing
                                                            </h4>
                                                        </div>
                                                        <span className="badge bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-danger text-white me-1">
                                                            Internal
                                                        </span>
                                                        <span className="bg-purple-100 text-purple rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Inprogress
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-06.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-09.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-14.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown5"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown5"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-placement="top"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "auto auto 0px 0px",
                                                                        margin: 0,
                                                                        transform: "translate(1867px, 72px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden" id="pills-contact" role="tabpanel">
                                    <div className="card flex-1 w-full border border-borderColor rounded-[5px] shadow-xs mb-4 bg-white">
                                        <div className="card-body p-5">
                                            <h5 className="mb-3">Hospital Administration</h5>
                                            <div className="bg-light p-2 rounded">
                                                <span className="block mb-1">Tasks Done</span>
                                                <h4 className="mb-2">41 / 43</h4>
                                                <div className="progress progress-xs mb-2" style={{ height: 5 }}>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        style={{ width: "84%", height: 5 }}
                                                    />
                                                </div>
                                                <p>84% Completed</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end mb-3 pb-3 border-b">
                                        <div className="dropdown">
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-toggle border rounded bg-white py-2 px-3 btn btn-white inline-flex items-center bg-transparent p-0 text-dark"
                                                data-dropdown-toggle="export-dropdown5"
                                            >
                                                <i className="ti ti-file-export me-1" /> Mark All as Completed
                                            </a>
                                            <ul
                                                id="export-dropdown5"
                                                className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                                data-popper-reference-hidden=""
                                                data-popper-escaped=""
                                                data-popper-placement="bottom"
                                                style={{
                                                    position: "absolute",
                                                    inset: "0px auto auto 0px",
                                                    margin: 0,
                                                    transform: "translate(0px, 10px)"
                                                }}
                                            >
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        All Tags
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Internal
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Projects
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Meetings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Reminder
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Research
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="list-group rounded-none pb-2">
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 flex items-center rating-select">
                                                            <i className="ti ti-star-filled filled" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Finalize project proposal
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan 2025
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-success text-white me-1">
                                                            Projects
                                                        </span>
                                                        <span className="bg-pink-100 text-pink rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Onhold
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-13.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-14.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-15.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown14"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown14"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select d-flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Submit to supervisor by EOD
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            25 May 2024
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-danger text-white me-1">
                                                            Internal
                                                        </span>
                                                        <span className="bg-purple-100 text-purple rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Inprogress
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-20.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-21.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-22.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown15"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown15"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2 todo-strike-content">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                                defaultChecked=""
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Prepare presentation slides
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan 2025
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-secondary text-white me-1">
                                                            Reminder
                                                        </span>
                                                        <span className="bg-secondary-100 text-secondary rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Pending
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-23.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-24.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-25.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown16"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown16"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Check and respond to emails
                                                            </h4>
                                                        </div>
                                                        <span className="badge bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            Tomorrow
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span
                                                            className="py-1 px-2 rounded text-xs leading-none font-semibold bg-secondary text-white me-1"
                                                            z=""
                                                        >
                                                            Reminder
                                                        </span>
                                                        <span className="bg-success-100 text-success rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Completed
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-28.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-29.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-24.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown17"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown17"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Patient and Doctor video conferencing
                                                            </h4>
                                                        </div>
                                                        <span className="badge bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-danger text-white me-1">
                                                            Internal
                                                        </span>
                                                        <span className="bg-purple-100 text-purple rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Inprogress
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-06.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-09.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-14.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown18"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown18"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden" id="pills-medium" role="tabpanel">
                                    <div className="card flex-1 w-full border border-borderColor rounded-[5px] shadow-xs mb-4 bg-white">
                                        <div className="card-body p-5">
                                            <h5 className="mb-3">Hospital Administration</h5>
                                            <div className="bg-light p-2 rounded">
                                                <span className="block mb-1">Tasks Done</span>
                                                <h4 className="mb-2">41 / 43</h4>
                                                <div className="progress progress-xs mb-2" style={{ height: 5 }}>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        style={{ width: "84%", height: 5 }}
                                                    />
                                                </div>
                                                <p>84% Completed</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end mb-3 pb-3 border-b">
                                        <div className="dropdown">
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-toggle border rounded bg-white py-2 px-3 btn btn-white inline-flex items-center bg-transparent p-0 text-dark"
                                                data-dropdown-toggle="export-dropdown6"
                                            >
                                                <i className="ti ti-file-export me-1" /> Mark All as Completed
                                            </a>
                                            <ul
                                                id="export-dropdown6"
                                                className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                                data-popper-reference-hidden=""
                                                data-popper-escaped=""
                                                data-popper-placement="bottom"
                                                style={{
                                                    position: "absolute",
                                                    inset: "0px auto auto 0px",
                                                    margin: 0,
                                                    transform: "translate(0px, 10px)"
                                                }}
                                            >
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        All Tags
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Internal
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Projects
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Meetings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Reminder
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Research
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="list-group rounded-none pb-2">
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 flex items-center rating-select">
                                                            <i className="ti ti-star-filled filled" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Finalize project proposal
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan 2025
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-success text-white me-1">
                                                            Projects
                                                        </span>
                                                        <span className="bg-pink-100 text-pink rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Onhold
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-13.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-14.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-15.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown19"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown19"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select d-flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Submit to supervisor by EOD
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            25 May 2024
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-danger text-white me-1">
                                                            Internal
                                                        </span>
                                                        <span className="bg-purple-100 text-purple rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Inprogress
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-20.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-21.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-22.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown20"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown20"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2 todo-strike-content">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                                defaultChecked=""
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Prepare presentation slides
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan 2025
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-secondary text-white me-1">
                                                            Reminder
                                                        </span>
                                                        <span className="bg-secondary-100 text-secondary rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Pending
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-23.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-24.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-25.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown21"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown21"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Check and respond to emails
                                                            </h4>
                                                        </div>
                                                        <span className="badge bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            Tomorrow
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span
                                                            className="py-1 px-2 rounded text-xs leading-none font-semibold bg-secondary text-white me-1"
                                                            z=""
                                                        >
                                                            Reminder
                                                        </span>
                                                        <span className="bg-success-100 text-success rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Completed
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-28.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-29.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-24.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown22"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown22"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Patient and Doctor video conferencing
                                                            </h4>
                                                        </div>
                                                        <span className="badge bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-danger text-white me-1">
                                                            Internal
                                                        </span>
                                                        <span className="bg-purple-100 text-purple rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Inprogress
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-06.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-09.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-14.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown23"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown23"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden" id="pills-low" role="tabpanel">
                                    <div className="card flex-1 w-full border border-borderColor rounded-[5px] shadow-xs mb-4 bg-white">
                                        <div className="card-body p-5">
                                            <h5 className="mb-3">Hospital Administration</h5>
                                            <div className="bg-light p-2 rounded">
                                                <span className="block mb-1">Tasks Done</span>
                                                <h4 className="mb-2">41 / 43</h4>
                                                <div className="progress progress-xs mb-2" style={{ height: 5 }}>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        style={{ width: "84%", height: 5 }}
                                                    />
                                                </div>
                                                <p>84% Completed</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end mb-3 pb-3 border-b">
                                        <div className="dropdown">
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-toggle border rounded bg-white py-2 px-3 btn btn-white inline-flex items-center bg-transparent p-0 text-dark"
                                                data-dropdown-toggle="export-dropdown7"
                                            >
                                                <i className="ti ti-file-export me-1" /> Mark All as Completed
                                            </a>
                                            <ul
                                                id="export-dropdown7"
                                                className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                                data-popper-reference-hidden=""
                                                data-popper-escaped=""
                                                data-popper-placement="bottom"
                                                style={{
                                                    position: "absolute",
                                                    inset: "0px auto auto 0px",
                                                    margin: 0,
                                                    transform: "translate(0px, 10px)"
                                                }}
                                            >
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        All Tags
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Internal
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Projects
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Meetings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Reminder
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary"
                                                    >
                                                        Research
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="list-group rounded-none pb-2">
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 flex items-center rating-select">
                                                            <i className="ti ti-star-filled filled" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Finalize project proposal
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan 2025
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-success text-white me-1">
                                                            Projects
                                                        </span>
                                                        <span className="bg-pink-100 text-pink rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Onhold
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-13.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-14.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-15.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown24"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown24"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select d-flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Submit to supervisor by EOD
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            25 May 2024
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-danger text-white me-1">
                                                            Internal
                                                        </span>
                                                        <span className="bg-purple-100 text-purple rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Inprogress
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-20.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-21.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-22.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown25"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown25"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2 todo-strike-content">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                                defaultChecked=""
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Prepare presentation slides
                                                            </h4>
                                                        </div>
                                                        <span className="bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan 2025
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-secondary text-white me-1">
                                                            Reminder
                                                        </span>
                                                        <span className="bg-secondary-100 text-secondary rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Pending
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-23.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-24.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-25.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown26"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown26"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Check and respond to emails
                                                            </h4>
                                                        </div>
                                                        <span className="badge bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            Tomorrow
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span
                                                            className="py-1 px-2 rounded text-xs leading-none font-semibold bg-secondary text-white me-1"
                                                            z=""
                                                        >
                                                            Reminder
                                                        </span>
                                                        <span className="bg-success-100 text-success rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Completed
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-28.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-29.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-24.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown27"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown27"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item border bg-white border-white transition-all duration-500 shadow-sm rounded mb-2 p-3">
                                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6 items-center gap-y-3">
                                                <div className="lg:col-span-6 md:col-span-7">
                                                    <div className="todo-inbox-check flex items-center flex-wrap gap-y-2">
                                                        <span className="me-2 flex items-center">
                                                            <i className="ti ti-grid-dots text-dark" />
                                                        </span>
                                                        <div className="form-check form-check-md me-2">
                                                            <input
                                                                className="size-4 bg-white border border-borderColor rounded text-primary focus:ring-0"
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                        <span className="me-2 rating-select flex items-center">
                                                            <i className="ti ti-star" />
                                                        </span>
                                                        <div className="strike-info">
                                                            <h4 className="text-[14px] truncate">
                                                                Patient and Doctor video conferencing
                                                            </h4>
                                                        </div>
                                                        <span className="badge bg-dark-transparent text-dark rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs ms-2">
                                                            <i className="ti ti-calendar me-1" />
                                                            15 Jan
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-6 md:col-span-5">
                                                    <div className="flex items-center justify-end flex-wrap gap-y-3">
                                                        <span className="py-1 px-2 rounded text-xs leading-none font-semibold bg-danger text-white me-1">
                                                            Internal
                                                        </span>
                                                        <span className="bg-purple-100 text-purple rounded text-[10px] font-medium leading-4 py-0.5 px-1.5 inline-flex items-center badge-xs me-2">
                                                            <i className="fas fa-circle text-[6px] me-1" />
                                                            Inprogress
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className="flex -space-x-2 mb-2">
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-06.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-09.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                                <span className="size-6 flex items-center justify-center rounded-full mx-1">
                                                                    <img
                                                                        className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                                                        src="assets/img/profiles/avatar-14.jpg"
                                                                        alt="img"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="p-1 bg-white inline-flex items-center focus:text-primary hover:text-primary text-gray-900"
                                                                    data-dropdown-toggle="office-dropdown28"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul
                                                                    id="office-dropdown28"
                                                                    className="hidden z-[9] p-4 border rounded bg-white shadow-lg"
                                                                    data-popper-reference-hidden=""
                                                                    data-popper-escaped=""
                                                                    data-popper-placement="bottom"
                                                                    style={{
                                                                        position: "absolute",
                                                                        inset: "0px auto auto 0px",
                                                                        margin: 0,
                                                                        transform: "translate(0px, 10px)"
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="edit_todo"
                                                                            data-modal-target="edit_todo"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="delete_modal"
                                                                            data-modal-target="delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                                            data-modal-toggle="view_todo"
                                                                            data-modal-target="view_todo"
                                                                        >
                                                                            <i className="ti ti-eye me-2" />
                                                                            View{" "}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-4">
                                <a href="#" className="btn btn-primary">
                                    <i className="ti ti-loader me-1" />
                                    Load More
                                </a>
                            </div>
                        </div>
                    </div>










                </div>
            </div>








        </div >
    )
}
export default Category
