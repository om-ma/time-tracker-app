'use client';
import React from 'react'
import { BeatLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div>
        <BeatLoader loading={true}/>
    </div>
  )
}

export default Loader;