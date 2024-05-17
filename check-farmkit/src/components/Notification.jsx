import React, { useEffect, useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const userEmail = localStorage.getItem("email");

    useEffect(() => {
        // Fetch notifications for the logged-in user
        fetch(`http://localhost:8000/api/notifications?email=${userEmail}`)
            .then((response) => response.json())
            .then((data) => setNotifications(data))
            .catch((error) => console.error("Error fetching notifications:", error));
    }, [userEmail]);

    // Function to format the timestamp to dd/mm/yy format
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear().toString().slice(2);
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="bg-gray-100 p-4 w-[500px] h-[660px] shadow-md overflow-y-auto">
            <div className="max-h-full">
                {notifications.length === 0 ? (
                    <p className="text-center text-gray-500">No notifications</p>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-center bg-white shadow-lg mb-2 p-4 rounded-lg"
                        >
                            <div
                                className={`flex-shrink-0 w-10 h-10 rounded-full ${notification.status === 0
                                    ? "bg-red-500"
                                    : "bg-green-500"
                                    } flex justify-center items-center`}
                            >
                                {notification.status === 0 ? (
                                    <RiCloseLine className="text-white text-2xl" />
                                ) : (
                                    <RiCheckLine className="text-white text-2xl" />
                                )}
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-semibold">{notification.message}</p>
                                <p className="text-xs text-gray-600">{formatDate(notification.timestamp)}</p> {/* Display formatted timestamp */}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Notification;
