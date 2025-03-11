import { createClient } from 'webdav/web'

class Webdav {
    constructor() {
        this.client = createClient(
            'https://dav.jianguoyun.com/dav/',
            {
                username: 'jiaoyangwfzc@gmail.com',
                password: 'agjwbpxm3x35tv9u'
            }
        )
    }
}

export default new Webdav