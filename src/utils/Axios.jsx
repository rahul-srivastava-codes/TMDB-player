import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWUzZTEwOWRmZTMxNDIxZmVkMjkyYmVjZGJiYjBiZCIsIm5iZiI6MTc1MzYxODgwNS4zODksInN1YiI6IjY4ODYxOTc1NzMwODgyMjI1MjU1ZjMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AJZmR02wvohxNYDRAp98NBdBjtzdE6uf3p7MMPIjHUc",
  },
});

export default instance;
