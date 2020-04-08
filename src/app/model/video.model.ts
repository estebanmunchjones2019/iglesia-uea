import { Moment } from 'moment';

export class VideoModel {
  public id: string;
  public url: string;
  public type: string;
  public date: Moment;
  public title: string;
  public description: string;
  public preacher: string;
}
