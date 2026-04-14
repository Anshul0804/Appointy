import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [dashData, setDashData] = useState(false);

    // ✅ Get All Doctors
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/admin/all-doctors',
                { headers: { token: aToken } }   // 🔥 FIX
            );

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ Change Availability
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/change-availability',
                { docId },
                { headers: { token: aToken } }   // 🔥 FIX
            );

            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // ✅ Get All Appointments
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/admin/appointments',
                { headers: { token: aToken } }   // 🔥 FIX
            );

            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    // ✅ Cancel Appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/cancel-appointment',
                { appointmentId },
                { headers: { token: aToken } }   // 🔥 FIX
            );

            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    // ✅ Dashboard Data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/admin/dashboard',
                { headers: { token: aToken } }   // 🔥 FIX
            );

            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const value = {
        aToken, setAToken,
        backendUrl,
        doctors, getAllDoctors, changeAvailability,
        appointments, setAppointments, getAllAppointments, cancelAppointment,
        getDashData, dashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;