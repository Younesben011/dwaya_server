
import path from "path"
import express from "express";
import { pharmaUpload,postUpload } from "../utils/upload.js";

const router = express.Router();

router.post(
    "/pharmapic",
    pharmaUpload.single("pics"),
    (req, res) => {
        if (req.file) res.status(200).send({ image: req.file.filename });
        else res.status(404).send({ image: "notfound" });
    }
);
router.post(
    "/post",
    postUpload.array("pics"),
    (req, res) => {
        if (!req.files) res.status(404).send({ image: "notfound" });
        // console.log(req);
        const files = req.files;
        let images= [];
        files.map((file) => {
            images.push(file.filename);
        });
        res.status(200).send({ image: images });
    }
);

export default router;
