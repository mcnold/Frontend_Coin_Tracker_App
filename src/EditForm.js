import React, {Component} from 'react'

export default class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: true,
        }
    }

    // showEditForm = (crypto)=>{
    //     this.setState({
    //       modalOpen:true,
    //       coinName: crypto.coinName,
    //       favorite: "",
    //       cryptoToBeEdited: crypto,
     
    //     })
    // }
    render() {
        return (
            <>
                {
                this.state.modalOpen &&
                   <form onSubmit={this.handleSubmit}>
                   <label>Name: </label>
                   <input name="coinName" value={this.state.crypto} onChange={this.handleChange} placeholder={this.state.coinName}/> <br/>
                   <label>Price: </label>
                   <input name="coinPrice" value={this.state.crypto} onChange={this.handleChange} placeholder={this.state.coinPrice}/> <br/>
                  <button className="button-primary">submit</button>
                 </form>
                }



            </>
        )
    }
}