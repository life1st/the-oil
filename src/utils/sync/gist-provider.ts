import axios from 'axios'

class GistProvider {
    token: string | null = null
    
    setToken(token: string) {
        this.token = token
    }
    get(gist_id: string) {
        return axios.get(`https://api.github.com/gists/${gist_id}`, {
            headers: {
                Authorization: `token ${this.token}`
            }
        })
    }
    update(id: string, params: {
        filename: string;
        content: string;
    }) {
        if (!params || !this.token || !id) {
            return null
        }

        const { filename, content } = params
        return axios.patch(`https://api.github.com/gists/${id}`, {
            files: { [filename]: { content } }
        }, {
            headers: { Authorization: `token ${this.token}` }
        })
    }
}

export default new GistProvider()