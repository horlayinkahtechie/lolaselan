import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/lolaselan.jpg" type="image/jpg" />
      </head>

      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
