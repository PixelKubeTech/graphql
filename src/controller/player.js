import axios from "axios";

export async function getDevices(request) {
    try {
        let response = await axios.get(process.env.PLAYER_MANAGEMENET);
        return response.data;
    } catch (error) {
        console.log("error:getDevices", error);
        return error.response.data;
    }
}

export async function createDevice(request) {
    try {
        let response = await axios.post(process.env.PLAYER_MANAGEMENET, request, {
            "Content-Type": "application/json",
        });
        return response.data;
    } catch (error) {
        console.log("error:createDevice");
        return error.response.data;
    }
}
