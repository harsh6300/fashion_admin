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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Project"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Project</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                
                                <li className="text-primary font-medium text-[12px]">All Project</li>
                            </ol>
                        </nav>


                    </div>



                    <div className="border mb-[24px]  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] py-[15px] flex  gap-4 items-center justify-between flex-wrap">


                            <div>
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans"> Project Grid
                                </h3>

                            </div>
                            <div className="flex gap-2 items-center">

                                <div>

                                    <button onClick={() => {
                                        navigate('/add_shift')
                                    }} className="bg-primary text-white text-[12.6px] rounded-[8px] py-[6px] px-[12px]  transition-colors ">Add Project</button>
                                </div>


                            </div>


                        </div>
                    </div>



                    <div className="grid text-sm grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Office Management</a>
                                    </h6>
                                    <div>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown1"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown1"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="bottom-end"
                                            style={{
                                                position: "absolute",
                                                inset: "0px 0px auto auto",
                                                margin: 0,
                                                transform: "translate(-1274px, 309px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        An office management app project streamlines administrative tasks by
                                        integrating tools for scheduling, communication, and task management,
                                        enhancing overall productivity and efficiency.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-39.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Anthony Lewis</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">14 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">6</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-02.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-03.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-05.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +1
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Clinic Management</a>
                                    </h6>
                                    <div>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown2"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown2"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="bottom-end"
                                            style={{
                                                position: "absolute",
                                                inset: "0px 0px auto auto",
                                                margin: 0,
                                                transform: "translate(-864px, 309px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        A clinic management project streamlines patient records, appointments,
                                        and billing processes to improve operational efficiency
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-40.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Sophie Headrick</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">15 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">7</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-06.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-07.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-08.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Educational Platform</a>
                                    </h6>
                                    <div>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown3"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown3"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="bottom-end"
                                            style={{
                                                position: "absolute",
                                                inset: "0px 0px auto auto",
                                                margin: 0,
                                                transform: "translate(-455px, 309px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        An educational platform project provides a centralized space for
                                        delivering online courses, tracking progress, and managing student
                                        assessments.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-41.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Cameron Drake</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">16 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">5</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-09.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-10.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-11.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Chat &amp; Call Mobile App</a>
                                    </h6>
                                    <div>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown4"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown4"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="bottom-end"
                                            style={{
                                                position: "absolute",
                                                inset: "0px 0px auto auto",
                                                margin: 0,
                                                transform: "translate(-45px, 309px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        A chat and call mobile app enables users to send messages, make voice
                                        and video calls, and share media seamlessly across devices.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-42.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Doris Crowley</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">17 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">6</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-12.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-13.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-14.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Travel Planning Website</a>
                                    </h6>
                                    <div>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown5"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown5"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="bottom-end"
                                            style={{
                                                position: "absolute",
                                                inset: "0px 0px auto auto",
                                                margin: 0,
                                                transform: "translate(-1274px, 589px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        A travel planning website helps users explore destinations, compare
                                        flights and accommodations, and create personalized itineraries.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-43.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Thomas Bordelon</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Manager</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">18 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">8</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-15.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-16.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-17.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Service Booking Software</a>
                                    </h6>
                                    <div>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown6"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown6"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="bottom-end"
                                            style={{
                                                position: "absolute",
                                                inset: "0px 0px auto auto",
                                                margin: 0,
                                                transform: "translate(-864px, 589px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        Service booking software enables users to schedule appointments,
                                        manage bookings, and handle payments for various services.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-45.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Kathleen Gutierrez</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">19 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">8</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-18.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-19.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-20.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Hotel Booking App</a>
                                    </h6>
                                    <div>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown7"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown7"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="bottom-end"
                                            style={{
                                                position: "absolute",
                                                inset: "0px 0px auto auto",
                                                margin: 0,
                                                transform: "translate(-455px, 589px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        A hotel booking app allows users to search, compare, and book
                                        accommodations with ease, offering a wide range of options.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-46.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Bruce Wright</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">20 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">8</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-24.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-23.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-22.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +1
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Car &amp; Bike Rental Software</a>
                                    </h6>
                                    <div>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown8"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown8"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="bottom-end"
                                            style={{
                                                position: "absolute",
                                                inset: "0px 0px auto auto",
                                                margin: 0,
                                                transform: "translate(-45px, 589px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        Car and bike rental software allows users to browse, reserve, and rent
                                        vehicles efficiently through an online platform.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-47.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Rebecca Smtih</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">17 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">6</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-12.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-13.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-14.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Navigation and Safety App</a>
                                    </h6>
                                    <a href="project-details.html"></a>
                                    <div>
                                        <a href="project-details.html"></a>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown9"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown9"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="top-end"
                                            data-popper-reference-hidden=""
                                            data-popper-escaped=""
                                            style={{
                                                position: "absolute",
                                                inset: "auto 0px 0px auto",
                                                margin: 0,
                                                transform: "translate(-1274px, 149px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        A navigation and safety app provides real-time GPS guidance, traffic
                                        updates, and route optimization to help users reach their destinations
                                        efficiently.A navigation and safety app provides real-time GPS
                                        guidance, traffic updates, and route optimization to help users reach
                                        their destinations efficiently.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-28.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Connie Waters</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">14 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">6</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-02.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-03.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-05.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +1
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Food Order App</a>
                                    </h6>
                                    <a href="project-details.html"></a>
                                    <div>
                                        <a href="project-details.html"></a>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown10"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown10"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="top-end"
                                            data-popper-reference-hidden=""
                                            data-popper-escaped=""
                                            style={{
                                                position: "absolute",
                                                inset: "auto 0px 0px auto",
                                                margin: 0,
                                                transform: "translate(-864px, 149px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        A food order app allows users to browse menus, place orders, and track
                                        delivery from their favorite restaurants with ease.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-42.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Lori Broaddus</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">15 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">7</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-06.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-07.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-08.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">POS Admin Software</a>
                                    </h6>
                                    <a href="project-details.html"></a>
                                    <div>
                                        <a href="project-details.html"></a>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown11"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown11"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="top-end"
                                            data-popper-reference-hidden=""
                                            data-popper-escaped=""
                                            style={{
                                                position: "absolute",
                                                inset: "auto 0px 0px auto",
                                                margin: 0,
                                                transform: "translate(-455px, 149px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        POS admin software enables businesses to manage sales, track
                                        inventory, and process transactions efficiently through a centralized
                                        platform.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-48.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Stephen Dias</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">CEO</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">22 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">5</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-26.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-27.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-28.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold">
                                        <a href="project-details.html">Invoicing &amp; Billing Software</a>
                                    </h6>
                                    <a href="project-details.html"></a>
                                    <div>
                                        <a href="project-details.html"></a>
                                        <a
                                            href="javascript:void(0);"
                                            className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                                            data-dropdown-placement="bottom-end"
                                            data-dropdown-toggle="grid-dropdown12"
                                        >
                                            <i className="ti ti-dots-vertical" />
                                        </a>
                                        <ul
                                            id="grid-dropdown12"
                                            className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                                            data-popper-placement="top-end"
                                            data-popper-reference-hidden=""
                                            data-popper-escaped=""
                                            style={{
                                                position: "absolute",
                                                inset: "auto 0px 0px auto",
                                                margin: 0,
                                                transform: "translate(-45px, 149px)"
                                            }}
                                        >
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-target="edit_project"
                                                    data-modal-toggle="edit_project"
                                                >
                                                    <i className="ti ti-edit me-1" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                                                    data-modal-toggle="delete_modal"
                                                    data-modal-target="delete_modal"
                                                >
                                                    <i className="ti ti-trash me-1" />
                                                    Delete{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3 pb-3 border-b">
                                    <p className="text-truncate line-clamp-3 mb-0 text-gray-500">
                                        Invoicing and billing software automates the creation, sending, and
                                        tracking of invoices, making payment processes quicker and more
                                        efficient.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-3 pb-3 border-b">
                                    <div className="flex items-center">
                                        <a
                                            href="javascript:void(0);"
                                            className="avatar-sm avatar-rounded flex-shrink-0"
                                        >
                                            <img
                                                src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-50.jpg"
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                                alt="img"
                                            />
                                        </a>
                                        <div className="ml-2">
                                            <h6 className="font-normal text-xs text-dark">
                                                <a href="javascript:void(0);">Angela Thomas</a>
                                            </h6>
                                            <span className="text-xs text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs text-gray-500">Deadline</span>
                                            <p className="mb-0 text-xs text-gray-700">23 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* Tasks */}
                                    <div className="flex items-center">
                                        <span className="avatar-sm rounded-full flex justify-center items-center bg-green-100 flex-shrink-0 me-2">
                                            <i className="ti ti-checklist text-green-500 text-lg" />
                                        </span>
                                        <p className="text-sm text-gray-700">
                                            <small className="text-gray-500">Tasks:</small>
                                            <span className="font-medium">8</span>/10
                                        </p>
                                    </div>
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-29.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-30.jpg"
                                            alt=""
                                        />
                                        <img
                                            className="w-7 h-7 border-2 border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                                            src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-03.jpg"
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-primary border-2 border-white rounded-full dark:border-gray-800 shrink-0"
                                            href="#"
                                        >
                                            +2
                                        </a>
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
