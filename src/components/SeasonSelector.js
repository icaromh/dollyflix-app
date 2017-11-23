import React from 'react'
import PropTypes from 'prop-types'

const SeasonSelector = props => (
  <select
    className="select"
    onChange={ev => props.onChange(ev)}
    onClick={ev => props.onClick(ev)}
  >
    {props.seasons.map(season => (
      <option key={season} value={season}>Temporada {season}</option>
    ))}
  </select>
)

SeasonSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  seasons: PropTypes.array,
}

SeasonSelector.defaultProps = {
  seasons: [],
  onClick: () => {},
}

export default SeasonSelector
