import React, {Component} from 'react'

export default class Tooltip extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayToolTip: false
        }
    }

    hideToolTip = () => {
        this.setState({displayToolTip: false})
    }

    showTooltip = () => {
        this.setState({displayToolTip: true})
    }

    render() {

        let message = this.props.message
        let position = this.props.position
        return (
                <span className='tooltip'
                    onMouseLeave={this.hideTooltip}
                  >
                  {this.state.displayTooltip &&
                  <div className={`tooltip-bubble tooltip-${position}`}>
                    <div className='tooltip-message'>{message}</div>
                  </div>
                  }
                  <span 
                    className='tooltip-trigger'
                    onMouseOver={this.showTooltip}
                    >
                    {this.props.children}
                  </span>
                </span>
              )
            
        
    }
}