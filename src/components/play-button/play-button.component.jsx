import React from 'react'

import { ReactComponent as PlaySvg } from '../../assets/play-button.svg'
import { ReactComponent as PauseSvg } from '../../assets/pause-button.svg'

import './play-button.styles.scss'

class PlayButton extends React.Component {

  constructor() {
    super()
    this.state = {
      playing: false
    }
  }

  handleClick = () => {
    if (this.state.playing) {
      this.setState({ playing: false })
    }
    else {
      this.setState({ playing: true })
    }
  }

  render() {
    return (
      <button className='play-button' onClick={this.handleClick}>
        {
          this.state.playing
            ? <PauseSvg className='pause-svg'></PauseSvg>
            : <PlaySvg className='play-svg' />
        }
      </button>
    )
  }
}

export default PlayButton