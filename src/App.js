import { lazy, Suspense } from 'react'
import React, { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Routes } from './constants/routes'

const Login = lazy(() => import('./pages/Login/login'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>I am Loading...</p>}>
        <Switch>
          <Route path={Routes.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
