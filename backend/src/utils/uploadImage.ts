import aws from 'aws-sdk'
import fs from 'fs'
import path from 'path'

aws.config.update({ region: 'eu-central-1' })

const s3 = new aws.S3({ apiVersion: '2006-03-01' })

interface Upload {
  Bucket: string
  Key: string
  Body: fs.ReadStream | ''
}

const uploadImage = (bucket: string, file: any) => {
  console.log(bucket, file)
  const uploadParams: Upload = {
    Bucket: bucket,
    Key: '',
    Body: ''
  }

  const fileStream = fs.createReadStream(file)
  fileStream.on('error', function(err) {
    console.log('File Error', err)
  })

  uploadParams.Body = fileStream
  uploadParams.Key = path.basename(file)

  s3.upload(uploadParams, (err: any, data: any) => {
    if (err) {
      console.log("Error", err)
    } if (data) {
      console.log("Upload Success", data.Location)
    }
  })
  
  fs.unlink(uploadParams.Key, (err) => {
    if (err) {
      console.log("Error", err)
    }
  })
}

export default uploadImage
