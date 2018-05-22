import React from 'react'
import PropTypes from 'prop-types'

/**
 * Filter input used to pass a range of integers
 * i.e. Greater Than 20
 */
class NumberSlider extends React.Component {
  static propTypes = {
    /** Highest number that can be selected */
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Lowest number that can be selected */
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Current value of filter */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Function to call when value changed */
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    min: 0,
    max: 100,
  }

  state = {
    currentValue: this.props.value,
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      this.setState({currentValue: nextProps.value})
    }
  }

  /**
   * Handles number input change.
   * Calls onChange with the current value.
   * @param  {Object} input Input object
   * @param {number}  input.value Integer
   */
  handleValueChange = (event) => {
    const newValue = event.target.value
    this.setState(
      () => ({currentValue: newValue}), this.props.onChange(newValue)
    )
  }

  /**
   * Handles slider change (on mouse up)
   * Sets state to final value
   */
  handleSliderValueChange = (event) => {
    const newValue = event.target.value
    this.setState(() => ({currentValue: newValue}))
  }

  render() {
    return (
      <div className="objectlist-row objectlist-current-filter__active-status">
        <input
          type="number"
          className="objectlist-input objectlist-input__number-slider--number"
          min={this.props.min}
          max={this.props.max}
          value={this.state.currentValue}
          onChange={this.handleValueChange}
        />
        <input
          type="range"
          className="objectlist-input__number-slider--slider"
          value={this.state.currentValue}
          onChange={this.handleSliderValueChange}
          onMouseUp={this.handleValueChange}
          min={this.props.min}
          max={this.props.max}
        />
      </div>
    )
  }
}

export default NumberSlider
