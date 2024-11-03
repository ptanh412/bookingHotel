import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AlertContext } from "../../context/AlertMessage";
const AdminRoute = ({ children }) => {
    const { showAlert } = useContext(AlertContext);
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role == 'customer') {
        showAlert('Can not access', 'error');
        return <Navigate to="/" />
    }
    return children;
}
export default AdminRoute;