import {app} from "./app.js";
import { connectDatabase } from "./config/database.js";
import { PORT } from "./config/env.js";

export const startServer = async () => {
  await connectDatabase();
  app.listen(PORT.port, () => {
    console.log(`Server is running on port ${PORT.port}`);
  });
};

startServer();