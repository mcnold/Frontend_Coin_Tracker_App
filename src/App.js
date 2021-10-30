import './normalize.css';
import './skeleton.css';
import React, { Component } from 'react'
import Coins from './Coins';
import NewForm from './NewForm';
// import Nav from './Nav';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal'
import ExampleApp from './ExampleApp';

//backend url port
let baseUrl = process.env.REACT_APP_BASEURL;

class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      cryptos:[],
      modalOpen: false,
      cryptoToBeEdited: {},
    }
  }
  getCryptos = () => {
        // fetch to the backend
        fetch(baseUrl + "/cryptos", {
          credentials: "include"
        })
        .then(res => {
          if(res.status === 200) {
            return res.json()
          } else {
            return []
          }
        }).then(data => {
          console.log(data)
          this.setState({ cryptos: data })
        })
      }

  addCrypto = (newCrypto) => {
    const copyCryptos = [...this.state.cryptos]
    copyCryptos.push(newCrypto)
    this.setState({
      cryptos: copyCryptos,
    })
  }
  
  // loginUser = async (e) => {
  //   console.log('loginUser')
  //   e.preventDefault()
  //   const url = baseUrl + '/users/login'
  //   const loginBody = {
  //     username: e.target.username.value,
  //     password: e.target.password.value
  //   }
  //   try {

  //     const response = await fetch(url, {
  //       method: 'POST',
  //       body: JSON.stringify(loginBody),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       credentials: "include"
  //     })

  //     console.log(response)
  //     console.log("BODY: ",response.body)

  //     if (response.status === 200) {
  //       this.cryptos()
        
  //     }
  //   }
  //   catch (err) {
  //     console.log('Error => ', err);
  //   }
  // }

  // signup = async (e) => {
  //   e.preventDefault()
  //   const url = baseUrl + '/users/signup'
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         username: e.target.username.value,
  //         password: e.target.password.value
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     if (response.status === 200) {
  //       this.getCryptos()
  //     }
  //   }
  //   catch (err) {
  //     console.log('Error => ', err);
  //   }
  // }


  toggleFavorite = (crypto) => {
    // console.log(holiday)
    fetch(baseUrl + '/cryptos/' + crypto._id, {
      method: 'PUT',
      body: JSON.stringify({favorite: !crypto.favorite}),
      headers: {
        'Content-Type': 'application/json'
    },
    credentials: "include"
  }).then(res => res.json())
    .then(resJson => {
      // console.log(resJson)
      const copyCryptos = [...this.state.cryptos]
      const findIndex = this.state.cryptos.findIndex(
        crypto => crypto._id === resJson._id)
      copyCryptos[findIndex].favorite = resJson.favorite
      this.setState({
        cryptos: copyCryptos
      })
    })
  }

  deleteCrypto = (id) => {
    // console.log(id)
    fetch(baseUrl + '/cryptos/' + id, {
    method: 'DELETE',
    credentials: "include"
  }).then( res => {
    // console.log(res)
    // if I checked for a 200 response code 
    const findIndex = this.state.cryptos.findIndex(crypto => crypto._id === id)
    const copyCryptos = [...this.state.cryptos]
    copyCryptos.splice(findIndex, 1)
    this.setState({
      cryptos: copyCryptos
    })
  })
}

handleSubmit = async (e) => {
  e.preventDefault()
  const url = baseUrl + '/cryptos/' + this.state.cryptoToBeEdited._id
  try{
    const response = await fetch( url , {
      method: 'PUT',
      body: JSON.stringify({
        coinName: e.target.coinName.value,
      }),
      headers: {
        'Content-Type' : 'application/json'
      },
      credentials: "include"
    })

    if (response.status === 200){
      const updatedCrypto = await response.json()
      //console.log(updatedHoliday)
      const findIndex = this.state.cryptos.findIndex(crypto => crypto._id === updatedCrypto._id)
      const copyCryptos = [...this.state.cryptos]
      copyCryptos[findIndex] = updatedCrypto
      this.setState({
        cryptos: copyCryptos,
        modalOpen:false
      })
    }
  }
  catch(err){
    console.log('Error => ', err);
  }
}

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showEditForm = (crypto)=>{
   this.setState({
     modalOpen:true,
     coinName: crypto.coinName,
     favorite: "",
     cryptoToBeEdited: crypto,

   })
 }

 destroySession = async (e) => {
  console.log('logout')
  e.preventDefault()
  const url = baseUrl + '/users/logout'
    const response = await fetch(url
      , 
      {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    }
    )
    console.log(response)
    console.log("BODY: ",response.body)

  }

  

  componentDidMount() {
        this.getCryptos()
       }

  render () {
  return (
    <div>
      <div className="modal">
        <ExampleApp getCryptos={this.getCryptos}/>
        <button onClick={this.destroySession}>sign out.</button>
      </div>
      <div className="App">
      {/* <Nav loginUser={this.loginUser} signup={this.signup}/> */}
        <h1 className="Title">My Coin Tracker</h1>
       
        <Coins />
      </div>
      
        <NewForm baseUrl={baseUrl} addCrypto={ this.addCrypto }/>
        <table className="Table">
            <tbody>
              { this.state.cryptos.map((crypto, i) => {
                  return (
                    <tr className="divstyle2"key={crypto._id}>
                    <td onClick={() => this.toggleFavorite(crypto)}
                     className={ crypto.favorite ? 'favorite' : null }>
                     { crypto.coinName }
                    </td>
                    <td className="pencil" onClick={() => { this.showEditForm(crypto)}}>✏️</td>
                    <td className="delete" onClick={() => this.deleteCrypto(crypto._id)}>X</td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
          <br/>
          {
            this.state.modalOpen &&
                   <form className="editfrm"onSubmit={this.handleSubmit}>
                   <label>Name: </label>
                   <input name="coinName" value={this.state.crypto} onChange={this.handleChange} placeholder={this.state.coinName}/> <br/>
                   <label>Price: </label>
                   <input name="coinPrice" value={this.state.crypto} onChange={this.handleChange} placeholder={this.state.coinPrice}/> <br/>
                  <button className="button-primary">submit</button>
                 </form>
          }
 
    </div>
  )
}
}

export default App;
