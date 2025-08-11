import instance from "../../utils/Axios";
import { loadtv } from "../reducers/tvSlice";
import { removetv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await instance.get(`/tv/${id}`);
    const externalid = await instance.get(`/tv/${id}/external_ids`);
    const recommendations = await instance.get(`/tv/${id}/recommendations`);
    const similar = await instance.get(`/tv/${id}/similar`);
    const videos = await instance.get(`/tv/${id}/videos`);
    const translations = await instance.get(`/tv/${id}/translations`);
    const watchproviders = await instance.get(`/tv/${id}/watch/providers`);
    let theultimatedetails = {
      details: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };

    dispatch(loadtv(theultimatedetails));
  } catch (error) {
    console.log(error);
  }
};
