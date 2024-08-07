import path from "path";
import { fileURLToPath } from "url"
// define constant
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
import fs from "fs";
const IMAGE_FOLDER = path.join(path.dirname(__dirname), "public/assets/images");

export const getImage = (req, res) => {
    const image = path.join(
        IMAGE_FOLDER,
        `/${req.params.folder}/${req.params.path}`
    );
    res.download(image);
};
