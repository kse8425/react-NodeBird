import shortId from 'shortid';
import produce from 'immer';
import { faker } from '@faker-js/faker';
faker.setLocale('ko');

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
          id: shortId.generate(),
          src: 'https://www.ofabrica.com/static/website/img/company_img.png',
        },
        {
          id: shortId.generate(),
          src: 'https://www.ofabrica.com/static/website/img/company_icon1.png',
        },
        {
          id: shortId.generate(),
          src: 'https://www.ofabrica.com/static/website/img/company_icon3.png',
        },
        {
          id: shortId.generate(),
          src: 'https://www.ofabrica.com/static/website/img/tech_img1.png',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'sinea',
          },
          content: '우와 열공한다...',
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'sarang',
          },
          content: '빨리 집에 와!',
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'hope',
          },
          content: '퐈~',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20).fill().map(() => ({
    id: shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.lastName() + faker.name.firstName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
      src: faker.image.imageUrl(),
    }],
    Comments: [{
      User: {
        id: shortId.generate(),
        nickname: faker.name.lastName() + faker.name.firstName(),
      },
      content: faker.lorem.sentence(),
    }],
  })),
);
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'love',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'love',
  },
});
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;

    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(dummyPost(action.data));
      break;

    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;

    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;

    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      break;

    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      break;

    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;

    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.unshift(dummyComment(action.data.content));
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }

    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;

    default:
      break;
  }
});
export default reducer;
