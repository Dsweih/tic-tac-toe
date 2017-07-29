import React from 'react'
import classNames from 'classnames'

const Cell = ({ dataIndex, type, onPlay, small, winText }) => {
  return (
    <div 
      data-index={dataIndex} 
      className={classNames(
        'grid__cell',
        { circle: type === 1 },
        { cross: type === -1 },
        { 'grid__cell--small': small },
        { 'invisible': winText !== 'Player:' }
      )}
      onClick={onPlay}>
    </div>
  )
}

export default Cell