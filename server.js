const { MongoDatabaseConnection } = require('./config/db.config');
const { PORT } = require('./config/env.config');
const app = require('./app');

(async ()=>{
  try {
    await MongoDatabaseConnection();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
})();

