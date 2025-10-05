import instance from "../../utils/Axios";
import { loadmovie, removemovie } from "../reducers/MovieSlice";
// import {  removemovie} from "../reducers/MovieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await instance.get(`/movie/${id}`);
    const externalid = await instance.get(`/movie/${id}/external_ids`);
    const recommendations = await instance.get(`/movie/${id}/recommendations`);
    const similar = await instance.get(`/movie/${id}/similar`);
    const videos = await instance.get(`/movie/${id}/videos`);
    const translations = await instance.get(`/movie/${id}/translations`);
    const watchproviders = await instance.get(`/movie/${id}/watch/providers`);
    let theultimatedetails = {
      details: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };

    dispatch(loadmovie(theultimatedetails));
  } catch (error) {
    console.log(error);
  }
};
