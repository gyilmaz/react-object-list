import React from 'react'
import PropTypes from 'prop-types'

/**
 * Represents the text and sorting direction arrow of a TableHeader
 * one or more of these may exist within a single TableHeader
 */
export default class HeaderField extends React.Component {
  static propTypes = {
    /** the sorting currently used for the data in the */
    activeSort: PropTypes.oneOf([true, false, null]),
    /** when a sortkey is passed, the field can be sorted by this key */
    sortKey: PropTypes.string,
    /** callback function passed down to determine the sorting of data loaded */
    updateSorting: PropTypes.func,
    /** class names that can be used for additional styling of the component */
    className: PropTypes.string,
    /** the text displayed within the component */
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    /** Icon to render to sort ascending */
    SortAscIcon: PropTypes.element,
    /** Icon to render to sort descending */
    SortDescIcon: PropTypes.element,
    /** Icon to render if unsorted column */
    UnsortedIcon: PropTypes.element,
  }

  static defaultProps = {
    activeSort: null,
    sortKey: null,
    SortAscIcon: <React.Fragment>&#813;</React.Fragment>,
    SortDescIcon: <React.Fragment>&#812;</React.Fragment>,
    UnsortedIcon: null,
  }

  /**
   * Determines whether to sort the particular column (Field) in
   * ascending or descending order, passing the sorting key back
   * to the objectlist
   *
   * @param {MouseEvent} event - event triggered from an onClick
   */
  handleClick = (event) => {
    if (this.props.sortKey) {
      if (this.props.activeSort) {
        this.props.updateSorting(this.props.sortKey, false)
      } else {
        this.props.updateSorting(this.props.sortKey, true)
      }
    }
  }

  _renderSortIcon = () => {
    const {SortAscIcon, SortDescIcon, UnsortedIcon, activeSort} = this.props
    switch (activeSort) {
      case true:
        return (
          <span className="sort-direction text-primary">
            &nbsp;{SortAscIcon}
          </span>
        )
      case false:
        return (
          <span className="sort-direction text-primary">
            &nbsp;{SortDescIcon}
          </span>
        )
      default:
        return (
          <span className="sort-direction text-primary">
            &nbsp;{UnsortedIcon}
          </span>
        )
    }
  }

  _renderHeader = () => {
    switch (typeof this.props.header) {
      case 'function':
        return <this.props.header />
      case 'string':
        return this.props.header
      default:
        return ''
    }
  }

  render() {
    if (this.props.sortKey !== null) {
      return (
        <div
          role={'button' /* role[button] adds cursor: pointer */}
          onClick={this.handleClick}
          className={this.props.className}
        >
          {this._renderHeader()}{this._renderSortIcon()}
        </div>
      )
    } else {
      return <span>{this._renderHeader()}</span>
    }
  }
}
