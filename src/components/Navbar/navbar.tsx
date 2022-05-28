/* eslint-disable camelcase */
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import GoogleLogoutComp from '../Google/googleLogout';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { openForm } from '../../features/orderForm/orderFormSlice';
import './navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((store: any) => store.auth);

  return (
    <AppBar position="static" style={{ background: '#38aac1' }}>
      <div className="navbar">
        <div className="profile-section">
          <Avatar alt={user.name} src={user.profilePicture} />
          <p>{user.name}</p>
        </div>
        <div className="btn-section">
          <Button
            style={{
              backgroundColor: '#84b786',
              textTransform: 'none',
              fontSize: '1.8vh',
              color: 'white',
              borderRadius: '5px',
              boxShadow: 'none',
            }}
            variant="contained"
            type="submit"
            onClick={() => {
              dispatch(
                openForm({
                  type: 'new-order',
                  formData: {
                    id: 1,
                    customer_name: '',
                    customer_email: '',
                    product: 'Product 1',
                    quantity: 1,
                  },
                })
              );
            }}
          >
            Create new order
          </Button>
          <GoogleLogoutComp />
        </div>
      </div>
    </AppBar>
  );
};
export default Navbar;
