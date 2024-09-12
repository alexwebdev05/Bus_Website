import * as THREE from "three"

import { wayCubeLand } from "./wayCubeland";

let curve = wayCubeLand()

export async function cubeLandPosition() {

    // Send position
    return {
        type: "position",
        data: {
            x: -0.7806291829884668,
            y:  0.35,
            z:  1.9300236668481054
        }
    };
}