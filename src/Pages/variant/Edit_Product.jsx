import React, { useState, useEffect, useRef, useCallback } from "react";
import User_side_menu from '../../Componenet/user_side_menu';
import { useNavigate, Link, useLocation } from "react-router-dom";
import EmployList from '../../Componenet/EmployList';
import SubHeader from '../../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Category_img from '../../assets/category.png';
import Dropdown from "../../Componenet/dropdown";
import {
    useGetCategoriesQuery, useGetSubCategoriesQuery, useEditProductMutation, useGetColorQuery, useGetFebricQuery, useGetProductQuery, useDeleteProductMediaMutation
    // ,useDeleteProductMediaMutation
} from "../../services/apiSlice";
import Multiselect from 'multiselect-react-dropdown';
import { ChevronDown } from "lucide-react";
import Searchdropdown from '../../Componenet/searchdropdown'


const Edit_product = () => {

    const [form, setForm] = useState({
        product_id: "",
        name: "",
        description: "",
        short_description: "",
        brand: "",
        price: "",
        discount_price: "",
        stock: "",
        is_available: "true",
        is_featured: "false",
        is_trending: "false",
        is_new_arrival: "false",
        fabric_id: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        canonical_url: "",
        tags: "",
        material_care: "",
        usage_occasion: "",
        category_id: "",
        subcategory_id: "",
        gender: "",
        pattern: "",
        fit: "",
        sleeve: "",
        neck_type: "",
        discount_percentage: "",
        wholesaler_price: "",
        sku: "",
        total_reviews: "",
        is_ordering: "",
        media_type: "",
        file: "",
        is_ordering_list: "",
        media_id: ""
    });

    console.log(form.gender);


    const [editProduct] = useEditProductMutation()
    // const [editProductMedia] = useEditProduct_MediaMutation()



    const navigate = useNavigate();
    const location = useLocation();
    const productid = location?.state?.product_id;
    console.log(productid);

    const { data: product } = useGetProductQuery(productid);
    const productData = product?.product || {};
    console.log(productData);


    let categoryOptions = [];
    const { data: categories } = useGetCategoriesQuery();
    const cateData = categories?.data;
    console.log(cateData);

    if (categories?.data) {
        categoryOptions = categories?.data.map((val) => ({ id: val.category_id, name: val.name })); // Store objects
    }

    console.log(cateData);



    let subcategoryopation = [];
    const { data: subcate } = useGetSubCategoriesQuery();
    console.log(subcate?.data);

    if (subcate?.data) {
        // subcategoryopation = subcate?.data?.map((val) => ({ id: val?.subcategory_id, name: val?.name })); // Store objects
        subcategoryopation = subcate.data
            .filter((val) => val.category == form.category_id) // Use correct field
            .map((val) => ({
                id: val.subcategory_id,
                name: val.name,
            }));
        console.log(subcategoryopation);

    }


  



    let fabricOptions = [];
    const { data: fabric } = useGetFebricQuery();
    console.log(fabric?.data);

    if (fabric?.data) {
        fabricOptions = fabric?.data.map((val) => ({ id: val.fabric_id, name: val.name })); // Store objects
    }
    console.log(fabricOptions);

    useEffect(() => {
        if (Object.keys(productData).length > 0) {
            setForm(prev => ({
                ...prev,
                product_id: productData.product_id,
                name: productData.name || '',
                description: productData.description || '',
                short_description: productData.short_description || '',
                brand: productData.brand || '',
                price: productData.price || '',
                discount_price: productData.discount_price || '',
                discount_percentage: productData.discount_percentage || "",
                wholesaler_price: productData.wholesaler_price || "",
                stock: productData.stock || '',
                is_available: productData.is_available,
                is_featured: productData.is_featured,
                is_trending: productData.is_trending,
                is_new_arrival: productData.is_new_arrival,
                size: productData.size || [],

                fabric_id: productData.fabric_id || '',
                fabric_name: productData?.name || '',
                category_id: productData.category_id || '',
                category_name: productData?.name || '',
                subcategory_id: productData.subcategory_id || '',
                subcategory_name: productData?.name || '',
                meta_title: productData.meta_title || '',
                meta_description: productData.meta_description || '',
                meta_keywords: productData.meta_keywords || '',
                canonical_url: productData.canonical_url || '',
                tags: productData.tags || '',
                material_care: productData.material_care || '',
                usage_occasion: productData.usage_occasion || '',
                image_alt_text: productData.image_alt_text || '',
                subcategory_img: productData.subcategory_img || '',
                gender: productData.gender || "",
                pattern: productData.pattern || "",
                fit: productData.fit || "",
                sleeve: productData.sleeve || "",
                neck_type: productData.neck_type || "",
                total_reviews: productData.total_reviews || "",

            }));

            if (productData.subcategory_img) {
                setSelectedImage(`${import.meta.env.VITE_API_BASE_URL}${productData.subcategory_img}`);
            }

            const existingMedia = productData.media?.map((mediaItem, index) => ({
                id: `existing-${mediaItem.media_id}`,
                preview: `${import.meta.env.VITE_API_BASE_URL}${mediaItem.file}`,
                existing: true
            })) || [];

            setImages(existingMedia);
        }
    }, [productData]);








    const [modal, setModal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [images, setImages] = useState([]);
    const [replaceIndex, setReplaceIndex] = useState(null);
    const inputRef = useRef(null);
    const dropdownRefs = useRef([]);
    const [previewImage, setPreviewImage] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

    console.log(selectedImage);



    const onDrop = useCallback((acceptedFiles) => {
        const filesWithPreview = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            id: `new-${Date.now() + Math.random()}`,
        }));

        if (replaceIndex !== null) {
            setImages((prev) =>
                prev.map((img, idx) => (idx === replaceIndex ? filesWithPreview[0] : img))
            );
            setReplaceIndex(null);
        } else {
            setImages((prev) => [...prev, ...filesWithPreview]);
        }
    }, [replaceIndex]);


    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [], 'video/*': [] },
        onDrop
    });

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reordered = Array.from(images);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);
        setImages(reordered);

        if (selectedImage) {
            const match = reordered.find((img) => img.preview === selectedImage);
            setSelectedImage(match ? match.preview : reordered[0]?.preview || null);
        }
    };




    useEffect(() => {
        return () => {
            images.forEach((img) => URL.revokeObjectURL(img.preview));
        };
    }, [images]);



    const handleClickOutside = (event) => {
        dropdownRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                // close modal logic here if needed
            }
        });
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);




    const [deletemedia] = useDeleteProductMediaMutation();

    const removeImage = async (id) => {
        const isExisting = id.startsWith('existing-');
        const mediaId = isExisting ? id.replace('existing-', '') : null;

        if (isExisting && mediaId) {
            try {
                const formData = new FormData();
                formData.append('product_media_id', mediaId);
                await deletemedia(formData).unwrap();
                toast.success('Image deleted successfully!');
            } catch (err) {
                toast.error('Failed to delete image.');
                return;
            }
        }

        // Update local state to remove the image
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    };






    useEffect(() => {
        if (!selectedImage && images.length > 0) {
            setSelectedImage(images[0].preview);
        }
    }, [images, selectedImage]);



    // serching dropdown
    const [openDropdown, setOpenDropdown] = useState(null);


    const handleDropdownSelect = (field, value) => {
        let newValue;
        if (field === "gender") {
            newValue = value; // Keep "Male"/"Female"
        } else {
            newValue = value === "Active"; // Converts to true/false
        }

        setForm((prev) => ({ ...prev, [field]: newValue }));
        setOpenDropdown(null);
    };


    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };
    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            const safeAppend = (key, value) => {
                if (value !== "" && value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            };

            // --- Basic Product Info ---
            formData.append("product_id", form.product_id);
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("short_description", form.short_description);
            formData.append("brand", form.brand);
            formData.append("stock", form.stock);
            formData.append("is_available", form.is_available ? "True" : "False");
            formData.append("is_featured", form.is_featured ? "True" : "False");
            formData.append("is_trending", form.is_trending ? "True" : "False");
            formData.append("is_new_arrival", form.is_new_arrival ? "True" : "False");

          

            safeAppend("price", form.price);
            safeAppend("discount_price", form.discount_price);
            safeAppend("discount_percentage", form.discount_percentage);
            safeAppend("fabric_id", form.fabric_id);
            safeAppend("meta_title", form.meta_title);
            safeAppend("meta_description", form.meta_description);
            safeAppend("meta_keywords", form.meta_keywords);
            safeAppend("canonical_url", form.canonical_url);
            safeAppend("usage_occasion", form.usage_occasion);
            safeAppend("category_id", form.category_id);
            safeAppend("subcategory_id", form.subcategory_id);
            safeAppend("sku", form.sku);
            const sortedImages = [...images];
            const orderingUpdates = [];

            sortedImages.forEach((img, idx) => {
                const order = idx + 1;

                if (img.id?.startsWith('new-')) {
                    formData.append('file', img.file);
                    formData.append('is_ordering_list', order);
                } else {
                    const mediaId = img.id.replace('existing-', '');
                    orderingUpdates.push({
                        product_media_id: mediaId,
                        ordering_priority: order,
                    });
                }
            });

            if (orderingUpdates.length > 0) {
                formData.append('is_ordering', JSON.stringify({ media: orderingUpdates }));
            }

            formData.append('media_type', 'image');


            // --- Submit API Call ---
            await editProduct({ formData }).unwrap();

            toast.success("Product and media updated successfully!");
            setTimeout(() => {
                navigate(-1);
            }, 1000); // 1 second delay
        } catch (error) {
            console.error("Submit failed:", error);
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

    useEffect(() => {
        if (!selectedImage && images.length > 0) {
            setSelectedImage(images[0].preview);
        }
    }, [images, selectedImage]);


    const [activeDropdown, setActiveDropdown] = useState(null);

    const [openDropdown1, setOpenDropdown1] = useState(null); // Track which dropdown is open

    const toggleDropdown1 = (label) => {
        setOpenDropdown1((prev) => (prev == label ? null : label));
    };



    const handleSizeChange = (size) => {
        setForm((prev) => {
            // If the size is already in the array, remove it; otherwise, add it
            const updatedSizes = prev.size.includes(size)
                ? prev.size.filter((s) => s !== size)  // Remove size if already selected
                : [...prev.size, size];  // Add size to the array if not selected

            return { ...prev, size: updatedSizes };
        });
    };


   

  

    const [dragStartIdx, setDragStartIdx] = useState(null);

    const [isOpen1, setIsOpen1] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState("0px");

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isOpen1 ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen1]);
    const tagoption = [
        { name: 'summer' },
        { name: 'casual' },
        { name: 'formal' },
        { name: 'partywear' },
        { name: 'vintage' },
        { name: 'minimalist' },
        { name: 'classic' },
        { name: 'modern' },
        { name: 'elegant' },
        { name: 'streetwear' },
    ];


    // Convert form.tags to option objects for Multiselect
    const selectedTagObjects = tagoption.filter((opt) =>
        form.tags.includes(opt.name)
    );
    console.log(form.category_id);
    
    console.log(categoryOptions?.find((cat) => cat.id == form.category_id)?.name);
    

    return (
        <div>
            <ToastContainer position="top-center" autoClose={1500} />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader pageName={"Product Edit"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase">Product Edit</h3>
                        <div className="flex justify-end items-center max-lg:justify-start">
                            <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb">
                                <ol className="flex flex-wrap items-center">
                                   
                                    <li className="flex items-center">
                                        <Link to="/dashboard" className="hover:text-primary font-[12px] text-[#575864]">Product</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="text-primary font-medium text-[12px]">New Product</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="flex gap-8 max-lg:block">
                        {/* Left Panel */}


                        {/* Right Panel */}
                        <div className="w-[100%] max-2xl:w-[60%] max-lg:w-[100%]  rounded-xl  max-lg:mt-[24px]">


                            <div className="mb-[24px]     bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">Product Information</h4>
                                <div className="px-[24px] py-[18px] max-sm:p-[10px]  max-lg:px-[18px] ">
                                    <div className="mb-4  gap-5 max-sm:block">
                                        <div className="w-[100%] max-sm:w-[100%] max-sm:mb-4">
                                            <label className="block text-sm font-medium text-gray"> Name</label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                placeholder="Enter Name"
                                                className="mt-[5px] w-full bg-transparent h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                        </div>
                                    </div>
                                    <div className="mb-4 grid grid-cols-3 gap-5  max-xl:gap-2 max-lg:gap-5 max-lg:grid-cols-2 max-sm:block">
                                        <div className="max-sm:mb-4">

                                            <Searchdropdown
                                                label="Category"
                                                onToggle={toggleDropdown1}
                                                isOpen={openDropdown1 === "Category"}
                                                options={categoryOptions?.map((val) => val.name) || []}
                                                value={categoryOptions?.find((cat) => cat.id == form.category_id)?.name}
                                                onSelect={(value) => {
                                                    const selectedCategory = categories?.data.find((cat) => cat.name == value);
                                                    setForm({ ...form, category_id: selectedCategory?.category_id });
                                                }}
                                            />
                                        </div>

                                        <div className="max-sm:mb-4">
                                            <Searchdropdown
                                                label="Sub Category"
                                                onToggle={toggleDropdown1}
                                                isOpen={openDropdown1 === "Sub Category"}
                                                options={subcategoryopation?.map((val) => val.name) || []}
                                                value={subcategoryopation?.find((sub) => sub.id == form.subcategory_id)?.name || ""}
                                                onSelect={(value) => {
                                                    const selectedSubcategory = subcate?.data.find((sub) => sub.name === value);
                                                    setForm({ ...form, subcategory_id: selectedSubcategory?.subcategory_id });
                                                }}
                                            />

                                        </div>

                                        <div className="max-sm:mb-4">
                                          

                                            <Searchdropdown
                                                label="Fabric"
                                                onToggle={toggleDropdown1}
                                                isOpen={openDropdown1 === "Fabric"}
                                                options={fabricOptions?.map((val) => val.name) || []}
                                                value={fabricOptions?.find((sub) => sub.id == form.fabric_id)?.name || ""}
                                                onSelect={(value) => {
                                                    const selectedFabric = fabric?.data.find((sub) => sub.name === value);
                                                    setForm({ ...form, fabric_id: selectedFabric?.fabric_id });
                                                }}
                                            />

                                        </div>

                                    </div>




                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray">Description</label>
                                        <textarea
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            rows={6}
                                            placeholder="Enter  description..."
                                            className="w-full mt-[5px] bg-transparent px-[15px] py-[10px] border border-[#d8dfe7] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                        />
                                    </div>


                                    <div className="grid grid-cols-4  max-lg:grid-cols-2  gap-5 max-xl:gap-2 max-lg:gap-5 max-sm:block mb-4">
                                        <div className=" max-sm:mb-4">
                                            {/* <Dropdown
                                                label="Availability"
                                                options={["Active", "Inactive"]}
                                                defaultValue={form.is_available === 'True' ? 'Active' : 'Inactive'}
                                                value={form.is_available === 'True' ? 'Active' : 'Inactive'} // ensure current value is passed
                                                isOpen={activeDropdown === 'is_available'}
                                                onToggle={(state) => setActiveDropdown(state ? 'is_available' : null)}
                                                onSelect={(value) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        is_available: value === 'Active' ? 'True' : 'False'
                                                    }))
                                                }
                                            /> */}
                                            <Dropdown
                                                label="Availability"
                                                options={["Active", "Inactive"]}
                                                value={form.is_available ? "Active" : "Inactive"}
                                                onSelect={(val) => handleDropdownSelect("is_available", val)}
                                                isOpen={openDropdown === 1}
                                                onToggle={() => toggleDropdown(1)}
                                                ref={(el) => (dropdownRefs.current[1] = el)}
                                            />
                                        </div>

                                        <div className=" max-sm:mb-4">
                                            {/* <Dropdown
                                                label="Featured"
                                                options={["Active", "Inactive"]}
                                                defaultValue={form.is_featured === 'True' ? 'Active' : 'Inactive'}
                                                value={form.is_featured === 'True' ? 'Active' : 'Inactive'} // ensure current value is passed
                                                isOpen={activeDropdown === 'is_featured'}
                                                onToggle={(state) => setActiveDropdown(state ? 'is_featured' : null)}
                                                onSelect={(value) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        is_featured: value === 'Active' ? 'True' : 'False'
                                                    }))
                                                }
                                            /> */}
                                            <Dropdown
                                                label="Featured"
                                                options={["Active", "Inactive"]}
                                                value={form.is_featured ? "Active" : "Inactive"}
                                                onSelect={(val) => handleDropdownSelect("is_featured", val)}
                                                isOpen={openDropdown === 2}
                                                onToggle={() => toggleDropdown(2)}
                                                ref={(el) => (dropdownRefs.current[2] = el)}
                                            />
                                        </div>

                                        <div className=" max-sm:mb-4">
                                            {/* <Dropdown
                                                label="Trending"
                                                options={["Active", "Inactive"]}
                                                defaultValue={form.is_trending === 'True' ? 'Active' : 'Inactive'}
                                                value={form.is_trending === 'True' ? 'Active' : 'Inactive'} // ensure current value is passed
                                                isOpen={activeDropdown === 'is_trending'}
                                                onToggle={(state) => setActiveDropdown(state ? 'is_trending' : null)}
                                                onSelect={(value) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        is_trending: value === 'Active' ? 'True' : 'False'
                                                    }))
                                                }
                                            /> */}

                                            <Dropdown
                                                label="Trending"
                                                options={["Active", "Inactive"]}
                                                value={form.is_trending ? "Active" : "Inactive"}
                                                onSelect={(val) => handleDropdownSelect("is_trending", val)}
                                                isOpen={openDropdown === 3}
                                                onToggle={() => toggleDropdown(3)}
                                                ref={(el) => (dropdownRefs.current[3] = el)}
                                            />
                                        </div>

                                        <div className=" max-sm:mb-4">
                                            {/* <Dropdown
                                                label="New arrival"
                                                options={["Active", "Inactive"]}
                                                defaultValue={form.is_new_arrival === 'True' ? 'Active' : 'Inactive'}
                                                value={form.is_new_arrival === 'True' ? 'Active' : 'Inactive'} // ensure current value is passed
                                                isOpen={activeDropdown === 'is_new_arrival'}
                                                onToggle={(state) => setActiveDropdown(state ? 'is_new_arrival' : null)}
                                                onSelect={(value) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        is_new_arrival: value === 'Active' ? 'True' : 'False'
                                                    }))
                                                }
                                            /> */}
                                            <Dropdown
                                                label="New arrival"
                                                options={["Active", "Inactive"]}
                                                value={form.is_new_arrival ? "Active" : "Inactive"}
                                                onSelect={(val) => handleDropdownSelect("is_new_arrival", val)}
                                                isOpen={openDropdown === 4}
                                                onToggle={() => toggleDropdown(4)}
                                                ref={(el) => (dropdownRefs.current[4] = el)}
                                            />

                                        </div>



                                    </div>

                                    <div className="grid grid-cols-3 max-lg:grid-cols-2  gap-5 max-xl:gap-2 max-lg:gap-5 max-sm:block">
                                        <div className="max-sm:w-[100%] max-sm:mb-4">
                                            <label className="block text-sm font-medium text-gray">Brand</label>
                                            <input
                                                type="text"
                                                value={form.brand}
                                                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                                                className="mt-[5px] w-full bg-transparent h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"

                                            />
                                        </div>
                                        <div className=" max-sm:mb-4">
                                            <label className="block text-sm font-medium text-gray">Stock</label>
                                            <input
                                                type="number"
                                                value={form.stock}
                                                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                                className="mt-[5px] bg-transparent   w-full h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                                min="0" // Optional: set a minimum value if required
                                                step="1" // Optional: allow only whole numbers

                                            />
                                        </div>
                                        <div className=" max-sm:mb-4">
                                            <label className="block text-sm font-medium text-gray">SKU</label>
                                            <input
                                                type="number"
                                                value={form.sku}
                                                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                                                className="mt-[5px] bg-transparent   w-full h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                                min="0" // Optional: set a minimum value if required
                                                step="1" // Optional: allow only whole numbers

                                            />
                                        </div>



                                    </div>
                                </div>
                            </div>


                            <div className="mb-[24px] bg-white shadow-md rounded-[12px] overflow-hidden transition-all duration-300">
                                <button
                                    onClick={() => setIsOpen1(!isOpen1)}
                                    className="flex justify-between items-center w-full px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans"
                                >
                                    Meta Information
                                    <ChevronDown
                                        className={`transition-transform duration-300 ${isOpen1 ? "rotate-180" : "rotate-0"}`}
                                    />
                                </button>
                                <div
                                    ref={contentRef}
                                    className="transition-all duration-300 ease-in-out overflow-hidden"
                                    style={{ height: contentHeight }}
                                >
                                    <div className="px-[24px] py-[18px] max-sm:p-[10px] max-lg:px-[18px]">
                                        <div className="grid max-lg:grid-cols-1 grid-cols-2 gap-[16px]">

                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">Meta Title</label>
                                                    <input
                                                        type="text"
                                                        value={form.meta_title}
                                                        onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent  w-full h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">Meta Keyword</label>
                                                    <input
                                                        type="text"
                                                        value={form.meta_keywords}
                                                        onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent  w-full h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">Canonical Url</label>
                                                    <input
                                                        type="text"
                                                        value={form.canonical_url}
                                                        onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent  w-full h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">image Alt Text</label>
                                                    <input
                                                        type="text"
                                                        value={form.image_alt_text}
                                                        onChange={(e) => setForm({ ...form, image_alt_text: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent  w-full h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">Material Care</label>
                                                    <input
                                                        type="text"
                                                        value={form.material_care}
                                                        onChange={(e) => setForm({ ...form, material_care: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent  w-full h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">Sku</label>
                                                    <input
                                                        type="text"
                                                        value={form.sku}
                                                        onChange={(e) => setForm({ ...form, sku: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent  w-full h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">Usage Occasion</label>
                                                    <input
                                                        type="text"
                                                        value={form.usage_occasion}
                                                        onChange={(e) => setForm({ ...form, usage_occasion: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent  w-full h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-[16px] ">
                                            <label className="block text-sm font-medium text-gray">Meta Description</label>
                                            <textarea
                                                value={form.meta_description}
                                                onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                                                rows={6}
                                                placeholder="Enter  description..."
                                                className="w-full mt-[5px] bg-transparent  px-[15px] py-[10px] border border-[#d8dfe7] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="mb-[24px]       bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px]  max-lg:px-[18px] max-sm:p-[10px]   py-[18px] font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">Pricing Details</h4>
                                <div className="px-[24px] py-[18px] max-sm:p-[10px] max-lg:px-[18px] ">
                                    <div className="grid grid-cols-3 gap-5 max-sm:block max-lg:grid-cols-2 mb-4">
                                        <div className="max-sm:mb-4">
                                            <label className="block text-sm mb-1 font-medium text-gray">Price</label>

                                            <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full"><span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]"><i className="fa-solid fa-indian-rupee-sign"></i></span>
                                                <input type="number" value={form.price}
                                                    onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full bg-transparent  px-4 min-w-[100px] h-[40px] text-sm text-[#5d7186] border border-[#d8dfe7] rounded-[0px_8px_8px_0px] focus:outline-none focus:border-[#b0b0bb]" placeholder="00" />

                                            </div>
                                        </div>
                                        <div className="max-sm:mb-4">
                                            <label className="block text-sm mb-1 font-medium text-gray">Discount Price</label>
                                            <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] text-[#5d7186] border border-[#d8dfe7] w-full">
                                                <span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]">
                                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                                </span>
                                                <input
                                                    type="number"
                                                    value={form.discount_price}
                                                    onChange={(e) => setForm({
                                                        ...form,
                                                        discount_price: e.target.value,
                                                        discount_percentage: e.target.value ? "" : form.discount_percentage,
                                                    })}
                                                    placeholder="00"
                                                    className="w-full bg-transparent  px-4 min-w-[100px] h-[40px] text-sm text-[#5d7186] border border-[#d8dfe7] rounded-[0px_8px_8px_0px] focus:outline-none focus:border-[#b0b0bb]"
                                                    disabled={!!form.discount_percentage}
                                                />
                                            </div>
                                        </div>

                                        {/* Discount Percentage */}
                                        <div className="max-sm:mb-4">
                                            <label className="block text-sm mb-1 font-medium text-gray">Discount Percentage</label>
                                            <div className="flex items-center h-[40px] rounded-[0.5rem] border border-[#d8dfe7]">
                                                <input
                                                    type="number"
                                                    value={form.discount_percentage}
                                                    onChange={(e) => setForm({
                                                        ...form,
                                                        discount_percentage: e.target.value,
                                                        discount_price: e.target.value ? "" : form.discount_price,
                                                    })}
                                                    placeholder="00"
                                                    className="w-full bg-transparent  px-4 h-[40px] text-sm text-[#5d7186] border border-[#d8dfe7] rounded-[8px_0px_0px_8px] focus:outline-none focus:border-[#b0b0bb]"
                                                    disabled={!form.discount_price}
                                                />
                                                <span className="px-[16px] bg-[#eef2f7] text-[#313b5e] flex items-center justify-center h-full font-semibold">%</span>
                                            </div>
                                        </div>

                                        {/* <div className="  max-sm:mb-4">
                                            <label className="block text-sm mb-1  font-medium text-gray">Tex</label>
                                            <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full"><span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]"><i className="fa-solid fa-indian-rupee-sign"></i></span>
                                                <input type="number" className="w-full px-4 min-w-[100px] h-[40px] text-sm text-[#5d7186] border border-[#d8dfe7] rounded-[8px] focus:outline-none focus:border-[#b0b0bb]" placeholder="00" />
                                            </div>
                                        </div> */}

                                    </div>

                                </div>
                            </div>




                            <div className="flex justify-end items-center  bg-[#eef2f7] rounded-[12px]" >
                                <div className="p-[17px]  flex flex-row-reverse gap-3 max-sm:ps-0">

                                    <div className="flex gap-2 border-t border-[#eaedf1] w-[100%] ">
                                        <button className="w-[182px]  max-sm:w-[125px] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white" onClick={handleSubmit}>Save Change</button>
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

export default Edit_product
