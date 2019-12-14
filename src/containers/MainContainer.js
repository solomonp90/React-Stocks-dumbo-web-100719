import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: []
    
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(r => r.json())
    .then((stocksArr) => {
      // console.log(stocksArr)
      this.setState({
        stocks: stocksArr
      }) 

    })

  }

  buyStock = (stock) => {
    // console.log(stock)


    this.setState({
      
      portfolio:[...this.state.portfolio, stock]
      
    })
    // console.log(stock)
  }

  sellStock = (stock) => {
    console.log("sold",stock)
    // let soldStockPortfolio = this.state.portfolio.pop(stock)
    let filteredPortfolio = this.state.portfolio.filter((stockObj) => {
        stock.id !== stockObj.id
    }
    )
    this.setState({
      
      portfolio: filteredPortfolio
      
    })
    console.log(filteredPortfolio)
  }

  // wichstock = (event) => {
  //   // if stock is reg execute buy stock (return buy stock)
  //   if () {
      
  //   } else {
      
  //   }
     
  //   // else execute sell stock (return sell stock)
  // }
  
  
  
  
  // allow a user to buy a stock by clicking on it and when it is bought, it should be added to My Portfolio.
  
  
  render() {
    // console.log(this.state.stocks)
    return (
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} buyStock={this.buyStock} sellStock={this.sellStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
