import "./globals.css";
import ApolloWrapper from "@/components/ApolloProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
