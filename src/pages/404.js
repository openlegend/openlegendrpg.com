import React, { useEffect } from "react"

import Seo from "../components/seo"
import { navigate } from 'gatsby-link'

const NotFoundPage = () => {
  useEffect(() => {
    navigate('/');
  }, []);

  return (
    <div>
      <Seo title="404: Not found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  )
}

export default NotFoundPage
