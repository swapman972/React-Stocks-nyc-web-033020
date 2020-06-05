import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    stockDisplay: [],
    stocksBought: [],
    checkLetter: false,
    checkPrice: false
  }

  handlerFetch= () => {
    fetch(`http://localhost:3000/stocks`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        stocks: data,
        stockDisplay: data
      })
    })
  }

  componentDidMount(){
    this.handlerFetch()
  }

  handlerBuyStock = (prop) => {
    this.setState({
      stocksBought: [...this.state.stocksBought, prop]
    })
  }

  handlerSellStock = (prop) => {
    const array = this.state.stocksBought.filter(stock => stock !== prop)
    this.setState({
      stocksBought: array
    })
  }

  handlerSort = (e) => {
    if(e.target.value === "Alphabetically"){
      this.setState({
        stockDisplay: this.state.stockDisplay.sort((a, b) => {return a.ticker.localeCompare(b.ticker)}),
        checkLetter: !this.state.checkLetter
      })  
    }else if (e.target.value === "Price"){
      this.setState({
        stockDisplay: this.state.stockDisplay.sort((a, b) => {return a.price -b.price }),
        checkPrice: !this.state.checkPrice
      })  
    }
  }

  handlerFilter = (e) => {
    const originalArray = [...this.state.stocks]

    if(e.target.value === "All"){
      this.setState({
        stockDisplay: originalArray
      })
    }else{
      this.setState({
        stockDisplay: originalArray.filter(stock => stock.type === e.target.value)
      })
    }
  }

  render() {
    return (
      <div>
        <SearchBar filter={(event) => this.handlerFilter(event)} sorted={(e) => this.handlerSort(e)} checkLetter={this.state.checkLetter} checkPrice={this.state.checkPrice}/>

          <div className="row">
            <div className="col-8">

              <StockContainer allStock={this.state.stockDisplay} buyStock={(prop) => this.handlerBuyStock(prop)}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.stocksBought} sellStock={(prop) => this.handlerSellStock(prop)}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
