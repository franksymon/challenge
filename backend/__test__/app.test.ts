import {app} from "../app";
import request from "supertest";

describe("GET /healthcheck", () => {
  it('Tests initial route', async () => {
    const response = await request(app).get("/healthcheck");
    expect(response.status).toBe(200);
    expect(response.text).toBe(
      "¡Okay!"
    );
  });
});
