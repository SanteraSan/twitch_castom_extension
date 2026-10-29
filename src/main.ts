import anchorsText from "../.cursor/skills/overlay-layout/references/anchors.md?raw";
import { readAnchors, type Rect } from "./anchors";
import "./style.css";

const anchors = readAnchors(anchorsText);

document.documentElement.style.width = `${anchors.canvas.width}px`;
document.documentElement.style.height = `${anchors.canvas.height}px`;
document.body.style.width = `${anchors.canvas.width}px`;
document.body.style.height = `${anchors.canvas.height}px`;

function addFrame(name: string, rect: Rect) {
  const frame = document.createElement("div");
  frame.className = "frame";
  frame.id = name;
  frame.style.left = `${rect.x}px`;
  frame.style.top = `${rect.y}px`;
  frame.style.width = `${rect.width}px`;
  frame.style.height = `${rect.height}px`;
  document.body.append(frame);
}

addFrame("minimap", anchors.minimap);
addFrame("hero", anchors.hero);

const check = new URLSearchParams(window.location.search).has("check");
if (check) {
  const image = new URL("../assets/img/for_twitch.png", import.meta.url).href;
  document.body.style.background = `url("${image}") 0 0 / ${anchors.canvas.width}px ${anchors.canvas.height}px no-repeat`;
}
