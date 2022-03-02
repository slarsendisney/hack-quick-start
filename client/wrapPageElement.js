import React from "react"
import { LazyMotion, domMax } from "framer-motion"
import { SocketProvider } from "./src/context/socket-context"

export const wrapPageElement = ({ element, props }) => {
  return (
    <LazyMotion strict features={domMax}>
      <SocketProvider>{element}</SocketProvider>
    </LazyMotion>
  )
}
