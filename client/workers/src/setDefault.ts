import * as THREE from "three";
import { positionSetter } from "./getPosition/cubeLand/positionSetter";

export function setDefault() {
    // Crea un objeto de tipo THREE.Object3D para representar el autobús
    // Bus state
    let busPosition = new THREE.Object3D

    // Llama a la función positionSetter con los argumentos necesarios
    positionSetter(busPosition);
}
