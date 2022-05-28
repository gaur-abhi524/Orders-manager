/* eslint-disable camelcase */
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem } from '../../features/orders/orderSlice';
import { openSnackbar } from '../../features/snackbar/snackbarSlice';
import { closeForm } from '../../features/orderForm/orderFormSlice';
import './style.scss';

function OrderForm() {
  const orderForm = useSelector((store: any) => store.orderForm);
  const [values, setValues] = React.useState({
    id: orderForm.formData.id,
    customer_name: orderForm.formData.customer_name,
    customer_email: orderForm.formData.customer_email,
    product: orderForm.formData.product,
    quantity: orderForm.formData.quantity,
  });

  React.useEffect(() => {
    setValues({
      id: orderForm.formData.id,
      customer_name: orderForm.formData.customer_name,
      customer_email: orderForm.formData.customer_email,
      product: orderForm.formData.product,
      quantity: orderForm.formData.quantity,
    });
  }, [orderForm]);

  const handleClose = () => {
    dispatch(closeForm());
  };
  const orders = useSelector((store: any) => store.order);
  const dispatch = useDispatch();

  const validateEmail = async (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (prop: any) => (event: any) => {
    if (prop === 'quantity') {
      if (event.target.value < 1) {
        dispatch(
          openSnackbar({ msg: 'Quantity value cannot be less than 1!', severity: 'warning' })
        );
        event.target.value = 1;
        return;
      }
    }
    setValues({ ...values, [prop]: event.target.value });
  };
  const productTypes = [
    { value: 'Product 1', label: 'Type 1' },
    { value: 'Product 2', label: 'Type 2' },
    { value: 'Product 3', label: 'Type 3' },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let isUnique = false;
    if (orderForm.type === 'new-order')
      while (!isUnique) {
        const val = orders.find((order: any) => order.id === values.id);
        if (val != null) {
          values.id += Math.floor(Math.random() * 100 + 1);
        } else {
          isUnique = true;
        }
      }
    console.log(values);
    const test = await validateEmail(values.customer_email);

    if (!test) {
      dispatch(openSnackbar({ msg: 'Invalid email entered', severity: 'error' }));
      return;
    }
    dispatch(orderForm.type === 'new-order' ? addItem(values) : editItem(values));
    dispatch(
      openSnackbar({
        msg: orderForm.type === 'new-order' ? 'order added successfully' : 'order edited',
        severity: 'success',
      })
    );
    handleClose();
  };

  return (
    <div className="order-form">
      <Dialog open={orderForm.open} onClose={handleClose} className="dialog-box" maxWidth="sm">
        <DialogTitle>
          {orderForm.type === 'new-order' ? 'Create New Order' : `Edit order`}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="standard-required"
              label="Customer Name"
              variant="standard"
              className="text-field"
              value={values.customer_name}
              onChange={handleChange('customer_name')}
            />
            <TextField
              label="Customer email"
              fullWidth
              required
              variant="standard"
              type="email"
              className="text-field"
              value={values.customer_email}
              onChange={handleChange('customer_email')}
              margin="none"
            />
            <TextField
              select
              required
              fullWidth
              label="Product type"
              className="text-field"
              value={values.product}
              onChange={handleChange('product')}
              helperText="Please select product type"
              variant="standard"
              style={{ textAlign: 'left' }}
            >
              {productTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Quantity"
              fullWidth
              value={values.quantity}
              type="number"
              required
              onChange={handleChange('quantity')}
              variant="standard"
              margin="none"
              className="text-field"
            />
            <div style={{ height: '20px' }}></div>
            <Button
              style={{
                backgroundColor: '#84b786',
                textTransform: 'none',
                fontSize: '2vh',
                color: 'white',
                borderRadius: '5px',
                boxShadow: 'none',
              }}
              variant="contained"
              type="submit"
            >
              {orderForm.type === 'new-order' ? 'Create Order' : 'Edit Order'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderForm;
