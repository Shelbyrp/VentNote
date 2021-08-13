import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      journals {
        _id
        journalTitle
        journalAddress
        journalLatLng{
          lat
          lng
        }
        journalText
        createdAt
      }
    }
  }
`;

export const QUERY_JOURNALS = gql`
  query getJournals {
    journals {
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

export const QUERY_SINGLE_JOURNAL = gql`
  query getSingleJournal($journalId: ID!) {
    journal(journalId: $journalId) {
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      journals {
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
  }
`;

export const QUERY_MARKERS = gql`
query getMarkers {
  journals {
    _id
    journalTitle
    journalAddress
    journalLatLng{
      lat
      lng
    }
  }
}
`