import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://remax.ae/assets/css/style.css" />
        <link rel="stylesheet" href="https://remax.ae/assets/base/colors.css" />
        <link rel="stylesheet" href="https://remax.ae/assets/base/typography.css" />
        <link rel="stylesheet" href="https://remax.ae/assets/base/mixins.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet"></link>
      </Head>
      <body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
