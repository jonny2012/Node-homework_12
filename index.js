import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { router } from "./router.js";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router)



async function startApp() {
  try {
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
}

//npm run dev
startApp().catch(console.dir);
