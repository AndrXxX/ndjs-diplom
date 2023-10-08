export default {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || "mongodb://localhost:27017/mydb",
  cookieSecret: process.env.COOKIE_SECRET || "COOKIE_SECRET",
  imagesUploadPath: process.env.IMAGES_UPLOAD_PATH || 'public/images',
}
