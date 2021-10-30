import React, {Component} from 'react'
import ReactModal from 'react-modal'
// import { ReactDOM } from 'react-dom'
import Nav from './Nav'

let baseUrl = 'http://localhost:4000'

export default class ExampleApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
    }
    handleOpenModal = () => {
        this.setState({showModal:true})
    }
    handleCloseModal = () => {
        this.setState({showModal:false})
    }

    loginUser = async (e) => {
      console.log('loginUser')
      e.preventDefault()
      const url = baseUrl + '/users/login'
      const loginBody = {
        username: e.target.username.value,
        password: e.target.password.value
      }
      try {
  
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(loginBody),
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: "include"
        })
  
        console.log(response)
        console.log("BODY: ",response.body)
  
        if (response.status === 200) {
          this.cryptos()
          
        }
      }
      catch (err) {
        console.log('Error => ', err);
      }
    }
  
    signup = async (e) => {
      e.preventDefault()
      console.log("user tried signup")
      const url = baseUrl + '/users/signup'
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 200) {
          this.getCryptos()
          console.log(200)
        }
      }
      catch (err) {
        console.log('Error => ', err);
      }
    }
  
    render () {
        return (
            <div>
        <button onClick={this.handleOpenModal}>Register or Login Here.</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Back to Coin Tracker.</button>
          <h1>Information for Registration and Login.</h1>
          <Nav loginUser={this.loginUser} signup={this.signup}/>
        </ReactModal>
      </div>
    );
  }
}

// const props = {};

// ReactDOM.render(<ExampleApp {...props} />, document.getElementById('main'))


