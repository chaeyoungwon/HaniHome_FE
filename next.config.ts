import type { NextConfig } from "next";

import type { RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
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
          resourceQuery: /url/,
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

export default nextConfig;
