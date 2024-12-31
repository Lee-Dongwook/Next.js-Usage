import type { NextConfig } from 'next';

import './src/lib/env/client';
import './src/lib/env/server';

import { redirects } from './redirect';

const ContentSecurityPolicy = `
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'self';
  manifest-src 'self';
  report-to default;
`;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer-when-downgrade',
  },
  {
    key: 'Permissions-Policy',
    value: `accelerometer=(), camera=(), gyroscope=(), microphone=(), usb=()`,
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return redirects;
  },
  reactStrictMode: true,
};

export default nextConfig;
