let parent = document.getElementsByClassName("button");
Array.prototype.forEach.call(parent, child => {
    child.addEventListener('click',async (event) => {
                let currentButton = event.currentTarget;
                if(currentButton.className === "button"){
                    currentButton.className = "button-non-active"
                    currentButton.innerHTML = `<div class="button__animation">
        <div class="button__dot"></div>
        <div class="button__dot"></div>
        <div class="button__dot"></div>
</div>`;
            setTimeout(() => {
                console.log(currentButton.innerHTML);
                currentButton.innerHTML = `<svg class="button__checkMark" xmlns="http://www.w3.org/2000/svg"
         width="40"
         height="40"
         viewBox="0 0 24 24">
            <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="0%" gradientTransform="rotate(270, 0.5, 0.5)">
                <stop offset="0%" style="stop-color:rgb(40, 40, 40);stop-opacity:0" />
                <stop offset="80%" style="stop-color:rgb(40, 40, 40);stop-opacity:0" />
                <stop offset="100%" style="stop-color:rgb(40, 40, 40);stop-opacity:1" />
            </linearGradient>
                <animate xlink:href="#grad3"
                         attributeName="x1"
                         dur="300ms"
                         keyTimes="0 ; 0.12 ; 0.36 ; 0.69 ; 0.89 ; 0.98 ; 1"
                         values="0; 0.06 ; 0.08 ; 0.30 ; 0.50 ; 0.90 ; 1"
                         fill="freeze"/>
                <animate xlink:href="#grad3"
                         attributeName="x2"
                         dur="600ms"
                         keyTimes="0 ; 0.12 ; 0.36 ; 0.69 ; 0.89 ; 0.98 ; 1"
                         values="0; 0.06 ; 0.08 ; 0.30 ; 0.50 ; 0.90 ; 1"
                         fill="freeze"/>
                <animate xlink:href="#grad3"
                         attributeName="y1"
                         dur="300ms"
                         keyTimes="0 ; 0.12 ; 0.36 ; 0.69 ; 0.89 ; 0.98 ; 1"
                         values="0; 0.06 ; 0.08 ; 0.30 ; 0.50 ; 0.90 ; 1"
                         fill="freeze"/>
                <animate xlink:href="#grad3"
                         attributeName="y2"
                         dur="600ms"
                         keyTimes="0 ; 0.12 ; 0.36 ; 0.69 ; 0.89 ; 0.98 ; 1"
                         values="0; 0.06 ; 0.08 ; 0.30 ; 0.50 ; 0.90 ; 1"
                         fill="freeze"/>
            </defs>
            <path fill="url(#grad3)"
                  d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
            />

    </svg>`;
            }, 2000);
            setTimeout(()=>{
                currentButton.innerHTML = `<div>КУПИТЬ</div>`;
                currentButton.className = "button";
            }, 4000);
        }
    })
});