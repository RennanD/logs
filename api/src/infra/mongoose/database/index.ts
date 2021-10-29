import { connect } from 'mongoose';

const database = connect('mongodb://mongo_logs:27017/logsv2');

export default database;
