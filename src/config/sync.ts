import {RealtimeClient} from '@supabase/realtime-js';
import * as utils from '../utils';
import * as C from '../constants/';

const REALTIME_URL = process.env.REALTIME_URL || 'http://realtime:4000/socket';

const client = new RealtimeClient(REALTIME_URL, { 
    params: { 
        apikey: utils.webToken.create({'iss': 'Issuer', 'nbf': 1610078130})
    }
});

export const init = (mediator) => {
    mediator.once(C.events.SYNC_START, () => {
        // Connect to the realtime server
        client.connect()
        client.onOpen(() => {
            utils.log.info('[TableListener connected] ');
            mediator.emit(C.events.SYNC_READY);
        })
        client.onError((e) => utils.log.error({err: e}))
        client.onClose(() => utils.log.warn(['Realtime Connection Closed']))
        
        // Set up table listener (auth_journal table)
        const AuthJournalListener = client.channel('realtime:public:auth_journal');
        AuthJournalListener.on('INSERT', (change) => {
          utils.log.info('[INSERT on Table Listener] ', change.table);
          const record = change.record;
          utils.broker.publish('', record.event_type, record.event_data);
        });
        AuthJournalListener.subscribe();
    });
}