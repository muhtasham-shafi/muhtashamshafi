/**
 * The Miracle Robotics "M" mark, redrawn as a vector from the logo artwork.
 * The same shapes are used in app/icon.svg (the browser-tab icon).
 */
export const MARK_BRIGHT = "#0058e1";
export const MARK_NAVY = "#052c77";

// Both legs end in a mounting hole, drawn as an evenodd cut-out.
const hole = (cx: number, cy: number) => `M${cx - 37} ${cy}a37 37 0 1 0 74 0a37 37 0 1 0 -74 0Z`;

export const markPaths = {
  left: `M588 564L723 496L1097 729L969 812L736 664L736 963L610 1097L534 1036Q512 1003 522 969L588 898Z${hole(609, 987)}`,
  right: `M989 632L1202 496L1338 564L1338 898L1407 969Q1414 1005 1394 1033L1317 1097L1189 963L1189 671L1121 713Z${hole(1316, 987)}`,
  cubeLeft: "M807 780L963 881L963 1051L807 947Z",
  cubeRight: "M963 881L1118 780L1118 947L963 1051Z",
};

export const MARK_VIEWBOX = "510 490 906 614";

export default function MiracleMark({ className, title = "Miracle Robotics" }: { className?: string; title?: string }) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} role="img" aria-label={title}>
      <path d={markPaths.left} fill={MARK_BRIGHT} fillRule="evenodd" />
      <path d={markPaths.right} fill={MARK_NAVY} fillRule="evenodd" />
      <path d={markPaths.cubeLeft} fill={MARK_NAVY} />
      <path d={markPaths.cubeRight} fill={MARK_BRIGHT} />
    </svg>
  );
}
