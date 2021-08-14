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
mutation addJournal($journalTitle: String!, $journalAddress: String!, $journalText: String!, $journalLatLng: InputLatLng) {
  addJournal(journalTitle: $journalTitle, journalAddress: $journalAddress, journalText: $journalText, journalLatLng: $journalLatLng) {
    _id
    journalTitle
    journalAddress
    journalLatLng {
      lat
      lng
    }
    journalText
    journalAuthor
    createdAt
  }
}
`;

export const UPDATE_JOURNAL = gql`
mutation updateJournal($journalId: ID!, $journalText: String!) {
  updateJournal( journalId: $journalId, journalText: $journalText) {
    _id
    journalText
  }
}
`;

export const REMOVE_JOURNAL = gql`
mutation removeJournal($journalId: ID!) {
  removeJournal( journalId: $journalId) {
    _id
  }
}
`;
