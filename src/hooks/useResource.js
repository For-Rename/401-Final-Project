import axios from 'axios'
import useSWR from 'swr'
import { useAuth } from '../contexts/auth'
export const apiUrl ='http://localhost:8000/api/hrboost/';

export default function useResource() {

    const { tokens, logout } = useAuth()

    const { data, error, mutate } = useSWR([apiUrl, tokens], fetchResource);

    async function fetchResource(url) {

        if (!tokens) {
            return;
        }

        try {
            
            const response = await axios.get(url, config());
            return response.data;

        } catch (error) {
         
            handleError(error);
        }
    }

    async function createResource(info) {
        try {
            const url = apiUrl ;
            await axios.post(url, info, config());
            mutate(); 
        } catch (error) {
            handleError(error);
        }
    }

    async function deleteResource(id) {

        try {
            const url = apiUrl + id;
            await axios.delete(url, config());
            mutate(); 
        } catch (error) {
            handleError(error);
        }
    }

    async function updateResource(api,resource) {
        try {
            const url = api
           const data= await axios.put(url, resource, config());
            console.log('work');
            mutate(); 
            return data
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
        resources: data,
        error,
        loading: tokens && !error && !data,
        createResource,
        deleteResource,
        updateResource,
    }
}