const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");
const song = document.getElementById("song");
const openBtn = document.getElementById("openBtn");
const secretBtn = document.getElementById("secretBtn");
const secretAnswer = document.getElementById("secretAnswer");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

musicBtn.addEventListener("click", async () => {
  try {
    if (song.paused) {
      await song.play();
      musicBtn.classList.add("playing");
      musicText.textContent = "musik menyala";
    } else {
      song.pause();
      musicBtn.classList.remove("playing");
      musicText.textContent = "putar lagu";
    }
  } catch {
    musicText.textContent = "tambahkan lagu dulu";
  }
});

openBtn.addEventListener("click", () => {
  document.querySelector(".intro").scrollIntoView({behavior:"smooth"});
  burstHearts(16);
});

secretBtn.addEventListener("click", () => {
  secretAnswer.classList.toggle("show");
  if (secretAnswer.classList.contains("show")) burstHearts(10);
});

document.querySelectorAll(".reason").forEach(btn => {
  btn.addEventListener("click", () => {
    modalText.textContent = btn.dataset.note;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
  });
});
function close(){ modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); }
closeModal.addEventListener("click", close);
modal.addEventListener("click", e => { if(e.target === modal) close(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function burstHearts(n){
  for(let i=0;i<n;i++){
    setTimeout(()=>{
      const h=document.createElement("span");
      h.className="heart-float";
      h.textContent=["♡","♥","✦"][Math.floor(Math.random()*3)];
      h.style.left=Math.random()*100+"vw";
      h.style.fontSize=(12+Math.random()*18)+"px";
      h.style.animationDuration=(3+Math.random()*3)+"s";
      document.getElementById("hearts").appendChild(h);
      setTimeout(()=>h.remove(),6500);
    },i*80);
  }
}
setInterval(()=>burstHearts(1),1700);
