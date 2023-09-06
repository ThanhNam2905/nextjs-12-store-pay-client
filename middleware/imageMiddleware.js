import fs from 'fs';

export const imageMiddleware = async(req, res, next) => {
    try {
        if(!req.files) {
            return res.status(400).json({ message: "No files were choosen." });
        }

        let files = Object.values(req.files).flat();
        for(const file of files) {
            if(file.mimetype !== "image/jpeg" && 
                file.mimetype !== "image/jpg" && 
                file.mimetype !== "image/png" && 
                files.mimetype !== "image/webp") {
                removeTmp(file.tempFilePath);
                return res.status(400).json({ message: "File format is incorrect, only JPEG, JPG, PNG, WEBP are allowed"});
            }
            if(file.size > 1024*1024*5) {
                removeTmp(file.tempFilePath);
                return res.status(400).json({ message: "File size is too large maximum 5 MB allowed."})
            }
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const removeTmp = (path) => {
    fs.unlink(path, (error) => {
        if(error) throw error;
    })
}