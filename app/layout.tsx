import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "Learning NextJS 13 build simple Todo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="px-10 py-10">{children}</div>
      </body>
    </html>
  );
}
