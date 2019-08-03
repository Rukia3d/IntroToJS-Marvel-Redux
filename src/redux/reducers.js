import { ENTER_WORD, START_SEARCH, SEARCH_RESULT, ADD_CHAR, REMOVE_CHAR } from './actions';

const initialState = {
  query:"",
  loading:false,
  results:[],
  team:[]
};

function rootReducer(state = initialState, action) {
  switch(action.type){
    case ENTER_WORD:
      return Object.assign({}, state, {query: action.payload});
    case START_SEARCH:
      return Object.assign({}, state, {loading: true});
    case SEARCH_RESULT:
      return Object.assign({}, state, {loading: false, results: action.payload})
    case ADD_CHAR:
      const newTeamChar = state.results.find(char => char.id==action.payload);
      if(!newTeamChar) throw "Character not found";
      const newTeam = state.team.concat(newTeamChar);
      return Object.assign({}, state, {team: newTeam })
    case REMOVE_CHAR:
      const newerTeam = state.team.filter(char => char.id!=action.payload);
      return Object.assign({}, state, {team: newerTeam })
    default:
      return state; // IMPORTANT
  }
};

export default rootReducer;
