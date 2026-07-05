import {app} from "./app.js";
import { connectDatabase } from "./config/database.js";
import { PORT } from "./config/env.js";
import { getAllUsers } from "./repository/user.repository.js";

export const startServer = async () => {
  await connectDatabase();
  app.listen(PORT.port, async() => {
    console.log(`Server is running on port ${PORT.port}`);
  });
};

startServer().catch(err =>{
  console.error("[Server]: Failed to start ", err),
  process.exit(1);
});