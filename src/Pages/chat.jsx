import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import Meen from '../assets/meen.png'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAddMessageMutation, useGetMessagesQuery, useGetProfileQuery, useGetRoomsQuery } from '../services/apiSlice';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [bottom_dots, setbottom_dots] = useState(false);
    const [secemoji, setsecemoji] = useState(false);

    const galleryInputRef = useRef();
    const audioInputRef = useRef();
    const contactInputRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        const newItems = files.map((file) => ({
            type: getMimeType(file),
            file,
            name: file.name,
        }));

        setSelectedItems((prev) => [...prev, ...newItems]);
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            if (e.target.value === '' && selectedItems.length > 0) {
                setSelectedItems((prevItems) => prevItems.slice(0, -1));
            }
        }
    };

    const { data: profile } = useGetProfileQuery() // Assuming room_id is 1 for demo purposes

    const getMimeType = (file) => {
        const mime = file.type;
        const name = file.name.toLowerCase();

        if (mime.startsWith("image/")) return "image"; // jpg, png, webp, avif, svg, etc.
        if (mime.startsWith("audio/")) return "audio"; // mp3, wav, etc.
        if (mime.startsWith("video/")) return "video"; // mp4, mov, etc.
        if (mime === "application/pdf") return "pdf";
        if (mime === "application/msword" || mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "doc";
        if (mime === "application/vnd.ms-excel" || mime === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return "excel";
        if (mime === "application/vnd.ms-powerpoint" || mime === "application/vnd.openxmlformats-officedocument.presentationml.presentation") return "ppt";
        if (mime === "text/csv") return "csv";
        if (mime === "application/zip" || mime === "application/x-zip-compressed") return "zip";
        if (mime === "application/x-rar-compressed" || name.endsWith(".rar")) return "rar";
        if (mime === "application/json") return "json";
        if (mime === "text/plain") return "text";
        if (mime === "text/vcard" || name.endsWith(".vcf")) return "contact";

        return "file"; // fallback for unknown or unsupported types
    };



    const getFileIcon = (item) => {
        if (item?.type === "location") return "📍";
        if (item?.type === "emoji") return <img src={item.src} alt="emoji" className="w-5 h-5" />;
        if (typeof item === "object" && item.name) {
            const ext = item.name.split(".").pop().toLowerCase();
            if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "🖼️";
            if (["mp3", "wav"].includes(ext)) return "🎵";
            if (["vcf"].includes(ext)) return "👤";
            return "📁";
        }
        return "❓";
    };


    const navigate = useNavigate();


    const [dots_, setDots_] = useState(false)
    const [emoji, setemoji] = useState(false)
    const [chatdropdown, setchatdropdown] = useState(false)

    const [show, setshow] = useState(false)
    const [visible, setvisible] = useState(false)
    const [sidemenu, setsidemenu] = useState(false)


    const handleCameraCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();
            alert("Camera opened — implement capture modal here.");
        } catch (err) {
            alert("Camera access denied or not supported.");
        }
    };



    const [selectedItems, setSelectedItems] = useState([]);

    // when adding a file

    const handleLocationSend = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const mapUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
                setSelectedItems((prev) => [
                    ...prev,
                    {
                        type: "location",
                        label: "My Location",
                        coords: { lat: latitude, lng: longitude },
                        url: mapUrl,
                    },
                ]);
            },
            () => alert("Unable to get location.")
        );
    };

    const dropdownRef = useRef();

    // ---------------------------------------------------------------------------------------------------
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setbottom_dots(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const [roomId, setRoomId] = useState(null);
    const [liveMessages, setLiveMessages] = useState([]);

    const { data: rooms, isLoading: roomsLoading } = useGetRoomsQuery();
    const activeRoomId = roomId?.room_id || rooms?.data?.[0]?.room_id;

    const { data: messages, isLoading: messagesLoading } = useGetMessagesQuery({ room_id: activeRoomId });
    const socketRef = useRef(null);


    useEffect(() => {
        if (!activeRoomId) return;

        const ws = new WebSocket(`ws://192.168.1.6:8051/ws/chat/${activeRoomId}/`);

        socketRef.current = ws;

        ws.onopen = () => console.log("WebSocket connected ✅");
        ws.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            console.log(msg);

            if (!messages?.data?.some(m => m.message_id === msg.message_id)) {
                setLiveMessages(prev => [...prev, msg]);
            }
        };




        ws.onerror = (err) => console.error("WebSocket error ❌", err);
        ws.onclose = () => console.log("WebSocket disconnected ❌");

        return () => ws.close();
    }, [activeRoomId]);

    useEffect(() => {
        if (!roomId && rooms?.data?.length) {
            setRoomId(rooms.data[0]);
        }
    }, [rooms]);
    // useEffect(() => {
    //     if (messages) setLiveMessages(messages);
    // }, [messages]);


    console.log(liveMessages);

    const allMessages = [...(messages?.data || []), ...liveMessages];

    // Sort by timestamp (assuming message.timestamp is ISO string or Date)
    const sortedMessages = allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    console.log(sortedMessages);

    const [content, setcontent] = useState('');

    const [addmessage] = useAddMessageMutation();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('room_id', activeRoomId);
            formData.append('content', content);

            const wsPayload = {
                room_id: roomId?.room_id,
                user_id: profile?.data?.user_id, // ← You MUST add this
                message: content,
                file_type: null,
                file_url: null,
            };

            // Handle files
            for (const item of selectedItems) {
                if (item?.type === "emoji") {
                    const res = await fetch(item.src);
                    const blob = await res.blob();
                    const file = new File([blob], `emoji-${Date.now()}.png`, { type: "image/png" });
                    formData.append("files", file);
                    formData.append("file_type", "emoji");
                    wsPayload.file_type = "emoji";
                    wsPayload.file_url = item.src;
                } else if (item?.file instanceof File) {
                    formData.append("files", item.file);
                    const detectedType = getMimeType(item.file);
                    formData.append("file_type", detectedType);
                    wsPayload.file_type = detectedType;
                    // optionally upload to S3 or use file.url from API response
                }
            }

            // 1. Send to backend to persist in DB
            // const result = await addmessage(formData).unwrap();

            // // 2. Send real-time update through WebSocket
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify(wsPayload));
            }

            // Reset
            setcontent("");
            setSelectedItems([]);

        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [allMessages]); // Make sure allMessages is your complete list


    function convertUTCToISTTime12Hour(utcTimestamp) {
        const date = new Date(utcTimestamp);

        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata',
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }



    const dropdownRefs = useRef([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dots_ !== null &&
                dropdownRefs.current[dots_] &&
                !dropdownRefs.current[dots_].contains(event.target)
            ) {
                setDots_(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dots_]);



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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Chat"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Chat</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                
                                <li className="text-primary font-medium text-[12px]">Chat</li>
                            </ol>
                        </nav>


                    </div>

                    <div className="chat-wrapper">
                        <div className="sidebar-group">
                            <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '953px' }}><div id="chats" className="sidebar-content active slimscroll" style={{ overflow: 'hidden', width: '100%' }}>

                                <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '953px' }}><div className="slimscroll" style={{ overflowY: 'scroll', width: '100%', height: '80vh' }}>

                                    <div className="chat-search-header">
                                        <div className="header-title flex items-center justify-between">
                                            <h4 className="mb-3 text-[18px] text-[#111827] font-[600] ">Chats</h4>
                                        </div>

                                        <div className="search-wrap">
                                            <form action="chat.html">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search For Contacts or Messages" />
                                                    <span className="input-group-text"><i className="ti ti-search"></i></span>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="sidebar-body chat-body" id="chatsidebar">

                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="chat-title font-[600] text-[#111827]">All Chats</h5>
                                        </div>

                                        <div className="chat-users-wrap">
                                            {rooms?.data?.map((room, index) => (
                                                <div key={index} className="chat-list cursor-pointer" onClick={() => { setshow(true); setRoomId(room); }}>
                                                    <a className="chat-user-list">
                                                        <div className="avatar w-[55px]  avatar-lg online relative me-2">
                                                            <img src={room?.other_participant?.profile_picture} className="rounded-full w-[45px] h-[45px] object-cover" alt="image" />
                                                        </div>
                                                        <div className="chat-user-info">
                                                            <div className="chat-user-msg">
                                                                <h6 className='text-sm text-[#111827] font-[600]'>{room?.other_participant?.first_name} {room?.other_participant?.last_name}</h6>
                                                                <p><span className="animate-typing flex ">{room?.last_message_at}
                                                                    <div className='ms-2'>

                                                                        <span className="dot"></span>
                                                                        <span className="dot"></span>
                                                                        <span className="dot"></span>
                                                                    </div>
                                                                </span>
                                                                </p>
                                                            </div>
                                                            <div className="chat-user-time">
                                                                <span className="time">02:40 PM</span>
                                                                <div className="chat-pin">
                                                                    <i className="ti ti-pin me-2"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="chat-dropdown ">
                                                        <a onClick={(e) => {
                                                            e.preventDefault()
                                                            setchatdropdown(!chatdropdown)
                                                        }} className="inline-flex cursor-pointer items-center" data-dropdown-toggle="list-dropdown">
                                                            <i className="ti ti-dots-vertical"></i>
                                                        </a>

                                                        <ul id="list-dropdown" className={`${chatdropdown ? '' : 'hidden'} border-[#E5E7EB]  cursor-pointer p-4 border rounded bg-white shadow-lg z-[99]`} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style={{
                                                            position: 'absolute',
                                                            inset: '0px auto auto 0px',
                                                            margin: '0px',
                                                            transform: 'translate(-160px, 16px)',
                                                        }}>
                                                            <li>
                                                                <a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-box-align-right"></i>Archive Chat</a>
                                                            </li>
                                                            <li>
                                                                <a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-heart"></i>Mark as Favourite</a>
                                                            </li>
                                                            <li>
                                                                <a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-check"></i>Mark as Unread</a>
                                                            </li>
                                                            <li>
                                                                <a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-ti-pinned"></i>Pin Chats</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-trash me-1"></i>Delete </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div><div className="slimScrollBar" style={{
                                    background: 'rgb(204, 204, 204)',
                                    width: '7px',
                                    position: 'absolute',
                                    top: 0,
                                    opacity: 0.4,
                                    display: 'none',
                                    borderRadius: '7px',
                                    zIndex: 99,
                                    right: '1px',
                                    height: '159.204px',
                                }}></div><div className="slimScrollRail" style={{
                                    width: '7px',
                                    height: '100%',
                                    position: 'absolute',
                                    top: '0px',
                                    display: 'none',
                                    borderRadius: '7px',
                                    background: 'rgb(51, 51, 51)',
                                    opacity: 0.2,
                                    zIndex: 90,
                                    right: '1px',
                                }}></div></div>

                            </div><div className="slimScrollBar" style={{
                                background: 'rgb(204, 204, 204)',
                                width: '7px',
                                position: 'absolute',
                                top: '0px',
                                opacity: 0.4,
                                display: 'none',
                                borderRadius: '7px',
                                zIndex: 99,
                                right: '1px',
                                height: '400px',
                            }}></div><div className="slimScrollRail" style={{
                                width: '7px',
                                height: '100%',
                                position: 'absolute',
                                top: '0px',
                                display: 'none',
                                borderRadius: '7px',
                                background: 'rgb(51, 51, 51)',
                                opacity: 0.2,
                                zIndex: 90,
                                right: '1px',
                            }}></div></div>

                        </div>
                        <div className={`chat chat-messages  ${show ? 'show' : ''} `} id="middle">
                            <div>
                                <div className="chat-header">
                                    <div className="user-details">
                                        <div className="d-xl-none">
                                            <a className="text-muted chat-close me-2" onClick={() => setshow(!show)}>
                                                <i className="fas fa-arrow-left text-sm text-[#6b7280] " ></i>
                                            </a>
                                        </div>
                                        <div className="avatar avatar-lg online relative flex-shrink-0">
                                            <img src={roomId?.other_participant?.profile_picture} className="rounded-full w-[45px] h-[45px] object-cover" alt="image" />
                                        </div>
                                        <div className="ms-2 overflow-hidden">
                                            <h6 className='text-sm text-[#6b7380] font-[600]'>{roomId?.other_participant?.first_name} {roomId?.other_participant?.last_name}</h6>
                                            <span className="last-seen text-sm text-[#6b7380] ">Online</span>
                                        </div>
                                    </div>
                                    <div className="chat-options">
                                        <ul>
                                            <li>
                                                <a onClick={(e) => {
                                                    e.preventDefault()
                                                    setvisible(!visible)
                                                }} className="btn chat-search-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Search">
                                                    <i className="ti ti-search"></i>
                                                </a>
                                            </li>
                                            <li className='relative'>

                                                <a onClick={() => setsidemenu(!sidemenu)} className=" btn no-bg inline-flex items-center" data-dropdown-toggle="list-dropdown10">
                                                    <i className="ti ti-dots-vertical"></i>
                                                </a>
                                                <ul id="list-dropdown10" className={`${sidemenu ? '' : 'hidden'} border-[#E5E7EB] text-sm text-[#6b7280] w-[250px]  p-4 border rounded bg-white shadow-lg z-[99]`} data-popper-placement="bottom" style={{
                                                    position: 'absolute',
                                                    inset: '0px auto auto 0px',
                                                    margin: 0,
                                                    transform: 'translate(-200px, 27px)',
                                                }}>
                                                    <li><a href="#" className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-volume-off me-2"></i>Mute Notification</a></li>
                                                    <li><a href="#" className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-clock-hour-4 me-2"></i>Disappearing Message</a></li>
                                                    <li><a href="#" className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-clear-all me-2"></i>Clear Message</a></li>
                                                    <li><a href="#" className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-trash me-2"></i>Delete Chat</a></li>
                                                    <li><a href="#" className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-ban me-2"></i>Block</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={`chat-search search-wrap contact-search ${visible ? 'visible-chat' : ''} `}>
                                        <form>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search Contacts" />
                                                <span className="input-group-text"><i className="ti ti-search"></i></span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: '100%' }}><div className="chat-body chat-page-group slimscroll" style={{
                                    overflowY: 'scroll',
                                    overflowX: 'hidden',
                                    width: '100%',
                                    height: '80vh',
                                }}>
                                    <div className="messages text-[#6b7280]">
                                        {sortedMessages?.map((message, index) => (

                                            <div key={index} className={`chats ${message?.direction != 'left' ? 'chats-right' : ''} `}>
                                                <div className="chat-avatar">
                                                    <img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-29.jpg" className="rounded-full" alt="image" />
                                                </div>
                                                <div className="chat-content">
                                                    <div className="chat-info">
                                                        <div className="message-content">
                                                            {message?.content}
                                                            <div className="emoj-group">
                                                                <ul>
                                                                    <li className="emoj-action cursor-pointer"><a onClick={() => setemoji(!emoji)}><i className="ti ti-mood-smile"></i></a>
                                                                        <div className={`emoj-group-list ${emoji ? '' : 'hidden'} `}>
                                                                            <ul>
                                                                                <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-02.svg" alt="Icon" /></a></li>
                                                                                <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-05.svg" alt="Icon" /></a></li>
                                                                                <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-06.svg" alt="Icon" /></a></li>
                                                                                <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-07.svg" alt="Icon" /></a></li>
                                                                                <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-08.svg" alt="Icon" /></a></li>
                                                                                <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-03.svg" alt="Icon" /></a></li>
                                                                                <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-10.svg" alt="Icon" /></a></li>
                                                                                <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-09.svg" alt="Icon" /></a></li>
                                                                                <li className="add-emoj"><a ><i className="ti ti-plus"></i></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                    <li><a href="#"><i className="ti ti-arrow-forward-up"></i></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="chat-actions">
                                                            <a onClick={(e) => {
                                                                e.preventDefault()
                                                                setDots_(dots_ === index ? null : index)

                                                            }} className="inline-flex items-center" data-dropdown-toggle="chat-dropdown">
                                                                <i className="ti ti-dots-vertical"></i>
                                                            </a>

                                                            <ul id="chat-dropdown" ref={(el) => (dropdownRefs.current[index] = el)} className={`${dots_ === index ? '' : 'hidden'}  border-[#E5E7EB] text-sm p-4 border rounded bg-white shadow-lg z-[99]`} data-popper-placement="bottom" data-popper-reference-hidden="" data-popper-escaped="" style={{
                                                                position: 'absolute',
                                                                inset: '0px auto auto 0px',
                                                                margin: 0,
                                                                transform: 'translate(276px, 72px)',
                                                            }}>
                                                                <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-heart me-2"></i>Reply</a></li>
                                                                <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-pinned me-2"></i>Forward</a></li>
                                                                <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-file-export me-2"></i>Copy</a></li>
                                                                <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                                                                <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-trash me-2"></i>Delete</a></li>
                                                                <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-check me-2"></i>Mark as Unread</a></li>
                                                                <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                                                                <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-pinned me-2"></i>Pin Chat</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="chat-profile-name">
                                                        <h6>Anthony Lewis<i className="ti ti-circle-filled fs-7 mx-2"></i><span className="chat-time">{convertUTCToISTTime12Hour(message?.updated_at)}</span></h6>
                                                    </div>
                                                </div>
                                            </div>



                                        ))}
                                        <div ref={bottomRef}></div>
                                    </div>
                                </div><div className="slimScrollBar" style={{
                                    background: 'rgb(204, 204, 204)',
                                    width: '7px',
                                    position: 'absolute',
                                    top: '39px',
                                    opacity: 0.4,
                                    display: 'none',
                                    borderRadius: '7px',
                                    zIndex: 99,
                                    right: '1px',
                                    height: '64.4995px',
                                }}></div><div className="slimScrollRail" style={{
                                    width: '7px',
                                    height: '100%',
                                    position: 'absolute',
                                    top: '0px',
                                    display: 'none',
                                    borderRadius: '7px',
                                    background: 'rgb(51, 51, 51)',
                                    opacity: 0.2,
                                    zIndex: 90,
                                    right: '1px',
                                }}></div></div>
                            </div>
                            <div className="chat-footer">
                                <form className="footer-form">
                                    <div className="chat-footer-wrap">
                                        <div className="form-item">
                                            <a href="#" className="action-circle"><i className="ti ti-microphone"></i></a>
                                        </div>
                                        {selectedItems.map((item, index) => {
                                            const isEmoji = item?.type === "emoji";

                                            return isEmoji ? (
                                                // ✅ Render emoji directly as image without span wrapper
                                                <img
                                                    key={index}
                                                    src={item.src}
                                                    alt="emoji"
                                                    className="w-6 h-6 inline-block"
                                                />
                                            ) : (
                                                // ✅ Default rendering for other file types
                                                <span
                                                    key={index}
                                                    className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-sm bg-gray-100"
                                                >
                                                    {getFileIcon(item)}
                                                    <span>{item?.name || item?.label || "Unknown"}</span>
                                                </span>
                                            );
                                        })}



                                        <div className="form-wrap">
                                            <input type="text" value={content} onChange={(e) => setcontent(e.target.value)} className="form-control" placeholder="Type Your Message" onKeyDown={handleKeyDown} />
                                        </div>
                                        <div className="form-item emoj-action-foot">
                                            <a onClick={() => setsecemoji(!secemoji)} className="action-circle cursor-pointer"><i className="ti ti-mood-smile"></i></a>
                                            <div className={`emoj-group-list-foot down-emoji-circle ${secemoji ? '' : 'hidden'} `}>
                                                <ul className='flex items-center gap-2'>
                                                    {[
                                                        "emonji-02.svg",
                                                        "emonji-05.svg",
                                                        "emonji-06.svg",
                                                        "emonji-07.svg",
                                                        "emonji-08.svg",
                                                    ].map((emoji, i) => {
                                                        const fullUrl = `https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/${emoji}`;
                                                        return (
                                                            <li key={i}>
                                                                <a className='cursor-pointer'
                                                                    onClick={() =>
                                                                        setSelectedItems((prev) => [
                                                                            ...prev,
                                                                            { type: "emoji", src: fullUrl, label: `Emoji ${i + 1}` },
                                                                        ])
                                                                    }
                                                                >
                                                                    <img src={fullUrl} alt={`emoji-${i}`} />
                                                                </a>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>

                                            </div>
                                        </div>
                                        <div className="form-item relative flex items-center justify-center ">
                                            <a href="#" className="action-circle file-action absolute">
                                                <i className="ti ti-folder"></i>
                                            </a>
                                            <input type="file" className="open-file relative" name="files" onChange={handleFileChange}
                                                multiple id="files" />
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                ref={audioInputRef}
                                                onChange={handleFileChange}
                                                className="hidden"
                                                multiple
                                            />
                                            <input
                                                type="file"
                                                accept=".vcf"
                                                ref={contactInputRef}
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </div>
                                        <div className="form-item relative" ref={dropdownRef}>

                                            <a onClick={(e) => {
                                                e.preventDefault()
                                                setbottom_dots(!bottom_dots)
                                            }} className="inline-flex cursor-pointer items-center" data-dropdown-toggle="chat-dropdown17">
                                                <i className="ti ti-dots-vertical"></i>
                                            </a>
                                            <div id="chat-dropdown17" className={`${bottom_dots ? '' : 'hidden'} text-[#6b7280] p-4 border rounded bg-white shadow-lg z-[99]`} data-popper-placement="bottom" style={{
                                                position: 'absolute',
                                                inset: '0px auto auto 0px',
                                                margin: 0,
                                                transform: 'translate(-79px, -233px)',
                                            }}>
                                                <a onClick={handleCameraCapture} className="rounded cursor-pointer p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-camera-selfie me-2"></i>Camera</a>
                                                <a onClick={() => galleryInputRef.current.click()} className="rounded cursor-pointer p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-photo-up me-2"></i>Gallery</a>
                                                <a onClick={() => audioInputRef.current.click()} className="rounded cursor-pointer p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-music me-2"></i>Audio</a>
                                                <a onClick={handleLocationSend} className="rounded cursor-pointer p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-map-pin-share me-2"></i>Location</a>
                                                <a onClick={() => contactInputRef.current.click()} className="rounded cursor-pointer p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"><i className="ti ti-user-check me-2"></i>Contact</a>
                                            </div>
                                        </div>
                                        <div className="form-btn">
                                            <button onClick={handleSendMessage} className="btn btn-primary" type="submit">
                                                <i className="ti ti-send"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    )
}

export default Dashboard
{/* <div className="chats ">
                                                    <div className="chat-content">
                                                        <div className="chat-info">
                                                            <div className="chat-actions">
                                                                <a className="inline-flex items-center" data-dropdown-toggle="chat-dropdown3">
                                                                    <i className="ti ti-dots-vertical"></i>
                                                                </a>
                                                                <ul id="chat-dropdown3" className="hidden p-4 border rounded bg-white shadow-lg z-[99]" data-popper-placement="bottom" style={{
                                                                    position: 'absolute',
                                                                    inset: '0px auto auto 0px',
                                                                    margin: 0,
                                                                    transform: 'translate(869px, 184px)',
                                                                }}>
                                                                    <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-heart me-2"></i>Reply</a></li>
                                                                    <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-pinned me-2"></i>Forward</a></li>
                                                                    <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-file-export me-2"></i>Copy</a></li>
                                                                    <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                                                                    <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-trash me-2"></i>Delete</a></li>
                                                                    <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-check me-2"></i>Mark as Unread</a></li>
                                                                    <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                                                                    <li><a className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900" href="#"><i className="ti ti-pinned me-2"></i>Pin Chat</a></li>
                                                                </ul>
                                                            </div>
                                                            <div className="message-content">
                                                                Sure, Sarah. What’s the new policy?
                                                                <div className="emoj-group">
                                                                    <ul>
                                                                        <li className="emoj-action"><a ><i className="ti ti-mood-smile"></i></a>
                                                                            <div className="emoj-group-list hidden">
                                                                                <ul>
                                                                                    <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-02.svg" alt="Icon" /></a></li>
                                                                                    <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-05.svg" alt="Icon" /></a></li>
                                                                                    <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-06.svg" alt="Icon" /></a></li>
                                                                                    <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-07.svg" alt="Icon" /></a></li>
                                                                                    <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-08.svg" alt="Icon" /></a></li>
                                                                                    <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-03.svg" alt="Icon" /></a></li>
                                                                                    <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-10.svg" alt="Icon" /></a></li>
                                                                                    <li><a ><img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/icons/emonji-09.svg" alt="Icon" /></a></li>
                                                                                    <li className="add-emoj"><a ><i className="ti ti-plus"></i></a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                        <li><a href="#"><i className="ti ti-arrow-forward-up"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="chat-profile-name text-end flex justify-end ">
                                                            <h6 className='flex justify-end flex-row-reverse'>You<i className="ti ti-circle-filled fs-7 mx-2"></i><span className="chat-time">08:00 AM</span><span className="msg-read success"><i className="ti ti-checks mx-2"></i></span></h6>
                                                        </div>
                                                    </div>
                                                    <div className="chat-avatar ms-2 me-0 px-0" style={{ paddingRight: '0px' }}>
                                                        <img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-14.jpg" className="rounded-full dreams_chat" alt="image" />
                                                    </div>
                                                </div> */}