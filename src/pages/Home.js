import React from 'react'
import { Container } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <Container className='page-container'>
      <h1 className='title-main' style={{marginBottom: '24px'}}>
        Studyrooms
      </h1>
      <h1>
        Welcome to the <FontAwesomeIcon icon={Icons.faHome} />{' '}
        page!
      </h1>
      <h1>
        Click on <strong>Categories</strong> to get started.
      </h1>
    </Container>
  )
}
