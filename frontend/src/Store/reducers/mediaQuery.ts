const INITAIL_MEDIA_QUERY: string = "PC";

export const SetMediaQuery = (media: any) => {
  return {
    type: `MEDIAQUERY/${media}`,
    media: media,
  };
};
export const Desktop = {
  type: "MEDIAQUERY/Desktop",
  media: "Desktop",
};
export const Tablet = {
  type: "MEDIAQUERY/Tablet",
  media: "Tablet",
};
export const Mobile = {
  type: "MEDIAQUERY/Mobile",
  media: "Mobile",
};
export const MediaQueryReducer = (
  state = INITAIL_MEDIA_QUERY,
  action: { type: string; media: string }
) => {
  switch (action.type) {
    case `MEDIAQUERY/${action.media}`:
      return action.media;
    default:
      return state;
  }
};
