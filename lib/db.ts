import sql from "mssql";

const config = {
  user: "sa",
  password: "1234",
  server: "localhost",
  database: "crm",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function executeQuery(query: string, params: any[] = []) {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();

    // Add parameters to the request
    // Map each parameter to its expected name
    params.forEach((param, index) => {
      // You can map index to specific parameter names used in the SQL query
      request.input(`p${index}`, param); // Using p0, p1, p2... (default behavior)
    });

    let result = await request.query(query);
    return result.recordsets;
  } catch (error) {
    console.error("Detailed database error:", error);
    throw error;
  }
}
