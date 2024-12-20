import { ref, unref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

const router=useRouter()

export const useAuthStore = defineStore('auth', () => {
  const user = localStorage.getItem('user') ? ref(JSON.parse(localStorage.getItem('user'))) : ref(null);
  const token = ref(localStorage.getItem('token'));

  

  async function api(method, url, payload = {}, notify = true) {
    try {
      const response = await fetch(`http://localhost:3333/api${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
          'Access-Control-Allow-Origin': '*'
        },
        // credentials: 'include', // Pour gérer les cookies si nécessaire
        body: method !== 'GET' ? JSON.stringify(unref(payload)) : null
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
          errorData.errorMessage.forEach(error => {
            if (notify) window.$toast('error', error.message, 'error');
          });
        }
        else if (response.status === 400) {
          if (notify) window.$toast('error', errorData.errorMessage, 'error');
        } else if (response.status === 401) {
          if (notify) window.$toast('error', 'Non autorisé', 'Veuillez vous reconnecter');
          logout()

          router.push({name:'login'})
        } else {
          if (notify) window.$toast('error', errorData.ErrorMessage, 'Veuillez vous reconnecter');
        }
        return errorData;
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  async function login(payload) {
    try {
      const result = await api('POST', '/auth/login', payload);
      if (result && result.valid) {
        authenticate(result.result);
        // window.$toast('success', 'Connexion réussie', 'Bienvenue !');
      }
      return result;
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  }

  async function register(payload) {
    try {
      const result = await api('POST', '/auth/register', payload);
      return result;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
    }
  }

  async function logout() {
    try {
      await api('DELETE', 'auth/logout', {}, false);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.$toast('success', 'Déconnexion', 'Vous avez été déconnecté');
    }
  }

  async function me() {
    try {
      const result = await api('GET', '/me');
      user.value = result.user;
      return user.value;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      // L'erreur a déjà été gérée dans la fonction api
    }
  }

  async function isAuthentificated() {
    console.log(token);

    return token ? true : false
  }

  function authenticate(result) {
    token.value = result.token.token;
    localStorage.setItem('token', token.value);
    const {email,firstName,lastName,phoneNumber,avatarUrl}=result.user
    localStorage.setItem('user', JSON.stringify({email,firstName,lastName,phoneNumber,avatarUrl}));
    user.value = result.user;
  }

  return { user, api, login, register, logout, me, isAuthentificated };
});