import { Divider, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import ListItem from './listitem';
import React from 'react';

function ListShow() {
  const orders = useSelector((store: any) => store.order);
  const [page, setPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [pageCount, setPageCount] = React.useState(Math.ceil(orders.length / 20));
  const [resultsArray, setResultsArray] = React.useState(orders);
  const [displayArray, setDisplayArray] = React.useState([]);

  const handleSearchChange = (event: React.ChangeEvent<unknown>) => {
    const searchArray = (event.target as HTMLInputElement).value.trim().split(' ');

    const re = new RegExp(searchArray.join('|'), 'i');

    setResultsArray(
      orders.filter(
        (order: any) =>
          re.test(order.id) ||
          re.test(order.customer_name) ||
          re.test(order.customer_email) ||
          re.test(order.product)
      )
    );
    setPage(1);
  };

  React.useEffect(() => {
    setPageCount(Math.ceil(resultsArray.length / 20));
    setDisplayArray(resultsArray.slice((page - 1) * 20 + 1, page * 20 + 1));
  }, [page, resultsArray]);

  React.useEffect(() => {
    setResultsArray(orders);
  }, [orders]);

  return (
    <div className="list">
      <TextField
        id="outlined-basic"
        style={{ width: '100%' }}
        label="Seach Orders by id, name, email"
        variant="outlined"
        size="small"
        onChange={handleSearchChange}
      />
      <div className="list-item list-header">
        <div className="product-id">Product Id</div>
        <div className="customer-name">Customer Name</div>
        <div className="customer-email">Customer Email</div>
        <div className="product-type">Product Type</div>
        <div className="quantity">Quantity</div>
        <div className="icons"></div>
      </div>
      {displayArray.map((order: any) => {
        return (
          <div key={order.id}>
            <ListItem
              id={order.id}
              customer_name={order.customer_name}
              customer_email={order.customer_email}
              product={order.product}
              quantity={order.quantity}
            />
            <Divider light />
          </div>
        );
      })}
      <div className="pagination">
        <Pagination count={pageCount} page={page} onChange={handleChange} size="large" />
      </div>
    </div>
  );
}

export default ListShow;
