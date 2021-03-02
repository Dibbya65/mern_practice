const init_state = {
  posts: [],
  laoding: false,
};
const reducer = (state = init_state, action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return {
        ...state,
        posts: action.payload,
      };

    case 'CREATE_POST':
      console.log('payload is ::', action.payload);
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case 'UPDATE':
    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case 'DELETE':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    default:
      return state;
  }
};
export default reducer;
