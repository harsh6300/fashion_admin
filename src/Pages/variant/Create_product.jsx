import React, { useState, useEffect, useRef, useCallback } from "react";
import User_side_menu from '../../Componenet/user_side_menu';
import { useNavigate, Link } from "react-router-dom";
import EmployList from '../../Componenet/EmployList';
import SubHeader from '../../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Category_img from '../../assets/category.png';
import Dropdown from "../../Componenet/dropdown";
import Multiselect from 'multiselect-react-dropdown';
import { useGetCategoriesQuery, useGetSubCategoriesQuery, useAddProductMutation, useGetColorQuery, useGetFebricQuery } from "../../services/apiSlice";
import Searchdropdown from '../../Componenet/searchdropdown'


const Create_product = () => {
    const [form, setForm] = useState({
        category_id: "",
        subcategory_id: "",
        name: "",
        description: "",
        short_description: "",
        brand: "",
        price: "",
        discount_price: "",
        discount_percentage: "",
        wholesaler_price: "",
        stock: "",
        is_available: "",
        is_featured: "",
        is_trending: "",
        is_new_arrival: "",
        fabric_id: "",
        media_type: "",
        is_ordering: "",
        file: "",
    });


    console.log(form);






    const [addProduct] = useAddProductMutation();


    // let categoryOptions = [];
    // const { data: categories } = useGetCategoriesQuery();
    // console.log(categories?.data);

    // if (categories?.data) {
    //     categoryOptions = categories?.data.map((val) => ({ id: val.category_id, name: val.name })); // Store objects
    // }
    // console.log(categoryOptions);


    // let subcategoryOptions = [];
    // const { data: subcategories } = useGetSubCategoriesQuery();
    // console.log(subcategories?.data);

    // if (subcategories?.data) {
    //     subcategoryOptions = subcategories?.data.map((val) => ({ id: val.subcategory_id, name: val.name })); // Store objects
    // }
    // console.log(subcategoryOptions);

    let categoryOptions = [];
    const { data: categories } = useGetCategoriesQuery();
    if (categories?.data) {
        categoryOptions = categories?.data.map((val) => ({
            id: val.category_id,
            name: val.name,
        }));
    }

    // Fetch subcategories
    let subcategoryOptions = [];
    const { data: subcate } = useGetSubCategoriesQuery();
    if (subcate?.data) {
        subcategoryOptions = subcate.data
            .filter((val) => val.category == form.category_id) // Filter by selected category
            .map((val) => ({
                id: val.subcategory_id,
                name: val.name,
            }));
    }

    const handleCategorySelect = (value) => {
        const selectedCategory = categoryOptions.find((cat) => cat.name === value);
        setForm({
            ...form,
            category_id: selectedCategory?.id,
            subcategory_id: "", // Reset subcategory on category change
        });
    };

    // Handle subcategory selection
    const handleSubcategorySelect = (value) => {
        const selectedSubcategory = subcategoryOptions.find(
            (sub) => sub.name === value
        );
        setForm({ ...form, subcategory_id: selectedSubcategory?.id });
    };


    let colorOptions = [];
    const { data: color } = useGetColorQuery();
    console.log(color?.data);

    if (color?.data) {
        colorOptions = color?.data.map((val) => ({ id: val.color_id, name: val.name, color: val.hex_code })); // Store objects
    }
    console.log(colorOptions);


    let fabricOptions = [];
    const { data: fabric } = useGetFebricQuery();
    console.log(fabric?.data);

    if (fabric?.data) {
        fabricOptions = fabric?.data.map((val) => ({ id: val.fabric_id, name: val.name })); // Store objects
    }
    console.log(fabricOptions);


    const [modal, setModal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [images, setImages] = useState([]);
    const [replaceIndex, setReplaceIndex] = useState(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dropdownRefs = useRef([]);
    const [previewImage, setPreviewImage] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

    console.log(selectedImage);

    const onDrop = useCallback((acceptedFiles) => {
        const filesArray = Array.from(acceptedFiles);
        const filesWithPreview = filesArray.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );

        if (replaceIndex !== null) {
            const newImage = filesWithPreview[0];
            setImages(prev => {
                const updated = prev.map((img, idx) => idx === replaceIndex ? newImage : img);
                if (selectedImage === prev[replaceIndex]?.preview) {
                    setSelectedImage(newImage.preview);
                }
                return updated;
            });
            setReplaceIndex(null);
        } else {
            setImages(prev => [...prev, ...filesWithPreview]);
        }
    }, [replaceIndex, selectedImage]);


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
            const match = reordered.find(img => img.preview === selectedImage);
            setSelectedImage(match ? match.preview : reordered[0]?.preview || null);
        }
    };



    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, []);



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

    const triggerFileDialog = (index = null) => {
        if (index !== null) {
            setReplaceIndex(index);
        } else {
            setReplaceIndex(null);
        }
        setIsModalOpen(true);
    };



    const removeImage = (index) => {
        setImages(prev => {
            const removed = prev[index];
            const updated = prev.filter((_, i) => i !== index);
            if (removed.preview === selectedImage) {
                setSelectedImage(updated[0]?.preview || null);
            }
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
        setProduct((prev) => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, []);

    useEffect(() => {
        if (!selectedImage && images.length > 0) {
            setSelectedImage(images[0].preview);
        }
    }, [images, selectedImage]);

    // const handleSubmit = async () => {
    //     try {
    //         const formData = new FormData();

    //         formData.append("product_id", 1);
    //         formData.append("media_type", "image");

    //         images.forEach((file, index) => {
    //             formData.append("file", file); // use actual File object
    //             formData.append("is_ordering", index + 1); // maintain drag order
    //         });

    //         for (let pair of formData.entries()) {
    //             console.log(`${pair[0]}: ${pair[1]}`);
    //         }

    //         const res = await addProductMedia(formData).unwrap();
    //         toast.success("Product media uploaded successfully!");
    //     } catch (error) {
    //         toast.error("Upload failed!");
    //         console.error(error);
    //     }
    // };








    const handleSubmit = async () => {
        try {



            const formData = new FormData();
            const safeAppend = (key, value) => {
                formData.append(key, value !== "" && value !== undefined && value !== null ? value : "0");
            };

            formData.append("category_id", form.category_id);
            formData.append("subcategory_id", form.subcategory_id);
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("short_description", form.short_description);
            formData.append("brand", form.brand);
            formData.append("sku", form.sku);

            safeAppend("price", form.price);
            safeAppend("discount_price", form.discount_price);
            safeAppend("discount_percentage", form.discount_percentage);
            safeAppend("stock", form.stock);

            formData.append("is_available", form.is_available);
            formData.append("is_featured", form.is_featured);
            formData.append("is_trending", form.is_trending);
            formData.append("is_new_arrival", form.is_new_arrival);
            // formData.append("color", form.color);
            formData.append("fabric_id", form.fabric_id);


         

         
            const response = await addProduct(formData).unwrap();

            if (response) {
                toast.success("Product successfully added!");

            }
            setTimeout(() => {
                navigate(-1);
            }, 1000); // 1 second delay
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







    const [openDropdown1, setOpenDropdown1] = useState(null); // Track which dropdown is open

    const toggleDropdown1 = (label) => {
        setOpenDropdown1((prev) => (prev == label ? null : label));
    };


    const [activeDropdown, setActiveDropdown] = useState(null); // null means no dropdown is open
    const toggleDropdown = () => {
        onToggle?.(!isOpen); // toggle the dropdown
        if (!isOpen) setSearchTerm("");
    };


    const handleSelect = (option) => {
        onSelect?.(option);
        onToggle?.(false); // CLOSE after selection
        setSearchTerm("");
        setHighlightedIndex(-1);
    };







    const isButtonDisabled = !form.discount_price && !form.discount_percentage;


    useEffect(() => {
        const price = parseFloat(form.price);
        const discountPrice = parseFloat(form.discount_price);
        const discountPercentage = parseFloat(form.discount_percentage);

        // Case 1: Price and Discount Percentage → Calculate Discount Price
        if (price && discountPercentage && !form.discount_price) {
            const newDiscountPrice = (price * discountPercentage) / 100;
            const newWholesalerPrice = price - newDiscountPrice;
            setForm(prev => ({
                ...prev,
                discount_price: newDiscountPrice.toFixed(2),
            }));
        }

        // Case 2: Price and Discount Price → Calculate Discount Percentage
        if (price && discountPrice && !form.discount_percentage) {
            const newDiscountPercentage = (discountPrice / price) * 100;
            const newWholesalerPrice = price - discountPrice;
            setForm(prev => ({
                ...prev,
                discount_percentage: newDiscountPercentage.toFixed(2),
            }));
        }

        // Case 3: If only Price exists, reset others
        if (price && !discountPrice && !discountPercentage) {
            setForm(prev => ({
                ...prev,
            }));
        }

    }, [form.price, form.discount_price, form.discount_percentage]);

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

    return (
        <div>
            <ToastContainer position="top-center" autoClose={1500} />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader pageName={"Product Add   "} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase"> Product Add</h3>
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

                                    <div className="mb-4 max-sm:block">

                                        <label className="block text-sm font-medium text-gray">Name</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}

                                            className="mt-[5px] w-full h-[40px] bg-transparent px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />

                                    </div>
                                    <div className="mb-4 grid grid-cols-3 gap-5  max-xl:gap-2 max-lg:gap-5 max-lg:grid-cols-2 max-sm:block">
                                        <div className="max-sm:mb-4">
                                            <Searchdropdown
                                                label="Category"
                                                onToggle={() => toggleDropdown1("Category")} // Pass 'Category' to toggle it
                                                options={categoryOptions.map((val) => val.name)}
                                                value={categoryOptions.find((cat) => cat.id === form.category_id)?.name || ""}
                                                isOpen={openDropdown1 === "Category"} // Check if this dropdown is open
                                                setIsOpen={(state) => setOpenDropdown1(state ? "Category" : null)}
                                                onSelect={handleCategorySelect}
                                            />
                                        </div>

                                        {/* Subcategory Dropdown */}
                                        <div className="max-sm:mb-4">
                                            <Searchdropdown
                                                label="Sub Category"
                                                onToggle={() => toggleDropdown1("subcategory")} // Pass 'subcategory' to toggle it
                                                isOpen={openDropdown1 === "subcategory"} // Check if this dropdown is open
                                                options={subcategoryOptions.map((val) => val.name)}
                                                value={subcategoryOptions.find((sub) => sub.id == form.subcategory_id)?.name || ""}
                                                setIsOpen={(state) => setOpenDropdown1(state ? "subcategory" : null)}
                                                onSelect={handleSubcategorySelect}
                                            />
                                        </div>


                                        <div className="max-sm:mb-4">
                                            <Searchdropdown
                                                options={fabricOptions.map((opt) => opt.name)}
                                                main_color="text-gray"
                                                labelClassName="text-[#9CA3AF]"
                                                label="Fabric"
                                                isOpen={openDropdown1 === 'fabric'}
                                                onToggle={() => toggleDropdown1('fabric')}
                                                onSelect={(selectedName) => {
                                                    const selectedFabric = fabricOptions.find(opt => opt.name === selectedName);
                                                    if (selectedFabric) {
                                                        setForm((prev) => ({ ...prev, fabric_id: selectedFabric.id }));
                                                    } else {
                                                        console.warn('Fabric not found for selected value:', selectedName);
                                                    }
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
                                            className="w-full bg-transparent   mt-[5px] px-[15px] py-[10px] border border-[#d8dfe7] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray">Short Description</label>
                                        <textarea
                                            value={form.short_description}
                                            onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                                            rows={6}
                                            className="w-full bg-transparent   mt-[5px] px-[15px] py-[10px] border border-[#d8dfe7] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                        />
                                    </div>


                                    <div className="grid grid-cols-4  max-lg:grid-cols-2  gap-5 max-xl:gap-2 max-lg:gap-5 max-sm:block mb-4">
                                        <div className=" max-sm:mb-4">
                                            <Dropdown
                                                label="Availability"
                                                options={["Active", "Inactive"]}
                                                defaultValue={form.is_available === 'True' ? 'Active' : 'Inactive'}
                                                value={form.is_available}
                                                isOpen={activeDropdown === 'is_available'}
                                                onToggle={(state) => setActiveDropdown(state ? 'is_available' : null)}
                                                onSelect={(value) => {

                                                    console.log(value);

                                                    setForm((prev) => ({
                                                        ...prev,
                                                        is_available: value === 'Active' ? 'True' : 'False'
                                                    }))
                                                }
                                                }
                                            />
                                        </div>

                                        <div className=" max-sm:mb-4">
                                            <Dropdown
                                                label="Featured"
                                                options={["Active", "Inactive"]}
                                                value={form.is_featured}
                                                isOpen={activeDropdown === 'is_featured'}
                                                onToggle={(state) => setActiveDropdown(state ? 'is_featured' : null)}
                                                onSelect={(value) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        is_featured: value === 'Active' ? 'True' : 'False'
                                                    }))
                                                }
                                            />
                                        </div>

                                        <div className=" max-sm:mb-4">
                                            <Dropdown
                                                label="Trending"
                                                options={["Active", "Inactive"]}

                                                value={form.is_trending}
                                                isOpen={activeDropdown === 'is_trending'}
                                                onToggle={(state) => setActiveDropdown(state ? 'is_trending' : null)}
                                                onSelect={(value) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        is_trending: value === 'Active' ? 'True' : 'False'
                                                    }))
                                                }
                                            />
                                        </div>

                                        <div className=" max-sm:mb-4">
                                            <Dropdown
                                                label="New arrival"
                                                options={["Active", "Inactive"]}
                                                value={form.is_new_arrival}
                                                isOpen={activeDropdown === 'is_new_arrival'}
                                                onToggle={(state) => setActiveDropdown(state ? 'is_new_arrival' : null)}
                                                onSelect={(value) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        is_new_arrival: value === 'Active' ? 'True' : 'False'
                                                    }))
                                                }
                                            />
                                        </div>



                                    </div>
                                    <div className="grid grid-cols-3 max-lg:grid-cols-2  gap-5 max-xl:gap-2 max-lg:gap-5 max-sm:block ">
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
                          

                            <div className="mb-[24px]       bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px]  max-lg:px-[18px] max-sm:p-[10px]   py-[18px] font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">Pricing Details</h4>
                                <div className="px-[24px] py-[18px] max-sm:p-[10px] max-lg:px-[18px] ">
                                    <div className="grid grid-cols-3 gap-5 max-sm:block max-lg:grid-cols-2 mb-4">
                                        <div className="max-sm:mb-4">
                                            <label className="block text-sm mb-1 font-medium text-gray">Price</label>

                                            <div className="flex items-center h-[40px] transition-all overflow-hidden duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px]  text-[#5d7186] border border-[#d8dfe7] w-full"><span className="px-[16px] h-[40px] flex items-center justify-center bg-[#eef2f7]"><i className="fa-solid fa-indian-rupee-sign"></i></span>
                                                <input type="number" value={form.price}
                                                    onChange={(e) => setForm({ ...form, price: e.target.value, discount_price: "", discount_percentage: "" })} className="w-full bg-transparent   px-4 min-w-[100px] h-[40px] text-sm text-[#5d7186] border border-[#d8dfe7] rounded-[0px_8px_8px_0px] focus:outline-none focus:border-[#b0b0bb]" />

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
                                                    onChange={(e) => setForm({ ...form, discount_price: e.target.value, discount_percentage: "" })}

                                                    className="w-full bg-transparent   px-4 min-w-[100px] h-[40px] text-sm text-[#5d7186] border border-[#d8dfe7] rounded-[0px_8px_8px_0px] focus:outline-none focus:border-[#b0b0bb]"

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
                                                    onChange={(e) => setForm({ ...form, discount_percentage: e.target.value, discount_price: "" })}

                                                    className="w-full bg-transparent   px-4 h-[40px] text-sm text-[#5d7186] border border-[#d8dfe7] rounded-[8px_0px_0px_8px] focus:outline-none focus:border-[#b0b0bb]"

                                                />
                                                <span className="px-[16px] bg-[#eef2f7] text-[#313b5e] flex items-center justify-center h-full font-semibold">%</span>
                                            </div>
                                        </div>

                                      

                                    </div>

                                </div>
                            </div>




                            <div className="flex justify-end items-center  bg-[#eef2f7] rounded-[12px]" >
                                <div className="p-[17px]  flex flex-row-reverse gap-3 max-sm:ps-0">

                                    <div className="flex gap-2 border-t border-[#eaedf1] w-[100%] ">
                                        <button onClick={handleSubmit} type="submit" className="w-[182px]  max-sm:w-[125px] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white" >Save Change</button>
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

export default Create_product
