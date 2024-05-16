import { useEffect, useRef } from "react"

export const useClickOutSideToClose = (handler) => {
    let refArea = useRef()
    useEffect(() => {
        const handleClickOutSide = (event) => {
            if(!refArea.current?.contains(event.target)){
                handler()
            }
        }
        document.addEventListener('mousedown', handleClickOutSide)
        return() => {
            document.removeEventListener('mousedown', handleClickOutSide)
        }
    },[])
    return refArea
}
