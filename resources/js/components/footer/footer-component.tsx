import React from 'react'

const FooterComponent = () => {
  return (
    <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} WeeChat. All rights reserved.</p>
    </footer>
  )
}

export default FooterComponent