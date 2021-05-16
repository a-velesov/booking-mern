import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import TopNav from './components/TopNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';
import EditHotel from './hotels/EditHotel';


function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="bottom-right" />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <PrivateRoute exact path="/dashboard" component={ Dashboard } />
        <PrivateRoute exact path="/dashboard/seller" component={ DashboardSeller } />
        <PrivateRoute exact path="/hotels/new" component={ NewHotel } />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={ EditHotel } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
