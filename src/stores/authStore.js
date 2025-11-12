import { api } from 'boot/axios'

export const authenticate = {
  login(email, password) {
    return api.post('/auth/login', { email, password })
      .then(response => {
        const token = response.data.token
        if (token) {
          localStorage.setItem('authToken', token);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          localStorage.setItem('roleUser', response.data.role);
          localStorage.setItem('nameUser', response.data.name);
        }
        return response.data
      })
      .catch(err => {
        console.error('Authenticate failed:', err)
        throw err
      })
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('roleUser');
    localStorage.removeItem('nameuser');
    delete api.defaults.headers.common['Authorization']
    window.location.href = '/'
  }
}

