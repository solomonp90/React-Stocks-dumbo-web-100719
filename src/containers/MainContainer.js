import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    filterTerm: "All",
    sortTerm: ""

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

    this.setState((prevState)=>{
      return {

        portfolio: [stock, ...prevState.portfolio]

      }
    })
  }
  
  sellStock = (stock) => {
    
    // let index = this.state.portfolio.indexOf(stock)
    // let stocks = [...this.state.portfolio]
    //  stocks.splice(index,1)

    //  this.setState({
    //    portfolio: stocks
    //  })

    // let index = this.state.portfolio.indexOf(stock)
    let portfolioStocks = this.state.portfolio.filter(stockobj => stockobj.id !== stock.id )

    this.setState({

      portfolio: portfolioStocks

    })
    // console.log(stocks)

  }

  setFilterTerm = (term) => {
    console.log(term)
    this.setState({

      filterTerm: term 

    })
  }
  
  wichStocksToRender = () => {
    let copiedStocks = this.state.stocks

    if (this.state.filterTerm === "All") {
      
      copiedStocks = [...this.state.stocks]

    } else {

      copiedStocks = this.state.stocks.filter((stock) => stock.type === this.state.filterTerm)
      
    }

    if (this.state.sortTerm === "Price") {
      
      copiedStocks.sort((stockA,stockB) => stockA.price - stockB.price)

    } else if (this.state.sortTerm === "Alphabetically") {
 
      copiedStocks.sort((stockA,stockB) => stockA.name.localeCompare(stockB.name))

    }

    return copiedStocks

  }
  
  setSortTerm = (term) => {

    // let alphabeticalSort = this.state.stocks.sort(stockA,stockB)

    this.setState({
      sortTerm: term
    })
    // console.log(event)

  }
  

  // allow a user to buy a stock by clicking on it and when it is bought, it should be added to My Portfolio.
  
  
  render() {
    // console.log(this.state.stocks)
    return (
      <div>
        <SearchBar
        
        term={this.state.filterTerm}
        setFilterTerm={this.setFilterTerm}
        setSortTerm={this.setSortTerm}
        sortTerm={this.state.sortTerm}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
              stocks={this.wichStocksToRender()} 
              buyStock={this.buyStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer 
              portfolio={this.state.portfolio} 
              sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
