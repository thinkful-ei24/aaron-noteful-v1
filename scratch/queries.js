'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('cats', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
// notes.find(1001, (err, item) => {
//   if (err) {
//     console.error(err);
//   }
//   if (item) {
//     console.log(item);
//   } else {
//     console.log('not found');
//   }
// });

// // PUT (Update) Notes by ID
// const updateObj = {
//   title: 'New Title',
//   content: 'Blah blah blah'
// };

// notes.update(1005, updateObj, (err, item) => {
//   if (err) {
//     console.error(err);
//   }
//   if (item) {
//     console.log(item);
//   } else {
//     console.log('not found');
//   }
// });

// let newItem = {
//   "title": "Why you should forget everything you learned about cats",
//   "content": "Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl."
// };

// notes.create(newItem, (err, item) => {
//   if (err) {
//     console.error(err);
//   }
//   if (item) {
//     console.log(item);
//   }
//   else {
//     console.log('cannot create new item');
//   }
// });

notes.delete(1001, (err, item) => {
  if (err) {
    console.log(err);
  }
  if (item) {
    console.log('deleted item');
  }
});