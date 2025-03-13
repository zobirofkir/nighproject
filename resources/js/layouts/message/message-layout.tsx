import React from 'react'
import HeaderComponent from '@/components/message/header-component'
const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
        <HeaderComponent />
        {children}
    </main>
  )
}
export default MessageLayout