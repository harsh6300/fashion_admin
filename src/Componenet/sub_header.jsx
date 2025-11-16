import React, { useEffect } from 'react';
import option from '../assets/option.png';
import User from '../assets/user.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../services/apiSlice'


const SubHeader = ({ setIsOpenside ,pageName: pageNameProp  }) => {


    const location = useLocation();

    const pageNameMap = {
        "/product_details": "Product Details",
        "/add_product": "Add Product",
        "/diamond": "Diamonds",
        "/add_diamond": "Add Diamond",
        "/edit_diamond": "Edit Diamond",
        "/metal": "Metals",
        "/add_metal": "Add Metal",
        "/edit_metal": "Edit Metal",
        "/product_media": "Product Media",
        "/add_product_media": "Add Product Media",
    };

    const showIconRoutes = Object.keys(pageNameMap); 
    const pageName = pageNameMap[location.pathname] || pageNameProp;


    const { data: user } = useGetProfileQuery();
    const userdata = user?.data || [];
    const navigate = useNavigate()

    return (
        <div>
            <div className="flex mb-[30px] justify-between items-center p-[10px] sm:p-[15px] rounded-[10px] bg-white shadow-[0px_4px_4px_0px_#0000001A]">
                <div className="flex items-center gap-2">
                    {showIconRoutes.includes(location.pathname) && (
                        <div className="option-ico-1-1 hidden max-2xl:flex">
                            <img src={option} onClick={() => setIsOpenside(true)} alt="option icon" />
                        </div>
                    )}
                    <h3 className="text-[18px] text-gray">{pageName}</h3>
                </div>
                <div className="flex items-center">
                    <div className="relative w-[24px] cursor-pointer  h-[24px]" onClick={() => navigate('/chat')}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className=""><g><path d="M480.052 369.741c49.476-69.417 41.913-164.522-25.665-226.473-30.877-28.305-70.24-45.926-112.761-50.847a15.224 15.224 0 0 0-.833-.958C303.802 53.038 250.658 31 194.988 31 89.049 31 0 109.933 0 211c0 35.435 11.007 69.404 31.916 98.741L2.707 401.447a14.999 14.999 0 0 0 21.09 17.923l88.827-45.167c18.242 7.855 37.586 13.009 57.618 15.354C208.884 430.193 262.315 451 316.98 451c28.416 0 56.729-5.791 82.36-16.798l88.831 45.169a14.973 14.973 0 0 0 6.795 1.629c10.123 0 17.38-9.865 14.295-19.553zm-361.374-25.72a14.997 14.997 0 0 0-13.233.179l-63.267 32.17 20.66-64.866a14.998 14.998 0 0 0-2.473-13.788C40.499 272.286 29.998 242.301 29.998 211c0-82.71 74.014-150 164.99-150 36.636 0 71.905 11.099 100.514 31.086-96.348 9.688-173.51 84.942-173.51 178.914 0 29.228 7.492 57.366 21.617 82.576a173.556 173.556 0 0 1-24.931-9.555zm287.845 60.178a14.998 14.998 0 0 0-13.233-.178C369.905 415.129 343.518 421 316.98 421c-90.976 0-164.99-67.29-164.99-150s74.014-150 164.99-150 164.99 67.29 164.99 150c0 31.301-10.501 61.286-30.368 86.715a15.004 15.004 0 0 0-2.473 13.788l20.66 64.866z" fill="#000000" opacity="1" data-original="#000000" className=""></path><circle cx="255.984" cy="271" r="15" fill="#000000" opacity="1" data-original="#000000" className=""></circle><circle cx="315.981" cy="271" r="15" fill="#000000" opacity="1" data-original="#000000" className=""></circle><circle cx="375.977" cy="271" r="15" fill="#000000" opacity="1" data-original="#000000" className=""></circle></g></svg>
                        <span className="absolute -top-2 right-0 flex items-center justify-center w-[16px] h-[16px] text-[12px] font-bold text-white bg-[#EA5455] rounded-full">
                            4
                        </span>
                    </div>
                    <div className="account py-0 bg-white m-0 flex items-center">
                        <div className="ms-3 hide__ala">
                            <span>{userdata?.username}</span>
                            <p className='text-end'>{userdata?.email}</p>
                        </div>

                        <div className="ms-3">
                            <img
                                src={User}  
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"  
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubHeader;
