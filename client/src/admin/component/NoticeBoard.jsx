import React, { useState, useEffect } from 'react';
import LoadingSpinner from './Spinner';
import './noticeboard.css';

function NoticeBoard() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // Fetch notices from an API or database
        // For demonstration, we'll use static data
        setLoading(true);

        setTimeout(() => {
            setNotices([
                // { id: 1, title: 'School Reopening', date: '2023-09-01' },
                // { id: 2, title: 'Parent-Teacher Meeting', date: '2023-09-15' },
                // { id: 3, title: 'Annual Sports Day', date: '2023-10-05' },
            ]);
            setLoading(false);
        }, 5000);
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <>

            <div className=" notice-container my-3">
                <h5 className="my-3 ms-3">Notice Board</h5>
                <div className="notice_body">
                    {notices.length === 0 ? (
                        <div className="container text-center p-3">
                            <p>Nothing here yet. Once data is available it will show up right here .</p>

                            <a href="" className='btn btn-primary addnoticebtn'>Add Notice</a>
                        </div>
                    ) : (
                        <ul>
                            {notices.map((notice) => (
                                <li key={notice.id}>
                                    {notice.title} - {notice.date}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default NoticeBoard;
