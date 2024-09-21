import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DashboardScreen = () => {
    const websiteMetricsData = [
        { month: 'Jan', sessions: 3000, newUsers: 1500, pageViews: 2000 },
        { month: 'Feb', sessions: 4000, newUsers: 2500, pageViews: 3000 },
        { month: 'Mar', sessions: 5000, newUsers: 3500, pageViews: 4000 },
        { month: 'Apr', sessions: 2000, newUsers: 1200, pageViews: 1500 },
        { month: 'May', sessions: 1500, newUsers: 800, pageViews: 1000 },
    ];

    const topSellersData = [
        { country: 'United States', flag: '🇺🇸', revenue: '$911,200', vsLastMonth: '+60%', goalReached: 25 },
        { country: 'Austria', flag: '🇦🇹', revenue: '$821,600', vsLastMonth: '-40%', goalReached: 50 },
        { country: 'France', flag: '🇫🇷', revenue: '$323,700', vsLastMonth: '+40%', goalReached: 10 },
        { country: 'Germany', flag: '🇩🇪', revenue: '$833,205', vsLastMonth: '-80%', goalReached: 70 },
        { country: 'United Arab Emirates', flag: '🇦🇪', revenue: '$232,243', vsLastMonth: '+80%', goalReached: 0 },
    ];

    const overallRating = {
        rating: 4.3,
        totalReviews: 186,
        stars: {
            5: 80,
            4: 45,
            3: 30,
            2: 8,
            1: 1
        },
        category: {
            workManagement: 4.3,
            salaryCulture: 3.5
        }
    };

    return (
        <div className="dashboard bg-gray-100 p-8">
            {/* Header */}
            <div className="header text-2xl font-bold mb-4">
                <h1>Hi, welcome back!</h1>
                <p className="text-sm text-gray-500">April 1, 2019</p>
            </div>

            {/* Cards Container */}
            <div className="dashboard-cards grid grid-cols-3 gap-6">
                {/* Customer Card */}
                <div className="card bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-semibold">Customers</h3>
                    <p className="text-sm text-gray-500">23% increase in conversion</p>
                    <h2 className="text-4xl font-bold mt-2">43,981</h2>
                </div>

                {/* Orders Card */}
                <div className="card bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-semibold">Orders</h3>
                    <p className="text-sm text-gray-500">6% decrease in earnings</p>
                    <h2 className="text-4xl font-bold mt-2">55,543</h2>
                </div>

                {/* Website Audience Metrics Card with Chart */}
                <div className="card bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Website Audience Metrics</h3>
                    <BarChart width={300} height={250} data={websiteMetricsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sessions" fill="#8884d8" />
                        <Bar dataKey="newUsers" fill="#82ca9d" />
                        <Bar dataKey="pageViews" fill="#ffc658" />
                    </BarChart>
                </div>

                {/* Market Trends Card */}
                <div className="card bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-semibold">Market Trends</h3>
                    <p className="text-sm text-gray-500">Total Income: $83,320</p>
                    <p className="text-sm text-gray-500">Total Expenses: $32,370</p>
                </div>

                {/* Traffic Sources Card */}
                <div className="card bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-semibold">Traffic Sources</h3>
                    <p className="text-sm text-gray-500">4453 Leads</p>
                    <div className="traffic-bar mt-4">
                        <div className="bg-red-500 w-1/3 h-2 inline-block"></div>
                        <div className="bg-blue-500 w-1/4 h-2 inline-block"></div>
                        <div className="bg-green-500 w-1/5 h-2 inline-block"></div>
                        {/* Add other bars */}
                    </div>
                </div>

                {/* Recent Activity Card */}
                <div className="card bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-semibold">Recent Activity</h3>
                    <p className="text-sm text-gray-500">Deposit has updated to Paid: $325</p>
                    <p className="text-sm text-gray-500">Your Withdrawal Proceeded: $4987</p>
                </div>
            </div>

            {/* Top Sellers Table */}
            <div className="top-sellers bg-white p-6 mt-6 rounded shadow-md">
                <h3 className="text-xl font-semibold mb-2">Top Sellers</h3>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Country</th>
                            <th className="px-4 py-2">Revenue</th>
                            <th className="px-4 py-2">Vs Last Month</th>
                            <th className="px-4 py-2">Goal Reached</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topSellersData.map((seller, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{seller.flag} {seller.country}</td>
                                <td className="px-4 py-2">{seller.revenue}</td>
                                <td className="px-4 py-2">
                                    <span className={seller.vsLastMonth.includes('+') ? 'text-green-500' : 'text-red-500'}>
                                        {seller.vsLastMonth}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="relative w-full bg-gray-200 h-4 rounded">
                                        <div
                                            className="absolute top-0 left-0 h-4 bg-blue-500 rounded"
                                            style={{ width: `${seller.goalReached}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm">{seller.goalReached}%</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Overall Rating Section */}
            <div className="overall-rating bg-white p-6 mt-6 rounded shadow-md">
                <h3 className="text-xl font-semibold">Overall Rating</h3>
                <p className="text-lg">{overallRating.rating} ★</p>
                <p className="text-sm text-gray-500">Based on {overallRating.totalReviews} reviews</p>
                <div className="rating-breakdown">
                    {Object.keys(overallRating.stars).map((star, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <span className="mr-2">{star}★</span>
                            <div className="relative w-full bg-gray-200 h-4 rounded">
                                <div
                                    className="absolute top-0 left-0 h-4 bg-yellow-500 rounded"
                                    style={{ width: `${overallRating.stars[star]}%` }}
                                ></div>
                            </div>
                            <span className="text-sm ml-2">{overallRating.stars[star]}%</span>
                        </div>
                    ))}
                </div>
                <div className="rating-category mt-4">
                    <p className="text-sm">4.3 ★ Work/Management</p>
                    <p className="text-sm">3.5 ★ Salary/Culture</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;
