import React, { useEffect, useState ,useRef} from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAddressQuery, useGetOrderQuery } from '../../services/apiSlice';
import { ImInsertTemplate } from 'react-icons/im';

const Invioce_details = () => {
    const printRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [date, setDate] = useState(new Date());
    const [value, setValue] = useState(1);

    const increment = () => setValue((prev) => Math.min(prev + 1, 100));
    const decrement = () => setValue((prev) => Math.max(prev - 1, 0));


    const navigate = useNavigate();

    const location = useLocation()
    const order_id = location.state?.order_id;
    const orderId = order_id;
    console.log(orderId);

    const { data: order } = useGetOrderQuery()
    console.log(order?.data);

    const data = order?.data?.find((val) => val.order_id == orderId)
    console.log(data);

    const { data: address } = useGetAddressQuery(data?.address);
    const addresssData = address?.data;
    console.log(addresssData);

    const displayedData = data?.order_items

    console.log(displayedData);

    const subTotal = displayedData?.reduce((acc, item) => acc + Number(item.product.discount_price), 0) || 0;
    console.log(subTotal); // should log the sum of all product total_price values


    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;
    
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // restore JS behavior
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
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Order Cart"} />
                    <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap max-sm:mb-[20px]" >
                        <h4 className="text-[1.125rem] uppercase text-gray font-semibold">
                            Invoices Create</h4>
                    </div>

                    <div className='w-[66.66%] max-lg:w-full mx-auto rounded-[0.75rem]  p-[24px] bg-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]'>
                    <div ref={printRef}>
                        <div className='flex relative flex-wrap p-[24px] m-[-12px] rounded-[0.75rem] bg-[#dcf4f3] justify-between'>
                            <div className=''>
                                <img src="https://techzaa.in/larkon/admin/assets/images/logo-dark.png" className='h-[24px]' alt="" />

                                <h2 className='mt-[2.25rem] text-[18px] text-[#313b5e] font-[600]'>Larkon Admin.</h2>
                                {addresssData && (
                                    <p className="mt-[1.5rem] text-[14px] text-[#5d7186] font-[400]">
                                        {addresssData.address_line_1},<br />
                                        {addresssData.city}, {addresssData.state}, {addresssData.pin_code}, {addresssData.landmark}
                                        <br />
                                        Phone: {addresssData.contact_no}
                                    </p>
                                )}

                            </div>
                            <div>
                                <table>
                                    
                                        <tbody>
                                            <tr>
                                                <th className='text-[#313b5e] py-[6px] text-start ps-0 text-[14px] pr-[70px]'>Invoice :</th>
                                                <th className='text-[#313b5e] py-[6px] px-0 text-[14px] text-end'>{data?.order_id}</th>
                                            </tr>
                                            <tr>
                                                <td className='text-[14px] py-[6px] text-[#5d7186] pr-[70px]'>Issue Date:</td>
                                                <td className='text-[14px] text-[#313b5e] py-[6px] text-end'>23 April 2024</td>
                                            </tr>
                                            {/* <tr>
                                                <td className='text-[14px] py-[6px] text-[#5d7186] pr-[70px]'>Due Date :</td>
                                                <td className='text-[14px] text-[#313b5e] py-[6px] text-end'>26 April 2024</td>
                                            </tr> */}
                                            <tr>
                                                <td className='text-[14px] py-[6px] text-[#5d7186] pr-[70px]'>Amount :</td>
                                                <td className='text-[14px] text-[#313b5e] py-[6px] text-end'>{data?.total_amount}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-[14px] py-[6px] text-[#5d7186] pr-[70px]'>Status :</td>
                                                <td className='text-[14px] text-[#313b5e] py-[6px] text-end'>
                                                    <button className='text-[13px] bg-[#22c55e] font-[600] leading-[1] text-white py-[6px] px-[12px] rounded-[4px]'>
                                                        {data?.status}
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                  

                                </table>
                            </div>
                            <img src="https://techzaa.in/larkon/admin/assets/images/check-2.png" className='absolute w-[80px] left-0 right-0 mx-auto bottom-[-40px]' alt="" />
                        </div>

                        <div className='mt-[36px] flex justify-between flex-wrap'>
                            <div>

                                <h2 className='font-[600] text-[#313b5e]'>Issue From :</h2>
                                <h3 className='mt-[20px] mb-[10px] text-[18px] font-[600] text-[#313b5e]'>Larkon Admin.INC</h3>
                                <p className='text-[14px] text-[#5d7186] mb-[10px]'>2437 Romano Street Cambridge, MA 02141</p>
                                <p className='text-[14px] text-[#5d7186] mb-[10px]'><span className='underline'>Phone :</span> +(31)781-417-2004</p>
                                <p className='text-[14px] text-[#5d7186] mb-[10px]'><span className='underline'>Email :</span> JulianeKuhn@jourrapide.com</p>
                            </div>
                            <div>

                                <h2 className='font-[600] text-[#313b5e]'>Issue For :</h2>
                                <h3 className='mt-[20px] mb-[10px] text-[18px] font-[600] text-[#313b5e]'>Gaston Lapierre</h3>
                                <p className='text-[14px] text-[#5d7186] mb-[10px]'>1344 Hershell Hollow Road WA 98168 , USA</p>
                                <p className='text-[14px] text-[#5d7186] mb-[10px]'><span className='underline'>Phone :</span> +(31)781-417-2004</p>
                                <p className='text-[14px] text-[#5d7186] mb-[10px]'><span className='underline'>Email :</span> JulianeKuhn@jourrapide.com</p>
                            </div>
                        </div>

                        <div className='overflow-x-scroll over__scroll pt-[24px]'>
                            <table className='w-full  rounded-[0.85rem] '>
                                <thead className='bg-[#eef2f780] '>
                                    <tr>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm text-start'>Product Name</th>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm text-center'>Quantity</th>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm '>Price</th>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm '>Tax</th>
                                        <th className='text-[#5d7186] p-[0.75rem] text-sm text-end'>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedData?.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="h-[44px] sm:h-[58px] transition-all duration-200 bg-white hover:bg-[rgba(238,243,249,0.8)] border-b border-[#ddd]"
                                            onClick={() =>
                                                navigate("/create_review", {
                                                    state: {
                                                        order_id: orderId,  // Pass order_id
                                                        product_id: item.product.product_id  // Pass product_id
                                                    }
                                                })

                                            }
                                        >
                                            <td className="text-sm text-[#5E5873] flex  px-[30px] max-xl:px-[10px] max-sm:px-[5px] max-sm:min-w-[120px]   items-center gap-2 my-[15px] max-md:gap-1 max-md:text-[12px]">

                                                <div className="h-[56px] min-w-[56px] max-md:min-w-[40px] max-md:max-h-[40px] bg-   [#eef2f7] rounded-[12px] flex items-center justify-center overflow-hidden">
                                                    <img src={item.product.media.file} alt="category_img" className="object-cover h-[56px] w-[56px] max-md:w-[40px] max-md:h-[40px]" />
                                                </div>
                                                <div className="">
                                                    <h1 className="text-[#313b5e]">{item.product.name}</h1><p className="text-[#5d7186] text-[13px] mt-[2px]"><span>Size :
                                                    </span>S , M , L , Xl </p></div>
                                            </td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  max-md:text-[12px]"> {item.quantity}</td>

                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]   max-md:text-[12px]"> {item.product.price}</td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:text-[12px]">{item.product.total_gst || 0}%</td>
                                            {/* <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:hidden max-md:text-[12px]">   {item.product.total_gst || 0}%</td> */}


                                            <td className="text-sm text-[#5E5873] text-center    max-sm:px-[5px]   max-md:text-[12px]">
                                                {item.product.discount_price}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-end mt-[24px] flex-wrap'>
                            <table>
                                <tbody>
                                    {displayedData?.map((item, index) => (
                                        <div>

                                            <tr className="">
                                                <td className="text-[14px] p-[0.75rem] text-[#5d7186] pr-[70px] text-end">Sub Total :</td>
                                                <td className="text-[14px] text-[#313b5e] p-[0.75rem] text-end ">${subTotal.toFixed(2)}</td>
                                            </tr>
                                            <tr className="">
                                                <td className="text-[14px] p-[0.75rem] text-[#5d7186] pr-[70px] text-end">Discount :</td>
                                                <td className="text-[14px] text-[#313b5e] p-[0.75rem] text-end ">-$60.00</td>
                                            </tr>
                                            <tr className="">
                                                <td className="text-[14px] p-[0.75rem] text-[#5d7186] pr-[70px] text-end">Estimated Tax (15.5%) :</td>
                                                <td className="text-[14px] text-[#313b5e] p-[0.75rem] text-end ">${item.total_gst}</td>
                                            </tr>
                                            <tr className="border-t border-[#eaedf1]">
                                                <td className="text-[14px] p-[0.75rem] text-[#5d7186] font-[600] pr-[70px] text-end">Grand Amount :</td>
                                                <td className="text-[14px] text-[#313b5e] font-[600] p-[0.75rem] text-end ">${item.total_price}</td>
                                            </tr>
                                        </div>

                                    ))}
                                </tbody>
                            </table>

                        </div>

                        <div className='mt-[24px] flex items-center gap-[12px] p-[12px] mb-[20px] bg-[#fcdfdf] rounded-[0.75rem]'>
                            <div>
                                <div className='bg-[#ef5f5f] w-[36px] h-[36px] rounded-[0.75rem] flex items-center justify-center'>
                                    <i className="fa-solid fa-circle-info text-white"></i>
                                </div>

                            </div>
                            <p className='text-[14px] text-[#602626]'>All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.</p>
                        </div>

                    </div>

                        <div className='mt-[24px]'>
                            <div className='flex justify-end'>
                                <div className='flex flex-wrap items-center justify-end gap-[5px]'>
                                <a 
  className="bg-[#4ecac2] text-center leading-[22px] min-w-[160px] text-white rounded-[0.75rem] text-[14px] h-[40px] px-[16px] py-[8px]" 
  onClick={() => handlePrint()}
>
  Print
</a>

                                    <a className="bg-transparent text-primary min-w-[160px] text-center leading-[22px]  rounded-[0.75rem] border border-primary  text-[14px] h-[40px] px-[16px] py-[8px] ">Submit</a>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default Invioce_details
