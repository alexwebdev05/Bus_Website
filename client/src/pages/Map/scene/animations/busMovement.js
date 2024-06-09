// import * as THREE from 'three';

// const clock = new THREE.Clock();

export function busMovement(bus, curve, renderer, camera, scene, position) {
    // function animate() {
    //     requestAnimationFrame(animate);

    //     const elapsedTime = clock.getElapsedTime();

    //     // Normalizar el tiempo para que esté en el rango [0, 1]
    //     const t = (elapsedTime % 10) / 10;

    //     // Obtener la posición y la tangente en el punto t de la curva
    //     const point = curve.getPointAt(t);
    //     const tangent = curve.getTangentAt(t);

    //     if (point && tangent) {
    //         // Actualizar la posición del autobús
    //         bus.position.set(point.x, point.y, point.z);

    //         // Crear una matriz de orientación a partir de la tangente
    //         const quaternion = new THREE.Quaternion();
    //         quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

    //         // Aplicar la rotación al autobús
    //         bus.quaternion.copy(quaternion);
    //     } else {
    //         clock.start();
    //     }

    //     renderer.render(scene, camera);
    // }
    // animate()  

    let working = true;
    function animate() {
        if (!working) return;

        bus.position.set(-1.7629743987277595, 0.35, -0.25585369174495254);

        console.log(position.data)

        // bus.position.set(position.x, position.y, position.z);


        // // From point1 to point2
        // function point1ToPoint2() {
        //     if (!working) return;
            
        //     requestAnimationFrame(point1ToPoint2)
            
        //     // Time clock
        //     const elapsedTime = clock.getElapsedTime();

        //     // Speed
        //     const t = (elapsedTime % 10) / 10;

        //     const point = curve.getPointAt(t);
        //     const tangent = curve.getTangentAt(t);

        //     if (point && tangent) {
        //         bus.position.set(point.x, point.y, point.z);

        //         const quaternion = new THREE.Quaternion();
        //         quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

        //         bus.quaternion.copy(quaternion);
        //     } else {
        //         clock.start();
        //     }

        //     renderer.render(scene, camera);
        // }
        // point1ToPoint2()
    }
    animate()
    // Detener la animación después de 3 segundos
    setTimeout(() => {
        working = false;
    }, 30000);
    
    
}