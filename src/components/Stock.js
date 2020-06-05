import React from 'react'

const Stock = (props) => (
  <div>
    <div className="card" onClick={() => props.buyStock ? props.buyStock(props.stock) : props.sellStock(props.stock)}>
      <div className="card-body">
        <h5 className="card-title">{
            //Company Name
            props.stock.name
          }</h5>
        <p className="card-text">
          {props.stock.ticker}: {props.stock.price}</p>
      </div>
    {/* <button onClick={(e) => props.buyStock(e)}>Buy me</button> */}
    </div>

  </div>
);

export default Stock
