import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Antonio, Quicksand } from "next/font/google";
import { Racing_Sans_One } from "next/font/google";
import { Poppins } from "next/font/google";
import {} from "next/font/google";
import Navbar from "~/components/Navbar";
// const quicksand = Quicksand({
//   subsets: ["latin"],
//   variable: "--font-quicksand",
//   weight: ["400"],
// });

const poppings = Poppins({
  subsets: ["latin"],
  variable: "--font-text",
  weight: ["400"],
});
const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-title",
});

const racing = Racing_Sans_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-fancy",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <main
        className={`${antonio.variable} ${poppings.variable} ${racing.variable} `}
      >
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
