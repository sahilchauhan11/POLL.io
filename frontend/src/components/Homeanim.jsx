import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
const Homeanim = () => {
    const textRef=useRef();
    useEffect(() => {
        const text = textRef.current;
        const letters = text.innerText.split('');
        
        text.innerHTML = letters.map(letter => `<span class="letter">${letter}</span>`).join('');
    
        const letterElements = text.querySelectorAll('.letter');
    
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
        tl.from(text, { y: -100, opacity: 0, duration: 1 })
          .to(text, { y: 0, opacity: 1, duration: 1 });
    
        tl.fromTo(
          letterElements,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 }, // 
          "-=0.5" 
        );
      
      }, []); 
     
  return (
    <div className='text-4xl w-full h-full flex flex-wrap text-white font-semibold justify-center items-center' ref={textRef}>
       
      Craft Polls, Collect Opinions, Create Change!
    </div>
  )
}

export default Homeanim
