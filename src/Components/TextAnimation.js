import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

function TextAnimation() {
  const textRef = useRef(null);

  useEffect(() => {
    // Wrap every letter in a span
    const textWrapper = textRef.current.querySelector('.letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.ml9 .letter',
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i+1)
      }).add({
        targets: '.ml9',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });

    // Clean up function to remove the animation when the component unmounts
    return () => {
      anime.remove(textWrapper); // Remove animation
    };
  }, [textRef]);

  return (
    <h1 ref={textRef} className="ml9">
      <span className="text-wrapper">
        <span className="letters">Coffee mornings</span>
      </span>
    </h1>
  );
}

export default TextAnimation;
