const jwtDecode = require('jwt-decode');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU3MjljNy0xOTMxLTQ0MzUtOGQ5NC02NGY3ZWZiZmY5NTYiLCJpYXQiOjE2MjYwODg2NzgsImV4cCI6MTYyNzg4ODY3OH0.aK31WkyIOidz6AvkbSsn4nqLNpx90TxZWs7s0DEuzh4';

const decoded = jwtDecode(token);

console.log(decoded);
