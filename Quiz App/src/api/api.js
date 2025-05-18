import axios from "axios"

export const handleGet = async ()=>{
    const response = await axios.get("https://682105e9259dad2655ae474b.mockapi.io/Quizapp")
    return response.data
}