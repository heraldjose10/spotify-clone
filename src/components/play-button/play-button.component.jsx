import React from 'react'

import { ReactComponent as PlaySvg } from '../../assets/play-button.svg'
import { ReactComponent as PauseSvg } from '../../assets/pause-button.svg'

import './play-button.styles.scss'

const PlayButton = ({ playing }) => (
  <button className='play-button'>
    {
      playing === true
        ? <PauseSvg className='pause-svg'></PauseSvg>
        : <PlaySvg className='play-svg' />
    }
  </button >
)

export default PlayButton