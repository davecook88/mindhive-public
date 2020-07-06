const UserMetrics = require('./src/client/classes/UserMetrics');
const sample = require( './src/client/classes/SampleSheets');

const um = new UserMetrics(sample.am, sample.pm, sample.meals);
return um;