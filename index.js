const fs = require('fs/promises')
const express = require('express')
const app = express()

// Without Express
// async function main() {
//     try {
//         const index = await fs.readFile('index.html', { encoding: 'utf8' })
//         const about = await fs.readFile('about.html', { encoding: 'utf8' })
//         const contact = await fs.readFile('contact-me.html', { encoding: 'utf8' })
//         const notFound = await fs.readFile('404.html', { encoding: 'utf8' })

//         let pageContent = ''
//         http.createServer((req, res) => {
//             if(req.url == '/') {
//                 pageContent = index
//             } 
//             else if(req.url.endsWith('/about')) {
//                 pageContent = about
//             }
//             else if(req.url.endsWith('/contact-me')) {
//                 pageContent = contact
//             }
//             else {
//                 pageContent = notFound
//             }
//             res.statusCode = 200
//             res.write(pageContent)
//             res.end()
//         }).listen(8080, () => {
//             console.log('Server running on port 8080')
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// main()


async function main() {
    try {
        const index = await fs.readFile('./pages/index.html', { encoding: 'utf8' })
        const about = await fs.readFile('./pages/about.html', { encoding: 'utf8' })
        const contact = await fs.readFile('./pages/contact-me.html', { encoding: 'utf8' })
        const notFound = await fs.readFile('./pages/404.html', { encoding: 'utf8' })

        const PORT = process.env.PORT || 8080

        app.get('/', (req, res) => res.send(index))
        app.get('/about', (req, res) => res.send(about))
        app.get('/contact', (req, res) => res.send(contact))
        app.use((req, res) => res.send(notFound))

        

        app.listen(PORT, (error) => {
            if(error) {
                throw error
            }

            console.log(`Server listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()
