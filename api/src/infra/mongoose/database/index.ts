import { connect } from 'mongoose';

const database = connect('mongodb://localhost:27017/logsv3');

export default database;
