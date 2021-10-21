/* eslint-disable no-console */
exports.createTable = (db, tableName, schema, Promise, cb)=>{
    return Promise.resolve(tryCreate())
    async function tryCreate() {
        const exists = await db.schema.hasTable(tableName)
        
        if(exists == 'false' || !exists) {
          console.log('[MIGRATE-UTIL]: ' + tableName + ' does not exist.' + ' Create table: ' + tableName); 
          return db.schema.createTable(tableName, table => {
              schema(table)
              cb && cb(null, tableName)
          })
    
        } else {
          console.log('[MIGRATE-UTIL]: ' + tableName + ' exists: Executing Drop'); 
    
          await db.schema.dropTable(tableName);
          console.log('[MIGRATE-UTIL]: Dropped ' + tableName + ' Starting Rebuild'); 
    
          return db.schema.createTable(tableName, async table=>{
            schema(table);
            cb && cb(null, tableName)
          })
    
        }
    }
  }

  exports.destroyTable = (db, tableName, Promise, cb)=>{
    return Promise.resolve(tryDestroy())
  
    async function tryDestroy() {
        const exists = await db.schema.hasTable(tableName);
        
        if(exists == 'false' || !exists) {
            const error = new Error('[MIGATE-UTIL]: ' + tableName + ' does not exist')
            console.log(error.message); 
            cb && cb(error);
    
        } else { 
            await db.schema.dropTable(tableName);
            console.log('[MIGATE-UTIL]: ' + tableName + ' dropped successfully'); 
            cb && cb(null, tableName);
        }
    }
  }