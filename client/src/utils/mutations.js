import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_JOURNAL = gql`
  mutation addJournal($journalTitle: String!, $journalAddress: String!, $journalLatLng: InputLatLng!, $journalText: String!) {
    addJournal(journalTitle: $journalTitle, journalAddress: $journalAddress, journalLatLng: $InputLatLng, journalText: $journalText) {
      _id
      journalTitle
      journalAddress
      journalLatLng{
        lat
        lng
      }
      journalText
      journalAuthor
      createdAt
    }
  }
`;
