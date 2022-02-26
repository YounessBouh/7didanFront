import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Categories from './categories/List/Categories'
import Cities from './Cities/CitiesList/Cities'
import Profiles from './profiles/ProfilesList/Profiles'
import Zones from './zones/zoneList/Zones'
import SingleProfile from './profiles/SingleProfile.js/SingleProfile'
import Registration from './registration/Registration'
import CategoryList from './categories/Dashboard/CategoryList/CategoryList'
import CreateCategory from './categories/Dashboard/CreateCategory/CreateCategory'
import DeleteCategory from './categories/Dashboard/DeleteCategory/DeleteCategory'
import UpdateCategory from './categories/Dashboard/UpdateCategory/UpdateCategory'
import CitiesList from './Cities/Dashboard/CitiesList/CitiesList'
import CreateCity from './Cities/Dashboard/CreateCity/CreateCity'
import DeleteCity from './Cities/Dashboard/DeleteCity/DeleteCity'
import UpdateCity from './Cities/Dashboard/UpdateCity/UpdateCity'
import ZonesList from './zones/Dashboard/zonesList/ZonesList'
import CreateZone from './zones/Dashboard/CreateZone/CreateZone'
import DeleteZone from './zones/Dashboard/DeleteZone/DeleteZone'
import UpdateZone from './zones/Dashboard/UpdateZone/UpdateZone'
import CreateProfile from './profiles/Dashboard/CreateProfile/CreateProfile'
import DeleteProfile from './profiles/Dashboard/DeleteProfile/DeleteProfile'
import UpdateProfile from './profiles/Dashboard/UpdateProfile/UpdateProfile'
import ProfilesList from './profiles/Dashboard/ProfilesList/ProfilesList'
import Login from './login/Login'
import NotActiveProfiles from './profiles/Dashboard/NotActiveProfiles/NotActiveProfiles'
import DashboardHome from './dashboardHome/DashboardHome'
import UpdateNotActiveProfile from './profiles/Dashboard/NotActiveProfiles/UpdateNotActiveProfile'
import MakeBackup from './MakeBackup/MakeBackup'
import Admins from './admins/getAdmins/Admins'
import DeleteAdmin from './admins/deleteAdmin/DeleteAdmin'
import UpdateAdmin from './admins/updateAdmin/UpdateAdmin'
import Generation from '../components/util/Generation'
import NotPaidProfiles from '../components/profiles/Dashboard/NotPaidProfiles/NotPaidProfiles'
import Contact from './util/contact/Contact'



const Pages=()=> {
    return (
        <Routes>
          
          <Route  path='/' exact element={<Categories />} />
          <Route  path='/Cities' exact element={<Cities />} />
          <Route  path='/Profiles' exact element={<Profiles />} />
          <Route  path='/Zones' exact element={<Zones />} />
          <Route  path='/SingleProfile' exact element={<SingleProfile />} />
          <Route  path='/Registration' exact element={<Registration />} />
          <Route  path='/Login' exact element={<Login />} />

          <Route  path='/CategoryList' exact element={<CategoryList />} />
          <Route  path='/CreateCategory' exact element={<CreateCategory />} />
          <Route  path='/DeleteCategory' exact element={<DeleteCategory />} />
          <Route  path='/UpdateCategory' exact element={<UpdateCategory />} />

          <Route  path='/CitiesList' exact element={<CitiesList />} />
          <Route  path='/CreateCity' exact element={<CreateCity />} />
          <Route  path='/DeleteCity' exact element={<DeleteCity />} />
          <Route  path='/UpdateCity' exact element={<UpdateCity />} />

          <Route  path='/ZonesList' exact element={<ZonesList />} />
          <Route  path='/CreateZone' exact element={<CreateZone />} />
          <Route  path='/DeleteZone' exact element={<DeleteZone />} />
          <Route  path='/UpdateZone' exact element={<UpdateZone />} />

          <Route  path='/ProfilesList' exact element={<ProfilesList />} />
          <Route  path='/CreateProfile' exact element={<CreateProfile />} />
          <Route  path='/DeleteProfile' exact element={<DeleteProfile />} />
          <Route  path='/UpdateProfile' exact element={<UpdateProfile />} />
          <Route  path='/NotActiveProfiles' exact element={<NotActiveProfiles />} />
         
          <Route  path='/NotPaidProfiles' exact element={<NotPaidProfiles />} />

          <Route  path='/DashboardHome' exact element={<DashboardHome />} />
          <Route  path='/UpdateNotActiveProfile' exact element={<UpdateNotActiveProfile />} />

          <Route  path='/MakeBackup' exact element={<MakeBackup />} />
          <Route  path='/Generation' exact element={<Generation />} />
          <Route  path='/Contact' exact element={<Contact />} />

          <Route  path='/Admins' exact element={<Admins />} />
          <Route  path='/DeleteAdmin' exact element={<DeleteAdmin />} />
          <Route  path='/UpdateAdmin' exact element={<UpdateAdmin />} />

          

          


          

       </Routes>
    )
}

export default Pages
