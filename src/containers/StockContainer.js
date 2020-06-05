import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {/*render the list of stocks here */}
        {this.props.allStock.map((stock, index) => {
          return <Stock key={index} stock={stock} buyStock={this.props.buyStock}/>
        })
        }
      </div>
    );
  }

}

export default StockContainer;
