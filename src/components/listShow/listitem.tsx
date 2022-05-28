import './style.scss';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../features/orders/orderSlice';
import { openForm } from '../../features/orderForm/orderFormSlice';
import { openSnackbar } from '../../features/snackbar/snackbarSlice';

function ListItem(props: any) {
  const dispatch = useDispatch();

  const deleteOrder = () => {
    dispatch(deleteItem({ id: props.id }));
    dispatch(openSnackbar({ msg: 'Order deleted successfully!', severity: 'success' }));
  };

  const editOrder = () => {
    dispatch(openForm({ type: 'edit-order', formData: props }));
  };

  return (
    <div className="list-item">
      <div className="product-id">{props.id}</div>
      <div className="customer-name">{props.customer_name}</div>
      <div className="customer-email">{props.customer_email}</div>
      <div className="product-type">{props.product}</div>
      <div className="quantity">{props.quantity}</div>
      <div className="icons">
        <IconButton color="primary" aria-label="Edit order" component="span" onClick={editOrder}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" aria-label="Edit order" component="span" onClick={deleteOrder}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ListItem;
