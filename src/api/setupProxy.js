const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (req, res) {
  return createProxyMiddleware({
    target: "https://maps.googleapis.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/proxy": "/maps/api",
    },
  })(req, res);
};
