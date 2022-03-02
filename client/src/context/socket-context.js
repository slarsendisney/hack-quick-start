import React, { useState, useContext, useEffect } from "react"
import { io } from "socket.io-client"
const SocketContext = React.createContext()

export const SocketProvider = ({ ...props }) => {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    console.log("socket connecting...")
    setSocket(io("ws://localhost:3000"))
  }, [])
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setConnected(true)
      })

      socket.on("disconnect", () => {
        setConnected(false)
      })
    }
  }, [socket])

  return (
    <SocketContext.Provider
      value={{
        connected,
        socket,
      }}
      {...props}
    />
  )
}

export const useSocket = () => useContext(SocketContext)

export default SocketContext
