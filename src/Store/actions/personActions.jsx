import instance from "../../utils/Axios";
import { loadperson } from "../reducers/personSlice";
import { removeperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await instance.get(`/person/${id}`);
    const externalid = await instance.get(`/person/${id}/external_ids`);
    const combinedCredits = await instance.get(
      `/person/${id}/combined_credits`
    );
    const tvCredits = await instance.get(`/person/${id}/tv_credits`);
    const movieCredits = await instance.get(`/person/${id}/movie_credits`);

    let theultimatedetails = {
      details: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };

    dispatch(loadperson(theultimatedetails));
  } catch (error) {
    console.log(error);
  }
};
