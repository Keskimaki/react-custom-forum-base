import fs from 'fs'
import client from 'https'

function downloadImage(url: string, filepath: string) {
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

export default downloadImage