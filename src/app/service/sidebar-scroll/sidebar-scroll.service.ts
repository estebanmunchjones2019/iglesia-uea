import {Injectable} from "@angular/core";

@Injectable()
export class SidebarScrollService {


  public scrollMultimediaPerformer = null;
  public scrollMeetingsPerformer = null;
  public scrollNewsPerformer = null;
  public scrollTextPerformer = null;


  inViewport() {
    if (this.scrollMultimediaPerformer != null) {
      this.scrollMultimediaPerformer.isInViewport();
    }
    if (this.scrollMeetingsPerformer != null) {
      this.scrollMeetingsPerformer.isInViewport();
    }
    if (this.scrollNewsPerformer != null) {
      this.scrollNewsPerformer.isInViewport();
    }
    if (this.scrollTextPerformer != null) {
      this.scrollTextPerformer.isInViewport();
    }

  }
}
