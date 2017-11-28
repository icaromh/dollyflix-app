/* eslint:  */
import React from 'react'
import videojs from 'video.js'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'

import {
  EVENT_CATEGORY_VIDEO,
  VIDEO_READY,
  VIDEO_PLAY,
  VIDEO_PAUSE,
} from '../../constants'


class VideoPlayer extends React.Component {
  componentDidMount() {
    const options = {
      autoplay: false,
      controls: true,
      ...this.props.options,
    }

    const props = this.props

    this.player = videojs(this.videoNode, options, function onPlayerReady() {
      const player = this

      player.volume(props.volume)

      ReactGA.event({ category: EVENT_CATEGORY_VIDEO, action: VIDEO_READY })
      player.on('play', () => ReactGA.event({ category: EVENT_CATEGORY_VIDEO, action: VIDEO_PLAY }))
      player.on('pause', () => ReactGA.event({ category: EVENT_CATEGORY_VIDEO, action: VIDEO_PAUSE }))
      player.on('volumechange', () => props.onVolumeChange(player.volume()))
    })
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
      this.videoPlayer = undefined
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video
          ref={(el) => { this.videoNode = el }}
          className="video-js"
        >
          <track kind="captions" />
        </video>
      </div>
    )
  }
}

VideoPlayer.propTypes = {
  options: PropTypes.object.isRequired,
  volume: PropTypes.number,
  onVolumeChange: PropTypes.func.isRequired,
}

VideoPlayer.defaultProps = {
  volume: 0.5,
}


export default VideoPlayer
