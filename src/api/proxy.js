const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/maps/api", {
      target: "https://maps.googleapis.com",
      changeOrigin: true,
      pathRewrite: {
        "^/maps/api": "", // Loại bỏ đường dẫn "/maps/api" khỏi yêu cầu
      },
    })
  );
};
