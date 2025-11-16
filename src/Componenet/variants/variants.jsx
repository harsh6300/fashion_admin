import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useGetVariantQuery, useAddVariantMutation, useDeleteVariantMutation, useEditVariantMutation } from '../../services/apiSlice';

const ProductVariants = (props) => {
    const product_id = props?.product_id;

    const { data: variants = [], isLoading } = useGetVariantQuery({ product_id });
    const [addVariant] = useAddVariantMutation();
    const [updateVariant] = useEditVariantMutation();
    const [deleteVariant] = useDeleteVariantMutation();

    const [showForm, setShowForm] = useState(false);
    const [editingVariant, setEditingVariant] = useState(null);

    const [form, setForm] = useState({
        color: '',
        size: '',
        pattern: '',
        fit: '',
        sleeve: '',
        neck_type: '',
        stock: '',
        quantity: '',
        reorder_level: '',
        reason: '',
        images: [],
    });

    // Handle image input
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...files], // add new files + keep existing
        }));
    };

    // Save or Update Variant
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('product_id', product_id);

        // Handle normal fields
        Object.keys(form).forEach((key) => {
            if (key !== 'images') {
                formData.append(key, form[key]);
            }
        });

        // ✅ Handle images properly
        form.images.forEach((img) => {
            if (!typeof img === 'string') {
             
                formData.append('images', img);
            } 
        });

        // ✅ Update vs Add
        if (editingVariant) {
            formData.append('variant_id', editingVariant.variant_id);
            await updateVariant(formData);
        } else {
            await addVariant(formData);
        }

        // ✅ Reset form after submit
        setShowForm(false);
        setEditingVariant(null);
        setForm({
            color: '',
            size: '',
            pattern: '',
            fit: '',
            sleeve: '',
            neck_type: '',
            stock: '',
            quantity: '',
            reorder_level: '',
            reason: '',
            images: [],
        });
    };


    const handleDelete = async (id) => {
        const formData = new FormData();
        formData.append('variant_id', id);
        await deleteVariant(formData);
    };

    // Edit variant inline
    const handleEdit = (variant) => {
        setEditingVariant(variant);
        setShowForm(true);
        setForm({
            color: variant.color || '',
            size: variant.size || '',
            pattern: variant.pattern || '',
            fit: variant.fit || '',
            sleeve: variant.sleeve || '',
            neck_type: variant.neck_type || '',
            stock: variant.stock || '',
            quantity: variant.quantity || '',
            reorder_level: variant.reorder_level || '',
            reason: variant.reason || '',
            images: variant.images || [], // ✅ existing image URLs
        });
    };

    return (
        <div className="bg-white p-5 shadow-md rounded-[12px] mb-[24px]">
            <div className="flex justify-between items-center border-b border-[#eaedf1] pb-3 mb-3">
                <h4 className="text-[#313b5e] text-[16px] font-[600]">Variants</h4>
                {!showForm && (
                    <button
                        className="bg-primary text-white px-4 py-2 rounded-[8px] text-sm hover:bg-[#ff6c2f]"
                        onClick={() => {
                            setEditingVariant(null);
                            setForm({
                                color: '',
                                size: '',
                                pattern: '',
                                fit: '',
                                sleeve: '',
                                neck_type: '',
                                stock: '',
                                quantity: '',
                                reorder_level: '',
                                reason: '',
                                images: [],
                            });
                            setShowForm(!showForm);
                        }}
                    >
                        Add Variant
                    </button>
                )}
            </div>

            {/* Add / Edit Form */}
            {showForm && (
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 mb-5">
                    <input placeholder="Color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="border p-2 rounded" />
                    <input placeholder="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="border p-2 rounded" />
                    <input placeholder="Pattern" value={form.pattern} onChange={(e) => setForm({ ...form, pattern: e.target.value })} className="border p-2 rounded" />
                    <input placeholder="Fit" value={form.fit} onChange={(e) => setForm({ ...form, fit: e.target.value })} className="border p-2 rounded" />
                    <input placeholder="Sleeve" value={form.sleeve} onChange={(e) => setForm({ ...form, sleeve: e.target.value })} className="border p-2 rounded" />
                    <input placeholder="Neck Type" value={form.neck_type} onChange={(e) => setForm({ ...form, neck_type: e.target.value })} className="border p-2 rounded" />
                    <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="border p-2 rounded" />
                    {!editingVariant ? (
                        <>

                            <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="border p-2 rounded" />
                            <input type="number" placeholder="Reorder Level" value={form.reorder_level} onChange={(e) => setForm({ ...form, reorder_level: e.target.value })} className="border p-2 rounded" />
                            <input placeholder="Reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className="border p-2 rounded" />
                        </>
                    ) : null}

                    {/* Image Upload Field */}
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="col-span-2"
                    />

                    {/* Preview of All Images (Existing + New) */}
                    <div className="col-span-2 flex flex-wrap gap-3 mt-3">
                        {form.images && form.images.length > 0 ? (
                            form.images.map((img, index) => (
                                <div
                                    key={index}
                                    className="relative w-[90px] h-[90px] border rounded overflow-hidden group"
                                >
                                    <img
                                        src={
                                            typeof img === "string"
                                                ? img.startsWith("http")
                                                    ? img
                                                    : `${import.meta.env.VITE_API_BASE_URL || ""}${img}`
                                                : URL.createObjectURL(img)
                                        }
                                        alt={`variant-${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedImages = form.images.filter((_, i) => i !== index);
                                            setForm({ ...form, images: updatedImages });
                                        }}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-[20px] h-[20px] text-xs opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm">No images uploaded yet</p>
                        )}
                    </div>


                    <div className="col-span-2 flex gap-3 mt-2">
                        <button className="bg-primary text-white px-4 py-2 rounded-[8px]" onClick={handleSubmit}>
                            {editingVariant ? 'Update Variant' : 'Save Variant'}
                        </button>
                        <button
                            className="border border-primary text-primary px-4 py-2 rounded-[8px]"
                            onClick={() => {
                                setShowForm(false);
                                setEditingVariant(null);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Show existing variants */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid gap-3">
                    {variants?.data?.map((v) => (
                        <div key={v.variant_id} className="border rounded-[8px] p-3 flex justify-between items-center">
                            <div>
                                <p><b>Color:</b> {v.color}</p>
                                <p><b>Size:</b> {v.size}</p>
                                <p><b>Stock:</b> {v.stock}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="w-[44px] h-[32px] bg-[#ff6c2f1a] text-primary rounded hover:bg-primary hover:text-white flex justify-center items-center"
                                    onClick={() => handleEdit(v)}
                                >
                                    <Icon icon="solar:pen-2-broken" width="18" height="18" />
                                </button>
                                <button
                                    className="w-[44px] h-[32px] bg-[#ff6c2f1a] text-primary rounded hover:bg-primary hover:text-white flex justify-center items-center"
                                    onClick={() => handleDelete(v.variant_id)}
                                >
                                    <Icon icon="solar:trash-bin-trash-outline" width="18" height="18" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductVariants;
