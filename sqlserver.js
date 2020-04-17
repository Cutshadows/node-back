const sql = require('mssql');

exports.query = function(ProcedimientoAlmacenado, ObjetoVariables) {

  return new Promise((resolve, reject) => {

      var request = pool.request()

      for (var llave in ObjetoVariables) {

        switch (typeof ObjetoVariables[llave]) {
          case 'string':
            request.input(String(llave), sql.VarChar(sql.MAX), ObjetoVariables[llave])
            break;
          case 'number':
            request.input(String(llave), sql.Int, ObjetoVariables[llave])
            break;
          case 'object':
            request.input(String(llave), sql.DateTime, ObjetoVariables[llave])
            break;
          case 'Boolean':
            request.input(String(llave), sql.Bit, ObjetoVariables[llave])
            break;
          default:
            request.input(String(llave), sql.VarChar(sql.MAX), ObjetoVariables[llave])
            break;
        }
      }

      request.execute(ProcedimientoAlmacenado, (err, result) => {
        if (err) {
          reject(err);
        }else{
          resolve(result);
        }
    })

    sql.on('error', err => {
      reject(err);
    })
  });
}