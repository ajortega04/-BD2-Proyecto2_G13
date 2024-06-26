require('dotenv').config();
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');

const AWS_BUCKET_NAME=process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION=process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY=process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY;
const AWS_BUCKET_URL = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com`;

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
});

async function uploadFile(file) {
    const extension = file.originalname.split('.').pop().toLowerCase();
    let folderName = '';
    if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
        folderName = 'Pictures';
    } else {
        throw new Error("Extensión del archivo no compatible");
    }

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${folderName}/${file.originalname}`,
        Body: file.buffer
    };

    const command = new PutObjectCommand(uploadParams);
    await client.send(command);
    return `${AWS_BUCKET_URL}/${uploadParams.Key}`;
}

module.exports = {
    uploadFile
}