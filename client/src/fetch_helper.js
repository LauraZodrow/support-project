const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

function addHost(path) {
    if (process.env.NODE_ENV === 'production') {
        return `https://net-gather.herokuapp.com/api${path}`
    } else {
        return `http://localhost:3001/api${path}`
    }

}

const handleResponse = response => {
    if (response.ok) {
        const contentType = response.headers.get('Content-Type')
        if (contentType.startsWith('application/json')) {
            return response.json()
        } else if (contentType.startsWith('text')) {
            return response.text()
        }  else {
            Promise.reject({ status: response.status, error: 'Unexpected content type' })
        }
    } else {
        let error
        const text = response.text()
        try {
            error = JSON.parse(text)
        } catch (e) {
            error = 'Not sure about this error'
        }
        return Promise.reject({ status: response.status, error })
    }
}

export default {
    get: (url) => {
        return fetch(addHost(url), {
            headers,
            method: 'get'
        }).then(handleResponse)
    },
    post: (url, data) => {
        return fetch(addHost(url), {
            headers,
            method: 'post',
            body: JSON.stringify(data)
        }).then(handleResponse)
    },
    put: (url, data) => {
        return fetch(addHost(url), {
            headers,
            method: 'put',
            body: JSON.stringify(data)
        }).then(handleResponse)
    },
    delete: (url, data) => {
        return fetch(addHost(url), {
            headers,
            method: 'delete',
        }).then(handleResponse)
    }
}
