/* ==========================================
   SURA.AI — SCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {
	initializeApp();
});

function initializeApp(){
	setupTheme();
	setupSidebar();
	setupNavbar();
	setupDropdown();
	setupGlow();
	setupHistory();
	setupChatActions();
	autoResize();
	initializeVoice();
	initializeUpload();
	console.log("🚀 Sura.ai Loaded");
}

/* ---------- GLOW EFFECT ---------- */

function setupGlow(){
	const wrapper = document.getElementById("chatWrapper");
	if(!wrapper) return;

	wrapper.addEventListener("mousemove",(e)=>{
		const rect = wrapper.getBoundingClientRect();
		wrapper.style.setProperty("--x", `${e.clientX-rect.left}px`);
		wrapper.style.setProperty("--y", `${e.clientY-rect.top}px`);
	});
}

/* ---------- SIDEBAR (hamburger always visible, shifts navbar + content) ---------- */

function setupSidebar(){
	const menuBtn = document.getElementById("menuBtn");
	const sidebar = document.getElementById("sidebar");
	const navbar = document.getElementById("topNavbar");
	const container = document.getElementById("mainContainer");

	if(!menuBtn || !sidebar) return;

	function toggleSidebar(){
		const isOpen = sidebar.classList.toggle("active");
		menuBtn.classList.toggle("shift", isOpen);
		navbar.classList.toggle("shift", isOpen);
		container.classList.toggle("shift", isOpen);

		if(isOpen){
			container.style.marginLeft = "calc(var(--sidebar-w) + 40px)";
		} else {
			container.style.marginLeft = "";
		}
	}

	menuBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		toggleSidebar();
	});

	document.addEventListener("click", (e) => {
		if(!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains("active")){
			toggleSidebar();
		}
	});

	document.addEventListener("keydown", (e) => {
		if(e.key === "Escape" && sidebar.classList.contains("active")){
			toggleSidebar();
		}
	});
}

/* ---------- NAVBAR ---------- */

function setupNavbar(){
	const items = document.querySelectorAll(".nav-links li");

	items.forEach(item=>{
		item.addEventListener("click",(e)=>{
			e.preventDefault();
			items.forEach(i=> i.classList.remove("active"));
			item.classList.add("active");
		});
	});

	const searchIcon = document.getElementById("searchIcon");
	if(searchIcon){
		searchIcon.addEventListener("click", () => alert("Search Coming Soon 🚀"));
	}

	const profileBtn = document.querySelector(".profile-btn");
	if(profileBtn){
		profileBtn.addEventListener("click", () => alert("Profile Feature Coming Soon 👤"));
	}
}

/* ---------- THEME (Light / Dark) ---------- */

function setupTheme(){
	const sidebarThemeBtn = document.getElementById("themeBtn");
	const navThemeBtn = document.getElementById("themeIcon");

	const applyLabel = () => {
		const light = document.body.classList.contains("light-theme");
		if(sidebarThemeBtn) sidebarThemeBtn.innerHTML = light ? "☀️ Theme" : "🌙 Theme";
		if(navThemeBtn) navThemeBtn.innerHTML = light ? "☀️" : "🌙";
	};

	const savedTheme = localStorage.getItem("theme");
	if(savedTheme === "light"){
		document.body.classList.add("light-theme");
	}
	applyLabel();

	const toggle = () => {
		document.body.classList.toggle("light-theme");
		const light = document.body.classList.contains("light-theme");
		localStorage.setItem("theme", light ? "light" : "dark");
		applyLabel();
	};

	if(sidebarThemeBtn) sidebarThemeBtn.addEventListener("click", toggle);
	if(navThemeBtn) navThemeBtn.addEventListener("click", toggle);
}

/* ---------- DROPDOWN ---------- */

function setupDropdown(){
	const dropdown = document.querySelector(".dropdown");
	const button = document.querySelector(".dropdown-btn");
	const selected = document.getElementById("selectedText");
	const options = document.querySelectorAll(".dropdown-menu div");

	if(!dropdown || !button) return;

	button.addEventListener("click",(e)=>{
		e.stopPropagation();
		dropdown.classList.toggle("active");
	});

	options.forEach(option=>{
		option.addEventListener("click",()=>{
			selected.textContent = option.textContent;
			options.forEach(item=> item.classList.remove("selected"));
			option.classList.add("selected");
			dropdown.classList.remove("active");
		});
	});

	window.addEventListener("click",()=>{
		dropdown.classList.remove("active");
	});
}

/* ---------- CHAT HISTORY ---------- */

function setupHistory(){
	loadHistory();

	const newChatBtn = document.getElementById("newChatBtn");
	const clearHistoryBtn = document.getElementById("clearHistoryBtn");

	if(newChatBtn){
		newChatBtn.addEventListener("click",()=>{
			const prompt = document.getElementById("prompt");
			if(prompt){ prompt.value=""; prompt.focus(); }
		});
	}

	if(clearHistoryBtn){
		clearHistoryBtn.addEventListener("click",()=>{
			const confirmDelete = confirm("Delete all chats ?");
			if(!confirmDelete) return;
			localStorage.removeItem("aiChats");
			loadHistory();
		});
	}
}

function loadHistory(){
	const historyBox = document.getElementById("chatHistory");
	if(!historyBox) return;

	historyBox.innerHTML="";

	const chats = JSON.parse(localStorage.getItem("aiChats")) || [];

	chats.slice().reverse().forEach(chat=>{
		const item = document.createElement("div");
		item.className = "history-item";
		item.textContent = chat.text.substring(0,30)+"...";
		item.title = chat.text;
		item.onclick = () => {
			const prompt = document.getElementById("prompt");
			if(prompt) prompt.value = chat.text;
		};
		historyBox.appendChild(item);
	});
}

function saveChat(text){
	if(!text.trim()) return;

	const chats = JSON.parse(localStorage.getItem("aiChats")) || [];
	chats.push({ text, date: new Date().toLocaleString() });
	localStorage.setItem("aiChats", JSON.stringify(chats));
	loadHistory();
}

/* ---------- SEND / TYPING / RESPONSE ---------- */

function setupChatActions(){
	const sendBtn = document.getElementById("sendBtn");
	const promptInput = document.getElementById("prompt");

	if(sendBtn){
		sendBtn.addEventListener("click",()=>{
			if(!promptInput) return;
			const text = promptInput.value.trim();
			if(text===""){ alert("Please type something."); return; }

			saveChat(text);
			fakeAIResponse(text);
			promptInput.value="";
			promptInput.style.height = "auto";
		});
	}

	if(promptInput){
		promptInput.addEventListener("keydown",(e)=>{
			if(e.key==="Enter" && !e.shiftKey){
				e.preventDefault();
				sendBtn.click();
			}
		});
	}
}

function showTyping(){
	const existing = document.querySelector(".typing");
	if(existing) return;

	const typing = document.createElement("div");
	typing.className = "typing";
	typing.innerHTML = "<span></span><span></span><span></span>";
	document.getElementById("mainContainer").appendChild(typing);
}

function hideTyping(){
	const typing = document.querySelector(".typing");
	if(typing) typing.remove();
}

function fakeAIResponse(promptText){
	showTyping();
	setTimeout(() => {
		hideTyping();
		console.log("AI Response for:", promptText);
		alert("🤖 AI Response Coming Soon!");
	}, 1500);
}

/* ---------- AUTO RESIZE TEXTAREA ---------- */

function autoResize() {
	const textarea = document.getElementById("prompt");
	if (!textarea) return;

	textarea.addEventListener("input", () => {
		textarea.style.height = "auto";
		textarea.style.height = textarea.scrollHeight + "px";
	});
}

/* ---------- VOICE ---------- */

function initializeVoice() {
	const voiceBtn = document.getElementById("voiceBtn");
	if (!voiceBtn) return;

	voiceBtn.addEventListener("click", (e) => {
		e.preventDefault();

		if (!("webkitSpeechRecognition" in window)) {
			alert("Voice Recognition is not supported in this browser.");
			return;
		}

		const recognition = new webkitSpeechRecognition();
		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;
		recognition.start();

		recognition.onresult = (event) => {
			const text = event.results[0][0].transcript;
			const prompt = document.getElementById("prompt");
			if (prompt) {
				prompt.value = text;
				prompt.dispatchEvent(new Event("input"));
			}
		};

		recognition.onerror = () => alert("Voice recognition failed.");
	});
}

/* ---------- FILE UPLOAD ---------- */

function initializeUpload() {
	const uploadBtn = document.getElementById("uploadBtn");
	if (!uploadBtn) return;

	const input = document.createElement("input");
	input.type = "file";
	input.accept = "*/*";
	input.style.display = "none";
	document.body.appendChild(input);

	uploadBtn.addEventListener("click", () => input.click());

	input.addEventListener("change", () => {
		if (!input.files.length) return;
		alert("Selected File : " + input.files[0].name);
	});
}

console.log("✅ Sura.ai Script Loaded Successfully");