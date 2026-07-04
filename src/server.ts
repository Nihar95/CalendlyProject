import {app} from "./app.js";
import { PORT } from "./config/env.js";

export const startServer = () => {
  app.listen(PORT.port, () => {
    console.log(`Server is running on port ${PORT.port}`);
  });
};

startServer();