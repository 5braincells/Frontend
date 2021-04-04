import React from 'react'
import { useHistory } from 'react-router'
import { Col } from 'react-bootstrap'

export default function CategoriesItem({ category }) {
  const history = useHistory()

  const handleClick = () => {
    // navigate to chat
    history.push('/categories/' + category.name)
  }

  return (
    <Col
      xl={9}
      key={category.id}
      className='categories-item mr-auto ml-auto'
      onClick={handleClick}>
      <img
        src={category.picture}
        alt=''
        width='56'
        height='56'
        style={{ borderRadius: '100px' }}
      />
      <span className='categories-item-title'>{category.name}</span>
    </Col>
  )
}
