import React from "react"
import { Router, RouteComponentProps, Redirect } from "@reach/router"

// Components
import Layout from "../components/layout"

// Pages
import IndexPage from "."

const App = () => (
  <Layout>
    <Router>
      <RouterPage path="/" pageComponent={<IndexPage />} />
      <RouterPage default={true} pageComponent={<Redirect to="/auth/login" noThrow />} />
    </Router>
  </Layout>
)

export default App

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;