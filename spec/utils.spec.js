const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns a converted time for a single object in an array', () => {
    const input = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const actual = formatDates(input);
    const expected = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 'Friday, November 10, 2016 21:26:49'
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.be.an('array');
    expect(actual[0].created_at).to.equal('Friday, November 10, 2016 21:26:49');
  });
  it('returns a new array of objects with multiple created at times changed', () => {
    const input = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
        belongs_to: '22 Amazing open source React projects',
        created_by: 'grumpy19',
        votes: 3,
        created_at: 1504183900263
      },
      {
        body:
          'Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'happyamy2016',
        votes: 4,
        created_at: 1467709215383
      }
    ];
    const actual = formatDates(input);

    const expected = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 'Sunday, July 9, 2016 19:07:18'
      },
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 'Friday, November 10, 2016 21:26:49'
      },
      {
        body:
          'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
        belongs_to: '22 Amazing open source React projects',
        created_by: 'grumpy19',
        votes: 3,
        created_at: 'Friday, August 31, 2017 13:51:40'
      },
      {
        body:
          'Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'happyamy2016',
        votes: 4,
        created_at: 'Wednesday, July 5, 2016 10:00:15'
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.be.an('array');
  });
  it('check for array mutation', () => {
    it('returns a new array of objects with multiple created at times changed', () => {
      const input = [
        {
          body:
            'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
          belongs_to:
            'The People Tracking Every Touch, Pass And Tackle in the World Cup',
          created_by: 'tickle122',
          votes: -1,
          created_at: 1468087638932
        },
        {
          body:
            'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
          belongs_to: 'Making sense of Redux',
          created_by: 'grumpy19',
          votes: 7,
          created_at: 1478813209256
        },
        {
          body:
            'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
          belongs_to: '22 Amazing open source React projects',
          created_by: 'grumpy19',
          votes: 3,
          created_at: 1504183900263
        },
        {
          body:
            'Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.',
          belongs_to:
            'The People Tracking Every Touch, Pass And Tackle in the World Cup',
          created_by: 'happyamy2016',
          votes: 4,
          created_at: 1467709215383
        }
      ];
      const actual = formatDates(input);

      const expected = [
        {
          body:
            'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
          belongs_to:
            'The People Tracking Every Touch, Pass And Tackle in the World Cup',
          created_by: 'tickle122',
          votes: -1,
          created_at: 'Sunday, July 9, 2016 19:07:18'
        },
        {
          body:
            'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
          belongs_to: 'Making sense of Redux',
          created_by: 'grumpy19',
          votes: 7,
          created_at: 'Friday, November 10, 2016 21:26:49'
        },
        {
          body:
            'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
          belongs_to: '22 Amazing open source React projects',
          created_by: 'grumpy19',
          votes: 3,
          created_at: 'Friday, August 31, 2017 13:51:40'
        },
        {
          body:
            'Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.',
          belongs_to:
            'The People Tracking Every Touch, Pass And Tackle in the World Cup',
          created_by: 'happyamy2016',
          votes: 4,
          created_at: 'Wednesday, July 5, 2016 10:00:15'
        }
      ];
      expect(input).to.eql([
        {
          body:
            'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
          belongs_to:
            'The People Tracking Every Touch, Pass And Tackle in the World Cup',
          created_by: 'tickle122',
          votes: -1,
          created_at: 1468087638932
        },
        {
          body:
            'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
          belongs_to: 'Making sense of Redux',
          created_by: 'grumpy19',
          votes: 7,
          created_at: 1478813209256
        },
        {
          body:
            'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
          belongs_to: '22 Amazing open source React projects',
          created_by: 'grumpy19',
          votes: 3,
          created_at: 1504183900263
        },
        {
          body:
            'Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.',
          belongs_to:
            'The People Tracking Every Touch, Pass And Tackle in the World Cup',
          created_by: 'happyamy2016',
          votes: 4,
          created_at: 1467709215383
        }
      ]);
    });
  });
});

describe('makeRefObj', () => {
  it('creates a new object with the value of article as the key and title value as the value of that key - 1 object in array', () => {
    const input = [{ article_id: 1, title: 'A' }];
    const actual = makeRefObj(input);
    const expected = { A: 1 };

    expect(actual).to.eql(expected);
  });
  it('creates a new object with the value of article as the key and title value as the value of that key - 1 object in array - multiple objects in array', () => {
    const input = [
      { article_id: 1, title: 'A' },
      { article_id: 2, title: 'B' },
      { article_id: 3, title: 'C' },
      { article_id: 4, title: 'D' }
    ];
    const actual = makeRefObj(input);
    const expected = { A: 1, B: 2, C: 3, D: 4 };

    expect(actual).to.eql(expected);
  });
  it('does not mutate the original object', () => {
    const input = [
      { article_id: 1, title: 'A' },
      { article_id: 2, title: 'B' },
      { article_id: 3, title: 'C' },
      { article_id: 4, title: 'D' }
    ];
    makeRefObj(input);

    expect(input).to.eql([
      { article_id: 1, title: 'A' },
      { article_id: 2, title: 'B' },
      { article_id: 3, title: 'C' },
      { article_id: 4, title: 'D' }
    ]);
  });
});

describe('formatComments', () => {});

// /This utility function should be able to take an array (list) of objects and return a reference object. The reference object must be keyed by each item's title, with the values being each item's corresponding id. e.g.

// [{ article_id: 1, title: 'A' }]

// will become

// { A: 1 }
