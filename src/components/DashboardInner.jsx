'use client'
import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashboardInner = () => {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const fetchUserName = async () => {
            const email = localStorage.getItem('userEmail');
            if (!email) return;
            try {
                const response = await fetch(`/api/user?email=${email}`);
                if (!response.ok) return;
                const data = await response.json();
                setUserName((data.first_name || "") + (data.last_name ? " " + data.last_name : ""));
            } catch (e) {
                // fallback: use email prefix
                setUserName(email.split('@')[0]);
            }
        };
        fetchUserName();
    }, []);

    let series = [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
    }]
    let options = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    }
    return (
        <div className="dashboard-body__content">
            {/* welcome balance Content Start */}
            <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
                <div className="welcome-balance__left">
                    <h4 className="welcome-balance__title mb-0">Welcome{userName ? `, ${userName}` : ""}!</h4>
                </div>
            </div>
            {/* welcome balance Content End */}
        </div>
    );
}

export default DashboardInner;