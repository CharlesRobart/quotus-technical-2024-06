import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Your description here" />
          <link rel="icon" href="/favicon.ico" />
          {/* Ajoutez vos balises <link> pour les polices ici */}
          <link
            href="https://fonts.googleapis.com/css2?family=Gustavo&display=swap"
            rel="stylesheet"
          />
          {/* Autres balises <link> nécessaires */}
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
