import React, { Component } from 'react'
import Coin from './Coin'


//backend url port
// let baseUrlBackEnd = 'http://localhost:4000'

export default class Coins extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coinObject: {},
            baseUrl: "https://api.coingecko.com/api/v3/simple/price?ids=",
            coinName: "",
            default: "&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=false",
            searchUrl: "",
            favCoin: false,
        }
    }

handleChange = (event) => {
        this.setState({

          coinName: event.target.value
        })
        // this.setState({
        //     searchURL: this.state.baseUrl + this.state.coinName + this.state.default
        //   }, () => {

        //     fetch(this.state.searchURL)
        //     .then(response => {
        //         return response.json()
        //     }).then(json => this.setState([{
        //       coinObject: json.bitcoin,
        //     }]),
        //     (err) => console.log(err))
        //   })
    }   
 handleSubmit = (event) => {
     event.preventDefault()
    this.setState({
        searchUrl: this.state.baseUrl + this.state.coinName + this.state.default
      }, () => {
        fetch(this.state.searchUrl, {
            // body: JSON.stringify(coinObject:json) //Fetch needs to stringify the API object
        })
        .then(response => {
         return response.json()
        }).then(json => {
            console.log(json)
            this.setState({
            coinObject: json[this.state.coinName],
        })},
        
        (err) => console.log(err))
      })
   }

   addCrypto = (coinObject) => {
    const copyCoinObject = [...this.state.coinObject]
    copyCoinObject.push(coinObject)
    this.setState({
      coinObject: copyCoinObject,
    })
  } 
  toggleCoin =() => {
    this.setState ({
      favCoin: true
    })
  }

// componentDidMount() {
//    this.favCoin()
//   }

render () {
    let coin;
    console.log(this.state.coinObject)
    if(Object.keys(this.state.coinObject).length) {
      coin = <Coin coinObject={this.state.coinObject} coinName={this.state.coinName}/>
    }
    console.log(coin)
    return(
        <>
        <div className="App">
        <h3 className="subtext">Earn. Track. Learn.</h3>
        <div>
          <h4 className="App">Study Coins.</h4>
    <form onSubmit={this.handleSubmit}>
        <label htmlFor='coinName'> Find a Coin </label>
        <input
          id='coinName'
          type='text'
          value={this.state.coinName}
          onChange={this.handleChange}
        />
        <input className="button-primary"
          type='submit'
          value='Get Info'
          
        />

        </form>
        </div>
        <div className="divstyle1">
          {coin}
        </div>
        </div>
       
        
        </>


    )

}

}