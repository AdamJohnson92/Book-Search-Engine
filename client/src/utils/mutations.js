import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      password
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: Int!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      username
      email
      password
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String!], $description: String!, $bookId: Int!, $image: String, $link: String, $title: String!) {
    saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: Int!) {
    removeBook(bookId: $bookId) {
     bookId
    }
  }
`;
