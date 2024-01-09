describe("○ GET `/api/v1/status`", () => {
  let response, responseBody;

  it("should be status 200", async () => {
    response = await fetch("http://localhost:3000/api/v1/status");
    responseBody = await response.json();

    expect(response.status).toBe(200);
  });

  it("should be `updated_at` formated as ISO 8601", () => {
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toBe(parsedUpdatedAt);
  });

  describe("Dependences", () => {
    describe("Database", () => {
      it("should be `max_connection` as 100", () => {
        expect(responseBody.dependences.database.max_connections).toBe(100);
      });

      it("should be `opened_connections` as 1", () => {
        expect(responseBody.dependences.database.opened_connections).toBe(1);
      });

      it("should be `version` as '16.0'", () => {
        expect(responseBody.dependences.database.version).toBe("16.0");
      });
    });
  });
});
