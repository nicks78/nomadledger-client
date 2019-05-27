import React from 'react'

const ButtonContent = ({ children, icon }) => (
  <span style={{ paddingRight: 10, fontWeight: 500, paddingLeft: icon ? 0 : 10, paddingTop: 0, paddingBottom: 0 }}>{children}</span>
)

export default ButtonContent
