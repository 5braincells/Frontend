import React from 'react'
import { useHistory } from 'react-router'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function CategoriesItem({ category }) {
  const history = useHistory()
  const user = JSON.parse(useSelector(state => state?.jwt?.user))

  const handleClick = () => {
    // navigate to chat
    localStorage.setItem('category', JSON.stringify(category))
    history.push('/categories/' + category.id + user.grade)
  }

  return (
    <div
      key={category.id}
      className='categories-item'
      onClick={handleClick}>
      <img
        src={category.picture}
        className='categories-image'
        alt=''
      />
      <span className='categories-item-title'>{category.name}</span>
    </div>
  )
}
