import type { MouseEvent } from 'react'

// click on the dark area outside a <dialog> -> close it
export const onBackdrop = (close: () => void) => (e: MouseEvent<HTMLDialogElement>) => {
  if (e.target === e.currentTarget) close()
}