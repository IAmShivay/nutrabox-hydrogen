import type {AppLoadContext, EntryContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    scriptSrc: [
      'self',
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
      'https://d3hw6dc1ow8pp2.cloudfront.net',
      'https://dov7r31oq5dkj.cloudfront.net',
      'https://cdn-static.okendo.io',
      'https://surveys.okendo.io',
      'https://api.okendo.io',
      'https://www.google.com',
      'https://www.gstatic.com',

      // your ngrok domain if you're using ngrok for development
      'https://refined-starfish-verbally.ngrok-free.app:*',
    ],
    defaultSrc: [
      "'self'",
      'localhost:*',
      'https://cdn.shopify.com',
      'https://www.google.com',
      'https://www.gstatic.com',
      'https://d3hw6dc1ow8pp2.cloudfront.net',
      'https://d3g5hqndtiniji.cloudfront.net',
      'https://dov7r31oq5dkj.cloudfront.net',
      'https://cdn-static.okendo.io',
      'https://surveys.okendo.io',
      'https://api.okendo.io',
      'data:',
    ],
    imgSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'data:',
      'https://d3hw6dc1ow8pp2.cloudfront.net',
      'https://d3g5hqndtiniji.cloudfront.net',
      'https://dov7r31oq5dkj.cloudfront.net',
      'https://cdn-static.okendo.io',
      'https://surveys.okendo.io',
    ],
    mediaSrc: [
      "'self'",
      'https://d3hw6dc1ow8pp2.cloudfront.net',
      'https://d3g5hqndtiniji.cloudfront.net',
      'https://dov7r31oq5dkj.cloudfront.net',
      'https://cdn-static.okendo.io',
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://cdn.shopify.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://d3hw6dc1ow8pp2.cloudfront.net',
      'https://cdn-static.okendo.io',
      'https://surveys.okendo.io',
    ],

    fontSrc: [
      "'self'",
      'https://fonts.gstatic.com',
      'https://d3hw6dc1ow8pp2.cloudfront.net',
      'https://dov7r31oq5dkj.cloudfront.net',
      'https://cdn.shopify.com',
      'https://cdn-static.okendo.io',
      'https://surveys.okendo.io',
    ],
    connectSrc: [
      "'self'",
      'https://monorail-edge.shopifysvc.com',
      'localhost:*',
      'ws://localhost:*',
      'ws://127.0.0.1:*',
      'https://api.okendo.io',
      'https://cdn-static.okendo.io',
      'https://surveys.okendo.io',
      'https://api.raygun.com',
      'https://www.google.com',
      'https://www.gstatic.com',

      // your ngrok domain if you're using ngrok for development
      'wss://refined-starfish-verbally.ngrok-free.app:*',
    ],
    frameSrc: ['https://www.google.com', 'https://www.gstatic.com'],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
