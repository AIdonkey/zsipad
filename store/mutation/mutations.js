import {
  HOSPITAL,
  PERSONINFO,
  COMBO,
  YOURCOMBO,
} from './mutation_types';

export default {
  [HOSPITAL](state, variable) {
    state.hospital = variable;
  },
  [PERSONINFO](state, variable) {
    state.personinfo = variable;
  },
  [COMBO](state, variable) {
    state.combo = variable;
  },
  [YOURCOMBO](state, variable) {
    state.yourcombo = variable;
  },
};
