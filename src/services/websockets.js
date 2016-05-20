import {stream} from '../actions/live';

export function register () {
  primus.on('data', data => {
    console.log('incoming socket data', data);
  });

  primus.on('error', err => {
    console.error('Ooops', err.stack);
  });

}
