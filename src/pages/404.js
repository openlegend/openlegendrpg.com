import React, { useEffect } from "react"

import NavLayout from "../layouts/nav-layout"
import SEO from "../components/seo"
import { navigate } from 'gatsby-link'

const NotFoundPage = () => {
  useEffect(() => {
    navigate('/');
  }, []);

  return (
    <NavLayout>
      <SEO title="404: Not found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </NavLayout>
  )
}

export default NotFoundPage
