import {Realm} from '@realm/react';
import {ObjectSchema} from 'realm';
import {generateVidId} from '../util/video';

export class MediaPicker extends Realm.Object<MediaPicker> {
  static schema: ObjectSchema = {
    name: 'MediaPicker',
    properties: {
      id: {type: 'string', default: generateVidId()},
      name: 'string',
      thumbnail: 'string',
      duration: 'int',
      timelineData: 'string[]',
      typeVid: {type: 'string', default: 'videoImport'},
    },
  };
}

export class MediaEdited extends Realm.Object<MediaEdited> {
  static schema: ObjectSchema = {
    name: 'MediaEdited',
    properties: {
      id: {type: 'string', default: generateVidId()},
      name: 'string',
      thumbnail: 'string',
      duration: 'int',
      timelineData: 'string[]',
      typeVid: {type: 'string', default: 'videoEdited'},
    },
  };
}
