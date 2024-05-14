import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dynamic routing test",
  description: "dynamic",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
