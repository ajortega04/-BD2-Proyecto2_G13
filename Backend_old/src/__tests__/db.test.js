const { testConnection } = require("../config/testConnection");

describe("Test de conexión a la base de datos", () => {

  it("debería devolver un mensaje de conexión exitosa", async () => {

    const res = await testConnection();
    expect(res).toHaveProperty('message', 'Connection successful');
    expect(res).toHaveProperty('result', 2);
  });
  
});
