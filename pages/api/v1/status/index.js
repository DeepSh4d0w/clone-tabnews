import database from "infra/database.js";

export default async function Status(request, response) {
  const updatedAt = new Date().toISOString();

  const rawVersion = await database.query("SHOW server_version;");
  const version = rawVersion.rows[0].server_version;

  const rawMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = rawMaxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const rawOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });
  const OpenedConnections = rawOpenedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependences: {
      database: {
        max_connections: parseInt(maxConnections),
        opened_connections: OpenedConnections,
        version: version,
      },
    },
  });
}
