import React from 'react'
import Header from './Header'
import { Switch, Route, Redirect } from 'react-router-dom'

import CreateLink from './CreateLink'
import LinkList from './LinkList'
import Login from './Login'
import Search from './Search'

const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/new/1" />} />
        <Route exact path="/create" component={CreateLink} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route
          exact
          path="/top"
          render={(routeProps) => <LinkList {...routeProps} />}
        />
        <Route
          exact
          path="/new/:page"
          render={(routeProps) => <LinkList {...routeProps} />}
        />
      </Switch>
    </div>
  </div>
)

export default App
