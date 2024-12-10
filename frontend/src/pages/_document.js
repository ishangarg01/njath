import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
            <link rel="icon" type="image/svg+xml" href="/assets/icons/tab_icon.svg" />
          {/* Or if using PNG format: 
          <link rel="icon" type="image/png" sizes="16x16" href="path/to/your/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="path/to/your/favicon.png" />
          */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
