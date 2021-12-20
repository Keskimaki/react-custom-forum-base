/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs'
import aws from 'aws-sdk'
import client from 'https'
import path from 'path'

const downloadImage = (url: string, filepath: string) => {
  return new Promise((resolve, reject) => {
      client.get(url, (res) => {
          if (res.statusCode === 200) {
              res.pipe(fs.createWriteStream(filepath))
                  .on('error', reject)
                  .once('close', () => resolve(filepath))
          } else {
              res.resume()
              reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`))
          }
      })
  })
}

const uploadImage = (bucket: string, file: any) => {
  aws.config.update({ region: 'eu-central-1' })

  const s3 = new aws.S3({ apiVersion: '2006-03-01' })

  interface Upload {
    Bucket: string
    Key: string
    Body: fs.ReadStream | ''
  }
  
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

const imageService = {
  downloadImage,
  uploadImage
}

export default imageService
