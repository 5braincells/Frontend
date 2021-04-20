import React from 'react'

import './Categories.css'
import CategoriesList from '../../components/CategoriesList'

export default function Categories() {
  return (
    <div className='page-scroll-container'>
      <h1 className='title-sub'>Categories</h1>
      <CategoriesList />
    </div>
  )
}
