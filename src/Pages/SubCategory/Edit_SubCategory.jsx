import React, { useState, useEffect, useRef, useCallback } from "react";
import User_side_menu from '../../Componenet/user_side_menu';
import { useNavigate, Link, useLocation } from "react-router-dom";
import EmployList from '../../Componenet/EmployList';
import SubHeader from '../../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import Category_img from '../../assets/category.png';
import { useGetCategoriesQuery, useGetSubCategoriesQuery, useEditSubCategoryMutation, } from "../../services/apiSlice";
import Searchdropdown from '../../Componenet/searchdropdown'
import { ChevronDown } from "lucide-react";


const Edit_SubCategory = () => {
    const [subcategory, setsubCategory] = useState({ category: '', name: "", description: "", is_home: "", is_active: "", subcategory_img: "", component: '', subcategory_id: "", meta_title: "", meta_description: "", meta_keywords: "", canonical_url: "", image_alt_text: "" });
    console.log(subcategory);

    const [isOpen1, setIsOpen1] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState("0px");

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isOpen1 ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen1]);

    const [editSubCategory] = useEditSubCategoryMutation();

    const navigate = useNavigate();
    const location = useLocation();
    const subcategory_id = location?.state?.subcategory_id;
    console.log(subcategory_id);

    const { data: subcategories } = useGetSubCategoriesQuery();
    const subCategoriesData = subcategories?.data || [];
    console.log(subCategoriesData);

    const matedData = subCategoriesData.find(c => c.subcategory_id == subcategory_id);
    console.log(matedData);

    const [homeActive, setHomeActive] = useState(false);
    const [homeInactive, setHomeInactive] = useState(false);

    const [statusActive, setStatusActive] = useState(false);
    const [statusInactive, setStatusInactive] = useState(false);

    const toggleHomeActive = () => {
        setHomeActive(true);
        setHomeInactive(false);
        setsubCategory(prev => ({ ...prev, is_home: 'True' }));
    };

    const toggleHomeInactive = () => {
        setHomeActive(false);
        setHomeInactive(true);
        setsubCategory(prev => ({ ...prev, is_home: 'False' }));
    };

    const toggleStatusActive = () => {
        setStatusActive(true);
        setStatusInactive(false);
        setsubCategory(prev => ({ ...prev, is_active: 'True' }));
    };

    const toggleStatusInactive = () => {
        setStatusActive(false);
        setStatusInactive(true);
        setsubCategory(prev => ({ ...prev, is_active: 'False' }));
    };


    const [selectcate, setslee_cate] = useState('')


    const { data: categories } = useGetCategoriesQuery(); // Assuming this is your API hook to fetch categories
    let categoryOptions = [];
    if (categories?.data) {
        categoryOptions = categories.data.map((val) => ({ id: val.category_id, name: val.name }));
    }

    console.log(categoryOptions);


    useEffect(() => {
        if (subcategory_id && subCategoriesData.length > 0) {
            const selectedCategory = subCategoriesData.find(c => c.subcategory_id === subcategory_id);
            console.log(selectedCategory);

            if (selectedCategory) {
                setsubCategory(prev => ({
                    ...prev,
                    name: selectedCategory.name || '',
                    description: selectedCategory.description || '',
                    is_home: selectedCategory.is_home !== undefined ? selectedCategory.is_home.toString() : 'True', // Ensure is_home is set correctly
                    is_active: selectedCategory.is_active !== undefined ? selectedCategory.is_active.toString() : 'True', // Same for is_active
                    category: selectedCategory.category || '', // Ensure category_id is mapped correctly
                    subcategory_id: selectedCategory.subcategory_id,
                    subcategory_img: selectedCategory.subcategory_img, // Assuming this is the image field
                    meta_title: selectedCategory.meta_title,
                    meta_description: selectedCategory.meta_description,
                    meta_keywords: selectedCategory.meta_keywords,
                    canonical_url: selectedCategory.canonical_url,
                    image_alt_text: selectedCategory.image_alt_text
                }));

                // Set the status booleans based on is_home and is_active
                setHomeActive(selectedCategory.is_home === true);
                setHomeInactive(selectedCategory.is_home === false);
                setStatusActive(selectedCategory.is_active === true);
                setStatusInactive(selectedCategory.is_active === false);
                setslee_cate(categoryOptions.find((sub) => sub.id == selectedCategory.category)?.name)

                // Assuming subcategory_img is the relative path, set the full image URL
                setSelectedImage(`${import.meta.env.VITE_API_BASE_URL}${selectedCategory.subcategory_img}`);
            }
        }
    }, [subCategoriesData, subcategory_id]);



    const [openDropdown1, setOpenDropdown1] = useState(null);

    const toggleDropdown1 = () => {
        setOpenDropdown1((prev) => (prev === 'subcategory' ? null : 'subcategory'));
    };






    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const [modal, setModal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [image, setImage] = useState(null);
    const [replaceIndex, setReplaceIndex] = useState(null);
    const inputRef = useRef(null);
    const dropdownRefs = useRef([]);
    const [previewImage, setPreviewImage] = useState(null);

    const [images, setImages] = useState([]);
    console.log(images);

    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

    console.log(selectedImage);



    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];

        // Revoke old preview if it exists
        if (images[0]?.preview) {
            URL.revokeObjectURL(images[0].preview);
        }

        const preview = URL.createObjectURL(file);
        const fileWithPreview = Object.assign(file, { preview });

        setImages([fileWithPreview]);
        setSelectedImage(preview); // Update selected image
    }, [images]);


    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [images]);


    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
            'video/*': []
        },
        multiple: false,
        onDrop
    });

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reordered = Array.from(images);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);

        setImages(reordered);

        // Update selected image after reorder
        if (selectedImage) {
            const match = reordered.find(img => img.preview === selectedImage);
            setSelectedImage(match ? match.preview : reordered[0]?.preview || null);
        }
    };



    useEffect(() => {
        return () => {
            images.forEach(image => {
                if (image.preview) URL.revokeObjectURL(image.preview);
            });
        };
    }, [images]);



    const handleClickOutside = (event) => {
        dropdownRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                setModal(prev => prev === index ? null : prev);
            }
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const triggerFileDialog = (index = null) => {
        if (index !== null) {
            setReplaceIndex(index); // Set the index for replacing an image
        } else {
            setReplaceIndex(null);  // Reset replaceIndex if not passed
        }
        setIsModalOpen(true);  // Open modal for file selection
    };




    const removeImage = (index) => {
        setImages(prev => {
            const removed = prev[index];
            const updated = prev.filter((_, i) => i !== index);

            // Update selectedImage before revoking
            if (removed.preview === selectedImage) {
                setSelectedImage(updated[0]?.preview || null);
            }

            // Revoke only the removed image URL
            URL.revokeObjectURL(removed.preview);
            return updated;
        });
    };


    useEffect(() => {
        if (!selectedImage && images.length > 0) {
            setSelectedImage(images[0].preview);
        }
    }, [images, selectedImage]);



    // serching dropdown
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownSelect = (field, value) => {
        setsubCategory((prev) => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };






    const handleSubmit = async () => {
        try {
            let imageBlob = null;

            if (images.length > 0 && images[0] instanceof File) {
                imageBlob = images[0];
            } else if (typeof selectedImage === "string") {
                const response = await fetch(selectedImage);
                if (!response.ok) throw new Error("Failed to fetch existing image.");
                imageBlob = await response.blob();
            }

            if (!imageBlob) {
                return toast.error("No valid image selected");
            }

            const capitalizeBoolean = (val) =>
                val.toString().charAt(0).toUpperCase() + val.toString().slice(1);

            const formData = new FormData();
            formData.append("name", subcategory.name);
            formData.append("description", subcategory.description);
            formData.append("is_home", capitalizeBoolean(subcategory.is_home));
            formData.append("category_id", subcategory.category);
            formData.append("is_active", capitalizeBoolean(subcategory.is_active));
            formData.append("subcategory_img", imageBlob);
            formData.append("subcategory_id", subcategory.subcategory_id);
            formData.append("meta_title", subcategory.meta_title);
            formData.append("meta_description", subcategory.meta_description);
            formData.append("meta_keywords", subcategory.meta_keywords);
            formData.append("canonical_url", subcategory.canonical_url);
            formData.append("image_alt_text", subcategory.image_alt_text);

            console.log([...formData]);

            const response = await editSubCategory({ formData }).unwrap();
            if (response) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate("/sub_category");
                }, 1000);
            }

        } catch (error) {
            console.error("Upload error:", error);
            const errorMessage =
                error?.data?.message ||         // RTK Query error format
                error?.detail ||         // RTK Query error format
                error?.data?.detail ||         // RTK Query error format
                error?.error ||                 // RTK fallback error message (e.g., network error)
                error?.message ||               // JS error object message
                "Something went wrong!";

            toast.error(errorMessage);
        }
    };





    return (
        <div>
            <ToastContainer position="top-center" autoClose={1500} />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader pageName={" Sub Category Edit"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase"> Sub Category Edit</h3>
                        <div className="flex justify-end items-center max-lg:justify-start">
                            <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb">
                                <ol className="flex flex-wrap items-center">
                                   
                                    <li className="flex items-center">
                                        <Link to="/dashboard" className="hover:text-primary font-[12px] text-[#575864]">Sub Category</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="text-primary font-medium text-[12px]"> Sub Category Edit</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="flex gap-8 max-lg:block">
                        {/* Left Panel */}
                        <div className="w-[25%] max-2xl:w-[40%] max-lg:w-[100%]    ">
                            <div className=" p-[20px] max-sm:p-[10px] rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]">
                                <div
                                    className="flex justify-center items-center bg-[#eef2f7] rounded-[12px] cursor-pointer"
                                    onClick={() => {
                                        if (images.length === 0) {
                                            triggerFileDialog(); // Trigger file dialog if no images
                                        } else {
                                            setSelectedImage(images[0].preview); // Set first image as selected if available
                                        }
                                    }}
                                >
                                    <img
                                        src={selectedImage ? selectedImage : (images.length > 0 ? images[0].preview : Category_img)}
                                        className="h-[360px] w-[full] object-cover rounded-[8px]"
                                        alt="category-preview"
                                    />
                                </div>
                                <div className="mt-5">
                                    <h4 className="hans font-[600] text-[25px] text-[#313b5e] mb-[18px] max-sm:text-[16px] max-sm:mb-[12px]">{subcategory.name}</h4>


                                    <p className="text-[14px]">Category :-</p>
                                    <p className="text-[#666666] text-[15px] font-[600]">{selectcate}</p>

                                    <div className="flex gap-10">
                                        <div>

                                            <h6 className="mt-[20px] text-[#9b9b9b]">Status</h6>
                                            {(homeActive || homeInactive) && (
                                                <div className="mt-3 inline-block">
                                                    <span
                                                        className={`px-3 py-[4px] rounded-[8px] text-[13px] font-medium ${homeActive
                                                            ? 'bg-[#ff6c2f] text-white'
                                                            : 'bg-[#d3d3d3] text-[#444]'
                                                            }`}
                                                    >
                                                        {homeActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>

                                            <h6 className="mt-[20px] text-[#9b9b9b]">Home</h6>
                                            {(statusActive || statusInactive) && (
                                                <div className="mt-3 inline-block">
                                                    <span
                                                        className={`px-3 py-[4px] rounded-[8px] text-[13px] font-medium ${statusActive
                                                            ? 'bg-[#ff6c2f] text-white'
                                                            : 'bg-[#d3d3d3] text-[#444]'
                                                            }`}
                                                    >
                                                        {statusActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="w-[75%] max-2xl:w-[60%] max-lg:w-[100%]  rounded-xl  max-lg:mt-[24px]">
                            <div className="bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px] font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans ">
                                    Add Thumbnail Photo
                                </h4>
                                <div className="mb-[24px] px-[24px] max-lg:px-[18px] max-sm:p-[10px] py-[18px]">
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/gif,video/*"
                                        className="hidden"
                                        onChange={(e) => onDrop(Array.from(e.target.files))}
                                    />

                                    <div {...getRootProps()} onClick={() => document.querySelector('input[type="file"]').click()}>
                                        <input {...getInputProps()} />

                                        {images.length > 0 ? (
                                            <div className="border-2 border-dashed border-[#d8dfe7] rounded-[6px] min-h-[150px] p-[25px]  items-center cursor-pointer">
                                                <div className="relative group w-[130px] max-lg:w-[110px] max-sm:w-[120px]">
                                                    <span className="absolute top-1 left-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center  z-10">
                                                        1
                                                    </span>
                                                    {images[0]?.type?.startsWith("video") ? (
                                                        <video src={images[0].preview} controls className="w-full h-[130px] object-cover rounded" />
                                                    ) : (
                                                        <img src={images[0].preview} alt="preview" className="w-full h-[130px] object-cover rounded" />
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            URL.revokeObjectURL(images[0].preview);
                                                            setImages([]); // Clear images
                                                        }}
                                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        ) : selectedImage ? (
                                            <div className="border-2 border-dashed border-[#d8dfe7] rounded-[6px] min-h-[150px] p-[25px] flex  items-center cursor-pointer">
                                                <div className="relative group w-[130px] max-lg:w-[110px] max-sm:w-[120px]">
                                                    <img
                                                        src={selectedImage}
                                                        alt="selected"
                                                        className="w-full h-[130px] object-cover rounded"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedImage(null); // Clear selected image to enable new upload

                                                        }}
                                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-[#d8dfe7] rounded-[6px] min-h-[150px] p-[20px] flex justify-center items-center cursor-pointer">
                                                <div className="py-[32px] text-center">
                                                    <i className="fa-solid fa-cloud-arrow-up text-primary text-[3rem]" />
                                                    <h3 className="mt-[2.25rem] text-[24px] font-[600] text-[#313b5e] mb-[10px]">
                                                        Drop your image/video here, or{" "}
                                                        <span className="text-primary">click to browse</span>
                                                    </h3>
                                                    <p className="text-gray text-[13px]">
                                                        1600 x 1200 (4:3) recommended. PNG, JPG, GIF and video files are allowed
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>

                            </div>

                            <div className="mb-[24px]     bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">General Information</h4>
                                <div className="px-[24px] py-[18px] max-sm:p-[10px]  max-lg:px-[18px] ">
                                    <div className="grid grid-cols-2 mb-4 max-lg:grid-cols-1 gap-5">

                                        <div className="flex  gap-5 max-sm:block">
                                            <div className="w-[100%] ">
                                                <label className="block text-sm font-medium text-gray">Category </label>

                                                <Searchdropdown
                                                    options={categoryOptions.map((val) => val.name)} // Show only names
                                                    main_color="text-gray"
                                                    labelClassName="text-[#9CA3AF]"
                                                    isOpen={openDropdown1 === 'subcategory'}
                                                    onToggle={toggleDropdown1}
                                                    value={
                                                        categoryOptions.find((sub) => sub.id == subcategory.category)?.name
                                                    }
                                                    onSelect={(value) => {
                                                        const selectedRoom = categories?.data.find((category) => category.name === value);
                                                        if (selectedRoom) {
                                                            setslee_cate(value)
                                                            setsubCategory({ ...subcategory, category_id: selectedRoom.category_id });
                                                        } else {
                                                            console.warn('Category not found for selected value:', value);
                                                        }
                                                    }}
                                                />

                                            </div>
                                        </div>
                                        <div className="flex gap-5 max-sm:block">
                                            <div className="w-[100%]">
                                                <label className="block text-sm font-medium text-gray"> Name</label>
                                                <input
                                                    type="text"
                                                    value={subcategory.name}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
                                                        setsubCategory({ ...subcategory, name: value });
                                                    }}

                                                    placeholder=""
                                                    className="mt-[10px] w-full bg-transparent h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="mb-4 ">
                                        <label className="block text-sm font-medium text-gray">Description</label>
                                        <textarea
                                            value={subcategory.description}
                                            onChange={(e) => setsubCategory({ ...subcategory, description: e.target.value })}
                                            rows={6}
                                            placeholder="Enter description..."
                                            className="w-full mt-[5px] px-[15px] bg-transparent py-[10px] border border-[#d8dfe7] rounded-lg text-sm text-[#9CA3AF] focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                        />


                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray mb-3">Home</label>
                                        <div className="cursor-pointer flex items-center max-sm:hidden">
                                            <div onClick={toggleHomeActive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${homeActive ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${homeActive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">Active</span>

                                            <div onClick={toggleHomeInactive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${homeInactive ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${homeInactive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">InActive</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray mb-3">Status</label>
                                        <div className="cursor-pointer flex items-center max-sm:hidden">
                                            <div onClick={toggleStatusActive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${statusActive ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${statusActive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">Active</span>

                                            <div onClick={toggleStatusInactive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${statusInactive ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${statusInactive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">InActive</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-[24px] bg-white shadow-md rounded-[12px] overflow-hidden transition-all duration-300">
                                {/* Accordion Header */}
                                <button
                                    onClick={() => setIsOpen1(!isOpen1)}
                                    className="flex justify-between items-center w-full px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans"
                                >
                                    Meta Information
                                    <ChevronDown
                                        className={`transition-transform duration-300 ${isOpen1 ? "rotate-180" : "rotate-0"}`}
                                    />
                                </button>

                                {/* Accordion Content */}
                                <div
                                    ref={contentRef}
                                    className="transition-all duration-300 ease-in-out overflow-hidden"
                                    style={{ height: contentHeight }}
                                >
                                    <div className="px-[24px] py-[18px] max-sm:p-[10px] max-lg:px-[18px]">
                                        <div className="grid max-lg:grid-cols-1 grid-cols-2 gap-[16px]">
                                            {[
                                                { label: "Meta Title", value: "meta_title" },
                                                { label: "Meta Keyword", value: "meta_keywords" },
                                                { label: "Canonical Url", value: "canonical_url" },
                                                { label: "Image Alt Text", value: "image_alt_text" },
                                            ].map((field) => (
                                                <div className="flex gap-5 max-sm:block" key={field.value}>
                                                    <div className="w-[100%] max-sm:mb-4">
                                                        <label className="block text-sm font-medium text-gray">{field.label}</label>
                                                        <input
                                                            type="text"
                                                            value={subcategory[field.value]}
                                                            onChange={(e) =>
                                                                setsubCategory({ ...subcategory, [field.value]: e.target.value })
                                                            }
                                                            placeholder=""
                                                            className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-[16px]">
                                            <label className="block text-sm font-medium text-gray">Meta Description</label>
                                            <textarea
                                                value={subcategory.meta_description}
                                                onChange={(e) =>
                                                    setsubCategory({ ...subcategory, meta_description: e.target.value })
                                                }
                                                rows={6}
                                                placeholder="Enter description..."
                                                className="w-full mt-[5px] bg-transparent px-[15px] py-[10px] border border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF] focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>







                            <div className="flex justify-end items-center  bg-[#eef2f7] rounded-[12px]" >
                                <div className="p-[17px]  flex flex-row-reverse gap-3 max-sm:ps-0">

                                    <div className="flex gap-2 border-t border-[#eaedf1] w-[100%] ">
                                        <button onClick={handleSubmit} className="w-[182px]   max-sm:w-[125px] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white">Save Change</button>
                                        <button onClick={() => {
                                            navigate(-1)
                                        }} className="w-[182px]  max-sm:w-[125px] h-[39px] text-white bg-primary  border-[1px] border-primary  rounded-[12px] text-[14px] mt-[12px] hover:text-primary hover:bg-transparent">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit_SubCategory
