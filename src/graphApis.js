import { gql } from '@apollo/client';

export const FETCH_NEWS_LIST = gql`
  query getNews {
    news {
      title
      author
      uuid
      date
      likes
    }
  }`;

export const FETCH_SINGLE_NEWS_DATA = gql`
  query getSingleNews($uuid: String!) {
    singleNews(uuid: $uuid) {
      title
      date
      author
      likes
      text
    }
  }
`;

export const LIKE_NEWS = gql`
  mutation($uuid: String!) {
    like(uuid: $uuid) {
      uuid
      likes
    }
  }
`;

export const DISLIKE_NEWS = gql`
  mutation($uuid: String!) {
    dislike(uuid: $uuid) {
      likes
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation($uuid: String!) {
    delete(uuid: $uuid) {
      title
      author
      uuid
      date
      likes
    }
  }
`;
