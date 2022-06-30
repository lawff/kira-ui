const transpile = require('next-transpile-modules')

const withTM = transpile(['@kira-ui/core', '@kira-ui/styles', "@kira-ui/prism", "@kira-ui/hooks"])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM(nextConfig)
