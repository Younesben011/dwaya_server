import path from "path";
import multer from "multer";
import { fileURLToPath } from "url"
// define constant
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const IMAGE_FOLDER = path.join(path.dirname(__dirname), "public/assets/images");
const filename = (req, file, cb) => {
    console.log(file.mimetype);
    const type = "." + file.mimetype.slice(file.mimetype.indexOf("/") + 1);
    cb(
        null,
        Math.round(Math.random() * 1e9) + "-" + new Date().getTime() + type
    );
};
const pharmaStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(IMAGE_FOLDER, "pharma"));
    },
    filename,
});
const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(IMAGE_FOLDER, "posts"));
    },
    filename,
});

export const pharmaUpload = multer({ storage: pharmaStorage });
export const postUpload = multer({ storage: postStorage });
