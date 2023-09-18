import axios from "axios"
import Swal from "sweetalert2"
import jwt_decode from "jwt-decode"



export const getApi = async (endpoint) => {
    console.log(process.env)
    try {
        let res = await axios.get(process.env.REACT_APP_API + endpoint)
        return res.data.values
    } catch (error) {
        console.log(error.response)
        // return error.response.data.message ? Swal.fire(error.response.data.message) : Swal.fire("Data tidak ditemukan")
    }
}

export const getAuthentication = async () => {

    try {
        let res = await axios.get(process.env.REACT_APP_API + "auth/token", { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
        const decode = jwt_decode(res.data.accessToken)
        return decode
    } catch (error) {
        if (error.response) return false
    }
}