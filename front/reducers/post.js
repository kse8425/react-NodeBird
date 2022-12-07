export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'eric',
      },
      content: '첫 번째 게시글 #해시태그 #파브리카',
      Images: [
        {
          src: 'https://www.ofabrica.com/static/website/img/company_img.png',
        },
        {
          src: 'https://www.ofabrica.com/static/website/img/company_icon1.png',
        },
        {
          src: 'https://www.ofabrica.com/static/website/img/company_icon3.png',
        },
        {
          src: 'https://www.ofabrica.com/static/website/img/tech_img1.png',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'sinea',
          },
          content: '우와 열공한다...',
        },
        {
          User: {
            nickname: 'sarang',
          },
          content: '빨리 집에 와!',
        },
        {
          User: {
            nickname: 'hope',
          },
          content: '퐈~',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};
const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: 'love',
  },
  Images: [],
  Comments: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};
export default reducer;
