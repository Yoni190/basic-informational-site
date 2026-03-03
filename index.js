const http = require('http')
const fs = require('fs/promises')

async function main() {
    try {
        const index = await fs.readFile('index.html', { encoding: 'utf8' })
        const about = await fs.readFile('about.html', { encoding: 'utf8' })
        const contact = await fs.readFile('contact-me.html', { encoding: 'utf8' })
        const notFound = await fs.readFile('404.html', { encoding: 'utf8' })

        let pageContent = ''
        http.createServer((req, res) => {
            if(req.url == '/') {
                pageContent = index
            } 
            else if(req.url.endsWith('/about')) {
                pageContent = about
            }
            else if(req.url.endsWith('/contact-me')) {
                pageContent = contact
            }
            else {
                pageContent = notFound
            }
            res.statusCode = 200
            res.write(pageContent)
            res.end()
        }).listen(8080, () => {
            console.log('Server running on port 8080')
        })
    } catch (error) {
        console.log(error)
    }
}

main()