import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { testDataMap, testTypes } from "./testData/index.js";
import { isTestType } from "./utils/isTestDataType/index.js";
import { getTSAST } from "./utils/getTSAST/index.js";

const app = new Hono();

app.use(cors());

app.get("/health-check", (ctx) => {
  return ctx.text("Success");
});

app.get("/tests", (ctx) => {
  return ctx.json({
    types: testTypes,
  });
});

app.get("/tests/:type", async (ctx) => {
  const type = ctx.req.param("type");

  if (!isTestType(type)) {
    return ctx.json(
      {
        message: "invalid type",
      },
      404
    );
  }

  if (type === "typescript") {
    const ast = getTSAST(testDataMap[type]);

    console.log(ast);
    console.log(type);

    return ctx.json({
      type,
      text: testDataMap[type],
      ast,
    });
  }

  return ctx.json({
    type,
    text: testDataMap[type],
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  }
);
