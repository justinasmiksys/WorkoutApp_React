import axios from "axios";
import vars from './vars'

export async function fetchData(target, setter, type = "", query = "") {
  await axios
    .get(`${vars.host}${target}/${type}/${query}`)
    .then((response) => {
      setter({ data: response.data });
    })
    .catch((err) => console.log(err));
}

export function getCookie(cookieName) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
