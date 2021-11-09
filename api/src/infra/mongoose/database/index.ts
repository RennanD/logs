import { connect } from 'mongoose';

const database = connect(String(process.env.MONGODB_URL));

export default database;
