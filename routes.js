import { Router } from "express";
import {
  getAllInstruments,
  getInstrumentById,
  createInstrument,
  updateInstrument,
  deleteInstrument,
} from "./controllers/InstrumentController.js";
import { protectRoute } from "./controllers/AuthController.js";
import { upload } from "./utils.js";

const router = Router();

router
  .route("/")
  .get(getAllInstruments)
  .post(protectRoute, upload.single("image"), createInstrument);

router
  .route("/:id")
  .get(getInstrumentById)
  .delete(protectRoute, deleteInstrument)
  .patch(protectRoute, upload.single("image"), updateInstrument);

export default router;
