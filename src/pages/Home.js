import React from 'react'
import { Container } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <Container className='page-container'>
      <h1>
        Welcome to the <FontAwesomeIcon color='#212529' icon={Icons.faHome} />{' '}
        page!
      </h1>
    </Container>
  )
}
