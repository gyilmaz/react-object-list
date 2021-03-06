import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getValueFromAccessor } from './utils'

/**
 * The component that is to be displayed within ListRenderer
 * if a custom Renderer is not provided
 */
export default class ListCard extends Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.object,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    columns: [],
    data: {},
  }

  renderItemRows = () => {
    const {columns, data} = this.props
    return columns.map((column, idx) => {
      const col = Array.isArray(column) ? column : [column]
      return (
        <div className="objectlist-list__content" key={`list-item-${idx}`}>
          <h2 className="objectlist-list__header">{col.map(c => c.header).join(' ')}:</h2>
          <div className="objectlist-list__body">{col.map(c => getValueFromAccessor(data, c.dataKey)).join(' ')}</div>
        </div>
      )
    })
  }

  render() {
    const { onClick } = this.props
    const cardClasses = ['objectlist-list__item']
    if (onClick) cardClasses.push('objectlist-list__item--clickable')
    return (
      <li className={cardClasses.join(' ')} onClick={onClick}>
        {this.props.data.url &&
          <a href={this.props.data.url} className="objectlist-list__link">View</a>
        }
        {this.renderItemRows()}
      </li>
    )
  }
}
