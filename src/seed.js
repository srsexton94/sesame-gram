export function seedDatabase(firebase) {
  const users = [
    {
      userId: '<firebase-auth-id>',
      username: 'izzyWazHere',
      fullName: 'Sam Sexton',
      emailAddress: 'srsexton94@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'elmo23',
      fullName: 'Elmo DeSesame',
      emailAddress: 'happydance@gmail.com',
      following: [],
      followers: ['<firebase-auth-id>'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'abbbby',
      fullName: 'Abby Cadabby',
      emailAddress: 'acadabby@yahoo.com',
      following: [],
      followers: ['<firebase-auth-id>'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'tweettweet',
      fullName: 'Big Bird',
      emailAddress: 'bigb@gmail.com',
      following: [],
      followers: ['<firebase-auth-id>'],
      dateCreated: Date.now()
    }
  ]

  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  for (let i = 1; i <= 4; i++) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/elmo/${i}.jpg`,
        caption: 'Fun on Sesame Street!',
        likes: [],
        comments: [
          {
            displayName: 'abbbby',
            comment: 'So much fun!'
          },
          {
            displayName: 'tweettweet',
            comment: 'Let\'s play again soon!'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}