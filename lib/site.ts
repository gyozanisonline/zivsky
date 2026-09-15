export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://zivsky.vercel.app").replace(/\/$/, "")

export const CONTACT = {
  email: "ziv.balbirsky@gmail.com",
  instagram: { handle: "ziv_balbirsky", url: "https://www.instagram.com/ziv_balbirsky/" },
} as const
