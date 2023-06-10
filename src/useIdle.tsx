import { useCallback, useDebugValue, useEffect, useRef, useState } from "react";

const useIdle = ({ delay }) => {
  const [isIdle, setIsIdle] = useState(false);
  const id = useRef(null);
  const cb = useRef(null);
  const onMouseMove = useCallback(
    (e) => {
      console.log(isIdle);
      if (isIdle) {
        setIsIdle(false);
        console.log("yes");
      }
      clearTimeout(id.current);
      id.current = setTimeout(() => {
        setIsIdle(true);
      }, delay);
    },
    [isIdle]
  );

  useEffect(() => {
    const cbMouseMove = (e) => {
      if (cb.current) cb.current(e);
    };
    window.addEventListener("mousemove", cbMouseMove);
    window.addEventListener("click", cbMouseMove);
    window.addEventListener("dblclick", cbMouseMove);
    window.addEventListener("keydown", cbMouseMove);
    window.addEventListener("keyup", cbMouseMove);
    window.addEventListener("keypress", cbMouseMove);
    window.addEventListener("mouseover", cbMouseMove);
    window.addEventListener("scroll", cbMouseMove);

    setTimeout(() => {
      if (id.current === null) {
        setIsIdle(true);
      }
    }, delay);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    cb.current = onMouseMove;
  });

  return isIdle;
};
export default useIdle;
