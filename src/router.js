import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTER } from './utils/router';
import Home from './pages/user/home/home';
import ListRoom from './pages/user/rooms/listRoom';
import About from './pages/user/about/about';
import LayoutAdmin from './components/admin/layout/layoutAdmin';
import LayoutUser from './components/user/layout/layoutUser';
import Dashboard from './pages/admin/dashboard';
import NewBooked from './pages/admin/bookings/newBooked';
import ProfileBookings from './pages/admin/bookings/profileBookings';
import Rooms from './pages/admin/rooms';
import Guests from './pages/admin/guests';
import Report from './pages/admin/report';
import PaymentConfirm from './pages/admin/bookings/paymentConfirm';
import InfoCustomer from './pages/user/rooms/infoCustomer';
import PaymentCutomer from './pages/user/rooms/paymentCustomer';
import Login from './pages/auth/login';
import { AlertProvider } from './context/AlertMessage';
import BookingRoom from './pages/user/rooms/bookingRoom';
import AdminRoute from './pages/admin/AdminRoute';
import HistoryBooking from './pages/user/account/historyBooking';
import DetailBooking from './pages/user/rooms/detailBooking';

const RenderRouter = () => {
    const routersUser = [
        {
            path: ROUTER.HOME,
            component: <Home />
        },
        {
            path: ROUTER.LISTROOM,
            component: <ListRoom />
        },
        {
            path: ROUTER.BOOKINGROOM,
            component: <BookingRoom />
        },
        {
            path: ROUTER.ABOUT,
            component: <About />
        },
        {
            path: ROUTER.INFOCUSTOMER,
            component: <InfoCustomer />
        },
        {
            path: ROUTER.PAYMENTCUSTOMER,
            component: <PaymentCutomer />
        },
        {
            path: ROUTER.HISTORYBOOKING,
            component: <HistoryBooking />
        },
        {
            path: ROUTER.DETAILBOOKING,
            component: <DetailBooking />
        }
    ]
    const routersAdmin = [

        {
            path: ROUTER.ADMIN,
            component: <LayoutAdmin />
        },
        {
            path: ROUTER.DASHBOARD,
            component: <Dashboard />
        },
        {
            path: ROUTER.NEWBOOKED,
            component: <NewBooked />
        },
        {
            path: ROUTER.PAYMENTCONFIRM,
            component: <PaymentConfirm />
        },
        {
            path: ROUTER.PROFILEBOOKINGS,
            component: <ProfileBookings />
        },
        {
            path: ROUTER.ROOMS,
            component: <Rooms />
        },
        {
            path: ROUTER.GUESTS,
            component: <Guests />
        },
        {
            path: ROUTER.REPORT,
            component: <Report />
        }
    ]
    return (
        <>
            <AlertProvider>
                <Routes>
                    <Route path={ROUTER.LOGIN} element={<Login />} />
                    <Route
                        path="*"
                        element={
                            <LayoutUser>
                                <Routes>
                                    {
                                        routersUser.map((router, index) => {
                                            return (
                                                <Route
                                                    key={index}
                                                    path={router.path}
                                                    element={router.component}
                                                />
                                            )
                                        })
                                    }
                                </Routes>
                            </LayoutUser>
                        }
                    />
                    <Route
                        path="/admin-home/*"
                        element={
                            <AdminRoute>
                                <LayoutAdmin>
                                    <Routes>
                                        {
                                            routersAdmin.map((router, index) => {
                                                return (
                                                    <Route
                                                        key={index}
                                                        path={router.path}
                                                        element={router.component}
                                                    />
                                                )
                                            })
                                        }
                                    </Routes>
                                </LayoutAdmin>
                            </AdminRoute>
                        }
                    />
                </Routes>
            </AlertProvider>
        </>
    )
}

const RouterCustom = () => {
    return (
        <RenderRouter />
    )
}

export default RouterCustom;