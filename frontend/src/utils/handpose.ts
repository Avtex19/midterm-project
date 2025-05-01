import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";

// Types
export type HandPose = "thumbs_up" | "thumbs_down" | "flat_hand" | null;
export type Landmark = [number, number];
export type Landmarks = Landmark[];

// Load the handpose model
export const loadHandposeModel = async (): Promise<any> => {
  try {
    const model = await handpose.load();
    console.log("Handpose model initialized");
    return model;
  } catch (error) {
    console.error("Unable to initialize handpose model:", error);
    throw new Error("Hand pose model load failure");
  }
};

// Analyze landmarks and infer hand gesture
export const detectHandPoseFromLandmarks = (landmarks: Landmarks): HandPose => {
  if (!landmarks || landmarks.length < 21) return null;

  try {
    const [wrist, , thumbBase, , thumbTip, , , , indexTip, , , , middleTip, , , , ringTip, , , , pinkyTip] = landmarks;

    const thumbExtended = isFingerExtended(thumbTip, thumbBase, wrist);
    const indexExtended = isFingerExtended(indexTip, landmarks[6], wrist);
    const middleExtended = isFingerExtended(middleTip, landmarks[10], wrist);
    const ringExtended = isFingerExtended(ringTip, landmarks[14], wrist);
    const pinkyExtended = isFingerExtended(pinkyTip, landmarks[18], wrist);

    const thumbDown = isThumbPointingDown(thumbTip, thumbBase, wrist);

    if (
        thumbExtended &&
        !indexExtended &&
        !middleExtended &&
        !ringExtended &&
        !pinkyExtended &&
        !thumbDown
    ) {
      return "thumbs_up";
    }

    if (thumbDown) return "thumbs_down";

    if (
        thumbExtended &&
        indexExtended &&
        middleExtended &&
        ringExtended &&
        pinkyExtended
    ) {
      return "flat_hand";
    }
  } catch (error) {
    console.error("Gesture detection failed:", error);
  }

  return null;
};

// Determine if a finger is extended based on landmark angles
const isFingerExtended = (
    tip: Landmark,
    middle: Landmark,
    wrist: Landmark
): boolean => {
  try {
    const vec1 = [tip[0] - middle[0], tip[1] - middle[1]];
    const vec2 = [middle[0] - wrist[0], middle[1] - wrist[1]];

    const dot = vec1[0] * vec2[0] + vec1[1] * vec2[1];
    const mag1 = Math.hypot(vec1[0], vec1[1]);
    const mag2 = Math.hypot(vec2[0], vec2[1]);

    if (!mag1 || !mag2) return false;

    const angle = Math.acos(dot / (mag1 * mag2));

    return angle < Math.PI / 2;
  } catch (error) {
    console.error("Error in finger extension check:", error);
    return false;
  }
};

// Determine if the thumb is pointing down using angles and position
const isThumbPointingDown = (
    thumbTip: Landmark,
    thumbBase: Landmark,
    wrist: Landmark
): boolean => {
  try {
    const vecPalm = [thumbBase[0] - wrist[0], thumbBase[1] - wrist[1]];
    const vecThumb = [thumbTip[0] - thumbBase[0], thumbTip[1] - thumbBase[1]];

    const dot = vecPalm[0] * vecThumb[0] + vecPalm[1] * vecThumb[1];
    const magPalm = Math.hypot(vecPalm[0], vecPalm[1]);
    const magThumb = Math.hypot(vecThumb[0], vecThumb[1]);

    if (!magPalm || !magThumb) return false;

    const angle = Math.acos(dot / (magPalm * magThumb));

    const downwardPos = thumbTip[1] > wrist[1] && thumbTip[1] > thumbBase[1];

    return angle > (5 * Math.PI) / 9 || downwardPos;
  } catch (error) {
    console.error("Error in thumb down check:", error);
    return false;
  }
};
