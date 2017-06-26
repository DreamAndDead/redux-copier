import React from 'react'
import getFilterLink from '../containers/FilterLink'

export default function getFooter(key) {
  const FilterLink = getFilterLink(key)

  const Footer = () => (
    <p>
      Show:
      {" "}
      <FilterLink filter="SHOW_ALL">
        All
      </FilterLink>
      {", "}
      <FilterLink filter="SHOW_ACTIVE">
        Active
      </FilterLink>
      {", "}
      <FilterLink filter="SHOW_COMPLETED">
        Completed
      </FilterLink>
    </p>
  )

  return Footer
}
