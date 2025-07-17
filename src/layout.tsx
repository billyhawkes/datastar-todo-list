import type { JSX } from "hono/jsx/jsx-runtime";
import { RootStyle } from "./style";

export const RootLayout = ({
  children,
  title,
}: {
  children: JSX.Element | JSX.Element[];
  title?: string;
}) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} | DataStar Template</title>
        <script
          type="module"
          src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"
        ></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/basecoat-css@0.2.8/dist/basecoat.cdn.min.css"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/basecoat-css@0.2.8/dist/js/all.min.js"
          defer
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
        <RootStyle />
      </head>
      <body class="max-w-screen-xl m-auto p-4 sm:p-8">{children}</body>
    </html>
  );
};
