import axios from "axios"
import Swal from "sweetalert2"


export const getApi = async (endpoint) => {
    console.log(process.env)
    try {
        let res = await axios.get(process.env.REACT_APP_API + endpoint)
        return res.data.values
    } catch (error) {
        return error.response ? Swal.fire(error.response.data.message) : ""
    }
}