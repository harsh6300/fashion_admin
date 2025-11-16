import React, { useState, useEffect } from "react";
import { useGetProductQuery } from "../../services/apiSlice";

const BillingForm = ({ productitem, initialItems = [] }) => {

    const { data: productData } = useGetProductQuery();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [items, setItems] = useState(initialItems);


    console.log(initialItems);

    const handleProductSelect = (productId) => {
        const product = productData?.data?.find((p) => p.product_id === parseInt(productId));
        setSelectedProduct(product);
        setSelectedVariant(null);
        setQuantity(1);
    };


    const addItem = () => {
        if (!selectedProduct) return alert("Select product");
        if (selectedProduct.variants.length > 0 && !selectedVariant)
            return alert("Select variant");

        const newItem = {
            product_id: selectedProduct.product_id,
            variant_id: selectedVariant ? selectedVariant.variant_id : null,
            quantity: quantity,
            price: selectedProduct.price,
            gst_percentage: selectedProduct.gst_percentage,
        };

        const updated = [...items, newItem];
        setItems(updated);

        // send data to parent
        productitem(updated);

        // Reset fields
        setSelectedProduct(null);
        setSelectedVariant(null);
        setQuantity(1);
    };

    const removeItem = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
        productitem(updated);
    };

    const inputClass =
        "mt-[5px] w-full bg-transparent h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm";

    return (
        <div className="w-full space-y-3">

            {/* Select Product */}
            <select
                className={inputClass}
                value={selectedProduct?.product_id || ""}
                onChange={(e) => handleProductSelect(e.target.value)}
            >
                <option value="">Select Product</option>
                {productData?.data?.map((p) => (
                    <option key={p.product_id} value={p.product_id}>
                        {p.name}
                    </option>
                ))}
            </select>

            {/* Variant */}
            {selectedProduct && selectedProduct.variants.length > 0 && (
                <select
                    className={inputClass}
                    value={selectedVariant?.variant_id || ""}
                    onChange={(e) =>
                        setSelectedVariant(
                            selectedProduct.variants.find(
                                (v) => v.variant_id === parseInt(e.target.value)
                            )
                        )
                    }
                >
                    <option value="">Select Variant</option>
                    {selectedProduct.variants.map((v) => (
                        <option key={v.variant_id} value={v.variant_id}>
                            {v.size} - {v.color} - Stock: {v.stock}
                        </option>
                    ))}
                </select>
            )}

            {/* Quantity */}
            {selectedProduct && (
                <input
                    type="number"
                    min="1"
                    className={inputClass}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
            )}

            <button
                onClick={addItem}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Add Item
            </button>

            {/* Show Items */}
            <div className="mt-4 bg-gray-100 p-3 rounded">
                <p className="font-bold mb-2">Selected Items:</p>

                {items.length === 0 ? (
                    <p className="text-sm text-gray-600">No items added</p>
                ) : (
                    items.map((item, index) => (
                        <div key={index} className="flex justify-between p-2 bg-white mb-2 rounded">
                            <span>
                                Product: {item.product_id} | Variant: {item.variant_id || "None"} | Qty: {item.quantity} | Price : {item?.price} | GST : {item.gst_percentage}
                            </span>
                            <button
                                onClick={() => removeItem(index)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BillingForm;
