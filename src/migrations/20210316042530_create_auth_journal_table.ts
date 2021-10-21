import * as utils from '../utils/';
import * as c from '../constants/';
import * as T from '../components/Auth/types';
import {TableBuilder} from 'knex';

const schema = (table: TableBuilder) => {
  table.increments('event_id');
  table.enum('event_type', [
    c.events.INVITE_EMAIL_REQUESTED,
    c.events.NEW_USER_SIGNED_UP_WITH_EMAIL,
    c.events.RECOVERY_EMAIL_VERIFIED,
    c.events.SIGNUP_EMAIL_VERIFIED,
    c.events.USER_DATA_UPDATED,
    c.events.USER_LOGGED_IN,
    c.events.USER_LOGGED_OUT,
    c.events.USER_PASSWORD_RECOVERY_REQUESTED,
    c.events.USER_PASSWORD_CHANGED,
  ]);
  table.uuid('entity_id');
  table.enum('entity_type', [T.ENTITIES.USER]);
  table.json('event_data');
  table.timestamps(true);
}

export const up = async function(knex) {
  await utils.migrate.createTable(knex, c.tables.AUTH_JOURNAL, schema, Promise)
};

export const down = async function(knex) {
  await utils.migrate.destroyTable(knex, c.tables.AUTH_JOURNAL, Promise)
};