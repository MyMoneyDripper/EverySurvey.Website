const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const newData = data.map(item => {
  if (!item.Tags) {
    item.Tags = [];
  }
  return item;
});

fs.writeFileSync('data.json', JSON.stringify(newData, null, 2));
