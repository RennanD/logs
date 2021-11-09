import { connect } from 'mongoose';

const database = connect('mongodb://localhost:27017/logsv4');

export default database;
