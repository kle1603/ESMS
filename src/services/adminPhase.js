import { post } from "@/utils/ApiCaller";

export const postNewPhase = (data) => {
    return post("examPhases/", data);
};

export const deletePhase = (id) => {
    return post("examPhases/", id);
};
