const apiKey = '4349118c475b4f8fc68c3a2f780946b5';
const searchURL = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&`;

export const ENTER_WORD = "ENTER_WORD";
export const START_SEARCH = "START_SEARCH";
export const SEARCH_RESULT = "SEARCH_RESULT";
export const ADD_CHAR = "ADD_CHAR";
export const REMOVE_CHAR = "REMOVE_CHAR";

export function searchWordEntered(payload) {
  return { type: ENTER_WORD, payload };
}

export function startSearch(payload) {
  return (dispatch, getState) => {
    dispatch({ type: START_SEARCH });

    //const query = getState().query;
    window.fetch(searchURL+'nameStartsWith='+encodeURIComponent(payload))
    .then(response => response.json())
    .then(json => {
      dispatch({type: SEARCH_RESULT, payload: json.data.results});
    })
  }
}

export function addCharacter(payload){
  return {type: ADD_CHAR, payload};
}

export function removeCharacter(payload){
  return {type: REMOVE_CHAR, payload};
}
