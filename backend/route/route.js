import express from "express"
import { controlDelete, controlGet, controlHome, controlPost, controlSummary } from "../controller/control.js"

const router = express.Router()

router.post("/api/transactions", controlPost)

router.get("/api/transactions/:user_id", controlGet)

router.get("/api/transactions/summary/:idnum", controlSummary)

router.delete("/api/transactions/:idnum", controlDelete)

router.get("/",controlHome)

export default router
