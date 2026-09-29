import "dotenv/config";

import app from "./app.js";
import ConnectDB from "./config/DB.js";

const PORT = process.env.PORT || 3000;

ConnectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});