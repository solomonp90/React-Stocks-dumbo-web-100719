import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  // allow a user to buy a stock by clicking on it and when it is bought, it should be added to My Portfolio.
  
  render() {
    // console.log(this.props.stocks)
   

    return (
      <div >
        <h2>Stocks</h2>
        {
          //render the list of stocks here
          
          this.props.stocks.map((stock, idx) => {
            return <Stock id={stock.id} stock={stock} key={idx} handleClick={this.props.buyStock}/>
          }
          )
          
        }
        
      </div>
    );
  }

}

export default StockContainer;
