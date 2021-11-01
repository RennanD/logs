import { connect } from 'mongoose';

const database = connect('mongodb://localhost:27017/logsv2');

export default database;
