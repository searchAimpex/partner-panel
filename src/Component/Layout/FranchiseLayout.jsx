// Import React and other necessary components
import React, { useEffect, useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaCube,
  FaChartBar,
  FaTable,
  FaIcons,
  FaUser,
  FaSearch,
  FaBell,
  FaCog,
  FaUserCircle,
} from 'react-icons/fa';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { motion } from 'framer-motion';
import Logo from '../../assets/SearchMyStudyLog.png';
import Placeholder from '../../assets/Placeholder.png';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const menuItems = [
  { icon: FaCube, label: 'Dashboard', link: '/frenchise/dashboard' },
  { icon: FaIcons, label: 'University', link: '/frenchise/university' },
  { icon: FaChartBar, label: 'Country', link: '/frenchise/country' },
  { icon: FaTable, label: 'Course', link: '/frenchise/course' },
  {
    icon: FaUser,
    label: 'User Pages',
    hasSubmenu: true,
    submenu: [
      { label: 'Add User', link: '/frenchise/addUser' },
      { label: 'View User', link: '/frenchise/viewUser' },
    ],
  },
];

export default function FranchiseLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredItems, setFilteredItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path
  const [logoutApiCall, { isSuccess }] = useLogoutMutation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(()=>{
    if(isSuccess){
      toast.success("Logout success!")
      navigate('/')
    }
  },[isSuccess])

  const toggleSubmenu = (index, event) => {
    event.preventDefault();
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (err) {
        console.log("Error",err)
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim()) {
      const filtered = menuItems
        .flatMap((item) =>
          item.hasSubmenu
            ? item.submenu.map((sub) => ({ ...sub, parentLabel: item.label }))
            : [item]
        )
        .filter(
          (item) =>
            item.label.toLowerCase().includes(value) ||
            (item.parentLabel && item.parentLabel.toLowerCase().includes(value))
        );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg text-gray-700 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6">
          <img
            className={`h-[60px] object-contain w-full ${
              isCollapsed ? 'hidden' : 'block'
            }`}
            src={Logo}
            alt="Logo"
          />
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
          >
            {isCollapsed ? (
              <FaChevronRight size={20} className="text-gray-600" />
            ) : (
              <FaChevronLeft size={16} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* User Profile */}
        <div className="flex flex-col items-center mt-8 mb-8">
          <img
            src={Placeholder}
            alt="User"
            className="w-12 h-12 rounded-full mb-2"
          />
          <span className={`font-medium text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>
            {userInfo?.name}
          </span>
          <span className={`text-sm text-gray-500 ${isCollapsed ? 'hidden' : 'block'}`}>
             {userInfo?.role.toUpperCase()}
          </span>
        </div>

        {/* Menu Items */}
        <nav>
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.link); // Check if the menu item is active
            return (
              <div key={index}>
                <div
                  onClick={(event) => {
                    if (item.hasSubmenu) {
                      toggleSubmenu(index, event);
                    } else {
                      navigate(item.link);
                    }
                  }}
                  className={`flex items-center py-3 px-4 border-b ${
                    isActive
                      ? 'bg-blue-100 text-blue-600' // Apply active styles
                      : 'hover:bg-gray-100'
                  } ${isCollapsed ? 'justify-center' : ''} cursor-pointer`}
                >
                  <item.icon
                    size={20}
                    className={`${
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    } ${isCollapsed ? 'text-center' : 'mr-4'}`} // Change icon color if active
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                  {item.hasSubmenu && !isCollapsed && (
                    <FaChevronRight
                      size={12}
                      className={`ml-auto transition-transform duration-200 ${
                        openSubmenuIndex === index ? 'rotate-90' : ''
                      }`}
                    />
                  )}
                </div>

                {/* Submenu */}
                {item.hasSubmenu &&
                  openSubmenuIndex === index &&
                  !isCollapsed && (
                    <div className="pl-8 bg-gray-50">
                      {item.submenu.map((submenuItem, submenuIndex) => (
                        <Link
                          key={submenuIndex}
                          to={submenuItem.link}
                          className="block py-2 text-sm text-gray-600 hover:bg-gray-100"
                        >
                          {submenuItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="relative w-full max-w-xs">
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <FaSearch size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search Pages..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="bg-gray-100 text-gray-700 ml-2 w-full focus:outline-none"
                />
              </div>

              {/* Suggestions Dropdown */}
              {filteredItems.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute mt-2 bg-white shadow-lg rounded-lg z-10 w-full border border-gray-200"
                >
                  {filteredItems.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => navigate(item.link)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                      {item.parentLabel && (
                        <span className="text-xs text-gray-400">
                          {item.parentLabel} {' '}
                        </span>
                      )}
                      {item.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>

            <div className="flex items-center space-x-8 mr-10">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                + Create New
              </button>
              <FaBell size={20} className="text-gray-500" />
              <FaCog size={20} className="text-gray-500" />
              <div className="relative">
                <FaUserCircle
                  size={24}
                  className="text-gray-500 transition-opacity duration-300 cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-48">
                    <button
                      onClick={logoutHandler}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Outlet */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
