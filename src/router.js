import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTER } from './utils/router';
import Home from './pages/user/home/home';
import Rooms from './pages/user/rooms/rooms';
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
import Login from './pages/auth/login';
import { AlertProvider } from './context/AlertMessage';

const RenderRouter = () => {
    const routersUser = [
        {
            path: ROUTER.HOME,
            component: <Home />
        },
        {
            path: ROUTER.ROOMS,
            component: <Rooms />
        },
        {
            path: ROUTER.ABOUT,
            component: <About />
        },
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