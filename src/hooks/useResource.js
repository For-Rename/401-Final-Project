import axios from 'axios'

import { useAuth } from '../contexts/auth'

export default function useResource() {

    const { tokens, logout } = useAuth()



    async function updateResource(api,resource) {
        try {
            const url = api
           const data= await axios.put(url, resource, config());
            console.log('work',data);
            return data.data
        } catch (error) {
            handleError(error);
        }
    }


    function config() {
        const tokensAccess = localStorage.getItem('tokens')
        console.log('tokensAccess',tokensAccess);

        return {
            headers: {
                'Authorization': 'Bearer ' + tokensAccess
            }
        }
    }

    function handleError(error) {
        console.error(error);
        logout();
    }

    return {

        updateResource,
    }
}