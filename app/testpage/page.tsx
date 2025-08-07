import React from 'react'

const page = () => {
  const imagePath = "v3/assets/blt41b5d34d676c7949/blt12253853eb06f352/project thumbnail.png";
  return (
    <div>
      this is test page having image from contentstack assets permanent url
      <img src={imagePath} alt="test" />
    </div>
  )
}

export default page
