import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PartnerRoutes from './Component/Routes/PartnerRoutes.jsx';
import LoginScreen from './Screen/LoginScreen.jsx';
import store from './store';
import DashboardScreen from './Screen/DashboardScreen.jsx';
import FrenchiseRoutes from './Component/Routes/FrenchiseRoutes.jsx';
import FrenchiseDashboard from './Screen/Frenchise/FrenchiseDashboard.jsx';
import PartnerUniversityScreen from './Screen/Partner/PartnerUniversityScreen.jsx';
import PartnerCountryScreen from './Screen/Partner/PartnerCountryScreen.jsx';
import PartnerCourseScreen from './Screen/Partner/PartnerCourseScreen.jsx';
import PartnerAddUserScreen from './Screen/Partner/PartnerAddUserScreen.jsx';
import PartnerViewUserScreen from './Screen/Partner/PartnerViewUserScreen.jsx';
import RedirectAfterLogin from './Component/Routes/RedirectAfterLogin.jsx';
import NotificationScreen from './Screen/NotificationScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<LoginScreen />} />
      <Route path='/redirect' element={<RedirectAfterLogin />} />

      <Route element={<PartnerRoutes />}>
        <Route path= '/partner/dashboard' element={<DashboardScreen/>} />
        <Route path= '/partner/university' element={<PartnerUniversityScreen/>} />
        <Route path = '/partner/country' element = {< PartnerCountryScreen/>} />
        <Route path = '/partner/course' element = {< PartnerCourseScreen/>} />
        <Route path = '/partner/addUser' element = {< PartnerAddUserScreen/>} />
        <Route path = '/partner/viewUser' element = {< PartnerViewUserScreen/>} />
        <Route path = '/partner/notification' element= {<NotificationScreen />} />
      </Route>
      <Route element={<FrenchiseRoutes />}>
        <Route path= '/frenchise/dashboard' element={<DashboardScreen/>} />
        <Route path= '/frenchise/university' element={<PartnerUniversityScreen/>} />
        <Route path = '/frenchise/country' element = {< PartnerCountryScreen/>} />
        <Route path = '/frenchise/course' element = {< PartnerCourseScreen/>} />
        <Route path = '/frenchise/addUser' element = {< PartnerAddUserScreen/>} />
        <Route path = '/frenchise/viewUser' element = {< PartnerViewUserScreen/>} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
)
