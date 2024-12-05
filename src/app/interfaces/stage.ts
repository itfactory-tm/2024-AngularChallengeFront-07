import {TimeSlot} from "./timeSlot";

export interface Stage {
  stageId: string;
  name: string;
  locationId: string;
  locationName: string;
  timeSlotsRanges?: TimeSlot[];
  photos: string[];
}
