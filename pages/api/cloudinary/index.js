import { createRouter } from 'next-connect';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { imageMiddleware } from '../../../middleware/imageMiddleware';
import fs from 'fs';

// Configuration Clodinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const router = createRouter()
    .use(
        fileUpload({
            useTempFiles: true,
        })
    )
    .use(imageMiddleware)
;

export const config = {
    api: {
        bodyParser: false,
    }
}

router.post(async(req, res) => {
    try {
        const { path } = req.body;
        console.log("path ==> ", path);
        let files = Object.values(req.files).flat();
        
        let images = [];
        for(const file of files) {
            const img = await uploadToCloudinaryHandler(file, path);
            images.push(img);
            removeTmp(file.tempFilePath);
        }
        
        return res.status(200).json(images);
    } catch (error) {
        // console.log("error ==> ", error);
        return res.status(500).json({
            message: error.message,
        })
    }
});

router.delete(async(req, res) => {
    let image_id = req.body.public_id;
    cloudinary.v2.uploader.destroy(image_id, (error, res) => {
        if(error) {
            return res.status(400).json({ success: false, error });
        }
        return res.json({ success: true });
    })
})

const removeTmp  = (path) => {
    fs.unlink(path, (error) => {
        if(error) throw error;
    })
};

const uploadToCloudinaryHandler = async(file, path) => {
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(
        file.tempFilePath, 
        {
            folder: path,
        }, (error, res) => {
            if(error) {
                removeTmp(file.tempFilePath);
                console.log("error ==>", error);
                return res.status(400).json({ message: "Upload image fail!"});
            }
            resolve({
                url: res.secure_url,
                public_url: res.public_id,
            });
        })
    });
};

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});