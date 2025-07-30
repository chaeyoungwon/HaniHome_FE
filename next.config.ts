import type { NextConfig } from "next";
// @ts-expect-error: next-pwa has no valid type declarations
import withPWA from "next-pwa";

import { withSentryConfig } from "@sentry/nextjs";
import type { RuleSetRule } from "webpack";

const baseConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.ts",
      },
    },
  },

  webpack: config => {
    const fileLoaderRule = config.module.rules.find(
      (rule: unknown): rule is RuleSetRule =>
        typeof rule === "object" &&
        rule !== null &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg"),
    );

    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // ?url
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [/url/] },
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                typescript: true,
              },
            },
          ],
        },
      );

      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

  images: {
    domains: ["hanihome.s3.ap-northeast-2.amazonaws.com", "example.com"],
  },
};

// PWA 래핑
const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const sentryWebpackPluginOptions = {
  silent: true,
};

export default withSentryConfig(
  withPWAConfig(baseConfig),
  sentryWebpackPluginOptions,
);
