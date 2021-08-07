import React from 'react';
import JournalForm from '../components/JournalForm';


const addJournal = () => {

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <JournalForm />
        </div>
      </div>
    </main>
  );
};

export default addJournal;