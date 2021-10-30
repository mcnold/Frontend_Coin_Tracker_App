import React, { Component } from 'react'


export default class FavCoins extends Component {
    constructor(props)  {
        super(props)
        this.state = {
            
        }
    }
        //retrieve info fetch call
    // getCryptos = () => {
    //         // fetch to the backend
    //         fetch(baseUrlBackEnd + "/cryptos",{
    //         //   credentials: "include"
    //         })
    //         .then(res => {
    //           if(res.status === 200) {
    //             return res.json()
    //           } else {
    //             return []
    //           }
    //         }).then(data => {
    //           console.log(data)
    //           this.setState({ cryptos: data })
    //         })
    //       }

    // }

    // componentDidMount() {
    //     this.getCryptos()
    //    }

    render () {
        return(
            <>
            <ul>
                <li>{this.props.coinObject}</li>


            </ul>

            </>
        )
    
    }
    }