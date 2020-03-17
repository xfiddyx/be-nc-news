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
        created_at: new Date(1478813209256)
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.be.an('array');
    expect(actual[0].created_at).to.eql(new Date(1478813209256));
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
        created_at: new Date(1468087638932)
      },
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: new Date(1478813209256)
      },
      {
        body:
          'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
        belongs_to: '22 Amazing open source React projects',
        created_by: 'grumpy19',
        votes: 3,
        created_at: new Date(1504183900263)
      },
      {
        body:
          'Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'happyamy2016',
        votes: 4,
        created_at: new Date(1467709215383)
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
          created_at: new Date(1468087638932)
        },
        {
          body:
            'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
          belongs_to: 'Making sense of Redux',
          created_by: 'grumpy19',
          votes: 7,
          created_at: new Date(1478813209256)
        },
        {
          body:
            'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
          belongs_to: '22 Amazing open source React projects',
          created_by: 'grumpy19',
          votes: 3,
          created_at: new Date(1504183900263)
        },
        {
          body:
            'Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.',
          belongs_to:
            'The People Tracking Every Touch, Pass And Tackle in the World Cup',
          created_by: 'happyamy2016',
          votes: 4,
          created_at: new Date(1467709215383)
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

describe('formatComments', () => {
  it('returns a new object when passed a single obj in an array', () => {
    const commentData = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const articleRef = {
      'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18
    };

    const actual = formatComments(commentData, articleRef);

    const expected = [
      {
        author: 'tickle122',
        article_id: 18,
        created_at: new Date(1468087638932),
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        votes: -1
      }
    ];

    expect(actual).to.eql(expected);
    expect(commentData).to.eql([
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ]);
  });
  it('returns a new object with all objects having the correct keys ', () => {
    const commentData = [
      {
        body:
          'Et ullam nihil repudiandae facere sunt cupiditate cum. Doloremque voluptatem rerum qui error omnis. Dolorum numquam dolorum voluptas ad.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 2,
        created_at: 1517206882610
      },
      {
        body:
          'Recusandae dolorem consequatur non a accusantium ea. Ut repudiandae doloremque expedita perspiciatis voluptas. Optio adipisci consequuntur. Reprehenderit veritatis eos voluptatem sed alias voluptatem atque. Eos repudiandae enim quos tenetur eos deserunt perspiciatis aut velit.',
        belongs_to:
          'Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams',
        created_by: 'cooljmessy',
        votes: 7,
        created_at: 1500667925948
      },
      {
        body:
          'Cumque qui eius consequatur pariatur reprehenderit at rem nobis. Consequatur id qui iste voluptatem iste esse eligendi. Et sint porro alias architecto dolores.',
        belongs_to: 'What to Cook This Week',
        created_by: 'jessjelly',
        votes: 5,
        created_at: 1478361168329
      },
      {
        body:
          'Fugiat molestiae iure et qui consequatur expedita quia. Est sed repellat nesciunt nulla sit in dolor laudantium. Totam vero et quam. In numquam magnam voluptas itaque. Quisquam vel vitae doloribus vel id laboriosam quibusdam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 16,
        created_at: 1455290509245
      },
      {
        body:
          'Eius dolor qui ut eligendi. Vero et animi consequatur placeat repudiandae ex dolores qui magni. Omnis magnam rerum molestiae. Nihil rerum ipsa error quibusdam. Qui temporibus quia quia. Natus necessitatibus numquam deserunt quisquam distinctio soluta consequatur.',
        belongs_to:
          'JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals',
        created_by: 'cooljmessy',
        votes: 3,
        created_at: 1494818834479
      },
      {
        body:
          'Quis iure rerum adipisci a porro ratione. Consequatur sequi ipsam esse ut ratione laudantium odio blanditiis fuga. Reprehenderit excepturi nihil beatae aut voluptate aliquid culpa animi.',
        belongs_to: 'Stone Soup',
        created_by: 'jessjelly',
        votes: 2,
        created_at: 1512417377998
      },
      {
        body:
          'Expedita praesentium porro doloremque doloribus consequuntur dolorum. Consequatur asperiores veritatis et debitis autem et vel fugit. Earum placeat nemo sit.',
        belongs_to:
          'An Introduction to JavaScript Object Notation (JSON) in JavaScript and .NET',
        created_by: 'grumpy19',
        votes: 0,
        created_at: 1468653917300
      },
      {
        body:
          'Hic qui omnis qui sit deserunt velit labore commodi repellat. Minus voluptatum dolore libero voluptatem praesentium aut iusto harum. Consequatur sit quasi. Est ad minus inventore ut reiciendis. Quos incidunt rerum. Ut omnis in voluptatum nesciunt.',
        belongs_to: 'Express.js: A Server-Side JavaScript Framework',
        created_by: 'tickle122',
        votes: -2,
        created_at: 1492252444928
      }
    ];
    const articleRef = {
      'Running a Node App': 1,
      "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
      '22 Amazing open source React projects': 3,
      'Making sense of Redux': 4,
      'Please stop worrying about Angular 3': 5,
      'JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals': 6,
      'Using React Native: One Year Later': 7,
      'Express.js: A Server-Side JavaScript Framework': 8,
      'Learn HTML5, CSS3, and Responsive WebSite Design in One Go': 9,
      'An Introduction to JavaScript Object Notation (JSON) in JavaScript and .NET': 10,
      'Designing Better JavaScript APIs': 11,
      'The battle for Node.js security has only begun': 12,
      "What does Jose Mourinho's handwriting say about his personality?": 13,
      'Who Will Manage Your Club in 2021?': 14,
      'Why do England managers keep making the same mistakes?': 15,
      'History of FC Barcelona': 16,
      'Which current Premier League manager was the best player?': 17,
      'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18,
      'Who are the most followed clubs and players on Instagram?': 19,
      'History of Football': 20,
      'Agility Training Drills For Football Players': 21,
      'Defensive Metrics: Measuring the Intensity of a High Press': 22,
      'Sunday league football': 23,
      'Game of talents: management lessons from top football coaches': 24,
      'Sweet potato & butternut squash soup with lemon & garlic toast': 25,
      'HOW COOKING HAS CHANGED US': 26,
      'Thanksgiving Drinks for Everyone': 27,
      'High Altitude Cooking': 28,
      'A BRIEF HISTORY OF FOOD—NO BIG DEAL': 29,
      'Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams': 30,
      'What to Cook This Week': 31,
      'Halal food: Keeping pure and true': 32,
      'Seafood substitutions are increasing': 33,
      'The Notorious MSG’s Unlikely Formula For Success': 34,
      'Stone Soup': 35,
      'The vegan carnivore?': 36
    };
    const actual = formatComments(commentData, articleRef);

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i]).to.have.all.keys(
        'author',
        'article_id',
        'created_at',
        'body',
        'votes'
      );
    }
  });
});
