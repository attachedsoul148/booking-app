export { default } from "next-auth/middleware"

export const config = { matcher: ["/favorites" , "/trips" , "/reservations", "/mylistings"] }