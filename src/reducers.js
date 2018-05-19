// import objectAssign from 'object-assign';
// import firebase from 'firebase';
// import firebaseConf from '../firebaseConf';

function getInitialState() {
  // firebase.initializeApp(firebaseConf);

  const initialState = {
    // firebase,
  };

  return initialState;
}

const rootReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default rootReducer;
