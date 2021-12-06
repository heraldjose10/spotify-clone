import React from "react";

import './greeting-card.styles.scss'

class GreetingCard extends React.Component {

  constructor() {
    super()
    this.state = {
      greeting: ''
    }
  }

  componentDidMount() {
    let now = new Date();
    let hour = now.getHours()
    if (hour >= 12 && hour < 16) {
      this.setState({ greeting: 'Good afternoon' })
    }
    else if (hour >= 16 && hour < 19) {
      this.setState({ greeting: 'Good evening' })
    }
    else if (hour >= 19) {
      this.setState({ greeting: 'Good night' })
    }
    else if (hour >= 4) {
      this.setState({ greeting: 'Good morning' })
    }
  }

  render() {
    return (
      <h1>{this.state.greeting}</h1>
    )
  }
}

export default GreetingCard;