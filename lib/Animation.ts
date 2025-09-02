export enum AnimationTypes {
  IdleNormal,
  WalkNormal,
  IdleBounce,
  WalkBounce,
}

export const ANIMATION_FRAMES: Record<AnimationTypes, string[]> = {
  [AnimationTypes.IdleNormal]: [
    "/sprites/idle-normal-1.png",
    "/sprites/idle-normal-2.png",
  ],
  [AnimationTypes.WalkNormal]: [
    "/sprites/walk-normal-1.png",
    "/sprites/walk-normal-2.png",
    "/sprites/walk-normal-3.png",
    "/sprites/walk-normal-4.png",
    "/sprites/walk-normal-5.png",
    "/sprites/walk-normal-6.png",
  ],
  [AnimationTypes.IdleBounce]: [],
  [AnimationTypes.WalkBounce]: [],
};
