import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetMyItemsMutation } from '../../slices/adminApiSlice';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

export default function PartnerPromotionalDetailedScreen() {
    const { id } = useParams();
    const [GetMyItems] = useGetMyItemsMutation();
    const [getItem, setGetItem] = useState([]);
    const [activeTab, setActiveTab] = useState('TEMPLATE');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetMyItems(id).unwrap();
                setGetItem(result);
            } catch (error) {
                toast.error('Something went wrong while fetching the items.');
            }
        };
        fetchData();
    }, [GetMyItems, id]);

    const templates = getItem.filter(item => item.type === "TEMPLATE");
    const brochures = getItem.filter(item => item.type === "BROUCHER");

    return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-gray-700 text-center">Partner Promotional Detailed Screen</h2>

            {/* Tabs */}
            <div className="flex justify-center space-x-4 mb-10">
                {['TEMPLATE', 'BROUCHER'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 
                            ${activeTab === tab 
                                ? 'bg-blue-100 text-blue-700 shadow-md' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'TEMPLATE' ? 'Templates' : 'Brochures'}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {(activeTab === 'TEMPLATE' ? templates : brochures).map((item) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white shadow-lg rounded-xl overflow-hidden p-6 transition transform hover:shadow-xl"
                    >
                        <h4 className="font-semibold text-lg mb-2 text-gray-700">{item.name}</h4>
                        {item.type === 'TEMPLATE' && (
                            <img 
                                src={item.template} 
                                alt={item.name} 
                                className="w-full h-48 object-cover rounded-lg mb-4 transition-all duration-300 hover:scale-105"
                            />
                        )}
                        <a 
                            href={item.type === 'TEMPLATE' ? item.template : item.broucher} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            download 
                            className="block bg-blue-500 text-white text-center px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300"
                        >
                            {item.type === 'TEMPLATE' ? 'Download Template' : 'Download PDF'}
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
