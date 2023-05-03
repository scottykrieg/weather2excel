import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <style
            dangerouslySetInnerHTML={{
              __html: `
              body.light {
                background-color: #ffffff;
                color: #333333;
              }
              body.dark {
                background-color: #333333;
                color: #ffffff;
              }
              .button {
                border-radius: 5px;
                padding: 10px 20px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s ease-in-out;
              }
              .button.light {
                background-color: #007aff;
                color: #ffffff;
              }
              .button.dark {
                background-color: #1f1f1f;
                color: #ffffff;
              }
              .font-ibm-plex-sans {
                font-family: "IBM Plex Sans", sans-serif;
              }
            `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
