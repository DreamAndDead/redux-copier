import { connect } from 'react-redux'
import { copifyReducer, copifyActions } from 'redux-copier'
import visReducer, * as visActions from '../ducks/visibility'
import Link from '../components/Link'

export default function getFilterLink(key) {
  const actions = copifyActions(visActions, key)
  const selector = actions.selector
  const setVisibilityFilter = actions.actionCreators.setVisibilityFilter

  const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === selector(state.visibility)
  })

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  })

  return connect(mapStateToProps, mapDispatchToProps)(Link)
}

export const reducer = copifyReducer(visReducer)
