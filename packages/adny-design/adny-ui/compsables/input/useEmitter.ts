import mitt from "mitt";

export type Events = {
  validate: undefined;
};

export const emitter = mitt<Events>();
