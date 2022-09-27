var mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
  console.log('Do not try to create DB seeds in production');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI);
mongoose.set('debug', true);

require('../models/User');
require('../models/Item');
require('../models/Comment');

var User = mongoose.model('User');
var Item = mongoose.model('Item');
var Comment = mongoose.model('Comment');

var NUM_OBJECTS_TO_CREATE = 100;
var SEED_USERS_PASSWORD = '12345678';

async function createSeedUsers() {
  var userObjects = [];
  for (var i = 0; i < NUM_OBJECTS_TO_CREATE; i++) {
    var currentUser = new User();
    currentUser.username = `seed${i + 1}`;
    currentUser.email = `seed${i + 1}@example.com`;
    currentUser.setPassword(SEED_USERS_PASSWORD);
    userObjects.push(currentUser);
  }

  var allUsernames = userObjects.map((user) => user.username);

  var alreadyCreatedUsers = await User.find({ username: { $in: allUsernames } }).exec();
  var alreadyCreatedUsernames = alreadyCreatedUsers.map((user) => user.username);
  var usersNotYetCreated = userObjects.filter(
    (user) => !alreadyCreatedUsernames.includes(user.username),
  );

  if (usersNotYetCreated.length > 0) {
    // Changed from bulk insert to one by one in order for auto-generated columns (such as timestamps and slugs) to work
    //   await User.collection.insertMany(usersNotYetCreated);
    for (var user of usersNotYetCreated) {
      await user.save();
    }
  }

  return await User.find({ username: { $in: allUsernames } }).exec();
}

async function createSeedItems(users) {
  var itemObjects = [];
  for (var i = 0; i < NUM_OBJECTS_TO_CREATE; i++) {
    var currentItem = new Item({
      title: `Seed Item ${i + 1}`,
      description: `Item #${i + 1} that was created as part of the DB seeds`,
      image: 'https://picsum.photos/536/354',
      tagList: ['Seed'],
      seller: users[i],
    });
    itemObjects.push(currentItem);
  }

  var allTitles = itemObjects.map((item) => item.title);

  var alreadyCreatedItems = await Item.find({ title: { $in: allTitles } }).exec();
  var alreadyCreatedItemTitles = alreadyCreatedItems.map((item) => item.title);
  var itemsNotYetCreated = itemObjects.filter(
    (item) => !alreadyCreatedItemTitles.includes(item.title),
  );

  if (itemsNotYetCreated.length > 0) {
    // Changed from bulk insert to one by one in order for auto-generated columns (such as timestamps and slugs) to work
    // await Item.collection.insertMany(itemsNotYetCreated);
    for (var item of itemsNotYetCreated) {
      await item.save();
    }
  }

  return await Item.find({ title: { $in: allTitles } }).exec();
}

async function createSeedComments(users, items) {
  var commentObjects = [];
  for (var i = 0; i < NUM_OBJECTS_TO_CREATE; i++) {
    var currentComment = new Comment({
      body: `Seed Comment ${i + 1}`,
      item: items[i],
      seller: users[i],
    });
    commentObjects.push(currentComment);
  }

  var allCommentBodies = commentObjects.map((comment) => comment.body);

  var alreadyCreatedComments = await Comment.find({ body: { $in: allCommentBodies } }).exec();
  var alreadyCreatedCommentBodies = alreadyCreatedComments.map((comment) => comment.body);
  var commentNotYetCreated = commentObjects.filter(
    (comment) => !alreadyCreatedCommentBodies.includes(comment.body),
  );

  if (commentNotYetCreated.length > 0) {
    // Changed from bulk insert to one by one in order for auto-generated columns (such as timestamps and slugs) to work
    // await Comment.collection.insertMany(commentNotYetCreated);
    for (var comment of commentNotYetCreated) {
      await comment.save();
    }
  }

  var comments = await Comment.find({ body: { $in: allCommentBodies } })
    .populate('item')
    .exec();

  for (var comment of comments) {
    var item = await Item.findOne({ _id: comment.item._id });
    if (!item.comments.some((c) => c._id.toString() === comment._id.toString())) {
      item.comments = item.comments.concat([comment]);
      item.save();
    }
  }

  return comments;
}

async function createSeeds() {
  console.log('Creating seed users');
  var createdUsers = await createSeedUsers();

  console.log('Creating seed items');
  var createdItems = await createSeedItems(createdUsers);

  console.log('Creating seed comments');
  await createSeedComments(createdUsers, createdItems);
}

void createSeeds().then(() => {
  console.log('Finished creating DB seeds');
  process.exit(0);
});
