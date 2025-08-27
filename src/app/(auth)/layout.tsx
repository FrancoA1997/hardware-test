/* ------------------------------Imports---------------------------- */
//Styles
import "../global.scss";
//Components
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
//Icons
//Props
//React
import {AuthProvider} from "../../providers/AuthProvider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
//Images
/*---------------------------------------------------------------------- */

const monserrat = Montserrat({
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Inicio de sesion",
};

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session && session.user?.email) {
    redirect("/dashboard/products-list");
  } else {
    return (
      <html lang="en">
        <body className={monserrat.className}>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    );
  }
};

export default Layout;
