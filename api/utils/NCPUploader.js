const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new S3Client({
	endpoint: process.env.NCP_ENDPOINT,
	region: process.env.NCP_REGION,
	credentials: {
		accessKeyId: process.env.NCP_ACCESS_KEY_ID,
		secretAccessKey: process.env.NCP_SECRET_KEY,
	},
});

const Uploader = multer({
	storage: multerS3({
		s3,
		bucket: process.env.NCP_BUCKET_NAME,
		acl: 'public-read',
		contentType: multerS3.AUTO_CONTENT_TYPE,
		key: async (req, file, cb) => {
			cb(null, `${Date.now()}_${file.originalname}`);
		},
	}),
});

module.exports = Uploader;
