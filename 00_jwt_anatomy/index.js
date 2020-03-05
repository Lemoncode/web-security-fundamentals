// Reference: https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
let data = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
let buff = Buffer.from(data, 'base64'); // new Buffer(data, 'base64');
let text = buff.toString('ascii');

console.log(text);