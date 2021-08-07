import React from 'react';
import { useQuery } from '@apollo/client';

import JournalList from '../components/JournalList';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { QUERY_JOURNALS} from '../utils/queries';

const useStyles = makeStyles(theme => ({
       menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
        marginRight: theme.spacing(2),
    },
    logo: {
        maxWidth: 160,
    },
    MuiAppBar: {
        color: '#fff',
        background: '#03313d',
    },
}));

const Journal = () => {
    const classes = useStyles();
  const { loading, data } = useQuery(QUERY_JOURNALS);
  const journals = data?.journals || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <JournalList
              journals={journals}
              title="Some Journals"
            />
          )}
        </div>
        <div>
                        <Link className="text-light" to="/addjournal">
                           Add Journal
                        </Link>
                    </div>
      </div>
    </main>
  );
};

export default Journal;
