import { connect } from 'mongoose';

const database = connect('mongodb://mongo_logs:27017/logs');

export default database;
