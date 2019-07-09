import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class RepositionDocument extends Document {
  public render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
