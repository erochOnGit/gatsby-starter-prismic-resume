import React, { useRef } from "react";
import Boxes from "../../components/multiple/Boxes";
function Content() {
  const ref = useRef();
  //   useFrame(
  //     () =>
  //       (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.005)
  //   );
  return (
    <group ref={ref}>
      <Boxes amount={2} material="meshBasicMaterial" color="lightpink" />
      <Boxes amount={3} color="#575760" />
    </group>
  );
}
export default Content;
