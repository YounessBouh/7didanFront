import React ,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import './DashboardHome.css'

function DashboardHome() {
    const { loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className='dashboardHome'>
        {loggedIn===false && navigate("/")}
         <p onClick={() =>navigate('/CategoryList')} >Categories</p>
         <p onClick={() =>navigate('/CitiesList')} >Cities</p>
         <p onClick={() =>navigate('/ZonesList')} >Zones</p>
         <p onClick={() =>navigate('/ProfilesList')} >Active Profiles</p>
         <p onClick={() =>navigate('/NotActiveProfiles')} >Non Active Profile</p>
         <p onClick={() =>navigate('/MakeBackup')} >Backup</p>
         <p onClick={() =>navigate('/Admins')} >Admins</p>
            
        </div>
    )
}

export default DashboardHome
