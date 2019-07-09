import React from 'react';
import App, { Container } from 'next/app';

import '@repositionit/ui/static/scss/reset.scss';

export default class RepositionApp extends App {
  public static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
