module.exports = (api) => {
  const isTest = api.env("test");
  const targets = isTest ? { node: "current" } : {};

  return {
    presets: [
      ["@babel/preset-env", { targets }],
      [
        "@babel/preset-typescript",
        {
          isTsx: true,
        },
      ],
      "@babel/preset-react",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            components: "./src/components",
            config: "./src/config",
            context: "./src/context",
            hooks: "./src/hooks",
            types: "./src/types",
            test: "./src/test",
          },
        },
      ],
      "inline-react-svg",
      [
        "babel-plugin-styled-components",
        {
          ssr: true,
        },
      ],
    ],
    ignore: ["node_modules"],
  };
};
