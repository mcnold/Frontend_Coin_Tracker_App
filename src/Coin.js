import React, { Component } from 'react'


export default class Coin extends Component {

render () {
    return(
        <>
        
        <h2>{this.props.coinName}</h2>
        
        <div className="coindatadiv">
        <h4>Price: {this.props.coinObject.usd}</h4>
        <p>Market Cap: {this.props.coinObject.usd_market_cap}</p>
        <p>24 Hr Vol: {this.props.coinObject.usd_24h_vol}</p>
        <p>24 Hr Change: {this.props.coinObject.usd_24h_change}</p>
        </div>
        {/* <h1>{this.props.usd}</h1> */}
        {/* <h1>{this.props.coinMCap}</h1>
        <h1>{this.props.coinTVol}</h1>
        <h1>{this.props.coinChgPerc}</h1> */}
        </>
    )

}
}