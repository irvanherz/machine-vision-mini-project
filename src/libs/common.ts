export const DEFAULT_IMAGE = `${process.env.PUBLIC_URL}/assets/images/empty-image.svg`
export const DEFAULT_PHOTO = `${process.env.PUBLIC_URL}/assets/images/empty-photo.svg`

export function imageErrorHandler (e: any) {
  if (e.target) e.target.src = DEFAULT_IMAGE
}

export function photoErrorHandler (e: any) {
  if (e.target) e.target.src = DEFAULT_PHOTO
}
